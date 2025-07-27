import { render, screen } from '@testing-library/react';
import { useQuery } from '@tanstack/react-query';
import { PaginatedEstablishmentsTable } from './PaginatedEstablishmentsTable';

jest.mock('@tanstack/react-query', () => ({
  ...jest.requireActual("@tanstack/react-query"),
  useQuery: jest.fn(),
}));

const mockAuthorityData = [
  {
    LocalAuthorityId: "1",
    Name: "Authority 1"
  },
  {
    LocalAuthorityId: "2",
    Name: "Authority 2"
  },
  {
    LocalAuthorityId: "3",
    Name: "Authority 3"
  },
];

const mockEstablishmentsData = [
  {
    BusinessName: "Joe",
    RatingValue: "5"
  },
  {
    BusinessName: "Habib",
    RatingValue: "4"
  },
  {
    BusinessName: "Mc Hogwarts",
    RatingValue: "3"
  },
]

describe("PaginatedEstablishmentsTable", () => {
  it('renders correctly when is loading', () => {
    (useQuery as jest.Mock).mockReturnValueOnce({
      isLoading: false,
      data: { authorities: mockAuthorityData },
      error: null,
    });
    (useQuery as jest.Mock).mockReturnValueOnce({
      isLoading: true,
      data: { establishments: mockEstablishmentsData },
      error: null,
    });
    const { asFragment } = render(<PaginatedEstablishmentsTable />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders correctly when is NOT loading', () => {
    (useQuery as jest.Mock).mockReturnValueOnce({
      isLoading: false,
      data: { authorities: mockAuthorityData },
      error: null,
    });
    (useQuery as jest.Mock).mockReturnValueOnce({
      isLoading: false,
      data: { establishments: mockEstablishmentsData },
      error: null,
    });
    const { asFragment } = render(<PaginatedEstablishmentsTable />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should display loading state', async () => {
    (useQuery as jest.Mock).mockReturnValueOnce({
      isLoading: false,
      data: { authorities: mockAuthorityData },
      error: null,
    });
    (useQuery as jest.Mock).mockReturnValueOnce({
      isLoading: true,
      data: { establishments: mockEstablishmentsData },
      error: null,
    });
    render(<PaginatedEstablishmentsTable />);

    const loading = await screen.getByText('Loading...');
    expect(loading).toBeTruthy();
  });

  it('should NOT display loading state', async () => {
    (useQuery as jest.Mock).mockReturnValueOnce({
      isLoading: false,
      data: { authorities: mockAuthorityData },
      error: null,
    });
    (useQuery as jest.Mock).mockReturnValueOnce({
      isLoading: false,
      data: { establishments: mockEstablishmentsData },
      error: null,
    });
    render(<PaginatedEstablishmentsTable />);

    const loading = await screen.queryAllByText('Loading...');
    expect(loading).toEqual([]);
  });
});
