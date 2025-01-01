import React, { useState } from "react";
import { Product } from "../../../types/types";
import ProductModal from "./ProductModal"; // Assuming this component exists

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  return (
    <>
      {/* Product Card */}
      <div
        className="border rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
        onClick={handleOpenModal}
      >
        {/* Product Image */}
        {product.images.length > 0 ? (
          <img
            src={`data:image/jpeg;base64,${product.images[0].data}`}
            alt={product.name}
            className="h-32 w-full object-cover rounded"
          />
        ) : (
          <div className="h-32 w-full bg-gray-200 rounded" />
        )}

        {/* Product Info */}
        <div className="mt-2">
          <h3
            className="font-semibold text-sm text-gray-800 truncate"
            style={{ maxHeight: "1.5em", overflow: "hidden", textOverflow: "ellipsis" }}
          >
            {product.name}
          </h3>
          <p
            className="text-gray-600 text-xs truncate"
            style={{ maxHeight: "1.5em", overflow: "hidden", textOverflow: "ellipsis" }}
          >
            {product.description}
          </p>
          <p className="text-primary font-bold text-sm mt-2">${product.price.toFixed(2)}</p>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <ProductModal
          product={product}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};

export default ProductCard;
