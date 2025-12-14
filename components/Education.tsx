
import React, { useState } from 'react';
import { EducationItem } from '../types';
import Section from './Section';
import { XIcon, BackArrowIcon } from './icons/Icons';

export const educationData: EducationItem[] = [
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
      "Graduated with a Bachelor's degree pass, enabling university entrance.",
      'Excelled in Accounting, Business, Economics and Mathematics subjects.',
      "Participated in the school's science and technology club.",
    ],
  },
];

interface SubCertificate {
  name: string;
  imageUrl: string;
}

interface Certification {
  name: string;
  issuer: string;
  date: string;
  tags: string[];
  certificateUrl?: string;
  subCertificates?: SubCertificate[];
  description?: string;
  iconUrl?: string;
}

export const certifications: Certification[] = [
  {
    name: "AI Bootcamp",
    issuer: "Coursera",
    date: "Oct 2025",
    iconUrl: "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://coursera-badge-assets.s3.amazonaws.com/preview/40dd521d44bd457580b5c65fdba702f1.png?auto=format%2Ccompress&dpr=1",
    tags: ["Generative AI", "LLMs", "Prompt Engineering", "Python", "Azure"],
    description: "A comprehensive specialization comprising 12 professional certificates covering the breadth of modern Artificial Intelligence, from foundational concepts to advanced Generative AI and Ethics.",
    subCertificates: [
      { name: "Introduction to Generative AI", imageUrl: "https://s3.amazonaws.com/coursera_assets/meta_images/generated/CERTIFICATE_LANDING_PAGE/CERTIFICATE_LANDING_PAGE~J8RCL34ESEC7/CERTIFICATE_LANDING_PAGE~J8RCL34ESEC7.jpeg" },
      { name: "Introduction to Artificial Intelligence (AI)", imageUrl: "https://s3.amazonaws.com/coursera_assets/meta_images/generated/CERTIFICATE_LANDING_PAGE/CERTIFICATE_LANDING_PAGE~GTEHXM6OCU21/CERTIFICATE_LANDING_PAGE~GTEHXM6OCU21.jpeg" },
      { name: "Generative AI with Large Language Models", imageUrl: "https://s3.amazonaws.com/coursera_assets/meta_images/generated/CERTIFICATE_LANDING_PAGE/CERTIFICATE_LANDING_PAGE~AZBFGXWQVUGN/CERTIFICATE_LANDING_PAGE~AZBFGXWQVUGN.jpeg" },
      { name: "AI Foundations: Prompt Engineering with ChatGPT", imageUrl: "https://s3.amazonaws.com/coursera_assets/meta_images/generated/CERTIFICATE_LANDING_PAGE/CERTIFICATE_LANDING_PAGE~O2BPGUSL88XK/CERTIFICATE_LANDING_PAGE~O2BPGUSL88XK.jpeg" },
      { name: "AI For Everyone", imageUrl: "https://s3.amazonaws.com/coursera_assets/meta_images/generated/CERTIFICATE_LANDING_PAGE/CERTIFICATE_LANDING_PAGE~UUO5BLVCKIZ3/CERTIFICATE_LANDING_PAGE~UUO5BLVCKIZ3.jpeg" },
      { name: "AI Essentials", imageUrl: "https://s3.amazonaws.com/coursera_assets/meta_images/generated/CERTIFICATE_LANDING_PAGE/CERTIFICATE_LANDING_PAGE~R57WXZQJRSM6/CERTIFICATE_LANDING_PAGE~R57WXZQJRSM6.jpeg" },
      { name: "Trustworthy AI: Managing Bias, Ethics, and Accountability", imageUrl: "https://s3.amazonaws.com/coursera_assets/meta_images/generated/CERTIFICATE_LANDING_PAGE/CERTIFICATE_LANDING_PAGE~R4XZTWPZN07K/CERTIFICATE_LANDING_PAGE~R4XZTWPZN07K.jpeg" },
      { name: "Python for Data Science, AI & Development", imageUrl: "https://s3.amazonaws.com/coursera_assets/meta_images/generated/CERTIFICATE_LANDING_PAGE/CERTIFICATE_LANDING_PAGE~1CYANTUU5UZ9/CERTIFICATE_LANDING_PAGE~1CYANTUU5UZ9.jpeg" },
      { name: "Introduction to Responsible AI", imageUrl: "https://s3.amazonaws.com/coursera_assets/meta_images/generated/CERTIFICATE_LANDING_PAGE/CERTIFICATE_LANDING_PAGE~SBH86WUX11HL/CERTIFICATE_LANDING_PAGE~SBH86WUX11HL.jpeg" },
      { name: "Generative AI for Everyone", imageUrl: "https://s3.amazonaws.com/coursera_assets/meta_images/generated/CERTIFICATE_LANDING_PAGE/CERTIFICATE_LANDING_PAGE~Q3XPMU235KYO/CERTIFICATE_LANDING_PAGE~Q3XPMU235KYO.jpeg" },
      { name: "Building AI Powered Chatbots Without Programming", imageUrl: "https://s3.amazonaws.com/coursera_assets/meta_images/generated/CERTIFICATE_LANDING_PAGE/CERTIFICATE_LANDING_PAGE~MOM4CJHSYCXX/CERTIFICATE_LANDING_PAGE~MOM4CJHSYCXX.jpeg" },
      { name: "Artificial Intelligence on Microsoft Azure", imageUrl: "https://s3.amazonaws.com/coursera_assets/meta_images/generated/CERTIFICATE_LANDING_PAGE/CERTIFICATE_LANDING_PAGE~K8806UCOKF55/CERTIFICATE_LANDING_PAGE~K8806UCOKF55.jpeg" }
    ]
  },
  {
    name: "FNB App Academy",
    issuer: "IT Varsity",
    date: "July 2025",
    iconUrl: "https://www.fnb.co.za/_assets/images/generic/skins/00/navigation/secondary-logo/header-logo_lrg.svg?v=1760273842000",
    tags: ["Full Stack Development", "UX/UI Design", "API Integration", "Business Development"],
    description: "Comprehensive certification covering App Strategies, GitHub & Collaboration, SDLC, UX Design & Layouts, Design Thinking, APIs & Data Processing, User-Centric Development, Data Management, Backend Development, AI in Business, and App Marketing.",
    certificateUrl: "https://media.licdn.com/dms/image/v2/D4E22AQE1UCWelVUV8w/feedshare-shrink_800/B4EZpPGJdrHMAg-/0/1762263603858?e=1767225600&v=beta&t=9DDRFgkMxazWyH4PvUA4AeHoC14PlNwaBswpw3tfAhY"
  }
];

const EducationCard: React.FC<{ item: EducationItem }> = ({ item }) => (
  <div className="pl-8 relative before:absolute before:left-2 before:top-2 before:w-4 before:h-4 before:bg-accent before:rounded-full before:border-4 before:border-light dark:before:border-secondary">
    <div className="mb-4">
      <h3 className="text-xl font-bold text-primary dark:text-light">{item.degree}</h3>
      <div className="flex justify-between items-center pr-4">
        <p className="text-accent font-semibold">{item.institution}</p>
        <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">{item.duration}</span>
      </div>
    </div>
    <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-medium">
      {item.details.map((detail, index) => (
        <li key={index}>{detail}</li>
      ))}
    </ul>
  </div>
);

const CertificateModal: React.FC<{ cert: Certification; onClose: () => void }> = ({ cert, onClose }) => {
  const [selectedSubCert, setSelectedSubCert] = useState<SubCertificate | null>(null);

  // If there are sub-certificates and none is selected, show grid. Otherwise show single image view.
  const showGrid = cert.subCertificates && !selectedSubCert;

  const currentTitle = selectedSubCert ? selectedSubCert.name : cert.name;
  const currentImage = selectedSubCert ? selectedSubCert.imageUrl : cert.certificateUrl;

  return (
    <div 
      className="fixed inset-0 bg-black/80 z-[60] flex items-center justify-center p-4 backdrop-blur-sm" 
      onClick={onClose}
    >
      <div 
        className="bg-white dark:bg-secondary rounded-xl max-w-5xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl animate-fade-in" 
        onClick={e => e.stopPropagation()}
      >
        <div className="p-4 border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-secondary">
          <div className="flex justify-between items-start">
            <div className="flex-1 pr-4">
                {selectedSubCert && (
                  <button 
                    onClick={() => setSelectedSubCert(null)} 
                    className="flex items-center gap-1 text-xs font-bold text-accent mb-2 hover:underline uppercase tracking-wider"
                  >
                    <BackArrowIcon className="w-4 h-4" /> Back to Collection
                  </button>
                )}
                <div className="flex items-center gap-3">
                    {cert.iconUrl && !selectedSubCert && (
                        <img src={cert.iconUrl} alt="icon" className="w-8 h-8 object-contain bg-white rounded-md p-1" />
                    )}
                    <div>
                        <h3 className="text-xl font-bold text-primary dark:text-light">{currentTitle}</h3>
                        <p className="text-sm text-accent font-medium mt-1">{cert.issuer} • {cert.date}</p>
                    </div>
                </div>
            </div>
            <button 
                onClick={onClose} 
                className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors group flex-shrink-0"
            >
                <XIcon className="w-6 h-6 text-gray-500 dark:text-gray-400 group-hover:text-red-500" />
            </button>
          </div>
          
          {/* Only show description in main view */}
          {!selectedSubCert && cert.description && (
            <p className="mt-3 text-sm text-gray-600 dark:text-gray-300 leading-relaxed border-t border-gray-200 dark:border-gray-600 pt-3">
                {cert.description}
            </p>
          )}
        </div>
        
        <div className={`flex-1 overflow-auto bg-gray-100 dark:bg-black/50 p-6 ${!showGrid ? 'flex items-center justify-center' : ''}`}>
          {showGrid ? (
             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {cert.subCertificates!.map((sub, idx) => (
                    <div 
                        key={idx} 
                        onClick={() => setSelectedSubCert(sub)}
                        className="flex flex-col group bg-white dark:bg-secondary/60 rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer hover:-translate-y-1"
                    >
                        <div className="relative overflow-hidden aspect-[4/3]">
                            <img 
                                src={sub.imageUrl} 
                                alt={sub.name} 
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                                <span className="opacity-0 group-hover:opacity-100 bg-white/90 text-primary text-xs font-bold px-3 py-1 rounded-full transform scale-90 group-hover:scale-100 transition-all shadow-lg">
                                    View Certificate
                                </span>
                            </div>
                        </div>
                        <div className="p-3">
                            <h5 className="text-sm font-semibold text-primary dark:text-light leading-tight group-hover:text-accent transition-colors">{sub.name}</h5>
                        </div>
                    </div>
                ))}
             </div>
          ) : (
            <div className="flex items-center justify-center w-full h-full">
                {currentImage ? (
                    <img 
                    src={currentImage} 
                    alt={`${currentTitle} Certificate`} 
                    className="max-w-full max-h-[70vh] object-contain shadow-lg rounded animate-fade-in" 
                    />
                ) : (
                    <div className="text-center p-10 text-gray-500">No certificate image available.</div>
                )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

const Education: React.FC = () => {
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);

  const hasContent = (cert: Certification) => !!(cert.certificateUrl || (cert.subCertificates && cert.subCertificates.length > 0));

  return (
    <Section id="education" title="Education & Certifications">
      <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
        {/* Main Education Timeline */}
        <div className="md:col-span-2">
           <h3 className="text-2xl font-bold mb-8 text-primary dark:text-white flex items-center gap-3">
             <span className="w-2 h-8 bg-accent rounded-full"></span>
             <img 
               src="https://static.vecteezy.com/system/resources/thumbnails/004/557/333/small/graduation-cap-cartoon-object-vector.jpg" 
               alt="Academic Background" 
               className="w-10 h-10 object-cover bg-white rounded-full p-1 shadow-sm border border-gray-100 dark:border-gray-700" 
             />
             Academic Background
           </h3>
           <div className="relative border-l-2 border-gray-200 dark:border-secondary space-y-12">
            {educationData.map((item, index) => (
              <EducationCard key={index} item={item} />
            ))}
          </div>
        </div>

        {/* Certifications Column */}
        <div className="md:col-span-1">
          <h3 className="text-2xl font-bold mb-8 text-primary dark:text-white flex items-center gap-3">
             <span className="w-2 h-8 bg-accent rounded-full"></span>
             Certifications
           </h3>
           <div className="space-y-6">
             {certifications.map((cert, idx) => {
               const clickable = hasContent(cert);
               return (
                <div 
                    key={idx} 
                    onClick={() => clickable && setSelectedCert(cert)}
                    className={`bg-white dark:bg-secondary/40 p-5 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 transition-all duration-300 ${clickable ? 'cursor-pointer hover:border-accent hover:shadow-md hover:-translate-y-1 group' : ''}`}
                >
                    <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-3">
                             {cert.iconUrl && (
                                <img src={cert.iconUrl} alt={`${cert.name} Icon`} className="w-10 h-10 object-contain bg-white rounded-md p-1" />
                             )}
                             <h4 className="font-bold text-primary dark:text-light group-hover:text-accent transition-colors">{cert.name}</h4>
                        </div>
                        {clickable && (
                            <span className="text-[10px] bg-accent/10 text-accent px-2 py-0.5 rounded-full uppercase font-bold tracking-wider mt-1 flex-shrink-0">
                                {cert.subCertificates ? 'View All' : 'View'}
                            </span>
                        )}
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{cert.issuer} • {cert.date}</p>
                    <div className="flex flex-wrap gap-2">
                    {cert.tags.map(tag => (
                        <span key={tag} className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-2 py-1 rounded">
                        {tag}
                        </span>
                    ))}
                    </div>
                </div>
               );
             })}
           </div>
        </div>
      </div>

      {selectedCert && (
        <CertificateModal cert={selectedCert} onClose={() => setSelectedCert(null)} />
      )}
    </Section>
  );
};

export default Education;
