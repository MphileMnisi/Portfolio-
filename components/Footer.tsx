import React from 'react';
import { GitHubIcon, LinkedInIcon, MailIcon } from './icons/Icons';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 dark:bg-secondary border-t border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-6 md:px-12 py-8 text-center text-gray-600 dark:text-medium">
        <div className="flex justify-center space-x-6 mb-4">
          <a href="mailto:nkosimphilem37@gmail.com" aria-label="Email" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors"><MailIcon className="w-6 h-6" /></a>
          <a href="https://github.com/MphileMnisi" aria-label="GitHub" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors"><GitHubIcon className="w-6 h-6" /></a>
          <a href="https://www.linkedin.com/in/nkosimphile-siyabonga-mnisi-0a9a33389/" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors"><LinkedInIcon className="w-6 h-6" /></a>
        </div>
        <p>&copy; {new Date().getFullYear()} Nkosimphile Mnisi. All Rights Reserved.</p>
        <p className="text-sm mt-2">Designed & Built by Nkosimphile Mnisi</p>
      </div>
    </footer>
  );
};

export default Footer;