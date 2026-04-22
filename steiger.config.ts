import { defineConfig } from 'steiger'
import fsd from '@feature-sliced/steiger-plugin'

export default defineConfig([
  ...fsd.configs.recommended,
  {
    // shared/ui no requiere public-api estricto en este proyecto
    files: ['./src/shared/**'],
    rules: {
      'fsd/public-api': 'off',
    },
  },
  {
    // Las features arrancan con un único consumidor; la regla genera falsos positivos durante el desarrollo inicial
    files: ['./src/features/**'],
    rules: {
      'fsd/insignificant-slice': 'off',
    },
  },
])
