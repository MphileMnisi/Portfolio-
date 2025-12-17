
import React from 'react';
import { ExperienceItem } from '../types';
import Section from './Section';

export const experienceData: ExperienceItem[] = [
  {
    role: 'Software Development & AI Trainee',
    company: 'Capaciti',
    duration: '2025 - Present',
    logoUrl: 'https://media.licdn.com/dms/image/v2/D4D0BAQH1s6kb-osAAw/company-logo_100_100/company-logo_100_100/0/1707302597610/capacitiza_logo?e=1767225600&v=beta&t=14G2r6vgA6E5LXpIf8K5_upNGQOMxtlbY7-hDCbtsXQ',
    description: [
      'Designing and deploying full-stack web applications using Next.js and Firebase, managing the complete software lifecycle from coding to testing.',
      'Engineering AI solutions including RAG pipelines for conversational agents and BERT-based models for sentiment analysis tools like SentiCoreX.',
      'Architecting the "CAPACITI Intelligent Talent Hub", utilizing AI algorithms to match graduates with employment opportunities and standardizing skill taxonomies.',
      'Actively applying machine learning concepts in agile environments to build innovative solutions while refining professional communication skills.',
    ],
  },
];

const ExperienceCard: React.FC<{ item: ExperienceItem }> = ({ item }) => (
  <div className="pl-8 relative before:absolute before:left-2 before:top-2 before:w-4 before:h-4 before:bg-accent before:rounded-full before:border-4 before:border-light dark:before:border-secondary transition-all hover:-translate-y-1 duration-300">
    <div className="mb-4 bg-white dark:bg-secondary/40 p-6 rounded-xl shadow-sm border-l-4 border-accent hover:shadow-md transition-shadow">
      <div className="flex flex-col md:flex-row justify-between md:items-center mb-4">
        <h3 className="text-xl font-bold text-primary dark:text-light">{item.role}</h3>
        {item.duration && (
          <span className="text-sm font-bold bg-accent/10 text-accent px-3 py-1 rounded-full mt-2 md:mt-0 w-fit">
            {item.duration}
          </span>
        )}
      </div>
      
      <div className="flex items-center gap-3 mb-4">
        {item.logoUrl && (
            <img 
                src={item.logoUrl} 
                alt={`${item.company} logo`}
                className="w-8 h-8 rounded object-contain bg-white p-0.5 shadow-sm" 
            />
        )}
        <p className="text-lg font-medium text-gray-700 dark:text-gray-300">{item.company}</p>
      </div>

      <ul className="list-disc list-inside space-y-3 text-gray-600 dark:text-gray-400">
        {item.description.map((desc, index) => (
          <li key={index} className="leading-relaxed">
            {desc}
          </li>
        ))}
      </ul>
    </div>
  </div>
);

const Experience: React.FC = () => {
  return (
    <Section id="experience" title="Professional Experience">
      <div className="max-w-4xl mx-auto">
        <div className="relative border-l-2 border-gray-200 dark:border-gray-700 space-y-8 ml-4 md:ml-0">
          {experienceData.map((item, index) => (
            <ExperienceCard key={index} item={item} />
          ))}
        </div>
      </div>
    </Section>
  );
};

export default Experience;
