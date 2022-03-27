import getServiceById from '@services';
import { version } from '../../../../package.json';

export default function App() {
  const { InitializingScreen } = getServiceById('jsonFile');

  return (
    <>
      <p>Version: {version}</p>
      <pre>{import.meta.env.VITE_APP_ID}</pre>
      <InitializingScreen />
    </>
  );
}
