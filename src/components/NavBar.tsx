import React, { useState } from 'react';

function NavBar() {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <nav className="relative block w-full min-w-screen-xl px-6 py-3 mx-auto text-white bg-indigo-400 shadow-md bg-opacity-80 backdrop-blur-2xl backdrop-saturate-200">
      <div className="flex items-center justify-between text-blue-gray-900 flex-col lg:flex-row">
        <a href="#" className="mr-4 block cursor-pointer py-1.5 font-sans text-base font-semibold leading-relaxed tracking-normal text-inherit antialiased">
          Adriana Oliveira Fotos
        </a>
        {/* LG + */}
        <div className="hidden lg:block">
          <ul className="flex flex-col gap-2 my-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
            <li className="block p-1 font-sans text-sm antialiased font-medium leading-normal">
              <a href="#sobre-mim" className="flex items-center transition-colors hover:text-gray-300">
                Sobre mim
              </a>
            </li>
            <li className="block p-1 font-sans text-sm antialiased font-medium leading-normal">
              <a href="#servicos" className="flex items-center transition-colors hover:text-gray-300">
                Serviços
              </a>
            </li>
            <li className="block p-1 font-sans text-sm antialiased font-medium leading-normal">
              <a href="#depoimentos" className="flex items-center transition-colors hover:text-gray-300">
                Depoimentos
              </a>
            </li>
            <li className="block p-1 font-sans text-sm antialiased font-medium leading-normal">
              <a href="#precos" className="flex items-center transition-colors hover:text-gray-300">
                Preços
              </a>
            </li>
            <li className="block p-1 font-sans text-sm antialiased font-medium leading-normal">
              <a href="#contato" className="flex items-center transition-colors hover:text-gray-300">
                Contato
              </a>
            </li>
          </ul>
        </div>
        {/* LG or smaller */}
        <div
          className={`overflow-hidden lg:hidden transition-max-height duration-300 ease-in-out ${isCollapsed ? 'max-h-0' : 'max-h-64'}`}
        >
          <ul className="flex flex-col gap-2 my-2 lg:mb-0 lg:mt-0">
            <li className="block p-1 font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900">
              <a href="#sobre-mim" className="flex items-center transition-colors hover:text-blue-500">
                Sobre mim
              </a>
            </li>
            <li className="block p-1 font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900">
              <a href="#servicos" className="flex items-center transition-colors hover:text-blue-500">
                Serviços
              </a>
            </li>
            <li className="block p-1 font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900">
              <a href="#depoimentos" className="flex items-center transition-colors hover:text-blue-500">
                Depoimentos
              </a>
            </li>
            <li className="block p-1 font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900">
              <a href="#precos" className="flex items-center transition-colors hover:text-blue-500">
                Preços
              </a>
            </li>
            <li className="block p-1 font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900">
              <a href="#contato" className="flex items-center transition-colors hover:text-blue-500">
                Contato
              </a>
            </li>
          </ul>
        </div>
        <button
          className="absolute top-0 right-0 mt-2 mr-2 h-6 max-h-[40px] w-6 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-inherit transition-all hover:bg-transparent focus:bg-transparent active:bg-transparent disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none lg:hidden"
          type="button"
          onClick={toggleCollapse}
        >
          <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"
              aria-hidden="true" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"></path>
            </svg>
          </span>
        </button>
      </div>
    </nav>
  );
}

export default NavBar;
