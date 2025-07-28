import { Link } from "react-router";
import { Establishment } from "../models/Establishment";
import { useContext } from "react";
import { FavoritesContext } from "../contexts/favorites";

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
    <table style={{ minHeight: '25rem' }}>
      <thead>
        <tr>
          <th></th>
          <th>Business Name</th>
          <th>Rating Value</th>
        </tr>
        {isLoading && (
          <tr>
            <th colSpan={3}><div>Loading...</div></th>
          </tr>
        )}
      </thead>
      <tbody>
        {establishments && establishments?.map(establishment => (
          <tr key={establishment?.FHRSID}>
            <td>
              <input
                type="checkbox"
                checked={favorites.some(item => item.FHRSID === establishment.FHRSID)}
                onChange={() => toggleFavorite(establishment)}
              />
            </td>
            <td className="font-size-20">
              <Link to={`${establishment.FHRSID}/details`}>{establishment?.BusinessName}</Link>
            </td>
            <td className="font-size-20">{establishment?.RatingValue}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
