import { useState } from "react";
import { EstablishmentsTable } from "./EstablishmentsTable";
import { EstablishmentsTableNavigation } from "./EstablishmentsTableNavigation";
import { getEstablishmentRatings } from "../api/ratingsAPI";
import { useQuery } from "@tanstack/react-query";

const tableStyle = {
  background: "#82C7AF",
  padding: "10px",
  width: "max-content",
  marginLeft: "50px",
  color: "white",
};

export const PaginatedEstablishmentsTable = () => {
  const [pageNum, setPageNum] = useState(1);
  const [pageCount] = useState(100);
  const { isLoading, data, error } = useQuery({
    queryKey: ['establishments', pageNum],
    queryFn: () => getEstablishmentRatings(pageNum)
  });

  async function handlePreviousPage() {
    pageNum > 1 && setPageNum(pageNum - 1);
  }

  async function handleNextPage() {
    pageNum < pageCount && setPageNum(pageNum + 1);
  }

  if (error) {
    return <div>Error: please, try again later</div>;
  }

  return (
    <div style={tableStyle}>
      <h2>Food Hygiene Ratings</h2>
      <EstablishmentsTable
        establishments={data?.establishments}
        isLoading={isLoading}
      />
      <EstablishmentsTableNavigation
        pageNum={pageNum}
        pageCount={pageCount}
        onPreviousPage={handlePreviousPage}
        onNextPage={handleNextPage}
      />
    </div>
  );
};
