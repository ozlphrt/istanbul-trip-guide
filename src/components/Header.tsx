import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="px-4 sm:px-6 pt-5 pb-3 max-w-6xl w-full mx-auto flex items-baseline justify-between select-none">
      <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
        Istanbul
      </h1>
      <p className="text-sm sm:text-base text-slate-300 font-extrabold tracking-tight">
        22–26 September 2026
      </p>
    </header>
  );
};
