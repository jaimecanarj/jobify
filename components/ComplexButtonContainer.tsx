"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

type ButtonContainerProps = {
  currentPage: number;
  totalPages: number;
};

type ButtonProps = {
  page: number;
  activeClass: boolean;
};

import { Button } from "@/components/ui/button";

const ButtonContainer = ({ currentPage, totalPages }: ButtonContainerProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const handlePageChange = (page: number) => {
    const defaultParams = {
      search: searchParams.get("search") || "",
      jobStatus: searchParams.get("jobStatus") || "",
      page: String(page),
    };

    let params = new URLSearchParams(defaultParams);

    router.push(`${pathname}?${params.toString()}`);
  };

  const addPageButton = ({ page, activeClass }: ButtonProps) => {
    return (
      <Button
        key={page}
        size="icon"
        variant={activeClass ? "default" : "outline"}
        onClick={() => handlePageChange(page)}
      >
        {page}
      </Button>
    );
  };

  const renderPageButtons = () => {
    const pageButtons = [];

    // primera página
    pageButtons.push(
      addPageButton({ page: 1, activeClass: currentPage === 1 })
    );

    // puntos
    if (currentPage > 3) {
      pageButtons.push(
        <Button size="icon" variant="outline" key="dots-1">
          ...
        </Button>
      );
    }

    // página anterior
    if (currentPage !== 1 && currentPage !== 2) {
      pageButtons.push(
        addPageButton({
          page: currentPage - 1,
          activeClass: false,
        })
      );
    }

    // página actual
    if (currentPage !== 1 && currentPage !== totalPages) {
      pageButtons.push(
        addPageButton({
          page: currentPage,
          activeClass: true,
        })
      );
    }

    // página siguiente
    if (currentPage !== totalPages && currentPage !== totalPages - 1) {
      pageButtons.push(
        addPageButton({
          page: currentPage + 1,
          activeClass: false,
        })
      );
    }

    // puntos
    if (currentPage < totalPages - 2) {
      pageButtons.push(
        <Button size="icon" variant="outline" key="dots-2">
          ...
        </Button>
      );
    }

    // última página
    pageButtons.push(
      addPageButton({
        page: totalPages,
        activeClass: currentPage === totalPages,
      })
    );
    return pageButtons;
  };

  return (
    <div className="flex  gap-x-2">
      {/* prev */}
      <Button
        className="flex items-center"
        variant="outline"
        onClick={() => {
          let prevPage = currentPage - 1;
          if (prevPage < 1) prevPage = totalPages;
          handlePageChange(prevPage);
        }}
      >
        <ChevronLeft />
      </Button>

      {renderPageButtons()}

      {/* next */}
      <Button
        className="flex items-center"
        onClick={() => {
          let nextPage = currentPage + 1;
          if (nextPage > totalPages) nextPage = 1;
          handlePageChange(nextPage);
        }}
        variant="outline"
      >
        <ChevronRight />
      </Button>
    </div>
  );
};

export default ButtonContainer;
