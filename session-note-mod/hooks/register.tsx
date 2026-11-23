import { atom, read, update } from 'claude-code'
import type { EngineInterface, Register } from 'claude-code'

import type { Note } from '../types'

const PANE = 'session-note'
const TITLE = 'Session note'
const saved = atom({ plugin: 'session-note', key: 'saved' } as const, '' as Note, {
  shape: 'saved-1',
})

// Loads the last saved note from the cross-session store into the pane.
async function load($: EngineInterface) {
  const last = await $.store.get('note')
  await update($, saved, () => (typeof last === 'string' ? last : ''))
}

export const register: Register = on => {
  // The text in the box before Save; a module variable, not sent anywhere.
  let draft: string | undefined

  on('session.start', async ($, e, next) => {
    await $.command.register({
      name: 'session-note',
      description: 'Open the session note pane (your note stays private)',
    })
    draft = undefined
    await load($)
    void $.ui.open({ id: PANE, title: TITLE })

    return next(e)
  })

  on('command.run', { command: 'session-note' }, async $ => {
    draft = undefined
    await load($)
    await $.ui.open({ id: PANE, title: TITLE })

    return { text: 'Session note pane opened.' }
  })

  on('ui.render', { component: 'Pane', requestId: PANE }, async ($, e) => {
    const { Box, Text, Button, Input } = $.ui.resolve(e)
    const note = await read($, saved)

    const save = async () => {
      const text = draft ?? note
      await $.store.set('note', text)
      await update($, saved, () => text)
      $.ui.toast('Note saved')
    }

    return (
      <Box flexDirection="column" padding={1} gap={1}>
        <Text bold color="claude">
          Session note
        </Text>
        <Input
          key="note"
          rows={8}
          value={note}
          placeholder="What are you working on?"
          submitLabel="newline"
          onInput={value => {
            draft = value
          }}
          onSubmit={value => {
            draft = value
            void save()
          }}
        />
        <Box>
          <Button key="save" onPress={() => void save()}>
            Save
          </Button>
        </Box>
        <Text dimColor>Only for you. Never sent to Claude.</Text>
      </Box>
    )
  })
}
