import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import ProjectCard from './ProjectCard';
import type { Project } from '../../types';
import './Projects.css';

export interface ProjectsProps {
  projects: Project[];
}

const Projects: React.FC<ProjectsProps> = ({ projects }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(projects);

  // Intersection observer for scroll-triggered animations
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  // Get unique categories from projects
  const categories = ['All', ...Array.from(new Set(projects.map((p) => p.category)))];

  // Filter projects when category changes
  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter((p) => p.category === selectedCategory));
    }
  }, [selectedCategory, projects]);

  // Handle category filter selection
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <section className="projects-section" id="projects" aria-labelledby="projects-heading">
      <div className="projects-container">
        {/* Section Header */}
        <motion.header
          className="projects-header"
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 id="projects-heading" className="projects-title">Featured Projects</h2>
          <p className="projects-subtitle">
            Explore my portfolio of AI, machine learning, and data science projects
          </p>
        </motion.header>

        {/* Category Filters */}
        <motion.nav
          className="projects-filters"
          initial={{ opacity: 0, y: -10 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          role="navigation"
          aria-label="Project category filters"
        >
          {categories.map((category) => (
            <button
              key={category}
              className={`filter-button ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => handleCategoryChange(category)}
              aria-pressed={selectedCategory === category}
              aria-label={`Filter projects by ${category}`}
            >
              {category}
            </button>
          ))}
        </motion.nav>

        {/* Projects Grid */}
        <motion.div
          ref={ref}
          className="projects-grid"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          role="list"
          aria-label="Projects list"
        >
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{
                  duration: 0.5,
                  delay: 0.1 * index,
                }}
                role="listitem"
              >
                <ProjectCard project={project} />
              </motion.div>
            ))
          ) : (
            <div className="no-projects" role="status">
              <p>No projects found in this category.</p>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
