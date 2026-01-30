import { Link } from 'react-router-dom';
import { ThemeSwitcher, NeuralNetworkBackground } from '../components/shared';
import './BlogPage.css';

function BlogPage() {
  return (
    <>
      {/* Skip to main content link for keyboard users */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {/* Neural Network Background */}
      <NeuralNetworkBackground />

      {/* Theme Switcher Sidebar */}
      <ThemeSwitcher />

      <main id="main-content" role="main" className="blog-page">
        <div className="blog-container">
          {/* Header Section */}
          <header className="blog-header">
            <nav aria-label="Breadcrumb navigation" className="breadcrumb">
              <Link 
                to="/" 
                className="breadcrumb-link"
                aria-label="Return to home page"
              >
                <svg 
                  className="breadcrumb-icon" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M10 19l-7-7m0 0l7-7m-7 7h18" 
                  />
                </svg>
                Back to Home
              </Link>
            </nav>
            
            <h1 className="blog-title">Blog</h1>
            <p className="blog-subtitle">
              Thoughts on AI, Data Science, and Technology
            </p>
          </header>

          {/* Blog Posts Section */}
          <section className="blog-posts" aria-label="Blog posts">
            <div className="blog-grid">
              {/* Placeholder Blog Post 1 */}
              <article className="blog-card">
                <div className="blog-card-header">
                  <span className="blog-category" aria-label="Category: AI & Machine Learning">
                    AI & ML
                  </span>
                  <time className="blog-date" dateTime="2024-01-15">
                    January 15, 2024
                  </time>
                </div>
                <h2 className="blog-card-title">
                  Getting Started with Neural Networks
                </h2>
                <p className="blog-card-excerpt">
                  An introduction to neural networks and deep learning fundamentals. 
                  Learn about the building blocks of modern AI systems.
                </p>
                <div className="blog-card-footer">
                  <span className="blog-read-time" aria-label="Estimated reading time">
                    5 min read
                  </span>
                  <button 
                    className="blog-read-more"
                    aria-label="Read full article: Getting Started with Neural Networks"
                  >
                    Read More
                    <svg 
                      className="blog-arrow-icon" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M14 5l7 7m0 0l-7 7m7-7H3" 
                      />
                    </svg>
                  </button>
                </div>
              </article>

              {/* Placeholder Blog Post 2 */}
              <article className="blog-card">
                <div className="blog-card-header">
                  <span className="blog-category" aria-label="Category: Data Science">
                    Data Science
                  </span>
                  <time className="blog-date" dateTime="2024-01-10">
                    January 10, 2024
                  </time>
                </div>
                <h2 className="blog-card-title">
                  Data Visualization Best Practices
                </h2>
                <p className="blog-card-excerpt">
                  Explore effective techniques for visualizing complex datasets and 
                  communicating insights through compelling graphics.
                </p>
                <div className="blog-card-footer">
                  <span className="blog-read-time" aria-label="Estimated reading time">
                    7 min read
                  </span>
                  <button 
                    className="blog-read-more"
                    aria-label="Read full article: Data Visualization Best Practices"
                  >
                    Read More
                    <svg 
                      className="blog-arrow-icon" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M14 5l7 7m0 0l-7 7m7-7H3" 
                      />
                    </svg>
                  </button>
                </div>
              </article>

              {/* Placeholder Blog Post 3 */}
              <article className="blog-card">
                <div className="blog-card-header">
                  <span className="blog-category" aria-label="Category: Technology">
                    Technology
                  </span>
                  <time className="blog-date" dateTime="2024-01-05">
                    January 5, 2024
                  </time>
                </div>
                <h2 className="blog-card-title">
                  The Future of AI in Healthcare
                </h2>
                <p className="blog-card-excerpt">
                  Discover how artificial intelligence is transforming healthcare 
                  and improving patient outcomes across the globe.
                </p>
                <div className="blog-card-footer">
                  <span className="blog-read-time" aria-label="Estimated reading time">
                    6 min read
                  </span>
                  <button 
                    className="blog-read-more"
                    aria-label="Read full article: The Future of AI in Healthcare"
                  >
                    Read More
                    <svg 
                      className="blog-arrow-icon" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M14 5l7 7m0 0l-7 7m7-7H3" 
                      />
                    </svg>
                  </button>
                </div>
              </article>
            </div>
          </section>

          {/* Coming Soon Message */}
          <aside className="blog-coming-soon" role="complementary">
            <p>
              More articles coming soon! Check back regularly for new content on 
              AI, Data Science, and emerging technologies.
            </p>
          </aside>
        </div>
      </main>
    </>
  );
}

export default BlogPage;
