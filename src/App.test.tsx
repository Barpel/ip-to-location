import { render, screen } from '@testing-library/react';
import App from './App';

jest.mock('./layout/NavBar', () => () => <div data-testid="navBar">NavBar</div>);
jest.mock('./pages/Home', () => () => <div data-testid="homePage">Home</div>);

describe('App Component Tests', () => {
  test('renders without crashing', () => {
    render(<App />);
    expect(screen.getByRole('main')).toBeInTheDocument();
  });

  test('renders NavBar and Home components', () => {
    render(<App />);
    expect(screen.getByTestId('navBar')).toBeInTheDocument();
    expect(screen.getByTestId('homePage')).toBeInTheDocument();
  });

});
