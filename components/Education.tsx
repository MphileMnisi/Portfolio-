import React from 'react';
import { EducationItem } from '../types';
import Section from './Section';

const educationData: EducationItem[] = [
  {
    degree: 'National Diploma in Information Technology',
    institution: 'Vaal University of Technology',
    duration: '2022 - 2024',
    details: [
      'Specialized in software development, database systems, and computer networking.',
      'Developed a comprehensive web application for the final year capstone project.',
      'Gained practical experience with various programming languages and development methodologies.',
    ],
  },
   {
    degree: 'Matric (Grade 12)',
    institution: 'Thuto Lesedi Secondary School',
    duration: '2017 - 2021',
    details: [
      'Graduated with a Bachelor\'s degree pass, enabling university entrance.',
      'Excelled in Accounting, Business, Economics and Mathematics subjects.',
      'Participated in the school\'s science and technology club.',
    ],
  },
];

const EducationCard: React.FC<{ item: EducationItem }> = ({ item }) => (
  <div className="pl-8 relative before:absolute before:left-2 before:top-2 before:w-4 before:h-4 before:bg-accent before:rounded-full before:border-4 before:border-light dark:before:border-secondary">
    <div className="mb-4">
      <h3 className="text-xl font-bold text-primary dark:text-light">{item.degree}</h3>
      <p className="text-accent font-semibold">{item.institution} | {item.duration}</p>
    </div>
    <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-medium">
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
        <div className="relative border-l-2 border-gray-200 dark:border-secondary space-y-12">
          {educationData.map((item, index) => (
            <EducationCard key={index} item={item} />
          ))}
        </div>
      </div>
    </Section>
  );
};

export default Education;