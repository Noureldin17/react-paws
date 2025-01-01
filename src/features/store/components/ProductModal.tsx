import React, { useState } from "react";
import { Product } from "../../../types/types";
import { FaPlus, FaMinus } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/slices/cartSlice";

interface ProductModalProps {
  product: Product;
  onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
}) => {

    const dispatch = useDispatch();

    const handleAddToCart = () => {
      if (quantity <= product.stockQuantity) {
        dispatch(
          addToCart({
            id: product.productId,
            name: product.name,
            price: product.price,
            quantity,
            image: product.images[0]?.data || '',
            stockQuantity: product.stockQuantity
          })
        );
        onClose();
      }
    };
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!product) return null;

//   const handleAddToCart = () => {
//     if (quantity <= product.stockQuantity) {
//       onAddToCart(product.productId, quantity);
//       onClose();
//     }
//   };

  const handleImageClick = (index: number) => {
    setCurrentImageIndex(index);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-3xl w-4/5 max-w-lg p-6 relative gap-4">
        {/* Image Section */}
        <div className="flex flex-col sm:flex-row justify-between sm:pe-8 pt-8 sm:p-0 sm:gap-4">
          {/* Main Image */}
          <div className="mb-4 w-full">
            <img
              src={`data:image/jpeg;base64,${product.images[currentImageIndex]?.data || ""}`}
              alt={product.name}
              className="h-64 w-full object-cover rounded-lg"
            />
          </div>
          {/* Vertical Thumbnails */}
          <div className="flex flex-col gap-2 items-center">
            {product.images.slice(0, 5).map((image, index) => (
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
        <div className="flex-grow">
          {/* Close Button */}
          <button
            className="absolute top-4 right-4 text-gray-600 text-xl font-bold"
            onClick={onClose}
          >
            ✕
          </button>

          {/* Product Details */}
          <h3 className="font-bold text-lg">{product.name}</h3>
          <p className="text-gray-700 text-sm mt-2">{product.description}</p>

          {/* Price and Quantity Selector */}
          <div className="flex items-center justify-between mt-4">
            <span className="font-semibold text-xl text-primary">${product.price.toFixed(2)}</span>
            <div className="flex items-center gap-2">
              <button
                className="px-2 py-2 bg-gray-200 text-gray-600 rounded-full"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                <FaMinus />
              </button>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
                className="w-8 text-center border rounded appearance-none"
                min="1"
                max={product.stockQuantity}
              />
              <button
                className="px-2 py-2 bg-gray-200 text-gray-600 rounded-full"
                onClick={() => setQuantity(Math.min(quantity + 1, product.stockQuantity))}
              >
                <FaPlus />
              </button>
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            className={`mt-6 w-full py-3 rounded-full text-white font-semibold ${
              quantity > product.stockQuantity
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-primary hover:bg-primary-dark"
            }`}
            onClick={handleAddToCart}
            disabled={quantity > product.stockQuantity}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
