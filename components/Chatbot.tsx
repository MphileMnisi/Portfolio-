
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { XIcon, SendIcon, RobotIcon } from './icons/Icons';

interface ChatbotProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  role: 'user' | 'model';
  text: string;
}

const PORTFOLIO_CONTEXT = `
You are the AI portfolio assistant for Nkosimphile Mnisi. Your goal is to represent him professionally and answer questions about his skills, projects, experience, and education based strictly on the following context.

**Profile:**
- Name: Nkosimphile Mnisi
- Role: Software Developer, AI/ML Engineer
- Focus: Generative AI, cloud-based solutions, scalable tools, healthcare & education sectors.
- Bio: Ambitious developer skilled in problem-solving. Thrives in collaborative environments.

**Professional Experience:**
1. **Software Development & AI Trainee at Capaciti (2025 - Present)**
   - Designing, developing, and deploying full-stack web applications.
   - Actively applying AI/ML concepts in project-based learning.
   - Collaborating in agile environments.
   - Researching emerging technologies.

2. **AI & Full Stack Engineer (Freelance) (2023 - Present)**
   - Architected "SentiCoreX" (Business Intelligence tool).
   - Developed "SA School Recommendation System".
   - Implemented RAG pipelines for chatbots.
   - Deployed full-stack apps with Next.js & Firebase.

**Projects:**
1. **SA School Recommendation System** (Live: https://recommender-hshy.vercel.app/)
   - Tech: React, Next.js, Firebase, Data Scraping.
   - Features: Personalized matching, geolocation services, comparative analytics.
   - Solution: Custom data aggregation script, weighted content-based filtering.

2. **Conversational AI Chatbot** (Live: https://chatbot-ten-mu-89.vercel.app/)
   - Tech: React, TypeScript, AI/ML, NLP API.
   - Features: Context retention, streaming responses, multi-modal support.
   - Solution: Response streaming for latency, sliding window context manager.

3. **AI Resume Builder** (Live: https://ai-resume-builder-one-phi.vercel.app/)
   - Tech: React, Next.js, Generative AI, PDF Gen.
   - Features: ATS optimization, AI content generation, real-time preview.
   - Solution: Canvas-based PDF rendering, human-in-the-loop UI.

4. **SA Grade 12 Marker** (Live: https://sa-grade-12-marker.vercel.app/)
   - Tech: React, Next.js, AI/ML, OCR.
   - Features: Handwriting Recognition, Automated Grading, Detailed Feedback.
   - Solution: Confidence threshold system for OCR, cosine similarity for semantic grading.

5. **SentiCoreX** (Live: https://senticore-x.vercel.app/)
   - Tech: React, AI/ML, NLP, Data Viz.
   - Features: Multi-channel ingestion, real-time sentiment analysis, visual dashboards.
   - Solution: Fine-tuned BERT model for sarcasm detection, WebGL charting.

**Skills:**
- Frontend: React.js, Next.js, TypeScript, Tailwind CSS, GSAP.
- Backend: Node.js, Python, Firebase, RESTful APIs, GraphQL.
- AI/ML: Generative AI, LLM Integration, NLP, Prompt Engineering.
- Professional: Agile/Scrum, Git, System Architecture.

**Education:**
- National Diploma in Information Technology, Vaal University of Technology (2022 - 2024).
- Matric, Thuto Lesedi Secondary School (2017 - 2021).
- Certifications: 
  - FNB App Academy (IT Varsity, 2025): Full Stack Development, UX/UI, API Integration, Data Management, Business Development.
  - AI Bootcamp (Coursera, Oct 2025). This includes 12 comprehensive certificates:
    1. Introduction to Generative AI
    2. Introduction to Artificial Intelligence (AI)
    3. Generative AI with Large Language Models
    4. AI Foundations: Prompt Engineering with ChatGPT
    5. AI For Everyone
    6. AI Essentials
    7. Trustworthy AI: Managing Bias, Ethics, and Accountability
    8. Python for Data Science, AI & Development
    9. Introduction to Responsible AI
    10. Generative AI for Everyone
    11. Building AI Powered Chatbots Without Programming
    12. Artificial Intelligence on Microsoft Azure

**Contact:**
- Email: nkosimphilem37@gmail.com
- GitHub: https://github.com/MphileMnisi
- LinkedIn: https://www.linkedin.com/in/nkosimphile-siyabonga-mnisi-0a9a33389/

**Tone:**
Friendly, professional, enthusiastic, and concise. Speak in the first person ("I") only if directly asked about "your" capabilities as an AI, otherwise refer to Nkosimphile in the third person or as "Nkosimphile".
`;

const Chatbot: React.FC<ChatbotProps> = ({ isOpen, onClose }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: "Hi! I'm Nkosimphile's AI assistant. Ask me anything about his projects, skills, or experience." }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

      // Construct history for context
      const history = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));

      const chat = ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
            systemInstruction: PORTFOLIO_CONTEXT,
        },
        history: history
      });

      const result = await chat.sendMessage({ message: userMessage });
      const response = result.text;

      if (response) {
          setMessages(prev => [...prev, { role: 'model', text: response }]);
      } else {
          setMessages(prev => [...prev, { role: 'model', text: "I'm sorry, I couldn't generate a response." }]);
      }
    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, { role: 'model', text: "Sorry, I encountered an error. Please try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  // Helper function to format text with clickable links
  const formatMessage = (text: string, isUser: boolean) => {
    // Regex to detect URLs starting with http:// or https://
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = text.split(urlRegex);

    return parts.map((part, index) => {
      if (part.match(urlRegex)) {
        return (
          <a
            key={index}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className={`break-all font-semibold ${
              isUser 
                ? 'text-white underline decoration-white/50' 
                : 'text-blue-600 dark:text-blue-400 hover:underline'
            }`}
          >
            {part}
          </a>
        );
      }
      return part;
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-[60] w-[90vw] md:w-[400px] h-[500px] bg-white dark:bg-secondary rounded-2xl shadow-2xl flex flex-col border border-gray-200 dark:border-gray-700 overflow-hidden animate-fade-in">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-secondary p-4 flex justify-between items-center text-white">
        <div className="flex items-center gap-2">
            <div className="bg-accent/20 p-1.5 rounded-full">
                <RobotIcon className="w-5 h-5 text-accent" />
            </div>
            <div>
                <h3 className="font-bold text-sm">Portfolio Assistant</h3>
                <span className="text-xs text-accent flex items-center gap-1">
                    <span className="w-2 h-2 bg-accent rounded-full animate-pulse"></span>
                    Online
                </span>
            </div>
        </div>
        <button onClick={onClose} className="hover:text-accent transition-colors">
          <XIcon className="w-6 h-6" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-[#1f2937]">
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div 
              className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                msg.role === 'user' 
                  ? 'bg-accent text-primary font-medium rounded-tr-none' 
                  : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 shadow-sm border border-gray-100 dark:border-gray-600 rounded-tl-none'
              }`}
            >
              {formatMessage(msg.text, msg.role === 'user')}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white dark:bg-gray-700 p-3 rounded-2xl rounded-tl-none shadow-sm border border-gray-100 dark:border-gray-600 flex items-center gap-1">
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-75"></span>
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSend} className="p-4 bg-white dark:bg-secondary border-t border-gray-100 dark:border-gray-700 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about projects, skills..."
          className="flex-1 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
        />
        <button 
          type="submit" 
          disabled={!input.trim() || isLoading}
          className="bg-primary dark:bg-accent text-white dark:text-primary p-2 rounded-full hover:opacity-90 disabled:opacity-50 transition-all"
        >
          <SendIcon className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
};

export default Chatbot;
