import React from "react";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex-grow h-100" >
        <div className="bg-gray-100 py-16 px-4 sm:px-6 lg:px-8 h-100" style={{height:"100vh"}}>
          <div className="max-w-md mx-auto text-center">
            <h1 className="text-4xl font-extrabold text-gray-900">404 - Page Not Found</h1>
            <p className="mt-4 text-xl text-gray-600">
              The page you are looking for might have been removed, had its name changed, or is
              temporarily unavailable.
            </p>
            <div className="mt-8">
              <a
                href="/"
                className="text-base font-medium text-indigo-600 hover:text-indigo-500"
              >
                Go back home<span aria-hidden="true"> &rarr;</span>
              </a>
            </div>
          </div>
        </div>
      </div>
     
      </div>
      );
    };
    
    export default NotFoundPage;      