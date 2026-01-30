import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import type { Skill } from '../../types';
import './Skills.css';

export interface SkillsProps {
  skills: Skill[];
}

const Skills: React.FC<SkillsProps> = ({ skills }) => {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  // Group skills by category
  const skillsByCategory = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  // Define category display info
  const categoryInfo: Record<string, { title: string }> = {
    'Languages': { title: 'Languages' },
    'AI/ML': { title: 'AI / ML' },
    'Data': { title: 'Data ' },
    'Tools': { title: 'Dev Tools' },
  };

  // Calculate proficiency bars (out of 3)
  const getProficiencyBars = (level: number) => {
    // Convert level (0-100) to bars (0-3)
    if (level >= 80) return 3;
    if (level >= 60) return 2;
    return 1;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <section
      id="skills"
      className="skills-section"
      aria-labelledby="skills-heading"
      ref={ref}
    >
      <div className="skills-container">
        <motion.div
          className="skills-content"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {/* Section Title */}
          <motion.div className="skills-header" variants={itemVariants}>
            <h2 id="skills-heading" className="skills-title">STACK</h2>
            <p className="skills-subtitle">The tools used to construct digital realities.</p>
          </motion.div>

          {/* Skills Grid with Proficiency Bars */}
          <motion.div className="skills-grid" variants={containerVariants}>
            {Object.entries(categoryInfo).map(([category, info]) => {
              const categorySkills = skillsByCategory[category] || [];
              if (categorySkills.length === 0) return null;

              return (
                <motion.div
                  key={category}
                  className="skill-category-section"
                  variants={itemVariants}
                >
                  <div className="skill-category-header">
                    <h3 className="skill-category-title">{info.title}</h3>
                  </div>
                  <div className="skill-list">
                    {categorySkills.map((skill) => {
                      const proficiencyBars = getProficiencyBars(skill.level);
                      return (
                        <motion.div 
                          key={skill.name} 
                          className="skill-item"
                          whileHover={{ scale: 1.02, x: 8 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <h4 className="skill-name">{skill.name}</h4>
                          <div className="skill-proficiency">
                            {[1, 2, 3].map((bar) => (
                              <span 
                                key={bar} 
                                className={`proficiency-bar ${bar <= proficiencyBars ? 'active' : ''}`}
                              ></span>
                            ))}
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
