import React from "react";
import { useRouter } from "next/navigation";

interface Props {
  currentPage: number;
  onPageChange: (page: number) => void;
  hasMorePages: boolean;
}

const Pagination: React.FC<Props> = ({
  currentPage,
  onPageChange,
  hasMorePages,
}) => {
  const router = useRouter();

  const handlePrevClick = () => {
    if (currentPage > 1) {
      router.push(`/pages/${currentPage - 1}`);
      onPageChange(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (hasMorePages) {
      router.push(`/pages/${currentPage + 1}`);
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="flex justify-center items-center gap-4">
      {currentPage > 1 && (
        <button
          onClick={handlePrevClick}
          className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded"
          aria-label="Previous Page"
        >
          &lt; Prev
        </button>
      )}
      <span className="text-lg font-medium">Page {currentPage}</span>
      {hasMorePages && (
        <button
          onClick={handleNextClick}
          className="bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded"
          aria-label="Next Page"
        >
          Next &gt;
        </button>
      )}
    </div>
  );
};

export default Pagination;
