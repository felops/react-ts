import { Link } from "react-router";
import { Establishment } from "../models/Establishment";
import { useContext } from "react";
import { FavoritesContext } from "../contexts/favorites";

const headerStyle: { [key: string]: string | number } = {
  paddingBottom: "10px",
  textAlign: "left",
  fontSize: "20px",
};

interface EstablishmentsTableProps {
  establishments: Establishment[] | undefined;
  isLoading?: boolean;
}

export const EstablishmentsTable = ({
  establishments,
  isLoading
}: EstablishmentsTableProps) => {
  const { favorites, toggleFavorite } = useContext(FavoritesContext);
  
  return (
    <>
      <table>
        <thead>
          <tr>
            <th></th>
            <th style={headerStyle}>Business Name</th>
            <th style={headerStyle}>Rating Value</th>
          </tr>
        </thead>
        <tbody>
          {establishments && establishments?.map(establishment => (
            <tr key={establishment?.FHRSID} style={{ fontSize: "20px" }}>
              <td>
                <input
                  type="checkbox"
                  checked={favorites.some(item => item.FHRSID === establishment.FHRSID)}
                  onChange={() => toggleFavorite(establishment)}
                />
              </td>
              <td>
                <Link to={`${establishment.FHRSID}/details`}>{establishment?.BusinessName}</Link>
              </td>
              <td>{establishment?.RatingValue}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {isLoading && <div>Loading...</div>}
    </>
  );
};
