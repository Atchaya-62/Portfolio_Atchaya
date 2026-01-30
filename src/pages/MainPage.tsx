import { useState, useEffect, lazy, Suspense } from 'react';
import { Navigation } from '../components/Navigation';
import { NeuralNetworkBackground } from '../components/shared';
import { IntroAnimation } from '../components/IntroAnimation';
import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import CertificationBook from '../components/CertificationBook';
import { portfolioData } from '../data/portfolioData';
import type { ContactFormData } from '../types';

// Lazy load heavier components for better initial load performance
const Projects = lazy(() => import('../components/Projects/Projects'));
const Contact = lazy(() => import('../components/Contact/Contact'));

// Loading fallback for lazy-loaded sections
const SectionLoader = () => (
  <div 
    style={{ 
      minHeight: '400px', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      color: 'var(--color-text)',
      fontSize: '1.2rem'
    }}
    role="status"
    aria-live="polite"
  >
    Loading section...
  </div>
);

function MainPage() {
  const [activeSection, setActiveSection] = useState('home');
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'projects', 'certifications', 'achievements', 'contact'];
      const scrollPosition = window.scrollY + 100; // Offset for navigation height

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleIntroComplete = () => {
    setShowIntro(false);
  };

  const handleContactSubmit = async (data: ContactFormData) => {
    // Import and use the actual email service
    const { submitContactForm } = await import('../services/formHandler');
    await submitContactForm(data);
  };

  return (
    <>
      {/* Skip to main content link for keyboard users */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {/* Neural Network Background */}
      <NeuralNetworkBackground />

      {showIntro && (
        <IntroAnimation 
          name={portfolioData.owner.name}
          onComplete={handleIntroComplete} 
        />
      )}
      
      <Navigation activeSection={activeSection} onNavigate={setActiveSection} />
      
      <main id="main-content" role="main">
        {/* Hero Section */}
        <Hero
          name={portfolioData.owner.name}
          headline={portfolioData.owner.headline}
          subtitle={portfolioData.owner.subtitle}
          aboutSummary=""
          photoUrl={portfolioData.owner.photoUrl}
          socialLinks={{
            linkedin: portfolioData.social.linkedin,
            github: portfolioData.social.github,
          }}
        />

        {/* About Section */}
        <About
          fullBio={portfolioData.owner.fullBio}
        />

        {/* Skills Section */}
        <Skills skills={portfolioData.skills} />

        {/* Projects Section */}
        <Suspense fallback={<SectionLoader />}>
          <Projects projects={portfolioData.projects} />
        </Suspense>

        {/* Certifications Section */}
        <CertificationBook certifications={portfolioData.certifications} />

        {/* Contact Section */}
        <Suspense fallback={<SectionLoader />}>
          <Contact
            onSubmit={handleContactSubmit}
            socialLinks={portfolioData.socialLinks}
          />
        </Suspense>
      </main>
    </>
  );
}

export default MainPage;
