import React from 'react';

const Header = ({ onAddClick }) => {
  return (
    <header className="bg-gray-900 p-3 shadow-md sticky top-0 z-10">
      <div className="container flex items-center justify-between">
        <div className="flex items-center">
          <div className="relative h-8 w-8 mr-2">
            <img 
              src="/logo00.jpg" 
              alt="Snippy Logo" 
              className="h-full w-full rounded-full border border-blue-400 object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iIz60b3ZmZiI+PHBhdGggZD0iTTEyIDEyQzE0LjIxIDEyIDE2IDEwLjIxIDE2IDhTMTQuMjEgNCAxMiA0czQgMi4yNCA0IDRjMCAxLjIyLS41MyAyLjMtMS4zNSAzLjA3TDE0IDE1aC02djJoNnYtMWwxIDFoM3YtNmwtMi4wNC0yLjAzQzE5LjM2IDEwLjY5IDIwIDkuNDEgMjAgOGMwLTMuMzEtMS41Ny02LTYtNnMtOCAyLjY5LTggNmMwIDEuOS44NCAzLjU2IDIgNC41N1Y3SDh2MTBoNnYtMmgyVjE3YzAgLjU1LjQ1IDEgMSAxaDR2Mmgzdi00aC04LjI0YzQuNDUtMS4yNSA3LjI0LTUuNDIgNy4yNC0xMHoiLz48L3N2Zz4='
              }}
            />
          </div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-blue-500 bg-clip-text text-transparent">
            Snippy
          </h1>
        </div>
        <button
          onClick={onAddClick}
          className="btn btn-primary flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm hover:scale-105 transition-transform"
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