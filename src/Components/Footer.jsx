import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#2196f3] text-gray-100 py-4">
      <div className="container mx-auto flex justify-between items-center px-5">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} ChristTheKing School
        </p>
        <div className="flex flex-col items-end space-y-2 px-5">
          <p className="text-sm">Website designed and created by:</p>
          <a href="https://example.com" className="text-sm hover:text-gray-400">Hameedullah Shaik</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
