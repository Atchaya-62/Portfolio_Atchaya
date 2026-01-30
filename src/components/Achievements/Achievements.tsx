import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import type { Achievement } from '../../types';
import './Achievements.css';

export interface AchievementsProps {
  achievements: Achievement[];
}

const Achievements: React.FC<AchievementsProps> = ({ achievements }) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const badgeVariants = {
    hidden: { opacity: 0, scale: 0, rotate: -180 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        type: 'spring',
        stiffness: 200,
        damping: 15,
      },
    },
  };

  const badgeHoverVariants = {
    scale: 1.15,
    rotate: 5,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  };

  return (
    <section
      id="achievements"
      className="achievements-section"
      aria-labelledby="achievements-heading"
      ref={ref}
    >
      <div className="achievements-container">
        <motion.div
          className="achievements-content"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {/* Section Title */}
          <motion.h2
            id="achievements-heading"
            className="achievements-title"
            variants={badgeVariants}
          >
            Achievements
          </motion.h2>

          {/* Badges Grid */}
          <div className="badges-grid" role="list" aria-label="Achievements list">
            {achievements.map((achievement) => (
              <motion.article
                key={achievement.id}
                className="badge-wrapper"
                variants={badgeVariants}
                whileHover={badgeHoverVariants}
                onHoverStart={() => setHoveredId(achievement.id)}
                onHoverEnd={() => setHoveredId(null)}
                onFocus={() => setHoveredId(achievement.id)}
                onBlur={() => setHoveredId(null)}
                tabIndex={0}
                role="listitem"
                aria-label={`${achievement.title} achievement from ${achievement.date}`}
                aria-describedby={hoveredId === achievement.id ? `tooltip-${achievement.id}` : undefined}
              >
                <div className="badge-icon" aria-hidden="true">
                  {achievement.icon}
                </div>
                <time className="badge-date">{achievement.date}</time>

                {/* Tooltip */}
                {hoveredId === achievement.id && (
                  <motion.div
                    id={`tooltip-${achievement.id}`}
                    className="badge-tooltip"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    role="tooltip"
                  >
                    <h4 className="tooltip-title">{achievement.title}</h4>
                    <p className="tooltip-description">{achievement.description}</p>
                  </motion.div>
                )}
              </motion.article>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Achievements;
