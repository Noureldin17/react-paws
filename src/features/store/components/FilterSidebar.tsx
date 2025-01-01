import React, { useState } from "react";
import { ProductFilters } from "../../../types/types";
import { useProductCategories } from "../../../hooks/useProductCategories";
import { usePetTypes } from "../../../hooks/usePetTypes";

interface FilterSidebarProps {
  filters: ProductFilters;
  onChange: (filters: Partial<ProductFilters>) => void;
  onReset: () => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  onChange,
  onReset,
}) => {
  const { data: categories, isLoading: isCategoriesLoading } = useProductCategories();
  const { data: petTypes, isLoading: isPetTypesLoading } = usePetTypes();
  // Local state for holding temporary filter changes before applying
  const [tempFilters, setTempFilters] = useState<ProductFilters>(filters);

  // useEffect(() => {
  //   const fetchFilters = async () => {
  //     try {
  //       const [categoryResponse, petTypeResponse] = await Promise.all([
  //         fetch("http://localhost:8080/api/v1/categories"),
  //         fetch("http://localhost:8080/api/v1/pet-types"),
  //       ]);
  //       setCategories(await categoryResponse.json());
  //       setPetTypes(await petTypeResponse.json());
  //     } catch (error) {
  //       console.error("Error fetching filter data:", error);
  //     }
  //   };
  //   fetchFilters();
  // }, []);

  const handleCategoryChange = (categoryId: number | undefined) => {
    setTempFilters((prev) => ({
      ...prev,
      categoryId,
    }));
  };

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

  const handlePriceChange = (minPrice?: number, maxPrice?: number) => {
    setTempFilters((prev) => ({
      ...prev,
      minPrice,
      maxPrice,
    }));
  };

  const handleApplyFilters = () => {
    onChange(tempFilters); // Apply the temporary filters
  };

  return (
    <div className="flex justify-center">
      <aside className="w-full sm:w-64 p-4 h-full bg-gray-50 rounded-md">
        <h3 className="text-lg font-bold mb-4 text-center">Filters</h3>

        {/* Category Dropdown */}
        <div className="mb-4">
          <label className="block mb-2 font-medium text-gray-700">
            Category
          </label>
          <select
            value={tempFilters.categoryId ?? ""}
            onChange={(e) =>
              handleCategoryChange(Number(e.target.value) || undefined)
            }
            className="block w-full p-2 border rounded text-sm"
          >
            <option value="">All Categories</option>
            {categories?.map((cat) => (
              <option key={cat.categoryId} value={cat.categoryId}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

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

        {/* Price Inputs */}
        <div className="mb-4 flex gap-4">
          <div className="w-1/2">
            <label className="block mb-2 font-medium text-gray-700">
              Min Price
            </label>
            <input
              type="number"
              value={tempFilters.minPrice ?? ""}
              onChange={(e) =>
                handlePriceChange(
                  Number(e.target.value) || undefined,
                  tempFilters.maxPrice
                )
              }
              className="block w-full p-2 border rounded text-sm"
            />
          </div>
          <div className="w-1/2">
            <label className="block mb-2 font-medium text-gray-700">
              Max Price
            </label>
            <input
              type="number"
              value={tempFilters.maxPrice ?? ""}
              onChange={(e) =>
                handlePriceChange(
                  tempFilters.minPrice,
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

export default FilterSidebar;
