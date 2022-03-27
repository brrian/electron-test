import getServiceById from '@services';
import { version } from '../../../../package.json';

export default function App() {
  const { InitializingView } = getServiceById('jsonFile');

  return (
    <>
      <p>Version: {version}</p>
      <InitializingView onReady={() => null} />
    </>
  );
}
