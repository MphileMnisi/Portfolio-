
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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
        if (resumeMenuRef.current && !resumeMenuRef.current.contains(event.target as Node)) {
            setShowResumeMenu(false);
        }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const generateResumeData = () => {
    return {
        personalInfo: {
            name: "Nkosimphile Mnisi",
            role: "Software Developer & AI/ML Engineer",
            email: "nkosimphilem37@gmail.com",
            phone: "+27 (0) 00 000 0000",
            location: "Gauteng, South Africa",
            summary: "Ambitious Machine Learning Engineer and Full-Stack Developer with deep expertise in Generative AI, Cloud-Native Architectures, and NLP. Proven track record in designing scalable AI-driven solutions including BERT-based sentiment analyzers and semantic matching engines. Committed to ethical AI and high-fidelity user experiences.",
            links: [
                { name: "GitHub", url: "https://github.com/MphileMnisi" },
                { name: "LinkedIn", url: "https://www.linkedin.com/in/nkosimphile-siyabonga-mnisi-0a9a33389/" }
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
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const sidebarWidth = 65;
    const margin = 10;
    const contentMargin = sidebarWidth + margin;
    let yPos = 20;

    // Drawing Sidebar
    doc.setFillColor(245, 247, 250); // Light Gray
    doc.rect(0, 0, sidebarWidth, pageHeight, 'F');
    
    // Sidebar Content - Contact
    doc.setFontSize(14);
    doc.setTextColor(26, 32, 44);
    doc.setFont("helvetica", "bold");
    doc.text("CONTACT", margin, yPos);
    yPos += 8;
    
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(74, 85, 104);
    doc.text(data.personalInfo.email, margin, yPos); yPos += 5;
    doc.text(data.personalInfo.location, margin, yPos); yPos += 5;
    data.personalInfo.links.forEach(link => {
        doc.text(link.name + ": " + link.url.replace('https://', ''), margin, yPos, { maxWidth: sidebarWidth - margin * 2 });
        yPos += 7;
    });

    // Sidebar Content - Skills
    yPos += 10;
    doc.setFontSize(14);
    doc.setTextColor(26, 32, 44);
    doc.setFont("helvetica", "bold");
    doc.text("EXPERTISE", margin, yPos);
    yPos += 8;
    
    data.skills.forEach(cat => {
        doc.setFontSize(10);
        doc.setTextColor(79, 209, 197); // Accent color
        doc.setFont("helvetica", "bold");
        doc.text(cat.title, margin, yPos, { maxWidth: sidebarWidth - margin * 2 });
        yPos += 5;
        doc.setFontSize(8);
        doc.setTextColor(74, 85, 104);
        doc.setFont("helvetica", "normal");
        const skillsText = cat.skills.join(", ");
        const lines = doc.splitTextToSize(skillsText, sidebarWidth - margin * 2);
        doc.text(lines, margin, yPos);
        yPos += lines.length * 4 + 4;
    });

    // Main Content
    yPos = 20;
    doc.setFontSize(26);
    doc.setTextColor(26, 32, 44);
    doc.setFont("helvetica", "bold");
    doc.text(data.personalInfo.name.toUpperCase(), contentMargin, yPos);
    yPos += 10;
    
    doc.setFontSize(14);
    doc.setTextColor(79, 209, 197);
    doc.setFont("helvetica", "normal");
    doc.text(data.personalInfo.role, contentMargin, yPos);
    yPos += 15;

    // Summary
    doc.setFontSize(12);
    doc.setTextColor(26, 32, 44);
    doc.setFont("helvetica", "bold");
    doc.text("PROFESSIONAL SUMMARY", contentMargin, yPos);
    yPos += 5;
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(74, 85, 104);
    const summaryLines = doc.splitTextToSize(data.personalInfo.summary, pageWidth - contentMargin - margin);
    doc.text(summaryLines, contentMargin, yPos);
    yPos += summaryLines.length * 5 + 10;

    // Experience
    doc.setFontSize(12);
    doc.setTextColor(26, 32, 44);
    doc.setFont("helvetica", "bold");
    doc.text("WORK EXPERIENCE", contentMargin, yPos);
    yPos += 6;
    
    data.experience.forEach(exp => {
        doc.setFontSize(11);
        doc.setTextColor(45, 55, 72);
        doc.setFont("helvetica", "bold");
        doc.text(`${exp.role}`, contentMargin, yPos);
        doc.setFontSize(9);
        doc.setTextColor(160, 174, 192);
        doc.text(exp.duration, pageWidth - margin, yPos, { align: 'right' });
        yPos += 5;
        doc.setTextColor(79, 209, 197);
        doc.text(exp.company, contentMargin, yPos);
        yPos += 6;
        doc.setFontSize(9);
        doc.setTextColor(74, 85, 104);
        doc.setFont("helvetica", "normal");
        exp.description.forEach(desc => {
            const descLines = doc.splitTextToSize("• " + desc, pageWidth - contentMargin - margin);
            doc.text(descLines, contentMargin, yPos);
            yPos += descLines.length * 4.5 + 2;
        });
        yPos += 5;
    });

    // Education
    if (yPos > pageHeight - 40) { doc.addPage(); yPos = 20; }
    doc.setFontSize(12);
    doc.setTextColor(26, 32, 44);
    doc.setFont("helvetica", "bold");
    doc.text("EDUCATION", contentMargin, yPos);
    yPos += 6;
    data.education.forEach(edu => {
        doc.setFontSize(10);
        doc.setTextColor(45, 55, 72);
        doc.setFont("helvetica", "bold");
        doc.text(edu.degree, contentMargin, yPos);
        yPos += 5;
        doc.setFontSize(9);
        doc.setTextColor(74, 85, 104);
        doc.setFont("helvetica", "normal");
        doc.text(`${edu.institution} | ${edu.duration}`, contentMargin, yPos);
        yPos += 10;
    });

    doc.save(`${data.personalInfo.name.replace(' ', '_')}_Resume.pdf`);
    setShowResumeMenu(false);
  };

  const handleDownloadWord = (e: React.MouseEvent) => {
    e.preventDefault();
    const data = generateResumeData();
    const content = `
        <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
        <head><title>Resume</title>
        <style>
            body { font-family: 'Segoe UI', Arial, sans-serif; color: #2d3748; line-height: 1.6; padding: 40px; }
            h1 { color: #1a202c; border-bottom: 2px solid #4fd1c5; padding-bottom: 10px; margin-bottom: 5px; }
            .subtitle { color: #4fd1c5; font-size: 1.2em; margin-top: 0; }
            .section-title { color: #1a202c; text-transform: uppercase; font-weight: bold; font-size: 1.1em; border-bottom: 1px solid #e2e8f0; margin-top: 30px; margin-bottom: 10px; }
            .contact-info { color: #718096; font-size: 0.9em; margin-bottom: 20px; }
            .exp-item { margin-bottom: 20px; }
            .exp-header { display: flex; justify-content: space-between; font-weight: bold; }
            .company { color: #4fd1c5; }
            ul { margin-top: 5px; }
            li { margin-bottom: 5px; }
        </style>
        </head>
        <body>
            <h1>${data.personalInfo.name}</h1>
            <p class="subtitle">${data.personalInfo.role}</p>
            <div class="contact-info">
                ${data.personalInfo.email} | ${data.personalInfo.location}<br/>
                ${data.personalInfo.links.map(l => `<a href="${l.url}">${l.name}</a>`).join(' | ')}
            </div>
            
            <div class="section-title">Professional Summary</div>
            <p>${data.personalInfo.summary}</p>
            
            <div class="section-title">Technical Expertise</div>
            <table width="100%">
                ${data.skills.map(cat => `<tr><td width="30%" valign="top"><strong>${cat.title}</strong></td><td>${cat.skills.join(", ")}</td></tr>`).join('')}
            </table>
            
            <div class="section-title">Experience</div>
            ${data.experience.map(exp => `
                <div class="exp-item">
                    <div class="exp-header">
                        <span>${exp.role}</span>
                        <span style="float: right;">${exp.duration}</span>
                    </div>
                    <div class="company">${exp.company}</div>
                    <ul>${exp.description.map(d => `<li>${d}</li>`).join('')}</ul>
                </div>
            `).join('')}
            
            <div class="section-title">Education</div>
            ${data.education.map(edu => `
                <div class="exp-item">
                    <strong>${edu.degree}</strong><br/>
                    ${edu.institution} | ${edu.duration}
                </div>
            `).join('')}
        </body>
        </html>
    `;
    
    const blob = new Blob(['\ufeff', content], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${data.personalInfo.name.replace(' ', '_')}_Resume.doc`;
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
            case '<': return '&lt;'; case '>': return '&gt;'; case '&': return '&amp;';
            case '\'': return '&apos;'; case '"': return '&quot;'; default: return c;
        }
    });

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<Resume xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
    <Header>
        <FullName>${escape(data.personalInfo.name)}</FullName>
        <ProfessionalTitle>${escape(data.personalInfo.role)}</ProfessionalTitle>
        <Contact>
            <Email>${escape(data.personalInfo.email)}</Email>
            <Location>${escape(data.personalInfo.location)}</Location>
            <Links>
                ${data.personalInfo.links.map(l => `<Link name="${escape(l.name)}">${escape(l.url)}</Link>`).join('')}
            </Links>
        </Contact>
    </Header>
    <Summary>${escape(data.personalInfo.summary)}</Summary>
    <SkillSet>
        ${data.skills.map(cat => `
        <Category title="${escape(cat.title)}">
            ${cat.skills.map(s => `<Skill>${escape(s)}</Skill>`).join('')}
        </Category>`).join('')}
    </SkillSet>
    <WorkHistory>
        ${data.experience.map(exp => `
        <Experience>
            <JobTitle>${escape(exp.role)}</JobTitle>
            <Organization>${escape(exp.company)}</Organization>
            <Period>${escape(exp.duration)}</Period>
            <KeyAchievements>
                ${exp.description.map(d => `<Achievement>${escape(d)}</Achievement>`).join('')}
            </KeyAchievements>
        </Experience>`).join('')}
    </WorkHistory>
    <AcademicBackground>
        ${data.education.map(edu => `
        <EducationEntry>
            <Degree>${escape(edu.degree)}</Degree>
            <Institution>${escape(edu.institution)}</Institution>
            <TimeFrame>${escape(edu.duration)}</TimeFrame>
        </EducationEntry>`).join('')}
    </AcademicBackground>
</Resume>`;

    const blob = new Blob([xml], { type: 'text/xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${data.personalInfo.name.replace(' ', '_')}_Data.xml`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setShowResumeMenu(false);
  };

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

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      const shapes = gsap.utils.toArray<HTMLElement>('.hero-shape');
      const buttons = gsap.utils.toArray<HTMLElement>('.hero-btn');

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
        stagger: 0.2,
        ease: "back.out(1.7)"
      }, "-=0.8")
      .from(buttons, {
        y: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out"
      }, "-=1.0");

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
      
      const floatCard = () => {
        if (!floatingImageRef.current) return;
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
          gsap.set(floatingImageRef.current, { 
            top: pos.top, 
            left: pos.left, 
            right: pos.right || 'auto',
            opacity: 0,
            scale: 0.8,
            rotation: pos.rotation - 10
          });
          const cardTl = gsap.timeline({
            onComplete: () => {
              currentPosIndex = nextIndex;
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
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
        <div className="hero-shape absolute top-[15%] left-[10%] w-20 h-20 md:w-32 md:h-32 bg-gradient-to-br from-accent/20 to-blue-500/20 rounded-2xl backdrop-blur-sm border border-white/10 shadow-lg"></div>
        <div className="hero-shape absolute bottom-[20%] right-[10%] w-32 h-32 md:w-48 md:h-48 bg-gradient-to-tr from-purple-500/20 to-pink-500/20 rounded-full blur-sm"></div>
        <div className="hero-shape absolute top-[20%] right-[20%] w-16 h-16 md:w-24 md:h-24 border-4 border-accent/20 rounded-full dashed"></div>
        <div className="hero-shape absolute bottom-[25%] left-[20%] w-12 h-12 md:w-16 md:h-16 bg-gradient-to-tl from-yellow-400/20 to-red-400/20 rotate-45 rounded-lg"></div>
        <div className="hero-shape absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/5 rounded-full blur-3xl -z-10"></div>
      </div>
      
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
                    <span>Download CV</span>
                    <ChevronDownIcon className={`w-4 h-4 transition-transform duration-300 ${showResumeMenu ? 'rotate-180' : ''}`} />
                </button>

                {showResumeMenu && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-secondary rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden z-20 animate-fade-in flex flex-col">
                        <button 
                            onClick={handleDownloadPDF}
                            className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors text-left w-full group/item"
                        >
                            <div className="p-2 bg-red-50 dark:bg-red-900/20 text-red-500 rounded-lg group-hover/item:bg-red-500 group-hover/item:text-white transition-colors">
                                <FilePdfIcon className="w-5 h-5" />
                            </div>
                            <div className="flex flex-col">
                                <span className="font-bold text-sm text-primary dark:text-light">Professional PDF</span>
                                <span className="text-[10px] text-gray-500">Industry Standard Layout</span>
                            </div>
                        </button>
                        <div className="h-px bg-gray-100 dark:bg-gray-700"></div>
                        <button 
                            onClick={handleDownloadWord}
                            className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors text-left w-full group/item"
                        >
                            <div className="p-2 bg-blue-50 dark:bg-blue-900/20 text-blue-500 rounded-lg group-hover/item:bg-blue-500 group-hover/item:text-white transition-colors">
                                <FileWordIcon className="w-5 h-5" />
                            </div>
                            <div className="flex flex-col">
                                <span className="font-bold text-sm text-primary dark:text-light">Structured Word</span>
                                <span className="text-[10px] text-gray-500">Editable DOCX Format</span>
                            </div>
                        </button>
                        <div className="h-px bg-gray-100 dark:bg-gray-700"></div>
                        <button 
                            onClick={handleDownloadXML}
                            className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors text-left w-full group/item"
                        >
                            <div className="p-2 bg-orange-50 dark:bg-orange-900/20 text-orange-500 rounded-lg group-hover/item:bg-orange-500 group-hover/item:text-white transition-colors">
                                <FileXmlIcon className="w-5 h-5" />
                            </div>
                            <div className="flex flex-col">
                                <span className="font-bold text-sm text-primary dark:text-light">Schema XML</span>
                                <span className="text-[10px] text-gray-500">ATS Machine Readable</span>
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
