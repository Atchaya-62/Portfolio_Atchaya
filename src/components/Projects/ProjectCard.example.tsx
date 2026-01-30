import React from 'react';
import ProjectCard from './ProjectCard';
import type { Project } from '../../types';

/**
 * Example usage of the ProjectCard component
 * 
 * This file demonstrates how to use the ProjectCard component
 * with different project configurations.
 */

// Example project with both GitHub and demo links
const fullProject: Project = {
  id: 'sentiment-analyzer',
  title: 'Sentiment Analysis Engine',
  description: 'A deep learning-based sentiment analysis tool that classifies text emotions with 92% accuracy using BERT transformers.',
  techStack: ['Python', 'PyTorch', 'BERT', 'Flask', 'Docker'],
  category: 'NLP',
  githubUrl: 'https://github.com/alexjohnson/sentiment-analyzer',
  demoUrl: 'https://sentiment-demo.example.com',
  imageUrl: '/images/projects/sentiment.jpg',
};

// Example project with only GitHub link
const githubOnlyProject: Project = {
  id: 'image-classifier',
  title: 'Medical Image Classifier',
  description: 'CNN-based system for classifying medical images to assist in early disease detection.',
  techStack: ['Python', 'TensorFlow', 'Keras', 'OpenCV'],
  category: 'Computer Vision',
  githubUrl: 'https://github.com/alexjohnson/medical-classifier',
  imageUrl: '/images/projects/medical.jpg',
};

// Example project with only demo link
const demoOnlyProject: Project = {
  id: 'data-dashboard',
  title: 'Real-time Analytics Dashboard',
  description: 'Interactive dashboard for visualizing real-time data streams with predictive analytics.',
  techStack: ['Python', 'Plotly', 'Dash', 'PostgreSQL'],
  category: 'Data Visualization',
  demoUrl: 'https://dashboard-demo.example.com',
  imageUrl: '/images/projects/dashboard.jpg',
};

export const ProjectCardExamples: React.FC = () => {
  return (
    <div style={{ padding: '2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
      <div>
        <h3>Full Project (GitHub + Demo)</h3>
        <ProjectCard project={fullProject} />
      </div>
      
      <div>
        <h3>GitHub Only</h3>
        <ProjectCard project={githubOnlyProject} />
      </div>
      
      <div>
        <h3>Demo Only</h3>
        <ProjectCard project={demoOnlyProject} />
      </div>
    </div>
  );
};

export default ProjectCardExamples;
