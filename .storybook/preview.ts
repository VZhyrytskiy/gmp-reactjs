import type { Preview } from '@storybook/react'
import '../src/index.css'; // Імпортуйте ваш глобальний CSS, де підключений TailwindCSS

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
  },
};

export default preview;