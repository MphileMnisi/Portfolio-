import React from 'react';
import { EducationItem } from '../types';
import Section from './Section';

const educationData: EducationItem[] = [
  {
    degree: 'Bachelor of Science in Computer Science',
    institution: 'University of Technology',
    duration: '2015 - 2019',
    details: [
      'Graduated with honors, focusing on Software Engineering and Artificial Intelligence.',
      'Completed a final year project on machine learning models for predictive analysis.',
      'Active member of the university coding club, participating in several hackathons.',
    ],
  },
   {
    degree: 'Advanced Diploma in Software Development',
    institution: 'Code Academy',
    duration: '2019 - 2020',
    details: [
      'Specialized in full-stack web development with a focus on the MERN stack.',
      'Developed and deployed three major web applications as part of the curriculum.',
      'Collaborated in an agile team environment on a capstone project for a real-world client.',
    ],
  },
];

const EducationCard: React.FC<{ item: EducationItem }> = ({ item }) => (
  <div className="pl-8 relative before:absolute before:left-2 before:top-2 before:w-4 before:h-4 before:bg-accent before:rounded-full before:border-4 before:border-secondary">
    <div className="mb-4">
      <h3 className="text-xl font-bold text-light">{item.degree}</h3>
      <p className="text-accent font-semibold">{item.institution} | {item.duration}</p>
    </div>
    <ul className="list-disc list-inside space-y-2 text-medium">
      {item.details.map((detail, index) => (
        <li key={index}>{detail}</li>
      ))}
    </ul>
  </div>
);

const Education: React.FC = () => {
  return (
    <Section id="education" title="Education">
      <div className="max-w-3xl mx-auto">
        <div className="relative border-l-2 border-secondary space-y-12">
          {educationData.map((item, index) => (
            <EducationCard key={index} item={item} />
          ))}
        </div>
      </div>
    </Section>
  );
};

export default Education;