# Introduction
## This extension enables you open the current file in browser based on the file path.

![Quick Browse](assets/demo.gif)

# Settings
## Here is an example to enable the files under the quick-browse folder for quick browse in github. Press `Ctrl+Alt+B` to open the current file in the github.

```json
"quickBrowse.rules": [
    {
        "pattern": ".+?/quick-browse/(.*)",
        "list": [
            "https://github.com/sunliangqin/VSCodeQuickBrowse/blob/master/$1"
        ]
    }
]
```
* pattern: a regular expression to match the current file path (use '/' as path separator). The first rule that matches will be used for quick browse.
* list: a list of urls for quick browse. Use $n to reference the capturing groups defined in pattern.