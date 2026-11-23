export type Note = string

declare module 'claude-code' {
  interface PluginState {
    'session-note': { saved: Shaped<Note> }
  }
}
