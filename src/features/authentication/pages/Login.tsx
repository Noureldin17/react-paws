import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useLogin,useSignUp } from "../../../hooks/useAuthentication";  // Custom hook for signIn

interface AuthValidationErrors{
  firstName?: string,
  lastName?: string,
  email?: string,
  password?: string,
  confirmPassword?: string,
}

const Login = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [validationErrors, setValidationErrors] = useState<AuthValidationErrors>({});

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    clearFields();
    setValidationErrors({})
  };

  const clearFields = () => {
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setFirstName("");
    setLastName("");
  };

  const { mutateAsync: loginUser } = useLogin();  // useMutation hook for signIn
  const { mutateAsync: registerUser } = useSignUp();  // useMutation hook for signUp

  const validateInputs = () => {
    let errors: AuthValidationErrors = {};
    let isValid = true;

    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      errors.email = "Please enter a valid email.";
      isValid = false;
    }

    if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(password)) {
      errors.password = "Password must be at least 6 characters long and contain both letters and numbers.";
      // isValid = false;
    }

    if (!isLogin && password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match.";
      isValid = false;
    }

    if (!isLogin && !firstName.trim()) {
      errors.firstName = "First name is required.";
      isValid = false;
    }

    if (!isLogin && !lastName.trim()) {
      errors.lastName = "Last name is required.";
      isValid = false;
    }

    setValidationErrors(errors);
    return isValid;
  };

  const handleLogin = async () => {
    setLoading(true);
    setErrorMessage("");
    try {
      await loginUser({ email, password });
      setLoading(false);
      navigate("/");
    } catch (error) {
      setErrorMessage(error.message || "An error occurred");
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    setLoading(true);
    setErrorMessage("");
    try {
      await registerUser({ firstName, lastName, email, password });
      setIsLogin(true); // Switch to login after successful registration
    } catch (error) {
      setErrorMessage("Failed to register. Please try again.");
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateInputs()) {
      if (isLogin) handleLogin();
      else handleRegister();
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] bg-cream p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-lg space-y-6">
        <h2 className="text-3xl font-bold text-primary text-center">
          {isLogin ? "Login to Your Account" : "Create an Account"}
        </h2>

        {errorMessage && (
          <div className="bg-red-100 text-red-700 p-3 rounded-lg text-center">
            {errorMessage}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="flex gap-4">
              <div className="w-1/2">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="first-name">
                  First Name
                </label>
                <input
                  id="first-name"
                  className="w-full px-4 py-2 rounded-full border focus:outline-none focus:border-primary"
                  placeholder="First name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                {validationErrors.firstName && (
                  <p className="text-red-500 text-sm mt-1">{validationErrors.firstName}</p>
                )}
              </div>
              <div className="w-1/2">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="last-name">
                  Last Name
                </label>
                <input
                  id="last-name"
                  className="w-full px-4 py-2 rounded-full border focus:outline-none focus:border-primary"
                  placeholder="Last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
                {validationErrors.lastName && (
                  <p className="text-red-500 text-sm mt-1">{validationErrors.lastName}</p>
                )}
              </div>
            </div>
          )}

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email Address
            </label>
            <input
              id="email"
              className="w-full px-4 py-2 rounded-full border focus:outline-none focus:border-primary"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {validationErrors.email && <p className="text-red-500 text-sm mt-1">{validationErrors.email}</p>}
          </div>

          <div className="relative">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <div className="relative flex items-center">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className="w-full px-4 py-2 pr-10 rounded-full border focus:outline-none focus:border-primary"
                placeholder="Your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div
                className="absolute right-3 cursor-pointer text-gray-600"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
            {validationErrors.password && (
              <p className="text-red-500 text-sm mt-1">{validationErrors.password}</p>
            )}
          </div>

          {!isLogin && (
            <div className="relative">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirm-password">
                Confirm Password
              </label>
              <div className="relative flex items-center">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirm-password"
                  className="w-full px-4 py-2 pr-10 rounded-full border focus:outline-none focus:border-primary"
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <div
                  className="absolute right-3 cursor-pointer text-gray-600"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
              {validationErrors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">{validationErrors.confirmPassword}</p>
              )}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full ${loading ? "bg-gray-400" : "bg-primary"} text-white py-2 px-4 rounded-full transition duration-300 hover:bg-[#D77A48] font-bold`}
          >
            {loading ? "Please wait..." : isLogin ? "Login" : "Register"}
          </button>
        </form>

        <div className="text-center">
          {isLogin ? (
            <>
              <p className="text-gray-600">Don't have an account?</p>
              <button onClick={toggleAuthMode} className="text-primary font-bold hover:underline">
                Create an account
              </button>
            </>
          ) : (
            <>
              <p className="text-gray-600">Already have an account?</p>
              <button onClick={toggleAuthMode} className="text-primary font-bold hover:underline">
                Login
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
