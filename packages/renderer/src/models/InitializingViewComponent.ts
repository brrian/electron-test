import { FC } from 'react';

type InitializingViewComponent = FC<{
  onReady(): void;
}>;

export default InitializingViewComponent;
