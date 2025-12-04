
import React, { useState, useMemo } from 'react';
import { Project } from '../types';
import Section from './Section';
import { ExternalLinkIcon, XIcon, BackArrowIcon } from './icons/Icons';


const projectsData: Project[] = [
  {
    title: 'SA School Recommendation System',
    description: 'An intelligent platform designed to assist users in finding the best-fit schools in South Africa based on personalized criteria and a smart recommendation algorithm.',
    detailedDescription: `
      <h4 class="text-lg font-bold text-primary dark:text-light mb-2">Technical Challenges & Solutions:</h4>
      <ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-medium">
        <li><strong>Challenge:</strong> Sourcing and structuring a comprehensive dataset of South African schools for effective querying.</li>
        <li><strong>Solution:</strong> Developed a data aggregation script and structured the information in a NoSQL database (Firebase), allowing for flexible and efficient filtering based on location, curriculum, and fees.</li>
        <li><strong>Challenge:</strong> Designing a recommendation algorithm that provides relevant results from user preferences.</li>
        <li><strong>Solution:</strong> Implemented a content-based filtering system. A scoring mechanism was created to rank schools by matching their attributes against user-defined preferences, ensuring personalized and accurate recommendations.</li>
      </ul>
    `,
    tags: ['React', 'Next.js', 'Firebase', 'Data Scraping', 'Algorithm'],
    imageUrl: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=2148&auto=format&fit=crop',
    liveUrl: 'https://recommender-hshy.vercel.app/',
    sourceUrl: 'https://github.com/nkosimphile-mnisi/sa-school-recommendation-system',
  },
  {
    title: 'Conversational AI Chatbot',
    description: 'A responsive and intelligent chatbot that provides human-like, context-aware responses to user queries, powered by modern natural language processing.',
    detailedDescription: `
      <h4 class="text-lg font-bold text-primary dark:text-light mb-2">Technical Challenges & Solutions:</h4>
      <ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-medium">
        <li><strong>Challenge:</strong> Achieving natural, context-aware conversations that go beyond simple canned responses.</li>
        <li><strong>Solution:</strong> Integrated a powerful third-party NLP API to handle the complexities of language understanding and generation. The application state was designed to maintain conversation history, providing crucial context for follow-up questions.</li>
        <li><strong>Challenge:</strong> Building a seamless, real-time user interface that feels like a modern messaging app.</li>
        <li><strong>Solution:</strong> Developed the UI with React and Tailwind CSS, using state management to instantly render messages. An asynchronous function manages API calls, displaying a loading indicator while the chatbot "thinks" to enhance user experience.</li>
      </ul>
    `,
    tags: ['React', 'TypeScript', 'AI/ML', 'NLP API', 'Tailwind CSS'],
    imageUrl: 'https://images.unsplash.com/photo-1534536281715-e28d76689b4d?q=80&w=2070&auto=format&fit=crop',
    liveUrl: 'https://chatbot-ten-mu-89.vercel.app/',
    sourceUrl: 'https://github.com/nkosimphile-mnisi/conversational-ai-chatbot',
  },
  {
    title: 'AI Resume Builder',
    description: 'An innovative tool that leverages generative AI to help users create professional, tailored resumes by suggesting and generating high-quality content.',
    detailedDescription: `
      <h4 class="text-lg font-bold text-primary dark:text-light mb-2">Technical Challenges & Solutions:</h4>
      <ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-medium">
        <li><strong>Challenge:</strong> Generating high-quality, relevant resume content from minimal user input.</li>
        <li><strong>Solution:</strong> Employed a sophisticated generative AI model with carefully engineered prompts. The system requests specific resume sections (e.g., summary, experience bullet points) based on user-provided keywords, ensuring structured and impactful output.</li>
        <li><strong>Challenge:</strong> Creating a flexible and intuitive resume editor with a live preview.</li>
        <li><strong>Solution:</strong> Built a dynamic interface using React where users can add, edit, and reorder sections. State was managed meticulously to reflect changes instantly on a live preview component, providing immediate visual feedback.</li>
      </ul>
    `,
    tags: ['React', 'Next.js', 'Generative AI', 'UI/UX Design', 'PDF Generation'],
    imageUrl: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=2070&auto=format&fit=crop',
    liveUrl: 'https://ai-resume-builder-one-phi.vercel.app/',
    sourceUrl: 'https://github.com/nkosimphile-mnisi/ai-resume-builder',
  },
  {
    title: 'SA Grade 12 Marker',
    description: 'An automated system that marks Grade 12 scripts and provides instant, detailed feedback to students, streamlining the assessment process.',
    detailedDescription: `
      <h4 class="text-lg font-bold text-primary dark:text-light mb-2">Technical Challenges & Solutions:</h4>
      <ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-medium">
        <li><strong>Challenge:</strong> Developing a system capable of accurately interpreting and marking diverse, handwritten student responses from exam scripts.</li>
        <li><strong>Solution:</strong> Integrated an advanced Optical Character Recognition (OCR) service to digitize handwritten text. Subsequently, a fine-tuned AI model processes the text, comparing it against a pre-defined marking rubric to assess correctness and assign marks.</li>
        <li><strong>Challenge:</strong> Providing instant, meaningful, and educational feedback instead of just a score.</li>
        <li><strong>Solution:</strong> Leveraged a generative AI to analyze incorrect answers and produce personalized feedback. The system explains the specific errors, references relevant concepts, and suggests areas for improvement, turning assessment into a powerful learning tool.</li>
      </ul>
    `,
    tags: ['React', 'Next.js', 'AI/ML', 'OCR', 'Education Tech'],
    imageUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2132&auto=format&fit=crop',
    liveUrl: 'https://sa-grade-12-marker.vercel.app/',
    sourceUrl: 'https://github.com/nkosimphile-mnisi/sa-grade-12-marker',
  },
  {
    title: 'SentiCoreX',
    description: 'An AI-powered sentiment analysis tool designed to help businesses make sense of thousands of comments received daily across multiple channels.',
    detailedDescription: `
      <h4 class="text-lg font-bold text-primary dark:text-light mb-2">Technical Challenges & Solutions:</h4>
      <ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-medium">
        <li><strong>Challenge:</strong> Processing and classifying vast amounts of unstructured feedback data in real-time.</li>
        <li><strong>Solution:</strong> Leveraged advanced Natural Language Processing (NLP) algorithms to accurately detect sentiment polarity (positive, negative, neutral). The system scales to handle high-volume inputs without compromising performance.</li>
        <li><strong>Challenge:</strong> Presenting complex sentiment data in an understandable format for business owners.</li>
        <li><strong>Solution:</strong> Built an intuitive dashboard with dynamic data visualization components. This enables users to easily spot trends, monitor brand reputation, and make data-driven decisions based on customer feedback.</li>
      </ul>
    `,
    tags: ['React', 'AI/ML', 'Sentiment Analysis', 'Data Visualization', 'NLP'],
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop',
    liveUrl: 'https://senticore-x.vercel.app/',
    sourceUrl: 'https://github.com/nkosimphile-mnisi/senticore-x',
  },
];

const ProjectDetailModal: React.FC<{ project: Project; onClose: () => void }> = ({ project, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/80 dark:bg-primary/90 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white dark:bg-secondary rounded-lg shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="p-6 md:p-8 relative">
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 dark:text-medium hover:text-accent transition-colors">
            <XIcon className="w-8 h-8" />
          </button>
          <img src={project.imageUrl} alt={project.title} className="w-full h-64 object-cover rounded-lg mb-6" />
          <h2 className="text-3xl font-bold text-primary dark:text-light mb-2">{project.title}</h2>
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map((tag) => (
              <span key={tag} className="text-sm bg-gray-100 dark:bg-primary text-accent font-semibold px-3 py-1 rounded-full">{tag}</span>
            ))}
          </div>
          <p className="text-gray-600 dark:text-medium mb-6">{project.description}</p>
          {project.detailedDescription && (
            <div dangerouslySetInnerHTML={{ __html: project.detailedDescription }} />
          )}
          <div className="mt-8 flex flex-wrap justify-end gap-4">
            <button
              onClick={onClose}
              className="inline-flex items-center gap-2 bg-gray-200 dark:bg-gray-700 text-primary dark:text-light font-bold py-2 px-4 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              <BackArrowIcon className="w-5 h-5" />
              <span>Back to Projects</span>
            </button>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-accent text-primary font-bold py-2 px-4 rounded-lg hover:bg-opacity-80 transition-colors"
              >
                <ExternalLinkIcon className="w-5 h-5" />
                <span>View Live Demo</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};


const ProjectCard: React.FC<{ project: Project; onClick: () => void }> = ({ project, onClick }) => {
  return (
    <div 
      className="bg-white dark:bg-secondary rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col transform hover:scale-105 cursor-pointer group"
      onClick={onClick}
    >
      <div className="overflow-hidden">
        <img src={project.imageUrl} alt={project.title} className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-110" />
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-primary dark:text-light mb-2">{project.title}</h3>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag) => (
            <span key={tag} className="text-xs bg-gray-100 dark:bg-primary text-accent font-semibold px-2 py-1 rounded-full">{tag}</span>
          ))}
        </div>
        <p className="text-gray-600 dark:text-medium flex-grow mb-4">{project.description}</p>
        <div className="mt-auto flex justify-end items-center gap-4">
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-medium hover:text-accent transition-colors" onClick={(e) => e.stopPropagation()}>
              <ExternalLinkIcon className="w-5 h-5" />
              Live Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
};


const Projects: React.FC = () => {
  const [selectedTag, setSelectedTag] = useState('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    projectsData.forEach(project => {
      project.tags.forEach(tag => tags.add(tag));
    });
    return ['All', ...Array.from(tags)];
  }, []);

  const filteredProjects = useMemo(() => {
    if (selectedTag === 'All') {
      return projectsData;
    }
    return projectsData.filter(project => project.tags.includes(selectedTag));
  }, [selectedTag]);

  return (
    <>
      <Section id="projects" title="My Projects">
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-12">
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`font-medium py-2 px-4 rounded-full transition-colors duration-300 ${
                selectedTag === tag
                  ? 'bg-accent text-primary'
                  : tag === 'All'
                  ? 'bg-white dark:bg-transparent border border-gray-300 dark:border-gray-500 text-gray-700 dark:text-medium hover:bg-gray-100 dark:hover:bg-gray-700'
                  : 'bg-gray-100 text-gray-700 dark:bg-secondary dark:text-medium hover:bg-accent/80 hover:text-primary'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.title} project={project} onClick={() => setSelectedProject(project)} />
          ))}
        </div>
      </Section>
      {selectedProject && <ProjectDetailModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
    </>
  );
};

export default Projects;
