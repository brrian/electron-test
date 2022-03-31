import { InitializingViewComponent } from '@/models';
import Button from '@/ui/Button';

const InitializingView: InitializingViewComponent = () => {
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
        Select a file
      </Button>
    </div>
  );
};

export default InitializingView;
