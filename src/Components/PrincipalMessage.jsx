import React from 'react';


const PrincipalMessage = () => {
  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg md:flex md:flex-row">
      <div className="md:w-1/2">
        <img src={Image} alt="Principal" className="object-cover object-center rounded-lg rounded-r-none md:rounded-l-lg md:rounded-r-none md:w-full" />
      </div>
      <div className="p-8 md:w-1/2">
        <h2 className="text-2xl font-bold mb-2">Principal's Message</h2>
        <p className="text-gray-700 text-base mb-6">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed volutpat ante eu est bibendum elementum. Donec ac nisi quis nulla blandit venenatis.
        </p>
        <p className="text-gray-700 text-base mb-6">
          Vestibulum et pellentesque enim. Proin ac sodales libero, vitae porttitor risus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Aliquam varius ultrices justo.
        </p>
        <a href="/" className="text-white bg-blue-500 py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50">Read More</a>
      </div>
    </div>
  );
};

export default PrincipalMessage;
