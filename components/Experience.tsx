
import React from 'react';
import { ExperienceItem } from '../types';
import Section from './Section';

const experienceData: ExperienceItem[] = [
  {
    role: 'Senior Frontend Developer',
    company: 'Tech Solutions Inc.',
    duration: '2021 - Present',
    description: [
      'Led the development of a new client-facing dashboard using React and TypeScript, improving user engagement by 25%.',
      'Mentored junior developers, conducting code reviews and promoting best practices for a high-quality codebase.',
      'Collaborated with UI/UX designers to translate wireframes into responsive, pixel-perfect web interfaces.',
      'Optimized application performance, reducing initial load time by 40% through code splitting and lazy loading.',
    ],
  },
  {
    role: 'Frontend Developer',
    company: 'Innovate Co.',
    duration: '2019 - 2021',
    description: [
      'Developed and maintained reusable UI components for a large-scale design system, increasing development velocity.',
      'Worked in an Agile team to deliver new features for a SaaS platform, consistently meeting sprint goals.',
      'Integrated third-party APIs for payments and analytics, expanding application functionality.',
    ],
  },
  {
    role: 'Junior Web Developer',
    company: 'Digital Creations',
    duration: '2017 - 2019',
    description: [
      'Assisted in building and maintaining client websites using HTML, CSS, and JavaScript.',
      'Learned and applied modern JavaScript frameworks like React to build interactive features.',
      'Gained experience with version control systems (Git) and collaborative development workflows.',
    ],
  },
];

const ExperienceCard: React.FC<{ item: ExperienceItem }> = ({ item }) => (
  <div className="pl-8 relative before:absolute before:left-2 before:top-2 before:w-4 before:h-4 before:bg-accent before:rounded-full before:border-4 before:border-light dark:before:border-secondary">
    <div className="mb-4">
      <h3 className="text-xl font-bold text-primary dark:text-light">{item.role}</h3>
      <p className="text-accent font-semibold">{item.company} | {item.duration}</p>
    </div>
    <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-medium">
      {item.description.map((desc, index) => (
        <li key={index}>{desc}</li>
      ))}
    </ul>
  </div>
);

const Experience: React.FC = () => {
  return (
    <Section id="experience" title="Work Experience">
      <div className="max-w-3xl mx-auto">
        <div className="relative border-l-2 border-gray-200 dark:border-secondary space-y-12">
          {experienceData.map((item, index) => (
            <ExperienceCard key={index} item={item} />
          ))}
        </div>
      </div>
    </Section>
  );
};

export default Experience;