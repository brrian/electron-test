import App from '@app/App';
import { render } from '@app/__fixtures__/mountPomello';
import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

describe('App', () => {
  it('should be awesome', async () => {
    render(<App />);

    expect(screen.getByText('Hello from Apps')).toBeInTheDocument();
  });
});
