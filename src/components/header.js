import React from 'react';
import logo from '../assets/logo00.jpg'; // Importa il logo originale

const Header = ({ onAddClick }) => {
  return (
    <header className="bg-gray-900 p-3 shadow-md sticky top-0 z-10">
      <div className="container flex items-center justify-between">
        <div className="flex items-center gap-4 group cursor-pointer">
          <div className="relative h-24 w-24">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-full blur-lg group-hover:blur-xl transition-all duration-500 group-hover:scale-110"></div>
            <div className="relative h-full w-full bg-gradient-to-br from-gray-800 to-gray-900 rounded-full p-2 border border-blue-500/30 group-hover:border-blue-400/50 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-blue-500/25">
              <img 
                src={logo}
                alt="Snippi Logo" 
                className="object-contain h-full w-full transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 filter drop-shadow-lg"
              />
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-green-400 to-blue-500 rounded-full animate-pulse opacity-80"></div>
          </div>
          <div className="hidden sm:block">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent group-hover:from-blue-300 group-hover:via-purple-400 group-hover:to-cyan-300 transition-all duration-500">
               Snippi
             </h1>
            <p className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors duration-300 font-medium tracking-wide">
              Code Snippet Manager
            </p>
          </div>
        </div>
        <button
          onClick={onAddClick}
          className="btn btn-primary flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 smooth-hover"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 sm:h-4 sm:w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          <span>Nuovo Snippet</span>
        </button>
      </div>
    </header>
  );
};

export default Header;