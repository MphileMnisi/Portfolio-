import React from 'react';
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
  return (
    <Section id="about" title="About Me">
      <div className="grid md:grid-cols-5 gap-12 items-center">
        <div className="md:col-span-3 space-y-4 text-medium text-lg">
          <p>
            Hello! I'm Nkosimphile Mnisi, a creative developer with a knack for turning complex problems into elegant, intuitive solutions. My journey into web development started with a fascination for how a few lines of code could create interactive and engaging experiences for people worldwide.
          </p>
          <p>
            Today, I have the privilege of working on a variety of projects, from small business websites to large-scale web applications. I'm deeply passionate about modern web technologies and continuously strive to learn and adapt to the ever-evolving landscape of frontend development.
          </p>
          <p>
            When I'm not coding, you can find me exploring new hiking trails, experimenting with new recipes, or getting lost in a good book.
          </p>
        </div>
        <div className="md:col-span-2 flex justify-center">
          <img
            src="https://media.licdn.com/dms/image/v2/D4E03AQHfe7l5uB6Fqw/profile-displayphoto-crop_800_800/B4EZpKwsNPKkAI-/0/1762190874743?e=1764201600&v=beta&t=tyC39gdspkc0gqWa3WksLDrNGUM85cMT2mdadkhJdc8"
            alt="Nkosimphile Mnisi"
            className="rounded-full w-64 h-64 md:w-80 md:h-80 object-cover shadow-2xl border-4 border-secondary"
          />
        </div>
      </div>
      <div className="mt-16">
        <h3 className="text-2xl font-bold text-center mb-8 text-light">My Tech Stack</h3>
        <div className="flex flex-wrap justify-center gap-3 md:gap-4">
          {techSkills.map((skill) => (
            <span key={skill} className="bg-secondary text-accent font-medium py-2 px-4 rounded-full transition-all duration-300 transform hover:-translate-y-1 hover:bg-accent hover:text-primary cursor-pointer">
              {skill}
            </span>
          ))}
        </div>
      </div>
       <div className="mt-16">
        <h3 className="text-2xl font-bold text-center mb-8 text-light">Soft Skills</h3>
        <div className="flex flex-wrap justify-center gap-3 md:gap-4">
          {softSkills.map((skill) => (
            <span key={skill} className="bg-secondary text-light font-medium py-2 px-4 rounded-full transition-all duration-300 transform hover:-translate-y-1 hover:bg-light hover:text-primary cursor-pointer">
              {skill}
            </span>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default About;