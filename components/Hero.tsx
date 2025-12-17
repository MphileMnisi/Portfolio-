
import React, { useState, useEffect, useMemo, useRef } from 'react';
import gsap from 'gsap';
import { jsPDF } from "jspdf";
import { DownloadIcon, ChevronDownIcon, FilePdfIcon, FileWordIcon, FileXmlIcon } from './icons/Icons';
import { skillCategories } from './About';
import { experienceData } from './Experience';
import { educationData, certifications } from './Education';
import { projectsData } from './Projects';

const TYPING_SPEED = 150;
const DELETING_SPEED = 75;
const PAUSE_DURATION = 2000;

const Hero: React.FC = () => {
  const titles = useMemo(() => ["Nkosimphile Mnisi.", "a Machine Learning Engineer."], []);
  const [titleIndex, setTitleIndex] = useState(0);
  const [subText, setSubText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [showResumeMenu, setShowResumeMenu] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const floatingImageRef = useRef<HTMLDivElement>(null);
  const resumeMenuRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
        if (resumeMenuRef.current && !resumeMenuRef.current.contains(event.target as Node)) {
            setShowResumeMenu(false);
        }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Resume Data Generator
  const generateResumeData = () => {
    return {
        personalInfo: {
            name: "Nkosimphile Mnisi",
            role: "Software Developer & AI/ML Engineer",
            email: "nkosimphilem37@gmail.com",
            location: "South Africa",
            summary: "AI/ML engineer specializing in generative AI and cloud-based solutions, with a proven track record of building scalable tools that drive business growth. Passionate about applying machine learning to solve real-world challenges in healthcare and education.",
            links: [
                "https://github.com/MphileMnisi",
                "https://www.linkedin.com/in/nkosimphile-siyabonga-mnisi-0a9a33389/"
            ]
        },
        skills: skillCategories,
        experience: experienceData,
        education: educationData,
        certifications: certifications,
        projects: projectsData
    };
  };

  const handleDownloadPDF = (e: React.MouseEvent) => {
    e.preventDefault();
    const data = generateResumeData();
    const doc = new jsPDF();
    let yPos = 20;
    const margin = 20;
    const pageWidth = doc.internal.pageSize.getWidth();
    const contentWidth = pageWidth - (margin * 2);

    // Helper for text wrapping
    const addText = (text: string, size: number, isBold: boolean = false, color: string = '#000000') => {
        doc.setFontSize(size);
        doc.setTextColor(color);
        doc.setFont("helvetica", isBold ? "bold" : "normal");
        
        const splitText = doc.splitTextToSize(text, contentWidth);
        doc.text(splitText, margin, yPos);
        yPos += (splitText.length * (size / 2.5)) + 2;
    };

    const checkPageBreak = (heightNeeded: number = 20) => {
        if (yPos + heightNeeded > 280) {
            doc.addPage();
            yPos = 20;
        }
    };
    
    // Header
    addText(data.personalInfo.name, 22, true, '#1a202c');
    addText(data.personalInfo.role, 14, false, '#4fd1c5');
    yPos += 2;
    addText(data.personalInfo.email + " | " + data.personalInfo.location, 10, false, '#4a5568');
    yPos += 5;
    
    // Summary
    addText("Professional Summary", 14, true, '#1a202c');
    doc.setDrawColor(200, 200, 200);
    doc.line(margin, yPos-1, pageWidth-margin, yPos-1);
    addText(data.personalInfo.summary, 10, false, '#4a5568');
    yPos += 5;

    // Skills
    checkPageBreak(30);
    addText("Technical Skills", 14, true, '#1a202c');
    doc.line(margin, yPos-1, pageWidth-margin, yPos-1);
    data.skills.forEach(cat => {
         checkPageBreak(10);
         addText(`${cat.title}: ${cat.skills.join(", ")}`, 10, false, '#4a5568');
    });
    yPos += 5;

    // Experience
    checkPageBreak(30);
    addText("Professional Experience", 14, true, '#1a202c');
    doc.line(margin, yPos-1, pageWidth-margin, yPos-1);
    data.experience.forEach(exp => {
        checkPageBreak(30);
        addText(`${exp.role} at ${exp.company} (${exp.duration})`, 11, true, '#2d3748');
        exp.description.forEach(desc => {
             addText(`• ${desc}`, 10, false, '#4a5568');
        });
        yPos += 3;
    });
    yPos += 3;

    // Projects
    checkPageBreak(30);
    addText("Key Projects", 14, true, '#1a202c');
    doc.line(margin, yPos-1, pageWidth-margin, yPos-1);
    data.projects.slice(0, 3).forEach(proj => {
        checkPageBreak(25);
        addText(`${proj.title}`, 11, true, '#2d3748');
        addText(proj.description, 10, false, '#4a5568');
        yPos += 2;
    });
    yPos += 3;

    // Education
    checkPageBreak(30);
    addText("Education", 14, true, '#1a202c');
    doc.line(margin, yPos-1, pageWidth-margin, yPos-1);
    data.education.forEach(edu => {
        checkPageBreak(15);
        addText(`${edu.degree}`, 11, true, '#2d3748');
        addText(`${edu.institution} | ${edu.duration}`, 10, false, '#4a5568');
        yPos += 2;
    });

    doc.save("Nkosimphile_Mnisi_Resume.pdf");
    setShowResumeMenu(false);
  };

  const handleDownloadWord = (e: React.MouseEvent) => {
    e.preventDefault();
    const data = generateResumeData();
    const content = `
        <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
        <head><title>Resume</title></head>
        <body style="font-family: Arial, sans-serif; line-height: 1.5;">
            <h1 style="color: #1a202c; margin-bottom: 5px;">${data.personalInfo.name}</h1>
            <h3 style="color: #4fd1c5; margin-top: 0;">${data.personalInfo.role}</h3>
            <p style="color: #4a5568;">${data.personalInfo.email} | ${data.personalInfo.location}</p>
            <p><a href="${data.personalInfo.links[0]}">GitHub</a> | <a href="${data.personalInfo.links[1]}">LinkedIn</a></p>
            
            <hr style="border: 1px solid #e2e8f0;" />
            
            <h2 style="color: #1a202c;">Professional Summary</h2>
            <p style="color: #4a5568;">${data.personalInfo.summary}</p>
            
            <h2 style="color: #1a202c;">Technical Skills</h2>
            ${data.skills.map(cat => `<p style="margin-bottom: 5px;"><strong>${cat.title}:</strong> ${cat.skills.join(", ")}</p>`).join('')}
            
            <h2 style="color: #1a202c;">Experience</h2>
            ${data.experience.map(exp => `
                <div style="margin-bottom: 20px;">
                    <h3 style="margin-bottom: 5px; color: #2d3748;">${exp.role}</h3>
                    <p style="margin-top: 0; color: #4a5568;"><strong>${exp.company}</strong> | ${exp.duration}</p>
                    <ul style="color: #4a5568;">
                        ${exp.description.map(d => `<li>${d}</li>`).join('')}
                    </ul>
                </div>
            `).join('')}
            
            <h2 style="color: #1a202c;">Projects</h2>
             ${data.projects.map(proj => `
                <div style="margin-bottom: 15px;">
                    <p style="margin-bottom: 5px;"><strong>${proj.title}</strong></p>
                    <p style="margin-top: 0; color: #4a5568;">${proj.description}</p>
                </div>
            `).join('')}

            <h2 style="color: #1a202c;">Education</h2>
            ${data.education.map(edu => `
                <div style="margin-bottom: 10px;">
                    <p style="margin-bottom: 0;"><strong>${edu.degree}</strong></p>
                    <p style="margin-top: 0; color: #4a5568;">${edu.institution} (${edu.duration})</p>
                </div>
            `).join('')}
        </body>
        </html>
    `;
    
    const blob = new Blob(['\ufeff', content], {
        type: 'application/msword'
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Nkosimphile_Mnisi_Resume.doc';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setShowResumeMenu(false);
  };

  const handleDownloadXML = (e: React.MouseEvent) => {
    e.preventDefault();
    const data = generateResumeData();
    
    const escape = (str: string) => str.replace(/[<>&'"]/g, c => {
        switch(c) {
            case '<': return '&lt;';
            case '>': return '&gt;';
            case '&': return '&amp;';
            case '\'': return '&apos;';
            case '"': return '&quot;';
            default: return c;
        }
    });

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<Resume>
    <PersonalInfo>
        <Name>${escape(data.personalInfo.name)}</Name>
        <Role>${escape(data.personalInfo.role)}</Role>
        <Email>${escape(data.personalInfo.email)}</Email>
        <Location>${escape(data.personalInfo.location)}</Location>
        <Summary>${escape(data.personalInfo.summary)}</Summary>
    </PersonalInfo>
    <Skills>
        ${data.skills.map(cat => `
        <Category name="${escape(cat.title)}">
            ${cat.skills.map(s => `<Skill>${escape(s)}</Skill>`).join('')}
        </Category>`).join('')}
    </Skills>
    <Experience>
        ${data.experience.map(exp => `
        <Job>
            <Role>${escape(exp.role)}</Role>
            <Company>${escape(exp.company)}</Company>
            <Duration>${escape(exp.duration)}</Duration>
            <Responsibilities>
                ${exp.description.map(d => `<Item>${escape(d)}</Item>`).join('')}
            </Responsibilities>
        </Job>`).join('')}
    </Experience>
    <Projects>
        ${data.projects.map(proj => `
        <Project>
            <Title>${escape(proj.title)}</Title>
            <Description>${escape(proj.description)}</Description>
            <Technologies>${escape(proj.tags.join(', '))}</Technologies>
        </Project>`).join('')}
    </Projects>
    <Education>
        ${data.education.map(edu => `
        <Degree>
            <Title>${escape(edu.degree)}</Title>
            <Institution>${escape(edu.institution)}</Institution>
            <Year>${escape(edu.duration)}</Year>
        </Degree>`).join('')}
    </Education>
</Resume>`;

    const blob = new Blob([xml], { type: 'text/xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Nkosimphile_Mnisi_Resume.xml';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setShowResumeMenu(false);
  };

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
      
      // Floating Card Animation for the Image
      const floatCard = () => {
        if (!floatingImageRef.current) return;
        
        // Random positions within the viewport (avoiding the very center where text is)
        // We'll toggle between left and right sides or top/bottom corners
        const positions = [
          { top: '15%', left: '10%', rotation: -5 },
          { top: '20%', right: '10%', left: 'auto', rotation: 5 },
          { top: '65%', left: '15%', rotation: -3 },
          { top: '60%', right: '15%', left: 'auto', rotation: 3 }
        ];

        let currentPosIndex = 0;

        const animateToNextPos = () => {
          const pos = positions[currentPosIndex];
          const nextIndex = (currentPosIndex + 1) % positions.length;
          
          // Fade In & Move
          gsap.set(floatingImageRef.current, { 
            top: pos.top, 
            left: pos.left, 
            right: pos.right || 'auto',
            opacity: 0,
            scale: 0.8,
            rotation: pos.rotation - 10 // Start with extra rotation
          });

          const cardTl = gsap.timeline({
            onComplete: () => {
              currentPosIndex = nextIndex;
              // Schedule next appearance
              gsap.delayedCall(2, animateToNextPos);
            }
          });

          cardTl
            .to(floatingImageRef.current, {
              opacity: 1,
              scale: 1,
              rotation: pos.rotation,
              duration: 1,
              ease: "back.out(1.5)"
            })
            .to(floatingImageRef.current, {
              y: -10,
              duration: 2,
              ease: "sine.inOut",
              yoyo: true,
              repeat: 1
            }, "-=0.5")
            .to(floatingImageRef.current, {
              opacity: 0,
              scale: 0.8,
              y: 20,
              duration: 0.8,
              ease: "power2.in"
            }, "+=0.5");
        };

        animateToNextPos();
      };

      floatCard();

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
      
      {/* Floating Image Card */}
      <div 
        ref={floatingImageRef}
        className="absolute w-32 h-32 md:w-48 md:h-48 rounded-xl overflow-hidden shadow-2xl border-4 border-white/30 dark:border-white/10 z-0 pointer-events-none opacity-0"
        style={{ filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.2))' }}
      >
        <img 
          src="https://images.stockcake.com/public/c/6/1/c61942d7-9bc6-48a9-9683-5f5a71e87201_large/futuristic-ai-portrait-stockcake.jpg" 
          alt="Floating Decorative Element" 
          className="w-full h-full object-cover"
        />
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
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4">
            <button 
                onClick={scrollToProjects}
                className="hero-btn group relative px-8 py-3.5 bg-primary dark:bg-light text-white dark:text-primary font-bold rounded-full hover:shadow-lg hover:shadow-accent/30 hover:-translate-y-1 transition-all duration-300"
            >
                View My Work
            </button>
            
            <div className="relative hero-btn" ref={resumeMenuRef}>
                <button 
                    onClick={() => setShowResumeMenu(!showResumeMenu)}
                    className="group relative inline-flex items-center gap-3 px-8 py-3.5 bg-white dark:bg-secondary text-primary dark:text-light font-bold rounded-full border-2 border-accent/20 hover:border-accent hover:shadow-lg hover:shadow-accent/20 hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto justify-center"
                >
                    <DownloadIcon className="w-5 h-5 text-accent" />
                    <span>Download Resume</span>
                    <ChevronDownIcon className={`w-4 h-4 transition-transform duration-300 ${showResumeMenu ? 'rotate-180' : ''}`} />
                </button>

                {showResumeMenu && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-secondary rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden z-20 animate-fade-in flex flex-col">
                        <button 
                            onClick={handleDownloadPDF}
                            className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors text-left w-full"
                        >
                            <div className="p-2 bg-red-50 dark:bg-red-900/20 text-red-500 rounded-lg">
                                <FilePdfIcon className="w-5 h-5" />
                            </div>
                            <div className="flex flex-col">
                                <span className="font-bold text-sm text-primary dark:text-light">PDF Format</span>
                                <span className="text-[10px] text-gray-500">Best for Viewing</span>
                            </div>
                        </button>
                        <div className="h-px bg-gray-100 dark:bg-gray-700"></div>
                        <button 
                            onClick={handleDownloadWord}
                            className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors text-left w-full"
                        >
                            <div className="p-2 bg-blue-50 dark:bg-blue-900/20 text-blue-500 rounded-lg">
                                <FileWordIcon className="w-5 h-5" />
                            </div>
                            <div className="flex flex-col">
                                <span className="font-bold text-sm text-primary dark:text-light">Word Format</span>
                                <span className="text-[10px] text-gray-500">Editable Source</span>
                            </div>
                        </button>
                        <div className="h-px bg-gray-100 dark:bg-gray-700"></div>
                        <button 
                            onClick={handleDownloadXML}
                            className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors text-left w-full"
                        >
                            <div className="p-2 bg-orange-50 dark:bg-orange-900/20 text-orange-500 rounded-lg">
                                <FileXmlIcon className="w-5 h-5" />
                            </div>
                            <div className="flex flex-col">
                                <span className="font-bold text-sm text-primary dark:text-light">XML Format</span>
                                <span className="text-[10px] text-gray-500">Machine Readable</span>
                            </div>
                        </button>
                    </div>
                )}
            </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
