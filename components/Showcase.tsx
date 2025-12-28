
import React, { useState, useEffect, useCallback } from 'react';
import { XIcon, ArrowRightIcon, ArrowLeftIcon, PlayIcon, TargetIcon, RobotIcon, CodeIcon, ServerIcon, DatabaseIcon, BookIcon } from './icons/Icons';

interface ShowcaseProps {
  onClose: () => void;
}

const Showcase: React.FC<ShowcaseProps> = ({ onClose }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showNotes, setShowNotes] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);

  // Timer logic
  useEffect(() => {
    const timer = setInterval(() => {
        setElapsedTime(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const slides = [
    { 
        id: 'intro', 
        title: 'Introduction & Background',
        script: `
        [Start Timer - 0:00 to 2:30]

        "Good morning. My name is Nkosimphile Mnisi, and I am a Machine Learning Engineer and Full-Stack Developer. You can find my full body of work on GitHub at MphileMnisi and connect with me on LinkedIn under Nkosimphile Siyabonga Mnisi.

        My career is built on a solid academic foundation and a commitment to lifelong specialization. I hold a National Diploma in Information Technology from the Vaal University of Technology, where I focused on software engineering and data systems.

        Complementing my formal degree, I have earned 12 professional certifications through an intensive AI Bootcamp on Coursera, covering everything from Python for Data Science and LLM Integration to Responsible AI Ethics. Additionally, through the FNB App Academy via IT Varsity, I refined my skills in App Strategy, UX Design, and API Integration.

        I view myself as a 'T-Shaped' professional: I have a broad proficiency in the full-stack ecosystem, but my deep vertical specialization is in Generative AI and NLP. I don't just build interfaces; I engineer intelligent systems that serve as force multipliers for human productivity."
        `
    },
    { 
        id: 'background', 
        title: 'Technical Stack',
        script: `
        [2:30 to 4:30]

        "To dive deeper into my technical stack:
        
        On the Frontend, I specialize in the React ecosystem—specifically Next.js and TypeScript. I care deeply about performance and high-fidelity UX, utilizing libraries like Tailwind for design systems and GSAP for fluid interactivity.
        
        On the Backend, I build for the cloud. I use Node.js and Python for my logic layers, but my real strength lies in architecture. I use Docker for containerization and Google Cloud Platform—specifically Cloud Run—for serverless scalability.
        
        In the realm of AI, I move beyond simple API wrappers. I architect RAG (Retrieval-Augmented Generation) pipelines to ground model responses in factual data. I fine-tune BERT models for nuanced NLP tasks like sarcasm detection in business intelligence. My approach is always 'Verify then Trust', implementing Human-in-the-Loop systems to ensure reliability."
        `
    },
    { 
        id: 'projects', 
        title: 'Project Highlights',
        script: `
        [4:30 to 6:30]

        "I'd like to highlight projects where I've moved from theory to production-ready AI.

        First is SentiCoreX. I addressed the failure of standard sentiment APIs to detect sarcasm by fine-tuning a BERT-based Transformer model. By utilizing bidirectional context, I increased classification accuracy for ironic feedback by 15%. I also engineered a multi-channel ingestion pipeline for real-time social media analysis.

        Second is the AI Resume Builder. This project demonstrates my 'Human-in-the-Loop' architecture. To solve LLM hallucinations, I built a co-pilot system where users must validate ATS-optimized suggestions before persistence. I also solved the