import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    // Aqui você pode adicionar tipagem para propriedades CSS específicas
    spacing?: {
      small: string;
      medium: string;
      large: string;
    };
  }
}
