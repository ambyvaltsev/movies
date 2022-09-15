import { render, screen } from "@testing-library/react"
import { Star } from './Star';


test('name', () => {
  render(<Star />);
  const element = screen.getAllByTestId('star');
  expect(element).toBeInTheDocument()
})