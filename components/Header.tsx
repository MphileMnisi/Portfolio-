import React, { useState, useEffect, RefObject } from 'react';

interface NavRefs {
  [key: string]: RefObject<HTMLDivElement>;
}

interface HeaderProps {
  navRefs: NavRefs;
}

const Header: React.FC<HeaderProps> = ({ navRefs }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (ref: RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
    setIsOpen(false);
  };
  
  const navLinks = [
    { name: 'About', ref: navRefs.about },
    { name: 'Projects', ref: navRefs.projects },
    { name: 'Experience', ref: navRefs.experience },
    { name: 'Education', ref: navRefs.education },
    { name: 'Contact', ref: navRefs.contact },
  ];

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-secondary/80 backdrop-blur-sm shadow-lg' : 'bg-transparent'}`}>
      <div className="container mx-auto px-6 md:px-12 py-4">
        <div className="flex justify-between items-center">
          <div 
            className="text-2xl font-bold cursor-pointer text-accent hover:text-light transition-colors"
            onClick={() => scrollToSection(navRefs.home)}
          >
            Software Developer<span className="text-light">.</span>
          </div>
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <button 
                key={link.name} 
                onClick={() => scrollToSection(link.ref)} 
                className="text-medium hover:text-accent font-medium transition-colors"
              >
                {link.name}
              </button>
            ))}
          </nav>
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-light focus:outline-none">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'} bg-secondary absolute w-full`}>
        <nav className="flex flex-col items-center py-4 space-y-4">
          {navLinks.map((link) => (
              <button 
                key={link.name} 
                onClick={() => scrollToSection(link.ref)} 
                className="text-light hover:text-accent font-medium transition-colors"
              >
                {link.name}
              </button>
            ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
