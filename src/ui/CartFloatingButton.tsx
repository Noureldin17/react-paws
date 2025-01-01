import React from 'react';
import { useSelector } from 'react-redux';
import { FaShoppingCart } from 'react-icons/fa';
import { RootState } from '../redux/Store';
import { useNavigate } from 'react-router-dom';

const CartFloatingButton: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const { loggedIn } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  if ((cartItems.length === 0 || !loggedIn) && cartItems.length === 0) return null;

  return (
    <div
      className="fixed bottom-8 right-8 bg-primary text-white z-50 rounded-full p-4 shadow-lg cursor-pointer"
      onClick={() => navigate('/cart')}
    >
      <FaShoppingCart size={24} />
      <span className="absolute top-0 right-0 bg-red-600 text-xs rounded-full h-5 w-5 flex items-center justify-center">
        {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
      </span>
    </div>
  );
};

export default CartFloatingButton;
