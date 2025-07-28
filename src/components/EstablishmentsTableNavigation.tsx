type EstablishmentsTableNavigationType = {
  pageNum: number;
  pageCount: number;
  onPreviousPage: () => void;
  onNextPage: () => void;
};

export const EstablishmentsTableNavigation = (
  props: EstablishmentsTableNavigationType
) => {
  const { pageNum, pageCount, onPreviousPage, onNextPage } = props;
  return (
    <nav>
      {
        <button
          type="button"
          disabled={pageNum <= 1}
          onClick={onPreviousPage}
        >
          &#60;&nbsp;&nbsp;previous
        </button>
      }
      <span style={{ fontWeight: "bold", margin: "1rem" }}>{pageNum}</span>
      {
        <button
          type="button"
          disabled={pageNum >= pageCount}
          onClick={onNextPage}
        >
          next&nbsp;&nbsp;&#62;
        </button>
      }
    </nav>
  );
};
