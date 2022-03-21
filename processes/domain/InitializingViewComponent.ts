import { FC } from 'react';

export type InitializingViewComponent = FC<{
  onReady(): void;
}>;
