import React from 'react';
import Projects from './Projects';
import type { Project } from '../../types';

/**
 * Example usage of the Projects component
 * 
 * This file demonstrates how to use the Projects component with sample data.
 */

// Sample project data
const exampleProjects: Project[] = [
  {
    id: 'sentiment-analyzer',
    title: 'Sentiment Analysis Engine',
    description: 'A deep learning-based sentiment analysis tool that classifies text emotions with 92% accuracy using BERT transformers.',
    techStack: ['Python', 'PyTorch', 'BERT', 'Flask', 'Docker'],
    category: 'NLP',
    githubUrl: 'https://github.com/example/sentiment-analyzer',
    demoUrl: 'https://sentiment-demo.example.com',
    imageUrl: '/images/projects/sentiment.jpg',
  },
  {
    id: 'image-classifier',
    title: 'Medical Image Classifier',
    description: 'CNN-based system for classifying medical images to assist in early disease detection.',
    techStack: ['Python', 'TensorFlow', 'Keras', 'OpenCV'],
    category: 'Computer Vision',
    githubUrl: 'https://github.com/example/medical-classifier',
    imageUrl: '/images/projects/medical.jpg',
  },
  {
    id: 'recommendation-system',
    title: 'Movie Recommendation System',
    description: 'Collaborative filtering recommendation engine using matrix factorization and neural networks.',
    techStack: ['Python', 'Scikit-learn', 'Pandas', 'NumPy'],
    category: 'Machine Learning',
    githubUrl: 'https://github.com/example/movie-recommender',
    demoUrl: 'https://movies-demo.example.com',
    imageUrl: '/images/projects/movies.jpg',
  },
  {
    id: 'data-dashboard',
    title: 'Real-time Analytics Dashboard',
    description: 'Interactive dashboard for visualizing real-time data streams with predictive analytics.',
    techStack: ['Python', 'Plotly', 'Dash', 'PostgreSQL'],
    category: 'Data Visualization',
    githubUrl: 'https://github.com/example/analytics-dashboard',
    demoUrl: 'https://dashboard-demo.example.com',
    imageUrl: '/images/projects/dashboard.jpg',
  },
  {
    id: 'chatbot',
    title: 'AI Customer Support Chatbot',
    description: 'Intelligent chatbot using transformer models for natural conversation and customer support.',
    techStack: ['Python', 'Transformers', 'FastAPI', 'Redis'],
    category: 'NLP',
    githubUrl: 'https://github.com/example/chatbot',
    imageUrl: '/images/projects/chatbot.jpg',
  },
  {
    id: 'object-detection',
    title: 'Real-time Object Detection',
    description: 'YOLO-based object detection system for real-time video analysis.',
    techStack: ['Python', 'YOLO', 'OpenCV', 'Flask'],
    category: 'Computer Vision',
    githubUrl: 'https://github.com/example/object-detection',
    demoUrl: 'https://detection-demo.example.com',
    imageUrl: '/images/projects/detection.jpg',
  },
];

/**
 * Basic usage example
 */
export function BasicExample() {
  return (
    <div style={{ minHeight: '100vh' }}>
      <Projects projects={exampleProjects} />
    </div>
  );
}

/**
 * Example with single category
 */
export function SingleCategoryExample() {
  const nlpProjects = exampleProjects.filter((p) => p.category === 'NLP');

  return (
    <div style={{ minHeight: '100vh' }}>
      <Projects projects={nlpProjects} />
    </div>
  );
}

/**
 * Example with empty projects
 */
export function EmptyProjectsExample() {
  return (
    <div style={{ minHeight: '100vh' }}>
      <Projects projects={[]} />
    </div>
  );
}

/**
 * Example with many projects (testing grid layout)
 */
export function ManyProjectsExample() {
  const manyProjects: Project[] = [
    ...exampleProjects,
    ...exampleProjects.map((p, i) => ({
      ...p,
      id: `${p.id}-copy-${i}`,
      title: `${p.title} (Copy ${i + 1})`,
    })),
  ];

  return (
    <div style={{ minHeight: '100vh' }}>
      <Projects projects={manyProjects} />
    </div>
  );
}

/**
 * Example with projects without optional fields
 */
export function MinimalProjectsExample() {
  const minimalProjects: Project[] = [
    {
      id: 'minimal-1',
      title: 'Minimal Project 1',
      description: 'A project with only required fields',
      techStack: ['React', 'TypeScript'],
      category: 'Web Development',
      imageUrl: '/images/placeholder.jpg',
    },
    {
      id: 'minimal-2',
      title: 'Minimal Project 2',
      description: 'Another minimal project',
      techStack: ['Python', 'Flask'],
      category: 'Backend',
      imageUrl: '/images/placeholder.jpg',
    },
  ];

  return (
    <div style={{ minHeight: '100vh' }}>
      <Projects projects={minimalProjects} />
    </div>
  );
}

/**
 * Example demonstrating responsive behavior
 * (Resize browser window to see responsive grid)
 */
export function ResponsiveExample() {
  return (
    <div style={{ minHeight: '100vh' }}>
      <div style={{ padding: '2rem', textAlign: 'center', background: '#f3f4f6' }}>
        <h1>Resize your browser window to see responsive behavior</h1>
        <p>The grid will adapt from multiple columns to single column on mobile</p>
      </div>
      <Projects projects={exampleProjects} />
    </div>
  );
}

/**
 * Example with theme wrapper
 */
export function ThemedExample() {
  const [theme, setTheme] = React.useState<'light' | 'dark' | 'futuristic'>('light');

  return (
    <div data-theme={theme} style={{ minHeight: '100vh' }}>
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <button onClick={() => setTheme('light')} style={{ margin: '0.5rem' }}>
          Light Theme
        </button>
        <button onClick={() => setTheme('dark')} style={{ margin: '0.5rem' }}>
          Dark Theme
        </button>
        <button onClick={() => setTheme('futuristic')} style={{ margin: '0.5rem' }}>
          Futuristic Theme
        </button>
      </div>
      <Projects projects={exampleProjects} />
    </div>
  );
}

// Default export for easy importing
export default BasicExample;
