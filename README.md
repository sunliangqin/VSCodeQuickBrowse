# Introduction
This extension enables you quickly open the current file in browser.

![Quick Browse](images/quick-browse.gif)

# Setting
The following setting enables quick browse the current file in github.

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

# Keyboard Shortcut
`Ctrl+Alt+B`