// & Моя тема из Соло-проекта
import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: '#A0AEC0',
        color: 'Green 700',
      },
      a: {
        color: 'Green 900',
        _hover: {
          textDecoration: 'underline',
        },
      },
      h1: {
        color: 'Green 600',
      },
      h2: {
        color: 'Green 400',
      },
      p: {
        color: 'Green 900',
        
      },
    },
  },
});

export default theme;
