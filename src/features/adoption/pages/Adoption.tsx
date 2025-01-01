import React, { useState } from "react";
import { useAdoptionListings } from "../../../hooks/useAdoptionListings";
import AdoptionFilterSidebar from "../components/AdoptionFilterSidebar";
import AdoptionCard from "../components/AdoptionCard";
import { AdoptionFilters } from "../../../types/types";

const Adoption: React.FC = () => {
  const [filters, setFilters] = useState<AdoptionFilters>({});
  const [isFilterModalOpen, setFilterModalOpen] = useState(false);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useAdoptionListings(filters);

  const handleFilterChange = (newFilters: Partial<AdoptionFilters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
    if (isFilterModalOpen) setFilterModalOpen(false); // Close modal after applying filters
  };

  const handleResetFilters = () => {
    setFilters({});
  };

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = event.currentTarget;
    if (scrollTop + clientHeight >= scrollHeight - 100 && hasNextPage) {
      fetchNextPage();
    }
  };

  return (
    <section className="flex flex-col lg:flex-row h-[calc(100vh-4rem)] overflow-hidden">
      {/* Sidebar for Desktop */}
      <div className="hidden lg:block w-64 h-full overflow-y-auto bg-gray-50 shadow-md">
        <AdoptionFilterSidebar
          filters={filters}
          onChange={handleFilterChange}
          onReset={handleResetFilters}
        />
      </div>

      {/* Adoption List */}
      <div
        className="flex-1 p-4 lg:p-8 overflow-y-auto bg-white"
        onScroll={handleScroll}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-primary">Adoption Listings</h2>
          {/* Button to Open Filter Modal */}
          <button
            className="lg:hidden flex items-center gap-2 px-4 py-2 border border-orange-500 text-orange-500 rounded-full hover:bg-orange-500 hover:text-white transition duration-200"
            onClick={() => setFilterModalOpen(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.382a1 1 0 01-.293.707l-5.414 5.414a1 1 0 00-.293.707v4.172a1 1 0 01-.553.894l-4 2A1 1 0 019 20v-7.586a1 1 0 00-.293-.707L3.293 7.089A1 1 0 013 6.382V4z"
              />
            </svg>
            Filters
          </button>
        </div>
        <p className="text-secondary mb-6">Browse our collection of adoptable pets.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {data?.pages.map((page) =>
            page.content.map((listing) => (
              <AdoptionCard key={listing.listingId} listing={listing} />
            ))
          )}
        </div>
        {isFetchingNextPage && <p className="text-center mt-4">Loading more pets...</p>}
      </div>

      {/* Filter Modal for Mobile */}
      {isFilterModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div className="bg-white w-11/12 max-w-md p-6 rounded-md shadow-lg overflow-y-auto max-h-[90vh]">
            <AdoptionFilterSidebar
              filters={filters}
              onChange={handleFilterChange}
              onReset={handleResetFilters}
            />
            <button
              className="mt-4 w-full bg-primary text-white py-2 rounded-full"
              onClick={() => setFilterModalOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Adoption;
