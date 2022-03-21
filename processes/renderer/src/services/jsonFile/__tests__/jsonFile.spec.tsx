import mountService, { screen } from '@/__fixtures__/mountService';

describe('Services - JSON File', () => {
  it("should prompt the user to select a file if they don't have one selected", () => {
    mountService('jsonFile');

    // TODO: Add something to resolve the hasFile method

    expect(screen.getByRole('button')).toHaveTextContent('Select a file');
  });

  it('should automatically load the file if one is already selected', () => {
    // TODO
    // expect button to not be on screen
    // expect text "Loading..." to be on screen
    // expect window.loadFile to have been called
  });

  it('should load the file after a user selection', () => {
    // TODO
    // expect text "Loading..." to be on screen
    // simulate user selection
    // expect text "Loading..." to be on screen
    // expect window.loadFile to have been called
  });

  it('should transition after loading the file', () => {
    // TODO
    // expect "Select a task" to be on screen
  });
});
