// Fix: Removed a self-import of the `Project` type which was causing a name conflict.
export interface Project {
  title: string;
  description: string;
  detailedDescription?: string;
  tags: string[];
  imageUrl: string;
  liveUrl?: string;
  sourceUrl?: string;
}

export interface ExperienceItem {
  role: string;
  company: string;
  duration: string;
  description: string[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  duration: string;
  details: string[];
}