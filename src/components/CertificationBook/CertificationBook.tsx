import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import type { Certification } from '../../types';
import './CertificationBook.css';

export interface CertificationBookProps {
  certifications: Certification[];
}

const CertificationBook: React.FC<CertificationBookProps> = ({ certifications }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const nextPage = () => {
    if (currentPage < certifications.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const currentCert = certifications[currentPage];

  return (
    <section
      id="certifications"
      className="certification-section"
      aria-labelledby="certification-heading"
      ref={ref}
    >
      <div className="certification-container">
        <motion.h2
          id="certification-heading"
          className="certification-title"
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
        >
          Certifications
        </motion.h2>

        <div className="book-container">
          {/* Left Navigation Button */}
          <button
            className="book-nav-button left"
            onClick={prevPage}
            disabled={currentPage === 0}
            aria-label="Previous certification"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          {/* Book */}
          <div className="book">
            <div className="book-spine" aria-hidden="true" />
            
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPage}
                className="book-page"
                initial={{ rotateY: -180, opacity: 0 }}
                animate={{ rotateY: 0, opacity: 1 }}
                exit={{ rotateY: 180, opacity: 0 }}
                transition={{ 
                  duration: 0.8,
                  ease: [0.43, 0.13, 0.23, 0.96]
                }}
              >
                <div className="page-content">
                  <div className="cert-icon" aria-hidden="true">
                    {currentCert.icon}
                  </div>
                  <h3 className="cert-name">{currentCert.name}</h3>
                  <p className="cert-issuer">{currentCert.issuer}</p>
                  <p className="cert-date">{currentCert.date}</p>
                  {currentCert.certificateUrl && (
                    <a
                      href={currentCert.certificateUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cert-link"
                      aria-label={`View ${currentCert.name} certificate (opens in new tab)`}
                    >
                      View Certificate
                    </a>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Navigation Button */}
          <button
            className="book-nav-button right"
            onClick={nextPage}
            disabled={currentPage === certifications.length - 1}
            aria-label="Next certification"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>

        {/* Page Indicator */}
        <div className="page-indicator" role="status" aria-live="polite">
          <span className="sr-only">Showing certification </span>
          {currentPage + 1} of {certifications.length}
        </div>
      </div>
    </section>
  );
};

export default CertificationBook;
