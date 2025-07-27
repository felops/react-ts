import renderer from 'react-test-renderer';
import { EstablishmentsTable } from './EstablishmentsTable';

describe("EstablishmentsTable", () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<EstablishmentsTable establishments={[
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
      ]} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
