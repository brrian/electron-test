import App from '@/app/App';
import { render } from '@testing-library/react';

const mountService = (serviceId: string, options = {}) =>
  render(<App serviceId={serviceId} />, {
    wrapper: ({ children }) => children,
    ...options,
  });

export * from './mount';
export default mountService;
