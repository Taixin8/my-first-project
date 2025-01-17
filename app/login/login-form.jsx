"use client";

import { useState } from "react";
import {loginUser} from "@/app/libs/apis/server";
//Client component
export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validateForm = () => {
    if (email) {
      setEmailError("");
    }

    if (password) {
      setPasswordError("");
    }

    if (!password && !email) {
      setEmailError("Email is required");
      setPasswordError("Password is required");
      return false;
    }

    if (!email) {
      setEmailError("Email is required");
      return false;
    }

    if (!password) {
      setPasswordError("Password is required");
      return false;
    }

    return true;
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    const isValid = validateForm();
    if (isValid) {
      //Login form data submission
      const login = await loginUser({email:email, password:password});

      console.log("LOGIN RESPONSE",login);
    }
  };

  return (
    <div className="w-[380px] mx-auto">
      <div className="bg-white shadow-md border border-gray-200 rounded-lg p-4">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/*Title*/}
          <h3 className="text-center text-xl font-semibold text-gray-900">
            Sign in to Evotech
          </h3>

          {/*Email*/}
          <div>
            <label
              htmlFor="email"
              className="text-sm text-gray-900 block mb-2 font-semibold"
            >
              Your email
            </label>

            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-gray-50 border border-gray-300 rounded-lg focus:ring-1 focus:ring-offset-1 text-gray-900 focus:ring-blue-500 black w-full p-2.5"
              placeholder="yourname@example.com"
            />
            {emailError && (
              <div className="text-red-500 text-sm">{emailError}</div>
            )}
          </div>

          {/*Password*/}
          <div>
            <label
              htmlFor="password"
              className="text-sm text-gray-900 block mb-2 font-semibold"
            >
              Your password
            </label>

            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-gray-50 border border-gray-300 rounded-lg focus:ring-1 focus:ring-offset-1 text-gray-900 focus:ring-blue-500 black w-full p-2.5"
              placeholder="Password"
            />

            {passwordError && (
              <div className="text-red-500 text-sm">{passwordError}</div>
            )}
          </div>

          <div className="flex items-center">
            <div className="space-x-2 flex items-center">
              <input
                type="checkbox"
                id="remember"
                className="bg-gray-50 border border-gray-300 focus:ring-3 focus:ring-blue-300 h-4 w-4 hover:cursor-pointer"
              />
              <label
                htmlFor="remember"
                className="font-medium text-gray-900 text-sm"
              >
                Remember me
              </label>
            </div>
            <a
              href="/forget-password"
              className="text-blue-500 text-sm hover:underline ml-auto font-semibold"
            >
              Forget Password?
            </a>
          </div>
          <div>
            <button
              type="submit"
              className="bg-blue-500 w-full rounded-lg h-9 text-white font-semibold hover:bg-blue-600"
            >
              Sign in
            </button>
          </div>
          <div className="flex items-center space-x-1">
            <p className="font-medium text-sm text-gray-500">
              Don't have a account yet?
            </p>
            <a
              href="/sign_up"
              className="text-sm text-blue-500 font-semibold hover:underline"
            >
              Sign up
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
