import React from 'react';
import Achievements from './Achievements';
import type { Achievement } from '../../types';

/**
 * Example usage of the Achievements component
 * 
 * This file demonstrates how to use the Achievements component
 * with sample data.
 */

const exampleAchievements: Achievement[] = [
  {
    id: 'hackathon-winner',
    title: 'AI Hackathon Winner',
    description: 'First place in university AI hackathon for developing an innovative chatbot solution.',
    icon: '🏆',
    date: '2023',
  },
  {
    id: 'research-paper',
    title: 'Published Research Paper',
    description: 'Co-authored paper on neural architecture search published in conference proceedings.',
    icon: '📝',
    date: '2023',
  },
  {
    id: 'kaggle-expert',
    title: 'Kaggle Expert',
    description: 'Achieved Expert tier on Kaggle with multiple top 10% competition finishes.',
    icon: '🥇',
    date: '2023',
  },
  {
    id: 'scholarship',
    title: 'Merit Scholarship',
    description: 'Awarded full merit scholarship for academic excellence in AI & Data Science.',
    icon: '🎖️',
    date: '2022',
  },
  {
    id: 'dean-list',
    title: "Dean's List",
    description: 'Recognized on the Dean\'s List for outstanding academic performance.',
    icon: '⭐',
    date: '2022',
  },
  {
    id: 'open-source',
    title: 'Open Source Contributor',
    description: 'Active contributor to major machine learning open source projects.',
    icon: '💻',
    date: '2023',
  },
];

const AchievementsExample: React.FC = () => {
  return (
    <div style={{ minHeight: '100vh' }}>
      <Achievements achievements={exampleAchievements} />
    </div>
  );
};

export default AchievementsExample;
