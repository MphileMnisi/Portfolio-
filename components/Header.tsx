
import React, { useState, useEffect, RefObject } from 'react';
import { SunIcon, MoonIcon, RobotIcon } from './icons/Icons';
import Chatbot from './Chatbot';

interface NavRefs {
  [key: string]: RefObject<HTMLDivElement>;
}

interface HeaderProps {
  navRefs: NavRefs;
  theme: string;
  toggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ navRefs, theme, toggleTheme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

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
    { name: 'Home', ref: navRefs.home },
    { name: 'About', ref: navRefs.about },
    { name: 'Experience', ref: navRefs.experience },
    { name: 'Projects', ref: navRefs.projects },
    { name: 'Education', ref: navRefs.education },
    { name: 'Contact', ref: navRefs.contact },
  ];

  return (
    <>
      <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 dark:bg-secondary/80 backdrop-blur-sm shadow-lg' : 'bg-transparent'}`}>
        <div className="container mx-auto px-6 md:px-12 py-4">
          <div className="flex justify-between items-center">
            {/* Logo and Chat Trigger Section */}
            <div className="flex items-center">
                <button 
                    onClick={() => setIsChatOpen(!isChatOpen)}
                    className="flex items-center gap-2 bg-accent/10 hover:bg-accent/20 text-accent dark:text-accent font-medium px-3 py-1.5 rounded-full transition-all border border-accent/20 hover:border-accent hover:shadow-sm group"
                    aria-label="Ask AI Assistant"
                >
                    <RobotIcon className="w-5 h-5 group-hover:animate-bounce" />
                    <span className="hidden sm:inline text-sm">Ask AI</span>
                </button>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              {navLinks.map((link) => (
                <button 
                  key={link.name} 
                  onClick={() => scrollToSection(link.ref)} 
                  className="text-gray-700 dark:text-medium hover:text-accent font-medium transition-colors text-sm lg:text-base"
                >
                  {link.name}
                </button>
              ))}
              <button
                onClick={toggleTheme}
                className="text-gray-700 dark:text-medium hover:text-accent transition-colors"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <SunIcon className="w-6 h-6" /> : <MoonIcon className="w-6 h-6" />}
              </button>
            </nav>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button onClick={() => setIsOpen(!isOpen)} className="text-primary dark:text-light focus:outline-none">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Menu Dropdown */}
        <div className={`md:hidden ${isOpen ? 'block' : 'hidden'} bg-white dark:bg-secondary absolute w-full shadow-lg border-t dark:border-gray-700`}>
          <nav className="flex flex-col items-center py-4 space-y-4">
            {navLinks.map((link) => (
                <button 
                  key={link.name} 
                  onClick={() => scrollToSection(link.ref)} 
                  className="text-primary dark:text-light hover:text-accent font-medium transition-colors"
                >
                  {link.name}
                </button>
              ))}
              <button
                onClick={toggleTheme}
                className="text-primary dark:text-light hover:text-accent transition-colors mt-2"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <SunIcon className="w-8 h-8" /> : <MoonIcon className="w-8 h-8" />}
              </button>
          </nav>
        </div>
      </header>
      
      {/* Chatbot Component */}
      <Chatbot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </>
  );
};

export default Header;
