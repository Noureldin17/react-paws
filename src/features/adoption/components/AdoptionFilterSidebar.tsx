import React, { useState } from "react";
import { AdoptionFilters } from "../../../types/types";
import { usePetTypes } from "../../../hooks/usePetTypes";

interface FilterSidebarProps {
  filters: AdoptionFilters;
  onChange: (filters: Partial<AdoptionFilters>) => void;
  onReset: () => void;
}

const AdoptionFilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  onChange,
  onReset,
}) => {
  const { data: petTypes, isLoading: isPetTypesLoading } = usePetTypes();
  const [tempFilters, setTempFilters] = useState<AdoptionFilters>(filters);

  const togglePetType = (type: string) => {
    const updatedPetTypes = tempFilters.petType
      ? tempFilters.petType.includes(type)
        ? tempFilters.petType.filter((petType) => petType !== type)
        : [...tempFilters.petType, type]
      : [type];
    setTempFilters((prev) => ({
      ...prev,
      petType: updatedPetTypes,
    }));
  };

  const handleAgeChange = (minAge?: number, maxAge?: number) => {
    setTempFilters((prev) => ({
      ...prev,
      minAge,
      maxAge,
    }));
  };

  const handleApplyFilters = () => {
    onChange(tempFilters);
  };

  return (
    <div className="flex justify-center">
      <aside className="w-full sm:w-64 p-4 h-full bg-gray-50 rounded-md">
        <h3 className="text-lg font-bold mb-4 text-center">Filters</h3>

        {/* Pet Types */}
        <div className="mb-4">
          <label className="block mb-2 font-medium text-gray-700">
            Pet Types
          </label>
          <div className="flex flex-wrap gap-2">
            {petTypes?.map((type) => (
              <button
                key={type.id}
                onClick={() => togglePetType(type.name)}
                className={`px-4 py-2 rounded-full text-sm cursor-pointer ${
                  tempFilters.petType?.includes(type.name)
                    ? "bg-primary text-white hover:text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {type.name}
              </button>
            ))}
          </div>
        </div>

        {/* Age Inputs */}
        <div className="mb-4 flex gap-4">
          <div className="w-1/2">
            <label className="block mb-2 font-medium text-gray-700">
              Min Age
            </label>
            <input
              type="number"
              value={tempFilters.minAge ?? ""}
              onChange={(e) =>
                handleAgeChange(
                  Number(e.target.value) || undefined,
                  tempFilters.maxAge
                )
              }
              className="block w-full p-2 border rounded text-sm"
            />
          </div>
          <div className="w-1/2">
            <label className="block mb-2 font-medium text-gray-700">
              Max Age
            </label>
            <input
              type="number"
              value={tempFilters.maxAge ?? ""}
              onChange={(e) =>
                handleAgeChange(
                  tempFilters.minAge,
                  Number(e.target.value) || undefined
                )
              }
              className="block w-full p-2 border rounded text-sm"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button
            onClick={handleApplyFilters}
            className="bg-primary rounded-full text-white py-2 px-4 w-full text-sm hover:bg-primary-dark"
          >
            Apply
          </button>
          <button
            onClick={() => {
              setTempFilters({});
              onReset();
            }}
            className="bg-gray-200 rounded-full text-gray-700 py-2 px-4 w-full text-sm hover:bg-gray-300"
          >
            Reset
          </button>
        </div>
      </aside>
    </div>
  );
};

export default AdoptionFilterSidebar;
