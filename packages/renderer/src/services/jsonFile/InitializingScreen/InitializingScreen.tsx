import Button from '@ui/Button';
import { FC } from 'react';

const InitializingScreen: FC = () => {
  // Getting settings to see if we have a stored task file
  // If we do, read the file and add it to our state

  return (
    <div>
      <Button
        onClick={async () => {
          console.log('!!');
          console.log(await window.openFileDialog());
        }}
      >
        Load File
      </Button>
    </div>
  );
};

export default InitializingScreen;
