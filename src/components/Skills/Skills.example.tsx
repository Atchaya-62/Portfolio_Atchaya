import React from 'react';
import Skills from './Skills';
import type { Skill } from '../../types';

/**
 * Example usage of the Skills component
 * 
 * This file demonstrates how to use the Skills component with sample data.
 */

const exampleSkills: Skill[] = [
  // AI/ML Skills
  {
    name: 'Machine Learning',
    level: 85,
    category: 'AI/ML',
    description: 'Experienced in supervised and unsupervised learning algorithms, model training, and evaluation.',
  },
  {
    name: 'Deep Learning',
    level: 80,
    category: 'AI/ML',
    description: 'Proficient in neural networks, CNNs, RNNs, and transformers using TensorFlow and PyTorch.',
  },
  {
    name: 'Natural Language Processing',
    level: 75,
    category: 'AI/ML',
    description: 'Experience with text processing, sentiment analysis, and language models.',
  },
  {
    name: 'Computer Vision',
    level: 70,
    category: 'AI/ML',
    description: 'Knowledge of image processing, object detection, and image classification.',
  },
  // Data Skills
  {
    name: 'Data Analysis',
    level: 90,
    category: 'Data',
    description: 'Strong analytical skills with pandas, NumPy, and statistical analysis.',
  },
  {
    name: 'Data Visualization',
    level: 85,
    category: 'Data',
    description: 'Creating insightful visualizations with Matplotlib, Seaborn, and Plotly.',
  },
  {
    name: 'SQL',
    level: 80,
    category: 'Data',
    description: 'Proficient in database querying, optimization, and data manipulation.',
  },
  {
    name: 'Big Data',
    level: 65,
    category: 'Data',
    description: 'Experience with Spark and distributed data processing.',
  },
  // Tools
  {
    name: 'TensorFlow',
    level: 80,
    category: 'Tools',
    description: 'Building and training deep learning models.',
  },
  {
    name: 'PyTorch',
    level: 75,
    category: 'Tools',
    description: 'Research-oriented deep learning framework.',
  },
  {
    name: 'Scikit-learn',
    level: 85,
    category: 'Tools',
    description: 'Classical machine learning algorithms and model evaluation.',
  },
  {
    name: 'Git',
    level: 85,
    category: 'Tools',
    description: 'Version control and collaborative development.',
  },
  {
    name: 'Docker',
    level: 70,
    category: 'Tools',
    description: 'Containerization for reproducible environments.',
  },
  // Languages
  {
    name: 'Python',
    level: 90,
    category: 'Languages',
    description: 'Primary programming language for data science and machine learning projects.',
  },
  {
    name: 'JavaScript',
    level: 75,
    category: 'Languages',
    description: 'Web development and data visualization.',
  },
  {
    name: 'R',
    level: 70,
    category: 'Languages',
    description: 'Statistical computing and graphics.',
  },
  {
    name: 'Java',
    level: 65,
    category: 'Languages',
    description: 'Object-oriented programming and software development.',
  },
];

const SkillsExample: React.FC = () => {
  return (
    <div>
      <h1>Skills Component Example</h1>
      <Skills skills={exampleSkills} />
    </div>
  );
};

export default SkillsExample;
