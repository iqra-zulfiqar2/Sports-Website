import React from 'react';
import { auth, provider } from "../../notifications/firebase";
import { signInWithPopup } from "firebase/auth";
import Cookies from 'universal-cookie';
import { FaGoogle } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';

const cookies = new Cookies();

const Auth = ({ setIsAuth, onClose }) => {
  const SignInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);

      const fullName = result.user.displayName || "";
      const firstName = fullName.split(" ")[0]; // 🧠 Extract first name

      // Store both token and first name in cookies
      cookies.set("auth-token", result.user.refreshToken);
      cookies.set("first-name", firstName); // ✅ Save first name

      setIsAuth(true);

      if (onClose) onClose(); // Optional: close modal after successful login
    } catch (err) {
      console.error("Google Sign-in failed:", err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black opacity-80"></div>

      {/* Modal Content */}
      <div className="relative bg-black px-6 py-6 rounded-2xl shadow-2xl text-center w-96 border border-gray-800 z-10">
        {/* Close Button */}
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-white hover:text-gray-300 text-2xl"
          >
            <IoClose />
          </button>
        )}

        {/* Title */}
        <h2 className="text-2xl font-semibold text-white mb-4">
          Sign in with Google to Continue
        </h2>

        {/* Sign-in Button */}
        <button
          onClick={SignInWithGoogle}
          className="w-full flex items-center justify-center gap-3 bg-white text-black text-lg font-semibold py-3 px-6 rounded-lg transition-colors duration-200 shadow-md"
        >
          <FaGoogle size={24} color="#4285F4" />
          Sign In With Google
        </button>
      </div>
    </div>
  );
};

export default Auth;
