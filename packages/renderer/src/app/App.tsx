import getServiceById from '@/services';
import { FC } from 'react';

interface AppProps {
  serviceId: string;
}

const App: FC<AppProps> = ({ serviceId }) => {
  const { InitializingView } = getServiceById(serviceId);

  return (
    <>
      <InitializingView onReady={() => null} />
    </>
  );
};

export default App;
