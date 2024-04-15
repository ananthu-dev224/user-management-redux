import React from 'react';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl text-gray-800 font-bold mb-6">404 - Page Not Found</h1>
      <div className="w-24 h-24 mb-6">
        <div className="relative w-full h-full">
          <div className="absolute w-1/2 h-1/2 bg-gray-800 rounded-full animate-ping"></div>
          <svg className="absolute w-full h-full text-gray-800 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </div>
      <p className="text-gray-800 text-center">The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.</p>
    </div>
  )
}

export default NotFound;
