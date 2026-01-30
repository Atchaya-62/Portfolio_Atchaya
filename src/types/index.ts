// Theme types
export type ThemeMode = 'light' | 'dark';

export interface ThemeConfig {
  mode: ThemeMode;
  colors: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
    accent: string;
  };
  animations: {
    transitionDuration: number;
  };
}

// Animation types
export interface AnimationConfig {
  duration: number;
  easing: string;
  delay?: number;
}

export interface ScrollAnimationConfig extends AnimationConfig {
  threshold: number;
  triggerOnce: boolean;
}

// Navigation types
export interface MenuItem {
  id: string;
  label: string;
  type: 'scroll' | 'route';
  target: string;
}

// Portfolio data types
export interface Skill {
  name: string;
  level: number; // 0-100
  category: 'AI/ML' | 'Data' | 'Tools' | 'Languages';
  description: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  category: string;
  githubUrl?: string;
  demoUrl?: string;
  modelUrl?: string;
  imageUrl: string;
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  duration: string;
  description: string;
  icon: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  icon: string;
  certificateUrl?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  date: string;
}

export interface TimelineItem {
  id: string;
  year: string;
  title: string;
  institution: string;
  description: string;
  type: 'education' | 'milestone';
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface PortfolioOwner {
  name: string;
  headline: string;
  subtitle: string;
  aboutSummary: string;
  photoUrl: string;
  fullBio: string;
}

export interface PortfolioData {
  owner: PortfolioOwner;
  social: {
    linkedin: string;
    github: string;
    twitter?: string;
    email: string;
  };
  skills: Skill[];
  projects: Project[];
  experience: Experience[];
  certifications: Certification[];
  achievements: Achievement[];
  timeline: TimelineItem[];
  socialLinks: SocialLink[];
}

// Form types
export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface ContactFormErrors {
  name?: string;
  email?: string;
  message?: string;
}
