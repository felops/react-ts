import { useNavigate, useParams } from 'react-router';
import { useQuery } from "@tanstack/react-query";
import { getEstablishmentRatingsById } from "../api/ratingsAPI";

export const EstablishmentDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isLoading, data, error } = useQuery({
    queryKey: ['establishments', id],
    queryFn: () => getEstablishmentRatingsById(id),
    enabled: Boolean(id)
  });

  return (
    <>
      <button onClick={() => navigate(-1)}>go back</button>
      <h2>Establishment Details</h2>
      {
        isLoading
          ? <p>Loading...</p>
          : (
            <div>
              <p>Date of inspection: {data?.RatingDate ? new Date(data?.RatingDate).toLocaleDateString() : '-'}</p>
              <p>Rating: {data?.RatingValue}</p>
              <p>Adress:</p>
              <p>{data?.AddressLine1}</p>
              <p>{data?.AddressLine2}</p>
              <p>{data?.AddressLine3}</p>
              <p>{data?.AddressLine4}</p>
            </div>
          )
      }
    </>
  );
};

export default EstablishmentDetailsPage;
