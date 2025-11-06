import React from 'react';
import { Project } from '../types';
import Section from './Section';
import { GitHubIcon, ExternalLinkIcon } from './icons/Icons';


const projectsData: Project[] = [
  {
    title: 'E-Commerce Platform',
    description: 'A full-featured e-commerce site with product browsing, cart functionality, and a secure checkout process. Built with Next.js for server-side rendering and performance.',
    tags: ['React', 'Next.js', 'TypeScript', 'Stripe', 'Tailwind CSS'],
    imageUrl: 'https://picsum.photos/seed/project1/800/600',
    liveUrl: '#',
    sourceUrl: '#',
  },
  {
    title: 'Data Visualization Dashboard',
    description: 'An interactive dashboard for visualizing complex datasets. Features real-time data updates and customizable charts, powered by D3.js.',
    tags: ['React', 'D3.js', 'Node.js', 'WebSocket', 'Material UI'],
    imageUrl: 'https://picsum.photos/seed/project2/800/600',
    liveUrl: '#',
    sourceUrl: '#',
  },
  {
    title: 'Project Management Tool',
    description: 'A Kanban-style project management app with drag-and-drop functionality, user authentication, and real-time collaboration features.',
    tags: ['React', 'Firebase', 'Redux Toolkit', 'Framer Motion'],
    imageUrl: 'https://picsum.photos/seed/project3/800/600',
    liveUrl: '#',
    sourceUrl: '#',
  },
];

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  return (
    <div className="bg-secondary rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col transform hover:scale-105">
      <img src={project.imageUrl} alt={project.title} className="w-full h-56 object-cover" />
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-light mb-2">{project.title}</h3>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag) => (
            <span key={tag} className="text-xs bg-primary text-accent font-semibold px-2 py-1 rounded-full">{tag}</span>
          ))}
        </div>
        <p className="text-medium flex-grow mb-4">{project.description}</p>
        <div className="mt-auto flex justify-end space-x-4">
          {project.sourceUrl && (
            <a href={project.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-medium hover:text-accent transition-colors">
              <GitHubIcon className="w-6 h-6" />
            </a>
          )}
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-medium hover:text-accent transition-colors">
              <ExternalLinkIcon className="w-6 h-6" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};


const Projects: React.FC = () => {
  return (
    <Section id="projects" title="My Projects">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projectsData.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </Section>
  );
};

export default Projects;