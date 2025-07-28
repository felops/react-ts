import { render, screen } from '@testing-library/react';
import { EstablishmentsTable } from './EstablishmentsTable';
import { BrowserRouter } from 'react-router';

const mockData = [
  {
    BusinessName: "Joe",
    RatingValue: "5",
    FHRSID: "22999"
  },
  {
    BusinessName: "Habib",
    RatingValue: "4",
    FHRSID: "67890" 
  },
  {
    BusinessName: "Mc Hogwarts",
    RatingValue: "3",
    FHRSID: "09888" 
  },
]

describe("EstablishmentsTable", () => {
  it('renders correctly', () => {
    const { asFragment } = render(
      <BrowserRouter>
        <EstablishmentsTable establishments={mockData} />
      </BrowserRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('has head titles', () => {
    render(
      <BrowserRouter>
        <EstablishmentsTable establishments={mockData} />
      </BrowserRouter>
    );
    const headTitles = screen.getAllByRole('columnheader').map(th => th.textContent);
    
    expect(headTitles).toEqual(['', 'Business Name', 'Rating Value']);
  });

  it('render all data', async () => {
    render(
      <BrowserRouter>
        <EstablishmentsTable establishments={mockData} />
      </BrowserRouter>
    );
    const allLines = await screen.findAllByRole('row');

    expect(allLines.length - 1).toEqual(mockData.length); // minus 1 for the header row
  });

  it('render body rows with correct style', async () => {
    render(
      <BrowserRouter>
        <EstablishmentsTable establishments={mockData} />
      </BrowserRouter>
    );
    const allBodyLines = await screen.findAllByRole('cell');
    expect(allBodyLines[1]).toHaveClass("font-size-20");
    expect(allBodyLines[2]).toHaveClass("font-size-20");
  });
});
