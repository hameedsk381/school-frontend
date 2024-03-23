import React, { useState } from 'react';
import { Transition } from '@headlessui/react';
import { FaBars } from 'react-icons/fa';
import { logos } from '../assets';

const SchoolWebsite = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navLinks = [
    { id: 1, title: 'Home', link: '#' },
    { id: 2, title: 'Admissions', link: '#' },
    { id: 3, title: 'Clubs', link: '#' },
    { id: 4, title: 'Academics', link: '#' },
    { id: 5, title: 'Faculty', link: '#' },
    { id: 6, title: 'About', link: '#' },
  ];

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <nav className="bg-white fixed top-0 left-0 right-0 z-50 transition duration-300 ease-in-out transform">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <img src={logos.logo2} alt="ChristTheKing School" className="w-10 h-10 mr-2" />
              <h1 className="text-xl font-bold">ChristTheKing School</h1>
            </div>
            <div className="hidden md:block">
              <ul className="flex space-x-4">
                {navLinks.map((navLink) => (
                  <li key={navLink.id}>
                    <a href={navLink.link} className="text-gray-500 hover:text-gray-900">
                      {navLink.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="md:hidden">
              <button
                className="text-gray-500 hover:text-gray-900 focus:outline-none focus:text-gray-900"
                onClick={toggleMenu}
              >
                <FaBars className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </nav>
      <div className="h-24 md:h-32"></div>
      <div className="relative">
        <img src="https://picsum.photos/id/1025/1200/400" alt="Banner" className="w-full h-full object-cover" />
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-t from-gray-900 via-gray-900 opacity-70"></div>
        <div className="absolute top-0 left-0 right-0 bottom-0 flex flex-col justify-center items-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white">Welcome to ChristTheKing School</h2>
          <p className="text-xl md:text-3xl text-gray-200">Where Education Meets Excellence</p>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8 md:py-16">
        <h3 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4 md:mb-8">What We Offer</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
          <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex items-center justify-center h-24 w-24 rounded-full bg-gray-100 shadow">
          <svg
                       xmlns="http://www.w3.org/2000/svg"
                       className="h-12 w-12 text-gray-400"
                       viewBox="0 0 20 20"
                       fill="currentColor"
                     >
          <path
                         fillRule="evenodd"
                         d="M9.293 3.293a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 6.414V15a1 1 0 01-2 0V6.414L3.707 10.707a1 1 0 01-1.414-1.414l6-6z"
                         clipRule="evenodd"
                       />
          </svg>
          </div>
          <h4 className="text-lg md:text-xl font-bold mt-4">Quality Education</h4>
          <p className="text-gray-500 mt-2">
          Our teachers and staff are dedicated to providing a high-quality education to our students, and we're
          committed to continuous improvement.
          </p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex items-center justify-center h-24 w-24 rounded-full bg-gray-100 shadow">
          <svg
                       xmlns="http://www.w3.org/2000/svg"
                       className="h-12 w-12 text-gray-400"
                       viewBox="0 0 20 20"
                       fill="currentColor"
                     >
          <path
                         fillRule="evenodd"
                         d="M6.707 6.707a1 1 0 011.414 0L10 8.586l1.879-1.88a1 1 0 011.414 1.415l-2.586 2.586a1 1 0 01-1.414 0L8.586 9.414 6.707 7.536a1 1 0 010-1.414z"
                         clipRule="evenodd"
                       />
          <path
                         fillRule="evenodd"
                         d="M6.707 10.121a1 1 0 011.414 0L10 12l1.879-1.879a1 1 0 011.414 1.414l-2.586 2.586a1 1 0 01-1.414 0L8.586 13.414 6.707 11.536a1 1 0 010-1.414z"
                         clipRule="evenodd"
                       />
          <path
                         fillRule="evenodd"
                         d="M3.879 3.879a1 1 0 011.414 0L8 6.586l1.879-1.88a1 1 0 011.414 1.415L8.414 8l2.586 2.586a1 1 0 01-1.414 1.414L7 9.414l-1.879 1.879a1 1 0 01-1.414-1.414L5.586 8 3.879 6.293a1 1 0 010-1.414z"
                         clipRule="evenodd"
                       />
          <path
          fillRule="evenodd"
          d="M9.707 14.707a1 1 0 01-1.414 0L6 11.414l-1.879 1.879a1 1 0 01-1.414-1.414l2.586-2.586a1 1 0 011.414 0L8 9.586l2.879-2.879a1 1 0 011.414 1.414L9.414 11l2.293 2.293a1 1 0 010 1.414z"
          clipRule="evenodd"
          />
          </svg>
          </div>
          <h4 className="text-lg md:text-xl font-bold mt-4">Enriching Clubs</h4>
          <p className="text-gray-500 mt-2">
          Our school offers a wide range of enriching clubs and activities to help our students discover and develop
          their passions and interests.
          </p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex items-center justify-center h-24 w-24 rounded-full bg-gray-100 shadow">
          <svg
                       xmlns="http://www.w3.org/2000/svg"
                       className="h-12 w-12 text-gray-400"
                       viewBox="0 0 20 20"
                       fill="currentColor"
                     >
          <path
                         fillRule="evenodd"
                         d="M9 2a1 1 0 011 1v1h1a1 1 0 110 2H9v1a1 1 0 11-2 0V6H6a1 1 0 110-2h1V3a1 1 0 011-1zM6 14a1 1 0 011-1v-1h1a1 1 0 110 2H8v1a1 1 0 11-2 0v-1H6a1 1 0 01-1-1zM14 6a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0V9h-1a1 1 0 01-1-1V7a1 1 0 011-1zM10 14a1 1 0 011-1v-1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1H10z"
                         clipRule="evenodd"
                       />
          </svg>
          </div>
          <h4 className="text-lg md:text-xl font-bold mt-4">Excellent Faculty</h4>
          <p className="text-gray-500 mt-2">
          Our experienced and dedicated faculty are committed to providing a supportive and engaging learning
          environment for all of our students.
          </p>
          </div>
          </div>
          </div>
          </div>
          );
          }
          
          export default SchoolWebsite;
