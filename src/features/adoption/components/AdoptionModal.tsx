import React, { useState } from "react";
import { AdoptionListing } from "../../../types/types";
import tempProfile from "../../../assets/temp-profile.jpeg"

interface AdoptionModalProps {
  listing: AdoptionListing;
  onClose: () => void;
}

const AdoptionModal: React.FC<AdoptionModalProps> = ({ listing, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleImageClick = (index: number) => {
    setCurrentImageIndex(index);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-3xl w-4/5 max-w-lg p-6 relative gap-4 h-[500px] noScroll overflow-scroll">
        {/* Image Section */}
        <div className="flex flex-col sm:flex-row justify-between sm:pe-8 pt-8 sm:p-0 sm:gap-4">
          {/* Main Image */}
          <div className="mb-4 w-full">
            <img
              src={`data:image/jpeg;base64,${listing.images[currentImageIndex].data || ""}`}
            //   alt={listing.petName}
              className="h-64 w-full object-cover rounded-lg"
            />
          </div>
          {/* Vertical Thumbnails */}
          <div className="flex flex-col gap-2 items-center">
            {listing.images?.slice(0, 5).map((image, index) => (
              <div
                key={index}
                className={`h-16 w-16 aspect-w-1 aspect-h-1 rounded-md cursor-pointer ${
                  index === currentImageIndex
                    ? "ring-2 ring-primary"
                    : "hover:ring-2 hover:ring-gray-300"
                }`}
              >
                <img
                  src={`data:image/jpeg;base64,${image.data}`}
                  alt={`Thumbnail ${index + 1}`}
                  className="h-full w-full object-cover rounded-md"
                  onClick={() => handleImageClick(index)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Main Content Section */}
        <div className="">
          {/* Close Button */}
          <button
            className="absolute top-4 right-4 text-gray-600 text-xl font-bold"
            onClick={onClose}
          >
            ✕
          </button>

          {/* Pet Details */}
          <div className="flex items-center">
            <h3 className="font-bold text-lg">{listing.petName || "Unnamed"}</h3>
            <span className="bg-lightOrange ml-2 text-primary text-xs font-semibold py-1 px-3 rounded-full capitalize shadow-md">
              {listing.petType.name}
            </span>
          </div>
          {/* <p className="text-gray-700 text-sm mt-2">{listing.description}</p> */}

          {/* Additional Info */}
          <div className="flex justify-between sm:w-[60%] w-[80%]">
            <div className="mt-4">
                <p className="font-semibold text-sm text-gray-600">Breed</p>
                <p className="text-sm text-gray-600">{listing.breed || "Unknown"}</p>
            </div>
            <div className="mt-4">
                <p className="font-semibold text-sm text-gray-600">Age</p>
                <p className="text-sm text-gray-600">{listing.age || "5"} years old</p>
            </div>
          </div>

          {/* Description (Scrollable) */}
          <div className="mt-4">
            <p className="font-semibold text-sm text-gray-600">Description</p>
            <p className="text-sm text-gray-600">{listing.description || "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur viverra eros non risus malesuada, nec facilisis justo ullamcorper. Donec auctor risus vel est lacinia, nec consequat libero laoreet. Integer a varius nisi. Nam varius metus vitae augue fermentum, sed dictum erat malesuada."}</p>
          </div>

          {/* User Information (Owner) */}
          <hr className="mt-4" />
          <p className="font-semibold text-sm text-gray-600 mt-4">Owner Information</p>
          <div className="flex items-center gap-4 mt-2">
            <div className="relative w-12 h-12">
              <img
                src={listing.user?.profileImage || tempProfile}
                alt="User Profile"
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <div>
              <p className="font-semibold text-sm text-gray-600">{listing.user?.firstName || "John Doe"}</p>
              <p className="text-sm text-gray-600">{listing.user?.email}</p>
            </div>
          </div>

          {/* Adoption Button */}
          <button
            className="mt-6 w-full py-3 rounded-full text-white font-semibold bg-primary hover:bg-primary-dark"
            onClick={() => alert("Adopt this pet")}
          >
            Request for Adoption
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdoptionModal;
