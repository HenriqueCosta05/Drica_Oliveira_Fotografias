import React from 'react';

interface NavbarProps {
  children: React.ReactNode;
  className?: string;
}

interface NavbarBrandProps {
  children: React.ReactNode;
  href?: string;
  className?: string;
}

interface NavbarMenuProps {
  children: React.ReactNode;
  className?: string;
}

interface NavbarItemProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  active?: boolean;
  className?: string;
}

interface NavbarToggleProps {
  onClick: () => void;
  isOpen?: boolean;
  className?: string;
}

interface NavbarCTAProps {
  className?: string;
  cta: {
    text: string;
    href: string;
  }
}

const NavbarRoot: React.FC<NavbarProps> = ({ children, className = '' }) => {
  return (
    <nav className={`flex items-center justify-between p-4 bg-white shadow-sm ${className}`}>
      {children}
    </nav>
  );
};

const NavbarBrand: React.FC<NavbarBrandProps> = ({ children, href, className = '' }) => {
  const content = (
    <div className={`text-xl font-bold text-gray-800 ${className}`}>
      {children}
    </div>
  );

  if (href) {
    return (
      <a href={href} className="no-underline">
        {content}
      </a>
    );
  }

  return content;
};

const NavbarMenu: React.FC<NavbarMenuProps> = ({ children, className = '' }) => {
  return (
    <div className={`hidden md:flex items-center space-x-6 ${className}`}>
      {children}
    </div>
  );
};

const NavbarItem: React.FC<NavbarItemProps> = ({ 
  children, 
  href, 
  onClick, 
  active = false, 
  className = '' 
}) => {
  const baseClasses = `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${className}`;
  const activeClasses = active 
    ? 'bg-secondary text-white hover:bg-secondary' 
    : 'text-gray-700 hover:text-secondary';

  const content = (
    <span className={`${baseClasses} ${activeClasses}`}>
      {children}
    </span>
  );

  if (href) {
    return (
      <a href={href} className="no-underline">
        {content}
      </a>
    );
  }

  if (onClick) {
    return (
      <button onClick={onClick} className="border-none bg-transparent cursor-pointer">
        {content}
      </button>
    );
  }

  return content;
};

const NavbarToggle: React.FC<NavbarToggleProps> = ({ 
  onClick, 
  isOpen = false, 
  className = '' 
}) => {
  return (
    <button
      onClick={onClick}
      className={`md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 ${className}`}
      aria-label="Toggle navigation menu"
    >
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        {isOpen ? (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        ) : (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        )}
      </svg>
    </button>
  );
};

const NavbarCTA = (Props: NavbarCTAProps) => {
  const { cta, className = '' } = Props;
  return (
    <a
      href={cta.href}
      className={`inline-block px-4 py-2 bg-primary text-white font-medium rounded-md hover:bg-primary-dark transition-colors duration-200 ${className}`}
    >
      {cta.text}
    </a>
  );
}

export const Navbar = Object.assign(NavbarRoot, {
  Brand: NavbarBrand,
  Menu: NavbarMenu,
  Item: NavbarItem,
  Toggle: NavbarToggle,
  CTA: NavbarCTA
});

export default Navbar;