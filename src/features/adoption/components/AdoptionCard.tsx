import React, { useState } from "react";
import { AdoptionListing } from "../../../types/types";
import AdoptionModal from "./AdoptionModal"; // Assuming this component exists

interface AdoptionCardProps {
  listing: AdoptionListing;
}

const AdoptionCard: React.FC<AdoptionCardProps> = ({ listing }) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  return (
    <>
      {/* Adoption Card */}
      <div
        className="border rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-all duration-300 relative cursor-pointer"
        onClick={handleOpenModal}
      >
        {/* Pet Image */}
        {listing.images[0] ? (
          <img
            src={`data:image/jpeg;base64,${listing.images[0].data}`} // Assuming primaryImageId holds the image data
            // alt={listing.name}
            className="h-32 w-full object-cover rounded"
          />
        ) : (
          <div className="h-32 w-full bg-gray-200 rounded" />
        )}

        {/* Pet Info */}
        <div className="mt-2">
          <h3
            className="font-semibold text-sm text-gray-800 truncate"
            style={{ maxHeight: "1.5em", overflow: "hidden", textOverflow: "ellipsis" }}
          >
            {listing.petName}
          </h3>
          <p
            className="text-gray-600 text-xs truncate"
            style={{ maxHeight: "1.5em", overflow: "hidden", textOverflow: "ellipsis" }}
          >
            {listing.breed || "Unknown Breed"}
          </p>
          <p className="text-gray-500 text-xs mt-1">
            {listing.age ? `${listing.age} years old` : "Age not specified"}
          </p>
        </div>

        {/* Pet Type Badge */}
        <span
          className="absolute bottom-4 right-4 bg-lightOrange text-primary text-xs font-semibold py-1 px-3 rounded-full capitalize shadow-md"
        >
          {listing.petType.name}
        </span>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div className="bg-white w-11/12 max-w-md p-6 rounded-md shadow-lg overflow-y-auto max-h-[90vh]">
            <AdoptionModal
              listing={listing}
              onClose={handleCloseModal}
            />
            <button
              className="mt-4 w-full bg-primary text-white py-2 rounded-full"
              onClick={handleCloseModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AdoptionCard;
