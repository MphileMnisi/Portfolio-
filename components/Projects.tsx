
import React, { useState, useEffect, useCallback } from 'react';
import { Project } from '../types';
import Section from './Section';
import { ExternalLinkIcon, XIcon, BackArrowIcon } from './icons/Icons';

export const projectsData: Project[] = [
  {
    title: 'SA School Recommendation System',
    description: 'An intelligent platform designed to assist users in finding the best-fit schools in South Africa based on personalized criteria.',
    detailedDescription: `
      <div class="space-y-6 text-gray-700 dark:text-gray-300">
        <div>
          <h4 class="text-xl font-bold text-primary dark:text-white mb-2">Project Overview</h4>
          <p>A comprehensive data-driven platform designed to simplify the school selection process for South African parents. By aggregating data from various educational institutions, the system provides a centralized hub for comparing schools based on performance, location, fees, and extra-curricular offerings.</p>
        </div>
        <div>
          <h4 class="text-xl font-bold text-primary dark:text-white mb-2">Key Features</h4>
          <ul class="list-disc list-inside space-y-1 ml-2">
            <li><strong>Personalized Matching:</strong> Algorithm-based recommendations matching student needs with school facilities.</li>
            <li><strong>Geolocation Services:</strong> Interactive maps to find schools within a specific radius.</li>
            <li><strong>Comparative Analytics:</strong> Side-by-side comparison of school fees, pass rates, and facilities.</li>
          </ul>
        </div>
        <div>
          <h4 class="text-xl font-bold text-primary dark:text-white mb-2">Technical Challenges & Solutions</h4>
          <div class="grid gap-4">
            <div class="bg-gray-50 dark:bg-white/5 p-4 rounded-lg border-l-4 border-accent">
              <p class="font-semibold text-primary dark:text-white">Challenge: Data Fragmentation</p>
              <p class="text-sm mt-1">Sourcing accurate and uniform data for thousands of schools across different provinces was difficult due to fragmented public records.</p>
              <div class="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                   <p class="font-semibold text-accent">Solution:</p>
                   <p class="text-sm mt-1">Developed a custom data aggregation script to scrape and normalize data from multiple government portals, structuring it into a flexible Firebase NoSQL database.</p>
              </div>
            </div>
             <div class="bg-gray-50 dark:bg-white/5 p-4 rounded-lg border-l-4 border-accent">
              <p class="font-semibold text-primary dark:text-white">Challenge: Recommendation Logic</p>
              <p class="text-sm mt-1">Creating a scoring system that accurately reflects user priorities without bias.</p>
              <div class="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                   <p class="font-semibold text-accent">Solution:</p>
                   <p class="text-sm mt-1">Implemented a weighted content-based filtering algorithm that dynamically adjusts scores based on user-defined importance factors.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    `,
    tags: ['React', 'Next.js', 'Firebase', 'Data Scraping'],
    imageUrl: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=2148&auto=format&fit=crop',
    liveUrl: 'https://recommender-hshy.vercel.app/',
    sourceUrl: 'https://github.com/nkosimphile-mnisi/sa-school-recommendation-system',
    theme: 'calm'
  },
  {
    title: 'Conversational AI Chatbot',
    description: 'A responsive and intelligent chatbot that provides human-like, context-aware responses using modern NLP.',
    detailedDescription: `
      <div class="space-y-6 text-gray-700 dark:text-gray-300">
        <div>
          <h4 class="text-xl font-bold text-primary dark:text-white mb-2">Project Overview</h4>
          <p>This project implements a sophisticated conversational interface powered by large language models. It is designed to simulate natural human interaction, capable of understanding context, tone, and intent to provide relevant and helpful responses in real-time.</p>
        </div>
        <div>
          <h4 class="text-xl font-bold text-primary dark:text-white mb-2">Key Features</h4>
          <ul class="list-disc list-inside space-y-1 ml-2">
            <li><strong>Context Retention:</strong> Maintains conversation history to answer follow-up questions accurately.</li>
            <li><strong>Streaming Responses:</strong> Real-time text generation effects for a fluid user experience.</li>
            <li><strong>Multi-Modal Support:</strong> Capable of processing and responding to text inputs with potential for future voice integration.</li>
          </ul>
        </div>
        <div>
          <h4 class="text-xl font-bold text-primary dark:text-white mb-2">Technical Challenges & Solutions</h4>
          <div class="grid gap-4">
            <div class="bg-gray-50 dark:bg-white/5 p-4 rounded-lg border-l-4 border-accent">
              <p class="font-semibold text-primary dark:text-white">Challenge: Latency Management</p>
              <p class="text-sm mt-1">Ensuring the chatbot feels responsive despite the processing time required by LLMs.</p>
              <div class="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                   <p class="font-semibold text-accent">Solution:</p>
                   <p class="text-sm mt-1">Implemented response streaming to display chunks of text as they are generated, rather than waiting for the full response, significantly reducing perceived latency.</p>
              </div>
            </div>
            <div class="bg-gray-50 dark:bg-white/5 p-4 rounded-lg border-l-4 border-accent">
              <p class="font-semibold text-primary dark:text-white">Challenge: Context Window Limits</p>
              <p class="text-sm mt-1">Managing long conversations without exceeding token limits of the underlying API.</p>
              <div class="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                   <p class="font-semibold text-accent">Solution:</p>
                   <p class="text-sm mt-1">Developed a sliding window context manager that summarizes older parts of the conversation to retain key information while freeing up tokens.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    `,
    tags: ['React', 'TypeScript', 'AI/ML', 'NLP API'],
    imageUrl: 'https://images.unsplash.com/photo-1534536281715-e28d76689b4d?q=80&w=2070&auto=format&fit=crop',
    liveUrl: 'https://chatbot-ten-mu-89.vercel.app/',
    sourceUrl: 'https://github.com/nkosimphile-mnisi/conversational-ai-chatbot',
    theme: 'tech'
  },
  {
    title: 'AI Resume Builder',
    description: 'An innovative tool that leverages generative AI to help users create ATS-optimized resumes with targeted keywords.',
    detailedDescription: `
      <div class="space-y-6 text-gray-700 dark:text-gray-300">
        <div>
          <h4 class="text-xl font-bold text-primary dark:text-white mb-2">Project Overview</h4>
          <p>A web-based application that empowers job seekers to create professional, ATS-friendly resumes. By utilizing generative AI, the tool analyzes job descriptions and suggests tailored content, ensuring the user's resume highlights the most relevant skills and experiences.</p>
        </div>
        <div>
          <h4 class="text-xl font-bold text-primary dark:text-white mb-2">Key Features</h4>
          <ul class="list-disc list-inside space-y-1 ml-2">
            <li><strong>ATS Optimization:</strong> Automatically suggests keywords found in job descriptions to pass Applicant Tracking Systems.</li>
            <li><strong>AI Content Generation:</strong> Generates professional bullet points for work experience based on role titles.</li>
            <li><strong>Real-time Preview:</strong> Instant visualization of the resume as data is entered or modified.</li>
            <li><strong>PDF Export:</strong> High-quality, print-ready PDF generation.</li>
          </ul>
        </div>
        <div>
          <h4 class="text-xl font-bold text-primary dark:text-white mb-2">Technical Challenges & Solutions</h4>
          <div class="grid gap-4">
            <div class="bg-gray-50 dark:bg-white/5 p-4 rounded-lg border-l-4 border-accent">
              <p class="font-semibold text-primary dark:text-white">Challenge: Formatting Consistency</p>
              <p class="text-sm mt-1">Ensuring the generated PDF matches the on-screen preview pixel-perfectly across different browsers.</p>
              <div class="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                   <p class="font-semibold text-accent">Solution:</p>
                   <p class="text-sm mt-1">Utilized a dedicated React-to-PDF library that renders the DOM structure directly to canvas before conversion, ensuring 1:1 fidelity.</p>
              </div>
            </div>
             <div class="bg-gray-50 dark:bg-white/5 p-4 rounded-lg border-l-4 border-accent">
              <p class="font-semibold text-primary dark:text-white">Challenge: AI Hallucinations</p>
              <p class="text-sm mt-1"> preventing the AI from inventing skills or experiences the user doesn't have.</p>
              <div class="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                   <p class="font-semibold text-accent">Solution:</p>
                   <p class="text-sm mt-1">Implemented strict system prompting and "human-in-the-loop" UI where users must review and approve all AI-generated suggestions before they are added.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    `,
    tags: ['React', 'Next.js', 'Generative AI', 'PDF Gen'],
    imageUrl: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=2070&auto=format&fit=crop',
    liveUrl: 'https://ai-resume-builder-one-phi.vercel.app/',
    sourceUrl: 'https://github.com/nkosimphile-mnisi/ai-resume-builder',
    theme: 'creative'
  },
  {
    title: 'SA Grade 12 Marker',
    description: 'An automated system that marks Grade 12 scripts and provides instant, detailed feedback to students.',
    detailedDescription: `
       <div class="space-y-6 text-gray-700 dark:text-gray-300">
        <div>
          <h4 class="text-xl font-bold text-primary dark:text-white mb-2">Project Overview</h4>
          <p>An EdTech solution aimed at reducing the administrative burden on educators and providing instant feedback to students. The system digitizes handwritten exam scripts and uses AI to grade them against a memorandum, providing detailed feedback on errors.</p>
        </div>
        <div>
          <h4 class="text-xl font-bold text-primary dark:text-white mb-2">Key Features</h4>
          <ul class="list-disc list-inside space-y-1 ml-2">
            <li><strong>Handwriting Recognition (OCR):</strong> Converts handwritten student answers into digital text.</li>
            <li><strong>Automated Grading:</strong> Compares student answers to the memo using semantic similarity.</li>
            <li><strong>Detailed Feedback Loop:</strong> Explains exactly where and why marks were lost.</li>
          </ul>
        </div>
        <div>
          <h4 class="text-xl font-bold text-primary dark:text-white mb-2">Technical Challenges & Solutions</h4>
          <div class="grid gap-4">
            <div class="bg-gray-50 dark:bg-white/5 p-4 rounded-lg border-l-4 border-accent">
              <p class="font-semibold text-primary dark:text-white">Challenge: Handwriting Legibility</p>
              <p class="text-sm mt-1">Accurately deciphering varied and messy student handwriting styles.</p>
              <div class="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                   <p class="font-semibold text-accent">Solution:</p>
                   <p class="text-sm mt-1">Integrated a specialized handwriting OCR API and implemented a confidence threshold system that flags ambiguous text for manual review.</p>
              </div>
            </div>
            <div class="bg-gray-50 dark:bg-white/5 p-4 rounded-lg border-l-4 border-accent">
              <p class="font-semibold text-primary dark:text-white">Challenge: Semantic Grading</p>
              <p class="text-sm mt-1">Grading answers that are correct in meaning but phrased differently from the memo.</p>
              <div class="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                   <p class="font-semibold text-accent">Solution:</p>
                   <p class="text-sm mt-1">Used cosine similarity on vector embeddings of the answers to determine semantic closeness rather than relying on strict keyword matching.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    `,
    tags: ['React', 'Next.js', 'AI/ML', 'OCR'],
    imageUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2132&auto=format&fit=crop',
    liveUrl: 'https://sa-grade-12-marker.vercel.app/',
    sourceUrl: 'https://github.com/nkosimphile-mnisi/sa-grade-12-marker',
    theme: 'dark'
  },
  {
    title: 'SentiCoreX',
    description: 'AI-powered sentiment analysis tool for business intelligence and customer feedback monitoring.',
    detailedDescription: `
      <div class="space-y-6 text-gray-700 dark:text-gray-300">
        <div>
          <h4 class="text-xl font-bold text-primary dark:text-white mb-2">Project Overview</h4>
          <p>SentiCoreX is a powerful analytics tool built for businesses to decode customer sentiment at scale. It ingests feedback from multiple channels (social media, reviews, emails) and provides actionable insights through visual dashboards.</p>
        </div>
        <div>
          <h4 class="text-xl font-bold text-primary dark:text-white mb-2">Key Features</h4>
          <ul class="list-disc list-inside space-y-1 ml-2">
            <li><strong>Multi-Channel Ingestion:</strong> Aggregates data from Twitter/X, Facebook, and Google Reviews.</li>
            <li><strong>Real-time Analysis:</strong> Processes text streams instantly to detect mood shifts.</li>
            <li><strong>Visual Dashboards:</strong> Interactive charts showing sentiment trends over time.</li>
          </ul>
        </div>
        <div>
          <h4 class="text-xl font-bold text-primary dark:text-white mb-2">Technical Challenges & Solutions</h4>
          <div class="grid gap-4">
            <div class="bg-gray-50 dark:bg-white/5 p-4 rounded-lg border-l-4 border-accent">
              <p class="font-semibold text-primary dark:text-white">Challenge: Nuance & Sarcasm</p>
              <p class="text-sm mt-1">Accurately identifying sarcasm or double negatives in customer feedback.</p>
              <div class="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                   <p class="font-semibold text-accent">Solution:</p>
                   <p class="text-sm mt-1">Fine-tuned a BERT-based transformer model on a dataset of sarcastic comments to improve classification accuracy in edge cases.</p>
              </div>
            </div>
             <div class="bg-gray-50 dark:bg-white/5 p-4 rounded-lg border-l-4 border-accent">
              <p class="font-semibold text-primary dark:text-white">Challenge: Data Visualization Performance</p>
              <p class="text-sm mt-1">Rendering thousands of data points on charts without freezing the browser.</p>
              <div class="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                   <p class="font-semibold text-accent">Solution:</p>
                   <p class="text-sm mt-1">Utilized WebGL-powered charting libraries and implemented data sampling techniques to maintain 60fps performance during interaction.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    `,
    tags: ['React', 'AI/ML', 'NLP', 'Data Viz'],
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop',
    liveUrl: 'https://senticore-x.vercel.app/',
    sourceUrl: 'https://github.com/nkosimphile-mnisi/senticore-x',
    theme: 'colorful'
  },
];

const ArrowLeftIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
  </svg>
);

const ArrowRightIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
  </svg>
);

// --- Background Components ---

const TechBackground = () => (
  <div className="absolute inset-0 bg-gray-900 overflow-hidden">
    <div className="absolute inset-0 opacity-20" 
         style={{ 
           backgroundImage: 'linear-gradient(rgba(79, 209, 197, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(79, 209, 197, 0.2) 1px, transparent 1px)', 
           backgroundSize: '50px 50px' 
         }}>
    </div>
    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-gray-900/50 to-gray-900"></div>
    <div className="absolute -top-20 -left-20 w-64 h-64 bg-accent/30 rounded-full blur-[100px] animate-pulse"></div>
    <div className="absolute top-1/2 left-1/2 w-full h-1 bg-accent/20 shadow-[0_0_30px_rgba(79,209,197,0.5)] transform -translate-x-1/2 -rotate-45"></div>
  </div>
);

const CalmBackground = () => (
  <div className="absolute inset-0 bg-slate-50 dark:bg-slate-900 overflow-hidden transition-colors duration-700">
    <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-200 dark:bg-blue-900/30 rounded-full blur-[120px] opacity-60 animate-pulse"></div>
    <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-200 dark:bg-purple-900/30 rounded-full blur-[120px] opacity-60 animate-pulse delay-1000"></div>
  </div>
);

const CreativeBackground = () => (
  <div className="absolute inset-0 bg-indigo-50 dark:bg-indigo-950 overflow-hidden">
    <div className="absolute top-10 left-10 w-32 h-32 bg-pink-400/20 rounded-full blur-2xl animate-[bounce_5s_infinite]"></div>
    <div className="absolute bottom-20 right-20 w-48 h-48 bg-yellow-400/20 rounded-full blur-3xl animate-[pulse_4s_infinite]"></div>
    <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-indigo-400/20 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
    <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 100 100" preserveAspectRatio="none">
       <path d="M0 100 C 20 0 50 0 100 100 Z" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-indigo-500" />
    </svg>
  </div>
);

const DarkBackground = () => (
  <div className="absolute inset-0 bg-black overflow-hidden">
    <div className="absolute inset-0 opacity-20" style={{ filter: 'url(#noiseFilter)' }}></div>
    <svg className="hidden">
      <filter id="noiseFilter">
        <feTurbulence type="fractalNoise" baseFrequency="0.6" stitchTiles="stitch" />
      </filter>
    </svg>
    <div className="absolute inset-0 bg-radial-gradient from-gray-800/50 to-black"></div>
    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-[100px] pointer-events-none"></div>
  </div>
);

const ColorfulBackground = () => (
  <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 via-red-500/20 to-yellow-500/20 dark:from-pink-900/40 dark:via-red-900/40 dark:to-yellow-900/40 overflow-hidden animate-gradient bg-[length:200%_200%]">
    <div className="absolute inset-0 backdrop-blur-3xl"></div>
  </div>
);

const BackgroundRenderer = ({ theme }: { theme: string | undefined }) => {
  switch (theme) {
    case 'tech': return <TechBackground />;
    case 'calm': return <CalmBackground />;
    case 'creative': return <CreativeBackground />;
    case 'dark': return <DarkBackground />;
    case 'colorful': return <ColorfulBackground />;
    default: return <CalmBackground />;
  }
};

const ProjectDetailModal: React.FC<{ project: Project; onClose: () => void }> = ({ project, onClose }) => {
    return (
      <div className="fixed inset-0 bg-black/80 dark:bg-primary/90 z-[60] flex items-center justify-center p-4 backdrop-blur-sm" onClick={onClose}>
        <div className="bg-white dark:bg-secondary rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto transform transition-all scale-100" onClick={(e) => e.stopPropagation()}>
          <div className="p-6 md:p-8 relative">
            <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 dark:text-medium hover:text-accent transition-colors z-10 bg-white/50 dark:bg-black/20 rounded-full p-1">
              <XIcon className="w-8 h-8" />
            </button>
            <div className="relative h-64 md:h-80 w-full mb-6 rounded-xl overflow-hidden group">
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
                <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover" />
            </div>
            
            <h2 className="text-3xl font-bold text-primary dark:text-light mb-2">{project.title}</h2>
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags.map((tag) => (
                <span key={tag} className="text-sm bg-accent/10 text-accent font-semibold px-3 py-1 rounded-full border border-accent/20">{tag}</span>
              ))}
            </div>
            <p className="text-gray-700 dark:text-gray-300 mb-6 text-lg leading-relaxed">{project.description}</p>
            {project.detailedDescription && (
              <div className="prose dark:prose-invert max-w-none mb-8" dangerouslySetInnerHTML={{ __html: project.detailedDescription }} />
            )}
            <div className="flex flex-wrap justify-end gap-4 pt-4 border-t border-gray-100 dark:border-gray-700">
              <button
                onClick={onClose}
                className="inline-flex items-center gap-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-light font-medium py-2.5 px-5 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                <BackArrowIcon className="w-5 h-5" />
                <span>Back</span>
              </button>
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-accent text-primary font-bold py-2.5 px-5 rounded-lg shadow-lg shadow-accent/20 hover:shadow-accent/40 hover:-translate-y-0.5 transition-all"
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

const Projects: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');

  // Auto-play logic
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isAutoPlaying && !selectedProject) {
      interval = setInterval(() => {
        setDirection('next');
        setCurrentIndex((prev) => (prev + 1) % projectsData.length);
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying, selectedProject]);

  const handleNext = useCallback(() => {
    setIsAutoPlaying(false);
    setDirection('next');
    setCurrentIndex((prev) => (prev + 1) % projectsData.length);
  }, []);

  const handlePrev = useCallback(() => {
    setIsAutoPlaying(false);
    setDirection('prev');
    setCurrentIndex((prev) => (prev - 1 + projectsData.length) % projectsData.length);
  }, []);

  const handleDotClick = (index: number) => {
    setIsAutoPlaying(false);
    setDirection(index > currentIndex ? 'next' : 'prev');
    setCurrentIndex(index);
  };

  const currentProject = projectsData[currentIndex];

  return (
    <>
      <Section id="projects" title="My Projects">
        {/* Carousel Container */}
        <div 
          className="relative w-full max-w-6xl mx-auto h-[650px] md:h-[550px] rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 group"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => !selectedProject && setIsAutoPlaying(true)}
        >
          {/* Ambient Background Layer */}
          <div className="absolute inset-0 transition-opacity duration-1000 ease-in-out">
             {projectsData.map((p, idx) => (
                 <div 
                    key={p.title} 
                    className={`absolute inset-0 transition-opacity duration-1000 ${idx === currentIndex ? 'opacity-100 z-0' : 'opacity-0 z-[-1]'}`}
                 >
                    <BackgroundRenderer theme={p.theme} />
                 </div>
             ))}
          </div>

          {/* Content Layer */}
          <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 md:px-16 py-8">
            {/* Card Transition Container */}
            <div 
                key={currentIndex} 
                className={`flex flex-col md:flex-row bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl overflow-hidden shadow-xl border border-white/20 dark:border-gray-700/30 max-w-4xl w-full transform transition-all duration-700 ease-out-cubic hover:scale-[1.02] hover:shadow-accent/20 ${direction === 'next' ? 'animate-fade-in' : 'animate-fade-in'}`}
            >
              {/* Image Section */}
              <div className="w-full md:w-1/2 h-56 md:h-auto overflow-hidden relative">
                <img 
                  src={currentProject.imageUrl} 
                  alt={currentProject.title} 
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent md:bg-gradient-to-r"></div>
              </div>

              {/* Text Section */}
              <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-center">
                <div className="mb-4">
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">{currentProject.title}</h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                     {currentProject.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="text-xs font-semibold bg-accent/20 text-gray-800 dark:text-accent px-2 py-1 rounded">{tag}</span>
                     ))}
                     {currentProject.tags.length > 3 && (
                        <span className="text-xs font-semibold bg-gray-100 dark:bg-gray-700 text-gray-500 px-2 py-1 rounded">+{currentProject.tags.length - 3}</span>
                     )}
                  </div>
                </div>
                
                <p className="text-gray-700 dark:text-gray-300 mb-6 line-clamp-3">{currentProject.description}</p>
                
                <div className="mt-auto flex gap-4">
                   <button 
                     onClick={() => setSelectedProject(currentProject)}
                     className="px-6 py-2 bg-primary dark:bg-white text-white dark:text-primary font-semibold rounded-lg hover:opacity-90 transition-opacity"
                   >
                     View Details
                   </button>
                   {currentProject.liveUrl && (
                     <a 
                       href={currentProject.liveUrl}
                       target="_blank"
                       rel="noopener noreferrer"
                       className="p-2 text-gray-700 dark:text-white hover:text-accent transition-colors border border-gray-300 dark:border-gray-600 rounded-lg"
                       title="Live Demo"
                     >
                       <ExternalLinkIcon className="w-6 h-6" />
                     </a>
                   )}
                </div>
              </div>
            </div>
          </div>

          {/* Controls */}
          <button 
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/20 dark:bg-black/20 hover:bg-white/40 dark:hover:bg-black/40 backdrop-blur-sm text-white transition-all opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0"
            aria-label="Previous Project"
          >
            <ArrowLeftIcon className="w-6 h-6 md:w-8 md:h-8" />
          </button>
          
          <button 
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/20 dark:bg-black/20 hover:bg-white/40 dark:hover:bg-black/40 backdrop-blur-sm text-white transition-all opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0"
            aria-label="Next Project"
          >
            <ArrowRightIcon className="w-6 h-6 md:w-8 md:h-8" />
          </button>

          {/* Dots */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
            {projectsData.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentIndex ? 'bg-accent w-8' : 'bg-white/40 hover:bg-white/70'}`}
                aria-label={`Go to project ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </Section>

      {selectedProject && <ProjectDetailModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
    </>
  );
};

export default Projects;
