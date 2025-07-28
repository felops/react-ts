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

  if (error) {
    return <div>Error: please, try again later</div>;
  }

  return (
    <>
      <h1>Establishment Details</h1>
      {
        isLoading
          ? <div style={{ height: "10rem" }}>Loading...</div>
          : (
            <div style={{ display: "flex", flexDirection: "row" }}>
              <div style={{ fontWeight: "bold", textTransform: "uppercase" }}>
                <p>Date of inspection:</p>
                <p>Rating:</p>
                <p>Address:</p>
              </div>
              <div style={{ marginLeft: "1rem" }}>
                <p>{data?.RatingDate ? new Date(data?.RatingDate).toLocaleDateString() : '-'}</p>
                <p>{data?.RatingValue}</p>
                <p>{data?.AddressLine1}</p>
                <p>{data?.AddressLine2}</p>
                <p>{data?.AddressLine3}</p>
                <p>{data?.AddressLine4}</p>
              </div>
            </div>
          )
      }
      <button onClick={() => navigate(-1)}>&#60;&nbsp;&nbsp;go back</button>
    </>
  );
};

export default EstablishmentDetailsPage;
