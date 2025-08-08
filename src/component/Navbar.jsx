import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-slate-900 text-white fixed top-0 left-0 w-full z-50 shadow-md">
      <div className="mycontainer flex justify-between items-center py-5 px-4 h-14">
        <div className="logo font-bold text-white text-2xl">
          <span className="text-green-500">&lt;</span>
          Pass
          <span className="text-green-500">OP/&gt;</span>
        </div>

        <button className="flex gap-3 items-center justify-center">
          <img className="invert bg-green-600" src="icons/download.png" alt="" />
          <span className="hidden md:block font-bold">GitHub</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
