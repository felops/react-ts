import {render, screen} from '@testing-library/react' 
import { EstablishmentsTable } from './EstablishmentsTable';

const mockData = [
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

describe("EstablishmentsTable", () => {
  it('renders correctly', () => {
    const { asFragment } = render(<EstablishmentsTable establishments={mockData} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('has head titles', () => {
    render(<EstablishmentsTable establishments={mockData} />);
    const headTitles = screen.getAllByRole('columnheader').map(th => th.textContent);
    
    expect(headTitles).toEqual(['Business Name', 'Rating Value']);
  });

  it('render all data', async () => {
    render(<EstablishmentsTable establishments={mockData} />);
    const allLines = await screen.findAllByRole('row');

    expect(allLines.length - 1).toEqual(mockData.length); // minus 1 for the header row
  });

  it('render body rows with correct style', async () => {
    render(<EstablishmentsTable establishments={mockData} />);
    const allBodyLines = await screen.findAllByRole('row');
    expect(allBodyLines[1].style.fontSize).toEqual("20px");
  });
});
