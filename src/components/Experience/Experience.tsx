import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import type { Experience as ExperienceType, Certification } from '../../types';
import './Experience.css';

export interface ExperienceProps {
  experience: ExperienceType[];
  certifications: Certification[];
}

const Experience: React.FC<ExperienceProps> = ({ experience, certifications }) => {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const slideInVariants = {
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

  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: 'spring',
        stiffness: 200,
        damping: 15,
      },
    },
  };

  return (
    <section
      id="experience"
      className="experience-section"
      aria-labelledby="experience-heading"
      ref={ref}
    >
      <div className="experience-container">
        <motion.div
          className="experience-content"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {/* Section Title */}
          <motion.h2 id="experience-heading" className="experience-title" variants={slideInVariants}>
            Experience & Certifications
          </motion.h2>

          {/* Experience Cards */}
          <section className="experience-subsection" aria-labelledby="professional-experience-heading">
            <motion.h3 id="professional-experience-heading" className="subsection-title" variants={slideInVariants}>
              Professional Experience
            </motion.h3>
            <div className="cards-grid" role="list" aria-label="Professional experience list">
              {experience.map((exp) => (
                <motion.article
                  key={exp.id}
                  className="experience-card"
                  variants={slideInVariants}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                  role="listitem"
                  aria-labelledby={`exp-title-${exp.id}`}
                >
                  <motion.div
                    className="card-icon"
                    variants={iconVariants}
                    aria-hidden="true"
                  >
                    {exp.icon}
                  </motion.div>
                  <div className="card-content">
                    <h4 id={`exp-title-${exp.id}`} className="card-title">{exp.title}</h4>
                    <p className="card-company">{exp.company}</p>
                    <p className="card-duration">
                      <time>{exp.duration}</time>
                    </p>
                    <p className="card-description">{exp.description}</p>
                  </div>
                </motion.article>
              ))}
            </div>
          </section>

          {/* Certifications Cards */}
          <section className="experience-subsection" aria-labelledby="certifications-heading">
            <motion.h3 id="certifications-heading" className="subsection-title" variants={slideInVariants}>
              Certifications
            </motion.h3>
            <div className="cards-grid" role="list" aria-label="Certifications list">
              {certifications.map((cert) => (
                <motion.article
                  key={cert.id}
                  className="experience-card certification-card"
                  variants={slideInVariants}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                  role="listitem"
                  aria-labelledby={`cert-title-${cert.id}`}
                >
                  <motion.div
                    className="card-icon"
                    variants={iconVariants}
                    aria-hidden="true"
                  >
                    {cert.icon}
                  </motion.div>
                  <div className="card-content">
                    <h4 id={`cert-title-${cert.id}`} className="card-title">{cert.name}</h4>
                    <p className="card-company">{cert.issuer}</p>
                    <p className="card-duration">
                      <time>{cert.date}</time>
                    </p>
                    {cert.certificateUrl && (
                      <a
                        href={cert.certificateUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="certificate-link"
                        aria-label={`View ${cert.name} certificate (opens in new tab)`}
                      >
                        <svg
                          className="certificate-icon"
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                          <polyline points="14 2 14 8 20 8"></polyline>
                          <line x1="16" y1="13" x2="8" y2="13"></line>
                          <line x1="16" y1="17" x2="8" y2="17"></line>
                          <polyline points="10 9 9 9 8 9"></polyline>
                        </svg>
                        View Certificate
                      </a>
                    )}
                  </div>
                </motion.article>
              ))}
            </div>
          </section>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
