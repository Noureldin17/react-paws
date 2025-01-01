import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/Store";
import { usePlaceOrder } from "../hooks/usePlaceOrder";
import { clearCart, removeFromCart, updateQuantity } from "../redux/slices/cartSlice";
import { FaPlus, FaMinus, FaRegTrashAlt } from "react-icons/fa";

const Cart: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  const { mutate: placeOrder, isLoading } = usePlaceOrder();

  // Calculate total price
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handlePlaceOrder = () => {
    if (cartItems.length === 0) return alert("Cart is empty");

    const orderDetails = cartItems.map((item) => ({
      productId: item.id,
      quantity: item.quantity,
    }));

    placeOrder(orderDetails, {
      onSuccess: () => {
        dispatch(clearCart());
        alert("Order placed successfully!");
      },
      onError: (err) => {
        console.error(err);
        alert("Failed to place order. Please try again.");
      },
    });
  };

  const handleRemoveItem = (itemId: number) => {
    dispatch(removeFromCart(itemId));
  };

  const handleUpdateQuantity = (id: number, newQuantity: number) => {
    dispatch(updateQuantity({ id, quantity: newQuantity }));
  };

  return (
    <div className="flex flex-col items-center h-screen bg-gray-50 p-4">
      <h2 className="text-3xl font-bold text-primary mb-6">Your Shopping Cart</h2>

      {cartItems.length === 0 ? (
        <p className="text-gray-600 text-lg">Your cart is empty</p>
      ) : (
        <div className="w-full max-w-3xl space-y-6">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between bg-white shadow-md p-4 rounded-lg"
            >
              {/* Product Image */}
              <div className="w-20 h-20 flex-shrink-0">
                <img
                //   src={item.image || temp}
                  src={`data:image/jpeg;base64,${item.image}`}
                  alt={item.name}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>

              {/* Product Details */}
              <div className="flex-grow px-4">
                <p className="text-lg font-semibold">{item.name}</p>
                <p className="text-gray-600">Price: ${item.price.toFixed(2)}</p>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center">
                <button
                  className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                  onClick={() =>
                    handleUpdateQuantity(item.id, item.quantity - 1)
                  }
                >
                  <FaMinus />
                </button>
                <span className="px-4 text-lg">{item.quantity}</span>
                <button
                  className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                  onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                >
                  <FaPlus />
                </button>
              </div>

              {/* Remove Item */}
              <button
                className="text-red-500 hover:text-red-700 ml-4"
                onClick={() => handleRemoveItem(item.id)}
              >
                <FaRegTrashAlt />
              </button>
            </div>
          ))}

          {/* Total Price */}
          <div className="flex justify-between items-center bg-white shadow-md p-4 rounded-lg">
            <p className="text-lg font-bold">Total Price:</p>
            <p className="text-xl font-semibold text-primary">
              ${totalPrice.toFixed(2)}
            </p>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 mt-6">
            <button
              onClick={() => dispatch(clearCart())}
              className="w-full px-4 py-2 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold"
              disabled={isLoading}
            >
              Clear Cart
            </button>
            <button
              onClick={handlePlaceOrder}
              className="w-full px-4 py-2 rounded-full bg-primary hover:bg-primary-dark text-white font-semibold"
              disabled={isLoading}
            >
              {isLoading ? "Placing Order..." : "Place Order"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
