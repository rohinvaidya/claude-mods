import type { Register } from 'claude-code';

let message = '';

export const register: Register = (on) => {
  on('session.start', ($, event, next) => {
    message = 'Hello from my mod';
    return next(event);
  });

  on('ui.render', { component: 'AbovePrompt' }, ($, event) => {
    const { Text } = $.ui.resolve(event);
    return <Text>{message}</Text>;
  });
};