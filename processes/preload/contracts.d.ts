/* eslint-disable @typescript-eslint/consistent-type-imports */

interface Exposed {
  readonly openFileDialog: typeof import('./src/openFileDialog').default;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Window extends Exposed {}
