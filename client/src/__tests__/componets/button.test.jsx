import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Button from 'components/Button';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

describe('<Button />', () => {
  const ButtonText = 'Test Button Text';
  const src = 'testLink';

  it('renders the <Button /> with populated data', () => {
    render(
      <Router>
        <Button src={src} title={ButtonText} data-testid="button-link" />
      </Router>,
    );

    expect(screen.getByText('Test Button Text')).toBeInTheDocument();
    expect(screen.getByTestId('title')).toBeTruthy();
  });
});
