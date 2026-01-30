import React from 'react';
import Experience from './Experience';
import type { Experience as ExperienceType, Certification } from '../../types';

/**
 * Example usage of the Experience component
 */

const exampleExperience: ExperienceType[] = [
  {
    id: 'ml-intern',
    title: 'Machine Learning Intern',
    company: 'TechCorp AI',
    duration: 'Jun 2023 - Aug 2023',
    description: 'Developed and deployed ML models for customer behavior prediction, improving accuracy by 15%.',
    icon: '💼',
  },
  {
    id: 'research-assistant',
    title: 'Research Assistant',
    company: 'University AI Lab',
    duration: 'Jan 2023 - Present',
    description: 'Conducting research on neural architecture search and automated machine learning.',
    icon: '🔬',
  },
  {
    id: 'data-analyst',
    title: 'Data Analyst Intern',
    company: 'DataInsights Inc',
    duration: 'Jun 2022 - Aug 2022',
    description: 'Analyzed large datasets to extract actionable insights and created visualization dashboards.',
    icon: '📊',
  },
];

const exampleCertifications: Certification[] = [
  {
    id: 'deep-learning',
    name: 'Deep Learning Specialization',
    issuer: 'Coursera - deeplearning.ai',
    date: '2023',
    icon: '🎓',
  },
  {
    id: 'ml-engineer',
    name: 'Machine Learning Engineer',
    issuer: 'Google Cloud',
    date: '2023',
    icon: '☁️',
  },
  {
    id: 'data-science',
    name: 'Professional Data Science',
    issuer: 'IBM',
    date: '2022',
    icon: '📈',
  },
];

export const ExperienceExample: React.FC = () => {
  return (
    <div style={{ minHeight: '100vh' }}>
      <Experience
        experience={exampleExperience}
        certifications={exampleCertifications}
      />
    </div>
  );
};

export default ExperienceExample;
