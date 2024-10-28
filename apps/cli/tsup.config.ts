// tsup.config.ts
import { defineConfig } from 'tsup';

export default defineConfig([
{
  entry: ['src/index.ts'],
  target: 'node16',
  format: ['cjs'],
  external: ['./genesis.config.ts'], // Exclude from bundling
  dts: true
},
{
  entry: ['src/cli.ts'],
  target: 'node16',
  format: ['cjs'],
  external: ['./genesis.config.ts'], // Exclude from bundling
}
]);