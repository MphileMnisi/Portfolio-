import React, { useState, useEffect, useMemo } from 'react';

const TYPING_SPEED = 150;
const DELETING_SPEED = 75;
const PAUSE_DURATION = 2000;

const Hero: React.FC = () => {
  const titles = useMemo(() => ["Nkosimphile Mnisi.", "a Software Developer."], []);
  const [titleIndex, setTitleIndex] = useState(0);
  const [subText, setSubText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const handleTyping = () => {
      const currentTitle = titles[titleIndex];
      const nextSubText = isDeleting
        ? currentTitle.substring(0, subText.length - 1)
        : currentTitle.substring(0, subText.length + 1);
      
      setSubText(nextSubText);

      if (!isDeleting && nextSubText === currentTitle) {
        // Finished typing, pause then start deleting
        setTimeout(() => setIsDeleting(true), PAUSE_DURATION);
      } else if (isDeleting && nextSubText === '') {
        // Finished deleting, move to next title
        setIsDeleting(false);
        setTitleIndex((prev) => (prev + 1) % titles.length);
      }
    };

    const timeout = setTimeout(handleTyping, isDeleting ? DELETING_SPEED : TYPING_SPEED);

    return () => clearTimeout(timeout);
  }, [subText, isDeleting, titleIndex, titles]);

  return (
    <section className="min-h-screen flex items-center justify-center text-center">
      <div className="space-y-6">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight">
          <span className="block text-accent">
            Hi, I'm{' '}
            <span className="text-primary dark:text-light whitespace-nowrap">
              {subText}
              <span className="animate-blink border-l-4 border-accent ml-1" aria-hidden="true"></span>
            </span>
          </span>
        </h1>
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-600 dark:text-medium">
          An ambitious Software Developer skilled in problem-solving and cutting-edge technologies like AI/ML. I thrive in collaborative environments, leveraging creativity and an eye for detail to build impactful, intelligent solutions.
        </p>
      </div>
    </section>
  );
};

export default Hero;