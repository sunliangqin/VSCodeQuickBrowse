# Introduction
This extension enables you quickly open the current file in browser.

![Quick Browse](images/quick-browse.gif)

# Setting
Here is an example to enable this project to quick browse the current file in github (keyboard shortcut `Ctrl+Alt+B`).

```json
"quickBrowse.rules": [
    {
        "pattern": ".+?\\\\quick-browse\\\\(.*)",
        "list": [
            "https://github.com/sunliangqin/VSCodeQuickBrowse/blob/master/$1"
        ]
    }
]
```
1. pattern: a regular expression to match the current file path. The first rule that matches will be used for quick browse.
1. list: a list of url for quick browse. Use $n to reference the capturing groups defined in pattern.