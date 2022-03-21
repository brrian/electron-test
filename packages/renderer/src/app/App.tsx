import getServiceById from '@services';
import { version } from '../../../../package.json';

export default function App() {
  const { InitializingScreen } = getServiceById('jsonFile');

  return (
    <>
      <p>Version: {version}</p>
      <InitializingScreen />
    </>
  );
}
