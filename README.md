# claude-mods

A small marketplace of Claude Code mods.

| Mod | What it does |
| --- | --- |
| `hello-mod` | Shows a short greeting above the Claude Code prompt. |
| `session-note` | Opens a pane beside the conversation where you can jot down what you're working on. Run `/session-note` to open it. The note is saved across sessions and is never sent to Claude. |

## Install

At the prompt of a Claude Code terminal session:

```
/plugin install session-note --marketplace rohinvaidya/claude-mods
```

```
/plugin install hello-mod --marketplace rohinvaidya/claude-mods
```

Answer `y` to add the marketplace, then pick a scope (user scope is first; press Enter).

From a shell:

```bash
claude plugin install session-note --marketplace rohinvaidya/claude-mods
```

```bash
claude plugin install hello-mod --marketplace rohinvaidya/claude-mods
```

In the desktop app, where `/plugin` does not run: click **+** next to the prompt box, then **Plugins**, **Add marketplace** with `rohinvaidya/claude-mods`, then **Add plugin**.
