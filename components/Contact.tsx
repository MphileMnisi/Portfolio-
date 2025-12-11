
import React, { useState } from 'react';
import Section from './Section';
import { GitHubIcon, LinkedInIcon, MailIcon, SparklesIcon } from './icons/Icons';
import { GoogleGenAI } from "@google/genai";

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');
  const [isPolishing, setIsPolishing] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePolish = async () => {
    if (!formData.message.trim()) return;

    setIsPolishing(true);
    setStatus('Polishing your message with AI...');

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `Rewrite the following contact message to be more professional, polite, and concise, suitable for sending to a software developer/engineer. Maintain the original intent but improve the grammar and tone. Return ONLY the rewritten text, nothing else.

        Original Message: "${formData.message}"`,
      });

      if (response.text) {
        setFormData(prev => ({ ...prev, message: response.text.trim() }));
        setStatus('Message polished!');
      }
    } catch (error) {
      console.error("Error polishing message:", error);
      setStatus('Could not polish message. Please try again.');
    } finally {
      setIsPolishing(false);
      setTimeout(() => setStatus(''), 3000);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // In a real app, you would handle form submission here (e.g., API call)
    console.log('Form submitted:', formData);
    setStatus('Thank you for your message!');
    setFormData({ name: '', email: '', message: '' });
    setTimeout(() => setStatus(''), 3000);
  };

  return (
    <Section id="contact" title="Get In Touch">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-lg text-gray-600 dark:text-medium mb-12">
          I'm currently open to new opportunities and collaborations. Whether you have a question or just want to say hi, feel free to reach out. I'll get back to you as soon as I can!
        </p>
        <div className="grid md:grid-cols-2 gap-12">
          <form onSubmit={handleSubmit} className="space-y-6 text-left relative">
            <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required className="w-full bg-white dark:bg-secondary p-3 rounded-md border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-accent transition-shadow" />
            <input type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} required className="w-full bg-white dark:bg-secondary p-3 rounded-md border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-accent transition-shadow" />
            
            <div className="relative">
              <textarea 
                name="message" 
                placeholder="Your Message (Tip: Type a rough draft and click the magic wand to polish it!)" 
                value={formData.message} 
                onChange={handleChange} 
                required 
                rows={5} 
                className="w-full bg-white dark:bg-secondary p-3 rounded-md border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-accent transition-shadow"
              ></textarea>
              
              <button
                type="button"
                onClick={handlePolish}
                disabled={isPolishing || !formData.message.trim()}
                className={`absolute bottom-3 right-3 p-2 rounded-full transition-all duration-300 ${
                  isPolishing 
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                    : 'bg-accent/10 text-accent hover:bg-accent hover:text-white hover:shadow-lg hover:scale-105'
                }`}
                title="Polish with AI"
              >
                 <SparklesIcon className={`w-5 h-5 ${isPolishing ? 'animate-spin' : ''}`} />
              </button>
            </div>

            <button type="submit" className="w-full bg-accent text-primary font-bold py-3 px-6 rounded-md hover:bg-opacity-80 transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg shadow-accent/20">
              Send Message
            </button>
            {status && <p className={`text-center mt-4 text-sm font-medium ${status.includes('Error') ? 'text-red-500' : 'text-accent'} animate-fade-in`}>{status}</p>}
          </form>
          
          <div className="flex flex-col justify-center items-center space-y-6">
            <h3 className="text-2xl font-bold text-primary dark:text-light">Or find me on</h3>
            <div className="flex space-x-8">
              <a href="mailto:nkosimphilem37@gmail.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-medium hover:text-accent transition-colors hover:scale-110 transform duration-200"><MailIcon className="w-10 h-10" /></a>
              <a href="https://github.com/MphileMnisi" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-medium hover:text-accent transition-colors hover:scale-110 transform duration-200"><GitHubIcon className="w-10 h-10" /></a>
              <a href="https://www.linkedin.com/in/nkosimphile-siyabonga-mnisi-0a9a33389/" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-medium hover:text-accent transition-colors hover:scale-110 transform duration-200"><LinkedInIcon className="w-10 h-10" /></a>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Contact;
