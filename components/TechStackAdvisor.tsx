
import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import Section from './Section';
import { CodeIcon, ServerIcon, DatabaseIcon, SparklesIcon, RobotIcon } from './icons/Icons';

interface StackRecommendation {
  frontend: string[];
  backend: string[];
  database: string[];
  ai_features: string[];
  reasoning: string;
}

const TechStackAdvisor: React.FC = () => {
  const [idea, setIdea] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [recommendation, setRecommendation] = useState<StackRecommendation | null>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!idea.trim()) return;

    setIsLoading(true);
    setRecommendation(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `
        Act as a Senior Software Architect. The user has this project idea: "${idea}".
        
        Analyze the requirements and recommend a modern, scalable tech stack.
        Return a valid JSON object (no markdown, no backticks) with this exact structure:
        {
          "frontend": ["Tech 1", "Tech 2"],
          "backend": ["Tech 1", "Tech 2"],
          "database": ["Tech 1"],
          "ai_features": ["Feature 1", "Feature 2"],
          "reasoning": "A concise explanation (max 3 sentences) of why this stack fits the use case."
        }
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      const text = response.text || "{}";
      const cleanText = text.replace(/```json/g, '').replace(/```/g, '').trim();
      const data = JSON.parse(cleanText);
      setRecommendation(data);
    } catch (error) {
      console.error("Error generating stack:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Section id="architect" title="AI Solution Architect">
      <div className="max-w-4xl mx-auto">
        <p className="text-center text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
          Have an app idea? Describe it below, and I'll use my AI Architect agent to design the perfect tech stack and feature set for you.
        </p>

        <form onSubmit={handleGenerate} className="mb-12 relative">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-accent to-blue-500 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative">
                <textarea
                    value={idea}
                    onChange={(e) => setIdea(e.target.value)}
                    placeholder="e.g., I want to build a platform where chefs can sell meal prep plans to busy professionals..."
                    className="w-full h-32 p-4 bg-white dark:bg-secondary rounded-lg border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-accent resize-none transition-all"
                />
                <button
                    type="submit"
                    disabled={isLoading || !idea.trim()}
                    className={`absolute bottom-4 right-4 flex items-center gap-2 px-4 py-2 rounded-full font-bold text-sm transition-all ${
                    isLoading || !idea.trim()
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        : 'bg-accent text-primary hover:shadow-lg hover:scale-105'
                    }`}
                >
                    {isLoading ? (
                    <>
                        <span className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></span>
                        Architecting...
                    </>
                    ) : (
                    <>
                        <SparklesIcon className="w-4 h-4" />
                        Generate Stack
                    </>
                    )}
                </button>
            </div>
          </div>
        </form>

        {recommendation && (
          <div className="grid md:grid-cols-2 gap-6 animate-fade-in">
            {/* Reasoning Card */}
            <div className="md:col-span-2 bg-gradient-to-br from-accent/10 to-transparent p-6 rounded-xl border border-accent/20">
                <div className="flex items-center gap-3 mb-2">
                    <RobotIcon className="w-6 h-6 text-accent" />
                    <h3 className="font-bold text-lg text-primary dark:text-white">Architect's Verdict</h3>
                </div>
                <p className="text-gray-700 dark:text-gray-300 italic">"{recommendation.reasoning}"</p>
            </div>

            {/* Frontend */}
            <div className="bg-white dark:bg-secondary/50 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:border-accent transition-colors">
              <div className="flex items-center gap-3 mb-4 text-blue-500">
                <CodeIcon className="w-6 h-6" />
                <h4 className="font-bold text-primary dark:text-white">Frontend</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {recommendation.frontend.map((tech, i) => (
                  <span key={i} className="px-3 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-300 rounded-lg text-sm font-medium">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Backend */}
            <div className="bg-white dark:bg-secondary/50 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:border-accent transition-colors">
              <div className="flex items-center gap-3 mb-4 text-green-500">
                <ServerIcon className="w-6 h-6" />
                <h4 className="font-bold text-primary dark:text-white">Backend</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {recommendation.backend.map((tech, i) => (
                  <span key={i} className="px-3 py-1 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-300 rounded-lg text-sm font-medium">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Database */}
            <div className="bg-white dark:bg-secondary/50 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:border-accent transition-colors">
              <div className="flex items-center gap-3 mb-4 text-orange-500">
                <DatabaseIcon className="w-6 h-6" />
                <h4 className="font-bold text-primary dark:text-white">Database</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {recommendation.database.map((tech, i) => (
                  <span key={i} className="px-3 py-1 bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-300 rounded-lg text-sm font-medium">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* AI Features */}
            <div className="bg-white dark:bg-secondary/50 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:border-accent transition-colors">
              <div className="flex items-center gap-3 mb-4 text-purple-500">
                <SparklesIcon className="w-6 h-6" />
                <h4 className="font-bold text-primary dark:text-white">Suggested AI Features</h4>
              </div>
              <ul className="space-y-2">
                {recommendation.ai_features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-purple-500 shrink-0"></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </Section>
  );
};

export default TechStackAdvisor;
