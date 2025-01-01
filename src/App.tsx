import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from './ui/Navbar';
import Login from './features/authentication/pages/Login';
import Adoption from './features/adoption/pages/Adoption';
import Home from './pages/Home';
import Store from './features/store/pages/Store';
import Tips from './features/tips/pages/Tips';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CartFloatingButton from './ui/CartFloatingButton';
import { Provider } from "react-redux";
import store from "./redux/Store";
import Cart from "./pages/Cart";
import Profile from "./features/authentication/pages/Profile";

const queryClient = new QueryClient();

function App() {
  return (
    <Provider store={store}>
    <QueryClientProvider client={queryClient}>
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <CartFloatingButton/>
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/store" element={<Store />} />
            <Route path="/tips" element={<Tips />} />
            <Route path="/adoption" element={<Adoption />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>
      </div>
    </Router>
    </QueryClientProvider>
    </Provider>
  );
}

export default App;
