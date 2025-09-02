import React, { useState, useEffect } from 'react';
import { useNavigation } from '../hooks/useNavigation.js';

interface NavbarProps {
  children: React.ReactNode;
  className?: string;
  fixed?: boolean;
}

interface NavbarBrandProps {
  children: React.ReactNode;
  href?: string;
  className?: string;
}

interface NavbarMenuProps {
  children: React.ReactNode;
  className?: string;
  isOpen?: boolean;
  activeSection?: string;
}

interface NavbarItemProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  active?: boolean;
  className?: string;
}

interface NavbarToggleProps {
  onClick?: () => void;
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

const NavbarRoot: React.FC<NavbarProps> = ({ children, className = '', fixed = false }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { activeSection } = useNavigation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isMenuOpen && !target.closest('nav')) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMenuOpen]);

  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscapeKey);
    return () => document.removeEventListener('keydown', handleEscapeKey);
  }, [isMenuOpen]);

  useEffect(() => {
    const handleCloseMobileMenu = () => {
      setIsMenuOpen(false);
    };

    document.addEventListener('closeMobileMenu', handleCloseMobileMenu);
    return () => document.removeEventListener('closeMobileMenu', handleCloseMobileMenu);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const baseClasses = "transition-all duration-300 ease-in-out z-50 w-full";
  const fixedClasses = fixed ? "fixed top-0 left-0 right-0" : "";
  const scrolledClasses = isScrolled && fixed
    ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100"
    : "bg-white";

  return (
    <>
      {isMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      <nav className={`${baseClasses} ${fixedClasses} ${scrolledClasses} ${className}`}>
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16 lg:h-20">
            {React.Children.map(children, (child) => {
              if (React.isValidElement(child)) {
                const childProps = child.props as any;
                const childType = child.type as any;

                if (childType === NavbarToggle) {
                  return React.cloneElement(child, {
                    ...childProps,
                    onClick: () => setIsMenuOpen(!isMenuOpen),
                    isOpen: isMenuOpen,
                  });
                }

                if (childType === NavbarMenu) {
                  return React.cloneElement(child, {
                    ...childProps,
                    isOpen: isMenuOpen,
                    activeSection,
                  });
                }
              }
              return child;
            })}
          </div>
        </div>
      </nav>
    </>
  );
};

const NavbarBrand: React.FC<NavbarBrandProps> = ({ children, href, className = '' }) => {
  const content = (
    <div className={`flex items-center space-x-2 sm:space-x-3 text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 hover:text-primary transition-colors duration-200 ${className}`}>
      {children}
    </div>
  );

  if (href) {
    return (
      <a href={href} className="no-underline group flex-shrink-0">
        {content}
      </a>
    );
  }

  return content;
};

const NavbarMenu: React.FC<NavbarMenuProps> = ({ children, className = '', isOpen = false, activeSection = '' }) => {
  return (
    <>
      <div className={`hidden lg:flex items-center space-x-6 xl:space-x-8 ${className}`}>
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            const childElement = child as React.ReactElement<NavbarItemProps>;
            const href = childElement.props.href;
            const sectionId = href?.replace('#', '') || '';
            const isActive = sectionId === activeSection;
            return React.cloneElement(childElement, {
              ...childElement.props,
              active: isActive,
            });
          }
          return child;
        })}
      </div>

      <div className={`lg:hidden fixed top-14 sm:top-16 left-0 right-0 bg-white border-t border-gray-100 shadow-xl z-50 transition-all duration-300 ease-in-out transform ${isOpen
        ? 'opacity-100 translate-y-0 visible max-h-screen'
        : 'opacity-0 -translate-y-4 invisible max-h-0'
        }`}>
        <div className="px-4 sm:px-6 py-4 sm:py-6 space-y-3 sm:space-y-4 max-w-7xl mx-auto overflow-hidden">
          {React.Children.map(children, (child, index) => {
            if (React.isValidElement(child)) {
              const childElement = child as React.ReactElement<NavbarItemProps>;
              const href = childElement.props.href;
              const sectionId = href?.replace('#', '') || '';
              const isActive = sectionId === activeSection;
              return (
                <div key={index} className="block">
                  {React.cloneElement(childElement, {
                    ...childElement.props,
                    active: isActive,
                  })}
                </div>
              );
            }
            return (
              <div key={index} className="block">
                {child}
              </div>
            );
          })}

          <div className="pt-4 sm:pt-6 border-t border-gray-100 lg:hidden">
            <div className="mobile-cta-placeholder"></div>
          </div>
        </div>
      </div>
    </>
  );
};

const NavbarItem: React.FC<NavbarItemProps> = ({
  children,
  href,
  onClick,
  active = false,
  className = ''
}) => {
  const baseClasses = `relative px-3 py-2 sm:px-4 sm:py-2 lg:px-3 lg:py-2 rounded-lg text-sm sm:text-base font-medium transition-all duration-200 group ${className}`;
  const activeClasses = active
    ? 'text-primary bg-primary/10'
    : 'text-gray-700 hover:text-primary hover:bg-primary/5';

  const content = (
    <span className={`${baseClasses} ${activeClasses} block lg:inline-block`}>
      {children}
      <span className="absolute bottom-1 left-1/2 w-0 h-0.5 bg-primary transition-all duration-200 group-hover:w-full group-hover:left-0 hidden lg:block" />
    </span>
  );

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
    const event = new CustomEvent('closeMobileMenu');
    document.dispatchEvent(event);
  };

  if (href) {
    return (
      <a href={href} className="no-underline block lg:inline-block" onClick={handleClick}>
        {content}
      </a>
    );
  }

  if (onClick) {
    return (
      <button onClick={handleClick} className="border-none bg-transparent cursor-pointer w-full text-left lg:w-auto lg:text-center">
        {content}
      </button>
    );
  }

  return content;
};

const NavbarToggle: React.FC<NavbarToggleProps> = ({
  onClick = () => { },
  isOpen = false,
  className = ''
}) => {
  return (
    <button
      onClick={onClick}
      className={`lg:hidden p-1.5 sm:p-2 rounded-lg text-gray-600 hover:text-primary hover:bg-primary/5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/20 ${className}`}
      aria-label="Toggle navigation menu"
      aria-expanded={isOpen}
    >
      <div className="w-5 h-5 sm:w-6 sm:h-6 flex flex-col justify-center items-center">
        <span className={`block w-full h-0.5 bg-current transition-all duration-200 ${isOpen ? 'rotate-45 translate-y-0.5' : '-translate-y-1'
          }`} />
        <span className={`block w-full h-0.5 bg-current transition-all duration-200 ${isOpen ? 'opacity-0' : 'opacity-100'
          }`} />
        <span className={`block w-full h-0.5 bg-current transition-all duration-200 ${isOpen ? '-rotate-45 -translate-y-0.5' : 'translate-y-1'
          }`} />
      </div>
    </button>
  );
};

const NavbarCTA = (Props: NavbarCTAProps) => {
  const { cta, className = '' } = Props;

  useEffect(() => {
    const handleMobileCTA = () => {
      const placeholder = document.querySelector('.mobile-cta-placeholder');
      if (placeholder) {
        placeholder.innerHTML = `
          <a
            href="${cta.href}"
            class="w-full inline-flex items-center justify-center px-4 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-all duration-200 shadow-md hover:shadow-lg"
          >
            <span>${cta.text}</span>
            <svg class="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        `;
      }
    };

    handleMobileCTA();
  }, [cta]);

  return (
    <div className="hidden lg:flex items-center space-x-4">
      <a
        href={cta.href}
        className={`inline-flex items-center px-4 py-2 lg:px-6 lg:py-2.5 xl:px-8 xl:py-3 bg-primary text-white font-semibold rounded-full hover:bg-primary-dark transform hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm lg:text-base ${className}`}
      >
        <span className="whitespace-nowrap">{cta.text}</span>
        <svg className="ml-2 w-3 h-3 lg:w-4 lg:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </a>
    </div>
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