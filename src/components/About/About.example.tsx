/**
 * Example usage of the About component
 * 
 * This file demonstrates how to integrate the About component
 * with portfolio data including timeline items for education and milestones.
 */

import React from 'react';
import About from './About';
import type { TimelineItem } from '../../types';
import { portfolioData } from '../../data/portfolioData';

// Example timeline data structure
const exampleTimeline: TimelineItem[] = [
  {
    id: 'university-start',
    year: '2021 - Present',
    title: 'B.S. in AI & Data Science',
    institution: 'Tech University',
    description:
      'Pursuing a comprehensive degree in Artificial Intelligence and Data Science, focusing on machine learning, deep learning, and data analytics.',
    type: 'education',
  },
  {
    id: 'first-internship',
    year: '2022',
    title: 'First Data Science Internship',
    institution: 'DataInsights Inc',
    description:
      'Gained hands-on experience analyzing large datasets and creating visualization dashboards for business insights.',
    type: 'milestone',
  },
  {
    id: 'ml-certification',
    year: '2023',
    title: 'Machine Learning Specialization',
    institution: 'Coursera - deeplearning.ai',
    description:
      'Completed comprehensive specialization covering supervised learning, unsupervised learning, and neural networks.',
    type: 'education',
  },
  {
    id: 'research-position',
    year: '2023',
    title: 'Research Assistant Position',
    institution: 'University AI Lab',
    description:
      'Joined research team working on neural architecture search and automated machine learning techniques.',
    type: 'milestone',
  },
  {
    id: 'hackathon-win',
    year: '2023',
    title: 'AI Hackathon Winner',
    institution: 'University Tech Competition',
    description:
      'Led team to first place by developing an innovative chatbot solution using natural language processing.',
    type: 'milestone',
  },
];

/**
 * Example 1: Basic usage with portfolio data
 */
export const BasicAboutExample: React.FC = () => {
  return (
    <About
      fullBio={portfolioData.owner.fullBio}
      timeline={exampleTimeline}
    />
  );
};

/**
 * Example 2: Custom timeline with only education items
 */
export const EducationOnlyExample: React.FC = () => {
  const educationTimeline = exampleTimeline.filter(
    (item) => item.type === 'education'
  );

  return (
    <About
      fullBio={portfolioData.owner.fullBio}
      timeline={educationTimeline}
    />
  );
};

/**
 * Example 3: Custom timeline with only milestones
 */
export const MilestonesOnlyExample: React.FC = () => {
  const milestonesTimeline = exampleTimeline.filter(
    (item) => item.type === 'milestone'
  );

  return (
    <About
      fullBio={portfolioData.owner.fullBio}
      timeline={milestonesTimeline}
    />
  );
};

/**
 * Example 4: Custom bio text
 */
export const CustomBioExample: React.FC = () => {
  const customBio = `I'm passionate about leveraging AI and Data Science to solve real-world problems.
    
    My journey in technology started with a curiosity about how machines can learn from data.
    Through hands-on projects and research, I've developed expertise in machine learning,
    deep learning, and data analytics.
    
    I believe in the power of data-driven insights to transform industries and improve lives.`;

  return <About fullBio={customBio} timeline={exampleTimeline} />;
};

/**
 * Example 5: Integration in a page component
 */
export const PageIntegrationExample: React.FC = () => {
  return (
    <div className="page-container">
      {/* Other sections above */}
      
      <About
        fullBio={portfolioData.owner.fullBio}
        timeline={exampleTimeline}
      />
      
      {/* Other sections below */}
    </div>
  );
};

/**
 * Helper function to create timeline items from experience data
 */
export const createTimelineFromExperience = (
  experiences: Array<{
    id: string;
    title: string;
    company: string;
    duration: string;
    description: string;
  }>
): TimelineItem[] => {
  return experiences.map((exp) => ({
    id: exp.id,
    year: exp.duration,
    title: exp.title,
    institution: exp.company,
    description: exp.description,
    type: 'milestone' as const,
  }));
};

/**
 * Example 6: Using experience data from portfolio
 */
export const ExperienceTimelineExample: React.FC = () => {
  const experienceTimeline = createTimelineFromExperience(
    portfolioData.experience
  );

  return (
    <About
      fullBio={portfolioData.owner.fullBio}
      timeline={experienceTimeline}
    />
  );
};

export default BasicAboutExample;
