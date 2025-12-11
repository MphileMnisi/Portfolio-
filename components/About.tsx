
import React, { useState, useEffect, useRef } from 'react';
import Section from './Section';

// Grouped skills data
const skillCategories = [
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
      <div className="grid md:grid-cols-5 gap-12 items-start mb-16">
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
        <h3 className="text-2xl font-bold text-center mb-10 text-primary dark:text-light">
          Technical Skills & Competencies
        </h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          {skillCategories.map((category, catIndex) => (
            <div 
              key={category.title}
              className={`bg-white dark:bg-secondary/50 rounded-xl p-6 shadow-sm border-l-4 border-accent hover:shadow-md transition-all duration-300 ${skillsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${catIndex * 150}ms` }}
            >
              <h4 className="text-xl font-bold text-primary dark:text-white mb-4 flex items-center gap-2">
                {category.title}
              </h4>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span 
                    key={skill} 
                    className="bg-gray-100 dark:bg-primary/50 text-gray-700 dark:text-gray-300 text-sm font-medium py-1.5 px-3 rounded-md border border-gray-200 dark:border-gray-700 hover:border-accent hover:text-accent transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default About;
