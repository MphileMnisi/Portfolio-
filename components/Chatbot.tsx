
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
   - Designing and deploying full-stack web applications using Next.js and Firebase.
   - Engineering AI solutions (RAG pipelines, BERT models for SentiCoreX).
   - Architecting the "CAPACITI Intelligent Talent Hub" for AI-driven candidate matching.
   - Actively applying ML concepts in agile environments.

**Projects:**
1. **Pentacore** (Live: https://pentacore-189473728151.us-west1.run.app/)
   - Tech: Google Cloud Run, Docker, React, DevOps.
   - Features: Serverless Architecture, Containerization, Auto-Scaling.
   - Solution: Optimized Docker images for cold start latency.

2. **CAPACITI Intelligent Talent Hub** (Live: https://capacitihub.vercel.app/)
   - Tech: React, Next.js, AI Matching, Tailwind CSS.
   - Features: AI-Driven Matching, Dynamic Profiles, Analytics Dashboard.
   - Solution: Semantic mapping layer for skill taxonomy standardization.

3. **RecruitmentAI.Notebook** (Live: https://bias-in-hiring.vercel.app/)
   - Tech: AI Ethics, Data Visualization, React.
   - Features: Bias Auditing Metrics, Interactive Visualizations, Mitigation Algorithms.
   - Solution: Web Workers for heavy client-side statistical processing.

4. **Conversational AI Chatbot** (Live: https://chatbot-ten-mu-89.vercel.app/)
   - Tech: React, TypeScript, AI/ML, NLP API.
   - Features: Context Retention, Streaming Responses.
   - Solution: Sliding window context manager.

5. **AI Resume Builder** (Live: https://ai-resume-builder-one-phi.vercel.app/)
   - Tech: React, Next.js, Generative AI, PDF Gen.
   - Features: ATS Optimization, AI Content Generation, PDF Export.
   - Solution: Canvas-based rendering for formatting consistency.

6. **SentiCoreX** (Live: https://senticore-x.vercel.app/)
   - Tech: React, AI/ML, NLP, Data Viz.
   - Features: Multi-Channel Ingestion, Real-time Analysis.
   - Solution: Fine-tuned BERT model for sarcasm detection.

**Skills:**
- Frontend: React.js, Next.js, TypeScript, Tailwind CSS, GSAP.
- Backend: Node.js, Python, Firebase, RESTful APIs, GraphQL.
- AI/ML: Generative AI, LLM Integration, NLP, Prompt Engineering.
- Professional: Agile/Scrum, Git, System Architecture.

**Education:**
- National Diploma in Information Technology, Vaal University of Technology (2022 - 2024).
- Matric, Thuto Lesedi Secondary School (2017 - 2021).
- Certifications: 
  - FNB App Academy (IT Varsity, 2025).
  - AI Bootcamp (Coursera, Oct 2025) - 12 professional certificates.

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
