import * as vscode from 'vscode';

const open = require("open");

class Rule {
    constructor(public readonly pattern: string, public readonly list: string[]) {
    }

    match(file: string) {
        return file.match(this.pattern);
    }

    expand(file: string) {
        return this.list.map(x => {
            return file.replace(new RegExp(this.pattern), x);
        });
    }
}

class Configuration {
    static Load() {
        const rules = vscode.workspace.getConfiguration().get<Rule[]>(
            'quickBrowse.rules', []);
        return rules.map(x => new Rule(x.pattern, x.list));
    }
}

class UrlQuickPickItem implements vscode.QuickPickItem {
    constructor(public readonly label: string, public readonly url: string) {
    }
}

async function selectUrlFromPick(urls: string[]) {
    const urlQuickPickItems = urls.map(x => {
        return new UrlQuickPickItem('$(file-symlink-file)  ' + x, x);
    });

    const selectedUrl = await vscode.window.showQuickPick(urlQuickPickItems,
        { placeHolder: 'Open in browser' });
    return selectedUrl?.url;
}

export function activate(context: vscode.ExtensionContext) {
    context.subscriptions.push(vscode.commands.registerCommand('quickBrowse.browse', async () => {
        const activeTextEditor = vscode.window.activeTextEditor;
        if (!activeTextEditor) {
            return;
        }
        const currentFilePath = activeTextEditor.document.fileName;
        console.info(`Current file path: ${currentFilePath}`);

        const rules = Configuration.Load();
        const matchedRule = rules.find(x => x.match(currentFilePath))
        console.info(`Matched rule: ${JSON.stringify(matchedRule)}`);
        const urls = matchedRule?.expand(currentFilePath) || [];
        console.info(`Urls: ${urls}`);

        let url;
        if (urls.length == 0) {
            return;
        } else if (urls.length == 1) {
            url = urls[0];
        } else {
            url = await selectUrlFromPick(urls);
            if (!url) {
                return;
            }
        }

        console.info(`Opening ${url} in browser`);
        open(url);
    }));
}