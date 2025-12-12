
import React, { useState, useEffect, useRef } from 'react';
import Section from './Section';

// Grouped skills data
export const skillCategories = [
  {
    title: "Frontend Engineering",
    skills: ["React.js", "Next.js", "TypeScript", "Tailwind CSS", "HTML5 & CSS3", "Figma", "GSAP/Framer Motion"]
  },
  {
    title: "Backend & Cloud",
    skills: ["Node.js", "Python", "Firebase", "RESTful APIs", "GraphQL", "Serverless Functions"]
  },
  {
    title: "AI & Machine Learning",
    skills: ["Generative AI", "LLM Integration", "NLP", "Prompt Engineering", "Data Analysis", "Python"]
  },
  {
    title: "Professional Competencies",
    skills: ["Agile/Scrum", "Git & GitHub", "System Architecture", "Performance Optimization", "Problem Solving", "Tech Communication"]
  }
];

const getCategoryIcon = (index: number) => {
  switch (index) {
    case 0: return (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ); // Code
    case 1: return (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
      </svg>
    ); // Server
    case 2: return (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ); // Bulb/AI
    default: return (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ); // Bolt/Professional
  }
};

const About: React.FC = () => {
  const skillsRef = useRef<HTMLDivElement>(null);
  const [skillsInView, setSkillsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSkillsInView(true);
          observer.unobserve(entry.target);
        }
      },
      {
        rootMargin: '0px',
        threshold: 0.1,
      }
    );

    const currentRef = skillsRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <Section id="about" title="About Me">
      <div className="grid md:grid-cols-5 gap-12 items-start mb-20">
        <div className="md:col-span-3 space-y-8">
          <div>
            <h3 className="text-xl font-bold text-primary dark:text-white mb-3 flex items-center gap-2">
               <span className="w-8 h-1 bg-accent rounded-full"></span>
               Professional Biography
            </h3>
            <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
              Hello! I'm Nkosimphile Mnisi, a forward-thinking Software Developer with a specialized focus on Artificial Intelligence and Machine Learning. My journey began with a National Diploma in Information Technology, where I cultivated a deep fascination for transforming complex data into intelligent, user-centric solutions. I thrive at the intersection of robust backend architecture and intuitive frontend design, consistently pushing the boundaries of what web applications can achieve through Generative AI integration.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-bold text-primary dark:text-white mb-3 flex items-center gap-2">
               <span className="w-8 h-1 bg-accent rounded-full"></span>
               Career Objectives
            </h3>
            <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
              My goal is to architect scalable, cloud-native applications that leverage the power of Machine Learning to solve real-world challenges. I am committed to continuous learning in the rapidly evolving landscape of Large Language Models (LLMs) and aim to contribute to projects that not only drive business growth but also create tangible positive impact on society.
            </p>
          </div>
        </div>

        <div className="md:col-span-2 flex justify-center items-center h-full">
          <img
            src="https://media.licdn.com/dms/image/v2/D4E03AQHfe7l5uB6Fqw/profile-displayphoto-crop_800_800/B4EZpKwsNPKkAI-/0/1762190874743?e=1766620800&v=beta&t=Nze3kQFVCjQrnO5_8N0Ad_Zi_N6GY9VhnxgJno3b-RE"
            alt="Nkosimphile Mnisi"
            className="sticky top-24 rounded-full w-64 h-64 md:w-80 md:h-80 object-cover shadow-2xl border-4 border-white dark:border-secondary transition-all duration-500 hover:scale-105 hover:shadow-accent/50 hover:border-accent cursor-pointer"
          />
        </div>
      </div>
      
      <div ref={skillsRef}>
        <h3 className="text-2xl font-bold text-center mb-12 text-primary dark:text-light">
          Technical Skills & Competencies
        </h3>
        
        <div className="grid md:grid-cols-2 gap-8">
          {skillCategories.map((category, catIndex) => (
            <div 
              key={category.title}
              className={`
                group relative bg-white dark:bg-secondary/40 backdrop-blur-md rounded-2xl p-7 
                border border-gray-100 dark:border-gray-800 
                shadow-sm hover:shadow-2xl hover:shadow-accent/10 
                transition-all duration-500 ease-out 
                transform hover:-translate-y-2
                ${skillsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}
              `}
              style={{ transitionDelay: `${catIndex * 150}ms` }}
            >
              {/* Card Background Gradient Effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/5 via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              
              {/* Decorative top border gradient */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-t-2xl"></div>

              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  {/* Animated Icon Container */}
                  <div className="p-3.5 rounded-xl bg-accent/10 text-accent group-hover:bg-accent group-hover:text-white group-hover:shadow-lg group-hover:shadow-accent/30 transition-all duration-300 transform group-hover:scale-110 group-hover:-rotate-3">
                     {getCategoryIcon(catIndex)}
                  </div>
                  
                  <h4 className="text-xl font-bold text-primary dark:text-white group-hover:text-accent transition-colors duration-300">
                    {category.title}
                  </h4>
                </div>
                
                <div className="flex flex-wrap gap-3">
                  {category.skills.map((skill, idx) => (
                    <span 
                      key={skill} 
                      className="
                        relative px-3 py-1.5 text-sm font-medium rounded-lg 
                        bg-gray-50 dark:bg-primary/50 text-gray-600 dark:text-gray-400 
                        border border-gray-100 dark:border-gray-700 
                        transition-all duration-300 
                        hover:bg-accent hover:text-white hover:border-accent hover:shadow-lg hover:shadow-accent/20 hover:-translate-y-1
                        cursor-default overflow-hidden
                      "
                      style={{ transitionDelay: `${idx * 20}ms` }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default About;
