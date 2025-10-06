// src/components/AdminLogin.jsx
import React from "react";

const AdminLogin = () => {
  return (
    <div className="flex h-screen items-center justify-center bg-background-light dark:bg-background-dark font-display text-gray-800 dark:text-gray-200">
      <div className="w-full max-w-md rounded-xl bg-white/50 p-8 shadow-2xl backdrop-blur-sm dark:bg-background-dark/50">
        <div className="mb-8 text-center">
          <div className="inline-block rounded-full bg-primary/20 p-3">
            <svg
              className="h-10 w-10 text-primary"
              fill="none"
              viewBox="0 0 48 48"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 4H17.3334V17.3334H30.6666V30.6666H44V44H4V4Z"
                fill="currentColor"
              ></path>
            </svg>
          </div>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            AssetTrack
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Securely log in to your admin dashboard
          </p>
        </div>
        <form className="space-y-6">
          <div>
            <label
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              htmlFor="username"
            >
              Username
            </label>
            <div className="mt-1">
              <input
                autoComplete="username"
                className="block w-full rounded-lg border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 placeholder-gray-400 shadow-sm focus:border-primary focus:ring-primary dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500 dark:focus:border-primary dark:focus:ring-primary"
                id="username"
                name="username"
                placeholder="e.g. admin_user"
                required
                type="text"
              />
            </div>
          </div>
          <div>
            <label
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              htmlFor="password"
            >
              Password
            </label>
            <div className="mt-1">
              <input
                autoComplete="current-password"
                className="block w-full rounded-lg border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 placeholder-gray-400 shadow-sm focus:border-primary focus:ring-primary dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500 dark:focus:border-primary dark:focus:ring-primary"
                id="password"
                name="password"
                placeholder="••••••••"
                required
                type="password"
              />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary dark:border-gray-600 dark:bg-gray-700"
                id="remember-me"
                name="remember-me"
                type="checkbox"
              />
              <label
                className="ml-2 block text-sm text-gray-900 dark:text-gray-300"
                htmlFor="remember-me"
              >
                Remember me
              </label>
            </div>
            <div className="text-sm">
              <a
                className="font-medium text-primary hover:text-primary/80"
                href="#"
              >
                Forgot your password?
              </a>
            </div>
          </div>
          <div>
            <button
              className="flex w-full justify-center rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-background-dark"
              type="submit"
            >
              Log In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
