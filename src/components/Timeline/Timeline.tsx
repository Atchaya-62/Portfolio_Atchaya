import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import type { TimelineItem } from '../../types';
import './Timeline.css';

export interface TimelineProps {
  timeline: TimelineItem[];
}

const Timeline: React.FC<TimelineProps> = ({ timeline }) => {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section
      id="timeline"
      className="timeline-section"
      aria-labelledby="timeline-heading"
      ref={ref}
    >
      <div className="timeline-container">
        <motion.h2
          id="timeline-heading"
          className="timeline-title"
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
        >
          My Journey
        </motion.h2>

        <motion.div
          className="timeline-content"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <div className="timeline-line" aria-hidden="true" />
          
          {timeline.map((event) => (
            <motion.article
              key={event.id}
              className={`timeline-item ${event.type}`}
              variants={itemVariants}
              role="listitem"
              aria-labelledby={`timeline-title-${event.id}`}
            >
              <div className="timeline-marker" aria-hidden="true">
                <div className="timeline-dot" />
              </div>
              
              <div className="timeline-card">
                <div className="timeline-year">{event.year}</div>
                <h3 id={`timeline-title-${event.id}`} className="timeline-event-title">
                  {event.title}
                </h3>
                <p className="timeline-institution">{event.institution}</p>
                <p className="timeline-description">{event.description}</p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Timeline;
