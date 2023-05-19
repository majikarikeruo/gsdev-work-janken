/**
 * Mantine
 */
import { Flex } from "@mantine/core";

import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";

const Pagenation = ({ pageNumber, numPages, setPageNumber }) => {
  /**
   * @function handleNextPage
   *
   */
  const handleNextPage = () => {
    if (pageNumber === numPages) return;
    setPageNumber(pageNumber + 1);
  };

  /**
   * @function handlePrevPage
   *
   */
  const handlePrevPage = () => {
    if (pageNumber === 1) return;

    setPageNumber(pageNumber - 1);
  };

  return (
    <Flex justify="center" align="center" className="p-3">
      <IconChevronLeft onClick={handlePrevPage} disabled={pageNumber === 1} />

      <p className="h-auto mx-4">
        <span className="inline-block mr-2">Page</span> {pageNumber} /{" "}
        {numPages}
      </p>
      <IconChevronRight onClick={handleNextPage} />
    </Flex>
  );
};

export default Pagenation;
