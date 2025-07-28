import { useState } from "react";
import { EstablishmentsTable } from "./EstablishmentsTable";
import { EstablishmentsTableNavigation } from "./EstablishmentsTableNavigation";
import { getEstablishmentRatings, getEstablishmentRatingsByAuthority } from "../api/ratingsAPI";
import { useQuery } from "@tanstack/react-query";
import { getAuthorities } from "../api/authoritiesAPI";

export const PaginatedEstablishmentsTable = () => {
  const [pageNum, setPageNum] = useState(1);
  const [pageCount] = useState(100);
  const [localAuthorityId, setLocalAuthorityId] = useState('');
  const { data: authoritiesData } = useQuery({
    queryKey: ['authorities'],
    queryFn: () => getAuthorities()
  });
  const { isFetching, data, error } = useQuery({
    queryKey: ['establishments', localAuthorityId, pageNum],
    queryFn: () => localAuthorityId
      ? getEstablishmentRatingsByAuthority(localAuthorityId, pageNum)
      : getEstablishmentRatings(pageNum)
  });

  const onChangeLocalAuthority = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setLocalAuthorityId(event.target.value);
    setPageNum(1);
  };

  const handlePreviousPage = async () => {
    pageNum > 1 && setPageNum(pageNum - 1);
  }

  const handleNextPage = async () => {
    pageNum < pageCount && setPageNum(pageNum + 1);
  }

  if (error) {
    return <div>Error: please, try again later</div>;
  }

  return (
    <>
      <select onChange={onChangeLocalAuthority} value={localAuthorityId}>
        <option value="">All Authorities</option>
        {authoritiesData?.authorities?.map((authority) => (
          <option key={authority.LocalAuthorityId} value={authority.LocalAuthorityId}>
            {authority.Name}
          </option>
        ))}
      </select>
      <EstablishmentsTable
        establishments={data?.establishments}
        isLoading={isFetching}
      />
      <EstablishmentsTableNavigation
        pageNum={pageNum}
        pageCount={pageCount}
        onPreviousPage={handlePreviousPage}
        onNextPage={handleNextPage}
      />
    </>
  );
};
