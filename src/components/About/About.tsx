import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './About.css';

export interface AboutProps {
  fullBio: string;
}

const About: React.FC<AboutProps> = ({ fullBio }) => {
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
      id="about"
      className="about-section"
      aria-labelledby="about-heading"
      ref={ref}
    >
      <div className="about-container">
        <motion.div
          className="about-content"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {/* Profile Highlight Card */}
          <motion.div className="profile-highlight-card" variants={itemVariants}>
            <div className="profile-main">
              <h2 id="about-heading" className="profile-title">Profile Highlight</h2>
              <p className="profile-intro">{fullBio}</p>

              <div className="profile-details">
                <div className="profile-detail-item">
                  <span className="detail-label">ROLE</span>
                  <span className="detail-value">AI Engineer</span>
                </div>

                <div className="profile-detail-item">
                  <span className="detail-label">FOCUS</span>
                  <span className="detail-value">ML + Full Stack Development</span>
                </div>
              </div>
            </div>

            <div className="profile-sidebar">
              <div className="availability-badge">
                <div className="availability-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                </div>
                <div className="availability-status">
                  <span className="status-indicator"></span>
                  <span className="status-text">AVAILABLE</span>
                </div>
                <div className="availability-label">FOR HIRE</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
