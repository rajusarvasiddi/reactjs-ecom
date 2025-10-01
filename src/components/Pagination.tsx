import "./Pagination.css";

type PaginationProps = {
  currentPage: number;
  totalItems: number; // total loaded so far
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  totalAvailable?: number; // total available from API
};

const Pagination = ({
  currentPage,
  totalItems,
  itemsPerPage,
  totalAvailable,
  onPageChange,
}: PaginationProps) => {
  const totalPages = Math.ceil(
    Math.min(totalItems, totalAvailable ?? totalItems) / itemsPerPage
  );

  const visiblePages: number[] = [];

  if (totalPages <= 7) {
    visiblePages.push(...Array.from({ length: totalPages }, (_, i) => i + 1));
  } else {
    visiblePages.push(1);

    if (currentPage > 4) visiblePages.push(-1); // ellipsis

    for (let i = currentPage - 2; i <= currentPage + 2; i++) {
      if (i > 1 && i < totalPages) visiblePages.push(i);
    }

    if (currentPage < totalPages - 3) visiblePages.push(-2); // ellipsis

    visiblePages.push(totalPages);
  }

  return (
    <div className="pagination">
      {typeof totalAvailable === "number" && (
        <p className="total-count">
          Showing {Math.min(totalItems, totalAvailable ?? totalItems)} of{" "}
          {totalAvailable} products
        </p>
      )}

      <div className="pagination-controls">
        <button
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className="nav-button"
        >
          First
        </button>

        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="nav-button"
        >
          Prev
        </button>

        {visiblePages.map((page, i) =>
          page > 0 ? (
            <button
              key={i}
              onClick={() => onPageChange(page)}
              className={currentPage === page ? "active" : ""}
            >
              {page}
            </button>
          ) : (
            <span key={i} className="ellipsis">
              ...
            </span>
          )
        )}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="nav-button"
        >
          Next
        </button>

        <button
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          className="nav-button"
        >
          Last
        </button>
      </div>
    </div>
  );
};

export default Pagination;
