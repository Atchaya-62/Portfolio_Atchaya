import { motion } from 'framer-motion';
import './Footer.css';

interface FooterProps {
  name: string;
  socialLinks: {
    github?: string;
    linkedin?: string;
    email?: string;
  };
}

export const Footer: React.FC<FooterProps> = ({ name, socialLinks }) => {
  const currentYear = new Date().getFullYear();

  // Transform social links to match the format used in ConnectPage
  const transformedSocialLinks = [
    socialLinks.linkedin && {
      platform: 'LinkedIn',
      url: socialLinks.linkedin,
      icon: '/icons/icons8-linkedin-50.png',
    },
    socialLinks.github && {
      platform: 'GitHub',
      url: socialLinks.github,
      icon: '/icons/icons8-github-48.png',
    },
    socialLinks.email && {
      platform: 'Email',
      url: `mailto:${socialLinks.email}`,
      icon: '/icons/icons8-email-50.png',
    },
  ].filter(Boolean);

  return (
    <footer className="footer" role="contentinfo">
      {/* Wave Divider */}
      <div className="footer-wave">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="wave-svg"
        >
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            className="wave-path"
          />
        </svg>
      </div>

      <div className="footer-content-wrapper">
        <div className="footer-container">
          {/* Social Icons */}
          <div className="footer-social">
            {transformedSocialLinks.map((link) => (
              <motion.a
                key={link.platform}
                href={link.url}
                target={link.platform !== 'Email' ? '_blank' : undefined}
                rel={link.platform !== 'Email' ? 'noopener noreferrer' : undefined}
                className="footer-social-icon"
                aria-label={`${link.platform} ${link.platform === 'Email' ? 'contact' : 'profile'} ${link.platform !== 'Email' ? '(opens in new tab)' : ''}`}
                whileHover={{ scale: 1.15, y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                <img
                  src={link.icon}
                  alt=""
                  style={{ width: '32px', height: '32px', objectFit: 'contain' }}
                  aria-hidden="true"
                />
              </motion.a>
            ))}
          </div>

          {/* Copyright */}
          <div className="footer-copyright">
            <p>©{currentYear} {name} | All Rights Reserved</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
