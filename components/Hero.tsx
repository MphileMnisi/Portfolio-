
import React, { useState, useEffect, useMemo, useRef } from 'react';
import gsap from 'gsap';
import { DownloadIcon } from './icons/Icons';

const TYPING_SPEED = 150;
const DELETING_SPEED = 75;
const PAUSE_DURATION = 2000;

const Hero: React.FC = () => {
  const titles = useMemo(() => ["Nkosimphile Mnisi.", "a Software Developer."], []);
  const [titleIndex, setTitleIndex] = useState(0);
  const [subText, setSubText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Typing effect logic
  useEffect(() => {
    const handleTyping = () => {
      const currentTitle = titles[titleIndex];
      const nextSubText = isDeleting
        ? currentTitle.substring(0, subText.length - 1)
        : currentTitle.substring(0, subText.length + 1);
      
      setSubText(nextSubText);

      if (!isDeleting && nextSubText === currentTitle) {
        setTimeout(() => setIsDeleting(true), PAUSE_DURATION);
      } else if (isDeleting && nextSubText === '') {
        setIsDeleting(false);
        setTitleIndex((prev) => (prev + 1) % titles.length);
      }
    };

    const timeout = setTimeout(handleTyping, isDeleting ? DELETING_SPEED : TYPING_SPEED);
    return () => clearTimeout(timeout);
  }, [subText, isDeleting, titleIndex, titles]);

  // GSAP Animation Logic
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      const shapes = gsap.utils.toArray<HTMLElement>('.hero-shape');
      const buttons = gsap.utils.toArray<HTMLElement>('.hero-btn');

      // Initial Entrance Animation
      tl.from(contentRef.current, {
        y: 30,
        opacity: 0,
        duration: 1,
        delay: 0.2
      })
      .from(shapes, {
        y: 150,
        opacity: 0,
        scale: 0.5,
        rotation: 45,
        duration: 1.5,
        stagger: 0.2, // 200ms stagger
        ease: "back.out(1.7)"
      }, "-=0.8")
      .from(buttons, {
        y: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out"
      }, "-=1.0");

      // Continuous Floating Animation
      shapes.forEach((shape, i) => {
        gsap.to(shape, {
          y: `+=${15 + i * 5}`,
          rotation: `+=${5 + i * 3}`,
          duration: 3 + i * 0.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.2
        });
      });

      // Cursor-Responsive Parallax
      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const xPos = (clientX / window.innerWidth - 0.5) * 40;
        const yPos = (clientY / window.innerHeight - 0.5) * 40;

        gsap.to(shapes, {
          x: (i) => xPos * (i + 1) * 0.8,
          y: (i) => yPos * (i + 1) * 0.8,
          duration: 1,
          ease: "power2.out"
        });
      };

      window.addEventListener('mousemove', handleMouseMove);
      
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
      };
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center justify-center text-center overflow-hidden">
      {/* Background Shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
        {/* Shape 1: Top Left - Floating Cubeish */}
        <div className="hero-shape absolute top-[15%] left-[10%] w-20 h-20 md:w-32 md:h-32 bg-gradient-to-br from-accent/20 to-blue-500/20 rounded-2xl backdrop-blur-sm border border-white/10 shadow-lg"></div>
        
        {/* Shape 2: Bottom Right - Soft Sphere */}
        <div className="hero-shape absolute bottom-[20%] right-[10%] w-32 h-32 md:w-48 md:h-48 bg-gradient-to-tr from-purple-500/20 to-pink-500/20 rounded-full blur-sm"></div>
        
        {/* Shape 3: Top Right - Accent Ring */}
        <div className="hero-shape absolute top-[20%] right-[20%] w-16 h-16 md:w-24 md:h-24 border-4 border-accent/20 rounded-full dashed"></div>
        
        {/* Shape 4: Bottom Left - Small Tetrad */}
        <div className="hero-shape absolute bottom-[25%] left-[20%] w-12 h-12 md:w-16 md:h-16 bg-gradient-to-tl from-yellow-400/20 to-red-400/20 rotate-45 rounded-lg"></div>
        
        {/* Shape 5: Center Deep - Large Glow */}
        <div className="hero-shape absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/5 rounded-full blur-3xl -z-10"></div>
      </div>

      <div ref={contentRef} className="relative z-10 space-y-8 px-4 max-w-4xl mx-auto">
        <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight">
            <span className="block text-accent drop-shadow-sm">
                Hi, I'm{' '}
                <span className="text-primary dark:text-light whitespace-nowrap">
                {subText}
                <span className="animate-blink border-l-4 border-accent ml-1" aria-hidden="true"></span>
                </span>
            </span>
            </h1>
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-700 dark:text-gray-300 font-medium leading-relaxed bg-white/50 dark:bg-primary/50 backdrop-blur-sm p-4 rounded-xl shadow-sm">
            AI/ML engineer specializing in generative AI and cloud-based solutions, with a proven track record of building scalable tools that drive business growth. Passionate about applying machine learning to solve real-world challenges in healthcare and education.
            </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4">
            <button 
                onClick={scrollToProjects}
                className="hero-btn group relative px-8 py-3.5 bg-primary dark:bg-light text-white dark:text-primary font-bold rounded-full hover:shadow-lg hover:shadow-accent/30 hover:-translate-y-1 transition-all duration-300"
            >
                View My Work
            </button>
            
            <a 
                href="/resume.pdf" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hero-btn group relative inline-flex items-center gap-3 px-8 py-3.5 bg-white dark:bg-secondary text-primary dark:text-light font-bold rounded-full border-2 border-accent/20 hover:border-accent hover:shadow-lg hover:shadow-accent/20 hover:-translate-y-1 transition-all duration-300"
            >
                <DownloadIcon className="w-5 h-5 text-accent group-hover:animate-bounce" />
                <span>Download Resume</span>
                
                {/* Floating Badge for ATS Optimization */}
                <span className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-accent to-blue-500 text-white text-[10px] uppercase tracking-wider font-bold px-3 py-1 rounded-full shadow-md whitespace-nowrap">
                    ATS-Optimized
                </span>
            </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
