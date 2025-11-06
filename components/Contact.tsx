import React, { useState } from 'react';
import Section from './Section';
import { GitHubIcon, LinkedInIcon, MailIcon } from './icons/Icons';


const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
        <p className="text-lg text-medium mb-12">
          I'm currently open to new opportunities and collaborations. Whether you have a question or just want to say hi, feel free to reach out. I'll get back to you as soon as I can!
        </p>
        <div className="grid md:grid-cols-2 gap-12">
          <form onSubmit={handleSubmit} className="space-y-6 text-left">
            <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required className="w-full bg-secondary p-3 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-accent" />
            <input type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} required className="w-full bg-secondary p-3 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-accent" />
            <textarea name="message" placeholder="Your Message" value={formData.message} onChange={handleChange} required rows={5} className="w-full bg-secondary p-3 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-accent"></textarea>
            <button type="submit" className="w-full bg-accent text-primary font-bold py-3 px-6 rounded-md hover:bg-opacity-80 transition-all duration-300">
              Send Message
            </button>
            {status && <p className="text-center text-accent mt-4">{status}</p>}
          </form>
          <div className="flex flex-col justify-center items-center space-y-6">
            <h3 className="text-2xl font-bold">Or find me on</h3>
            <div className="flex space-x-8">
              <a href="mailto:nkosimphile.mnisi@example.com" target="_blank" rel="noopener noreferrer" className="text-medium hover:text-accent transition-colors"><MailIcon className="w-10 h-10" /></a>
              <a href="https://github.com/nkosimphile-mnisi" target="_blank" rel="noopener noreferrer" className="text-medium hover:text-accent transition-colors"><GitHubIcon className="w-10 h-10" /></a>
              <a href="https://linkedin.com/in/nkosimphile-mnisi" target="_blank" rel="noopener noreferrer" className="text-medium hover:text-accent transition-colors"><LinkedInIcon className="w-10 h-10" /></a>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Contact;