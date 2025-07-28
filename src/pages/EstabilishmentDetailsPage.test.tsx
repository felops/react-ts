import { fireEvent, render, screen } from '@testing-library/react';
import { useQuery } from "@tanstack/react-query";
import { EstablishmentDetailsPage } from './EstabilishmentDetailsPage';
import { BrowserRouter } from 'react-router';

const mockData = {
  RatingDate: new Date('2000-01-01T12:00:00Z'),
  RatingValue: "5",
  AddressLine1: "Coronation Street",
  AddressLine2: "Hide Park",
  AddressLine3: "New York",
  AddressLine4: "MC",
}

jest.mock('@tanstack/react-query', () => ({
  useQuery: jest.fn(),
}));

const mockUseNavigate = jest.fn();
jest.mock('react-router', () => ({
   ...jest.requireActual('react-router'),
  useNavigate: () => mockUseNavigate,
}));

describe("EstabilishmentDetailsPage", () => {
  it('renders correctly when is loading', () => {
    (useQuery as jest.Mock).mockReturnValueOnce({
      isLoading: true,
      data: mockData,
      error: null,
    });
    const { asFragment } = render(
      <BrowserRouter>
        <EstablishmentDetailsPage />
      </BrowserRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders correctly when is NOT loading', () => {
    (useQuery as jest.Mock).mockReturnValueOnce({
      isLoading: false,
      data: mockData,
      error: null,
    });
    const { asFragment } = render(
      <BrowserRouter>
        <EstablishmentDetailsPage />
      </BrowserRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should call navigate function when button is clicked', () => {
    (useQuery as jest.Mock).mockReturnValueOnce({
      isLoading: false,
      data: mockData,
      error: null,
    });
    render(
      <BrowserRouter>
        <EstablishmentDetailsPage />
      </BrowserRouter>
    );
    fireEvent.click(document.querySelector('button')!);
    expect(mockUseNavigate).toHaveBeenCalledWith(-1);
  });

  it('should display error message when API call fails', async () => {
    (useQuery as jest.Mock).mockReturnValueOnce({
      isLoading: false,
      data: mockData,
      error: new Error('API call failed'),
    });
    render(
      <BrowserRouter>
        <EstablishmentDetailsPage />
      </BrowserRouter>
    );
    expect(await screen.getByText('Error: please, try again later')).toBeTruthy();
  });
});



