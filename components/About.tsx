import React, { useState, useEffect, useRef } from 'react';
import Section from './Section';

const techSkills = [
  'React', 'TypeScript', 'JavaScript (ES6+)', 'Node.js', 
  'Tailwind CSS', 'HTML5 & CSS3', 'Next.js', 'GraphQL', 
  'REST APIs', 'Git & GitHub', 'UI/UX Design', 'Figma'
];

const softSkills = [
  'Problem Solving', 'Collaboration', 'Adaptability',
  'Time Management', 'Creativity', 'Communication'
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
        threshold: 0.2,
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
      <div className="grid md:grid-cols-5 gap-12 items-center">
        <div className="md:col-span-3 text-gray-600 dark:text-medium text-lg">
          <p>
            Hello! I'm Nkosimphile Mnisi, a creative developer passionate about transforming complex problems into elegant, intuitive solutions. My journey is fueled by a deep fascination with modern web technologies and a commitment to continuous learning in the ever-evolving frontend landscape. When I'm not coding, I enjoy exploring hiking trails, experimenting with new recipes, and getting lost in a good book.
          </p>
        </div>
        <div className="md:col-span-2 flex justify-center">
          <img
            src="https://media.licdn.com/dms/image/v2/D4E03AQHfe7l5uB6Fqw/profile-displayphoto-crop_800_800/B4EZpKwsNPKkAI-/0/1762190874743?e=1766620800&v=beta&t=Nze3kQFVCjQrnO5_8N0Ad_Zi_N6GY9VhnxgJno3b-RE"
            alt="Nkosimphile Mnisi"
            className="rounded-full w-64 h-64 md:w-80 md:h-80 object-cover shadow-2xl border-4 border-white dark:border-secondary transition-all duration-500 hover:scale-105 hover:shadow-accent/50 hover:border-accent cursor-pointer"
          />
        </div>
      </div>
      <div ref={skillsRef}>
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-center mb-8 text-primary dark:text-light">My Tech Stack</h3>
          <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            {techSkills.map((skill, index) => (
              <span 
                key={skill} 
                className={`bg-gray-100 dark:bg-secondary text-accent font-medium py-2 px-4 rounded-full transition-all duration-300 transform hover:-translate-y-1 hover:bg-accent hover:text-primary cursor-pointer ${skillsInView ? 'animate-fade-in' : 'opacity-0'}`}
                style={{ animationDelay: `${index * 75}ms` }}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
         <div className="mt-16">
          <h3 className="text-2xl font-bold text-center mb-8 text-primary dark:text-light">Soft Skills</h3>
          <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            {softSkills.map((skill, index) => (
              <span 
                key={skill} 
                className={`bg-gray-100 dark:bg-secondary text-gray-800 dark:text-light font-medium py-2 px-4 rounded-full transition-all duration-300 transform hover:-translate-y-1 hover:bg-gray-600 dark:hover:bg-light hover:text-white dark:hover:text-primary cursor-pointer ${skillsInView ? 'animate-fade-in' : 'opacity-0'}`}
                style={{ animationDelay: `${(techSkills.length + index) * 75}ms` }}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
};

export default About;