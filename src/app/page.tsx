"use client";

import styles from "./page.module.css";
import { useState, useEffect, useRef, Fragment, useCallback } from 'react';
import Link from 'next/link';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showSurvey, setShowSurvey] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [surveyAnswers, setSurveyAnswers] = useState({
    businessType: '',
    securityNeeds: [],
    location: '',
    timeline: '',
    budget: '',
    contactInfo: ''
  });
  const [contactFormData, setContactFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isContactSubmitting, setIsContactSubmitting] = useState(false);
  const characterRef = useRef<HTMLImageElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    '/slide1.png',
    '/slide2.png',
    '/slide3.png',
    '/slide4.png',
    '/slide5.jpg',
    '/slide6.png',
  ];

  // Slideshow logic
  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  }, [slides.length]);

  useEffect(() => {
    const slideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
    return () => clearInterval(slideInterval);
  }, [nextSlide]);

  // Show survey on every visit
  useEffect(() => {
    setTimeout(() => setShowSurvey(true), 2000); // Show after 2 seconds
  }, []);

  // Survey questions
  const surveyQuestions = [
    {
      id: 'businessType',
      question: 'What type of business or property do you need security for?',
      type: 'radio',
      options: [
        'Commercial/Office Building',
        'Retail Store',
        'Residential Property',
        'Event/Venue',
        'Construction Site',
        'Other'
      ]
    },
    {
      id: 'securityNeeds',
      question: 'What security services are you looking for? (Select all that apply)',
      type: 'checkbox',
      options: [
        'Uniformed Security Guards',
        'Executive Protection',
        'Event Security',
        'Fire Watch Services',
        'Process Serving',
        'Private Investigations',
        'Security Patrols',
        'Access Control'
      ]
    },
    {
      id: 'location',
      question: 'Where is your location?',
      type: 'text',
      placeholder: 'Enter your city or address'
    },
    {
      id: 'timeline',
      question: 'When do you need security services to begin?',
      type: 'radio',
      options: [
        'Immediately (Within 1 week)',
        'Soon (Within 1 month)',
        'Planning ahead (1-3 months)',
        'Just exploring options'
      ]
    },
    {
      id: 'budget',
      question: 'What is your approximate budget range?',
      type: 'radio',
      options: [
        'Under $1,000/month',
        '$1,000 - $3,000/month',
        '$3,000 - $5,000/month',
        '$5,000+/month',
        'Not sure yet'
      ]
    },
    {
      id: 'contactInfo',
      question: 'How can we contact you to discuss your security needs?',
      type: 'text',
      placeholder: 'Enter your phone number or email'
    }
  ];

  // Handle survey navigation
  const handleNext = () => {
    if (currentQuestion < surveyQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Survey completed
      localStorage.setItem('hasVisited', 'true');
      setShowSurvey(false);
      // Here you could send the survey data to your backend
      console.log('Survey completed:', surveyAnswers);
      sendSurveyEmail(surveyAnswers);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleAnswer = (questionId: string, value: string | string[]) => {
    setSurveyAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleOptionSelect = (questionId: string, option: string, type: 'radio' | 'checkbox') => {
    if (type === 'radio') {
      handleAnswer(questionId, option);
    } else {
      const currentAnswers = surveyAnswers[questionId as keyof typeof surveyAnswers] as string[] || [];
      const newAnswers = currentAnswers.includes(option)
        ? currentAnswers.filter(a => a !== option)
        : [...currentAnswers, option];
      handleAnswer(questionId, newAnswers);
    }
  };

  const closeSurvey = () => {
    localStorage.setItem('hasVisited', 'true');
    setShowSurvey(false);
  };

  // Function to send survey results via email
  const sendSurveyEmail = async (surveyData: {
    businessType: string;
    securityNeeds: string | string[];
    location: string;
    timeline: string;
    budget: string;
    contactInfo: string;
  }) => {
    try {
      const response = await fetch('/api/send-survey-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: 'acefayad@outlook.com',
          subject: 'New Security Assessment Survey Submission',
          html: `
            <h2>New Security Assessment Survey Submission</h2>
            <p><strong>Business Type:</strong> ${surveyData.businessType}</p>
            <p><strong>Security Needs:</strong> ${Array.isArray(surveyData.securityNeeds) ? surveyData.securityNeeds.join(', ') : surveyData.securityNeeds}</p>
            <p><strong>Location:</strong> ${surveyData.location}</p>
            <p><strong>Timeline:</strong> ${surveyData.timeline}</p>
            <p><strong>Budget:</strong> ${surveyData.budget}</p>
            <p><strong>Contact Info:</strong> ${surveyData.contactInfo}</p>
            <p><strong>Submission Date:</strong> ${new Date().toLocaleString()}</p>
          `
        })
      });

      const result = await response.json();
      
      if (result.success) {
        console.log('Survey email sent successfully to acefayad@outlook.com');
        alert('Thank you! Your survey has been submitted successfully.');
      } else {
        console.error('Failed to send survey email');
        alert('There was an issue sending your survey. Please try again.');
      }
    } catch (error) {
      console.error('Error sending survey email:', error);
      alert('There was an issue sending your survey. Please try again.');
    }
  };

  // Handles the 3D tilt effect on the character image
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (characterRef.current) {
        const { clientX, clientY } = event;
        const { innerWidth, innerHeight } = window;
        const rotateY = (clientX / innerWidth - 0.5) * -40; // Left-right tilt
        const rotateX = (clientY / innerHeight - 0.5) * 40; // Up-down tilt
        
        characterRef.current.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Handle contact form submission
  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsContactSubmitting(true);
    
    try {
      const response = await fetch('/api/send-survey-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: 'acefayad@outlook.com',
          subject: 'Custom Security Plan Request',
          html: `
            <h2>New Custom Security Plan Request</h2>
            <p><strong>Name:</strong> ${contactFormData.name}</p>
            <p><strong>Email:</strong> ${contactFormData.email}</p>
            <p><strong>Message:</strong></p>
            <p>${contactFormData.message}</p>
            <p><strong>Submission Date:</strong> ${new Date().toLocaleString()}</p>
          `
        })
      });

      const result = await response.json();
      
      if (result.success) {
        alert('Thank you! Your message has been sent successfully.');
        setContactFormData({ name: '', email: '', message: '' });
      } else {
        alert('There was an issue sending your message. Please try again.');
      }
    } catch (error) {
      console.error('Error sending contact form email:', error);
      alert('There was an issue sending your message. Please try again.');
    } finally {
      setIsContactSubmitting(false);
    }
  };

  const handleContactInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContactFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div style={{ background: '#f5f5f5', minHeight: '100vh' }}>
      <header className={styles.header}>
        <nav className={styles.nav}>
          <Link href="/">
            <img src="/logo.png" alt="Master Security Services Logo" className={styles.navLogo} />
          </Link>
          {/* Desktop Navigation */}
          <div className={styles.navLinks}>
            <Link href="/" className={styles.active}>HOME</Link>
            <Link href="/about">ABOUT</Link>
            <Link href="/book">BOOK</Link>
            <Link href="/contact">CONTACT</Link>
          </div>
          {/* Hamburger Icon */}
          <div className={styles.hamburger} onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </nav>
        {/* Mobile Menu */}
        <div className={`${styles.mobileMenu} ${isMenuOpen ? styles.open : ''}`}>
          <Link href="/" onClick={() => setIsMenuOpen(false)}>HOME</Link>
          <Link href="/about" onClick={() => setIsMenuOpen(false)}>ABOUT</Link>
          <Link href="/book" onClick={() => setIsMenuOpen(false)}>BOOK</Link>
          <Link href="/contact" onClick={() => setIsMenuOpen(false)}>CONTACT</Link>
        </div>
      </header>
      {/* Hero Section */}
      <section className={styles.hero}>
        <h1 className={styles.heroTitle}>
          MASTER SECURITY SERVICES LLC
        </h1>

        <div className={styles.heroImageContainer}>
          <div className={styles.imageControls}>
            <span className={styles.playButton} onClick={prevSlide}>Prev</span>
            <div className={styles.navButtons}>
              <span onClick={prevSlide}>◀</span>
              <span onClick={nextSlide}>▶</span>
            </div>
          </div>
          {slides.map((slide, index) => (
            <img
              key={slide}
              src={slide}
              alt={`Master Security Slide ${index + 1}`}
              className={`${styles.heroImage} ${currentSlide === index ? styles.activeSlide : ''} ${(index === 4 || index === 5) ? styles.headshotSlide : ''}`}
            />
          ))}
        </div>
        <p className={styles.heroSubtitle}>
          Safeguarding Success with Superior Solutions
        </p>
      </section>

      {/* Logo Marquee Section */}
      <section className={styles.logoMarqueeSection}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h3 style={{ 
            fontSize: '1.5rem', 
            fontWeight: '600', 
            color: '#333', 
            margin: '0 0 0.5rem 0',
            letterSpacing: '0.5px'
          }}>
            Trusted Security Solutions
          </h3>
          <p style={{ 
            fontSize: '1rem', 
            color: '#666', 
            margin: '0',
            fontStyle: 'italic'
          }}>
            Professional excellence across all our services
          </p>
        </div>
        <div className={styles.logoTrack}>
          {
            [...Array(2)].map((_, i) => (
              <Fragment key={i}>
                <img src="/line-logo.png" alt="Master Security Line Logo" className={styles.marqueeLogo} />
                <img src="/line-logo-2.png" alt="Master Security Line Logo 2" className={styles.marqueeLogo} />
                <img src="/line-logo-3.png" alt="Master Security Line Logo 3" className={styles.marqueeLogo} />
                <img src="/line-logo-4.png" alt="Master Security Line Logo 4" className={styles.marqueeLogo} />
              </Fragment>
            ))
          }
        </div>
      </section>

      {/* Video Message from Founder */}
      <section className={styles.videoSection}>
        <h2 className={styles.videoHeading}>Message from the Founder</h2>
        <div className={styles.tvFrame}>
          <video src="/video.mp4" controls autoPlay loop muted playsInline />
        </div>
      </section>

      {/* Who Are We Section */}
      <section style={{
        background: '#fff',
        padding: '4rem 1rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        <div style={{ maxWidth: 900, width: '100%' }}>
          <h2 style={{ fontSize: 36, fontWeight: 700, marginBottom: 24, textAlign: 'center', color: '#333' }}>Who Are We?</h2>
          <p style={{ fontSize: 18, color: '#555', marginBottom: 16 }}>
            Master Security Services LLC is a professional & trustworthy Security Solutions agency established in October 2022. Our team has a rich history of providing exceptional security services dating back to 2016. As a family-owned and operated organization, we pride ourselves on fostering a sense of community and unity, with a strong emphasis on supporting our country and its citizens.
          </p>
          <p style={{ fontSize: 18, color: '#555', marginBottom: 16 }}>
            Our team consists of dedicated professionals with backgrounds in law enforcement and military training. By prioritizing the recruitment of individuals who have served or possess specialized training, we ensure that our security solutions meet the highest standards of excellence.
          </p>
          <p style={{ fontSize: 18, color: '#555' }}>
            We are committed to mastering the art of safeguarding our clients. Our experience and expertise in the field of security enable us to deliver reliable and trustworthy services that cater to a diverse range of needs. Let Master Security Services LLC secure your future today.
          </p>
        </div>
      </section>

      {/* About the Founder */}
      <section style={{
        background: '#fff',
        padding: '4rem 1rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        borderTop: '1px solid #eee',
      }}>
        <div style={{ maxWidth: 900, width: '100%', display: 'flex', flexDirection: 'row', gap: 32, alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: 260 }}>
            <h2 style={{ fontSize: 32, fontWeight: 700, marginBottom: 16, color: '#333' }}>About the Founder</h2>
            <p style={{ fontSize: 18, color: '#555' }}>
              As the founder of Master Security Services, Officer Powell brings a wealth of security experience and a commitment to service. Having provided security for high-profile individuals and storefronts, he understands the unique challenges and demands of these roles. His distinguished career as a Special Agent, with over 100 arrests nationwide, demonstrates his skill and dedication to maintaining safety and order. His exceptional work also extends to providing security for fugitive handling, ensuring their safe and secure detention. Above all, he is a visionary who is driven by a commitment to protect and serve. His deep-rooted passion for security forms the backbone of Master Security, influencing every aspect of our services and our approach to client care.
            </p>
          </div>
          <div className={styles.characterContainer} style={{ flex: 1, minWidth: 220, display: 'flex', justifyContent: 'center' }}>
            <img 
              ref={characterRef}
              src="/image.png" 
              alt="Officer Powell, Founder of Master Security Services" 
              className={styles.characterImage}
            />
          </div>
        </div>
      </section>

      {/* Services Offered Grid */}
      <section style={{
        background: '#f7f7fa',
        padding: '4rem 1rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        <h2 style={{ fontSize: 32, fontWeight: 700, marginBottom: 32, color: '#333' }}>Services Offered</h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 32,
          width: '100%',
          maxWidth: 1000,
        }}>
          {[
            { title: 'Uniformed Security Guards', icon: '🛡️' },
            { title: 'Process Serving', icon: '📄' },
            { title: 'Fire Watch Services', icon: '🔥' },
            { title: 'Executive Protection', icon: '👔' },
            { title: 'Event Security', icon: '🎫' },
            { title: 'And Much More', icon: '🔒' },
          ].map((service) => (
            <div key={service.title} style={{
              background: '#fff',
              borderRadius: 12,
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
              padding: '2rem 1rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              transition: 'box-shadow 0.2s, transform 0.2s',
            }}>
              <span style={{ fontSize: 40, marginBottom: 16 }}>{service.icon}</span>
              <span style={{ fontWeight: 700, fontSize: 20, color: '#333' }}>{service.title}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Guard Card Certification Callout */}
      <section style={{
        background: '#fff',
        padding: '4rem 1rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        <h2 style={{ fontSize: 32, fontWeight: 700, marginBottom: 16, color: '#333' }}>Get Certified – Earn Your Guard Card</h2>
        <p style={{ fontSize: 18, color: '#555', maxWidth: 700, textAlign: 'center', marginBottom: 16 }}>
          Start your security career with our comprehensive Guard Card certification program at Master Security. Our curriculum is designed to equip you with essential skills and knowledge in public relations, customer interaction, legal issues, and emergency procedures, ensuring you&apos;re prepared for the demands of the job. Our program adheres to all local and state regulations, guaranteeing your certification is valid and respected.
        </p>
        <p style={{ fontSize: 18, color: '#555', maxWidth: 700, textAlign: 'center', marginBottom: 32 }}>
          We simplify the registration process, providing step-by-step guidance to ensure a smooth and successful certification experience. Join the ranks of professional security guards. Begin your certification journey with Master Security today!
        </p>
        <button style={{
          background: '#b1001a',
          color: '#fff',
          border: 'none',
          borderRadius: 8,
          padding: '1rem 2.5rem',
          fontSize: 18,
          fontWeight: 700,
          cursor: 'pointer',
          boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
        }}>
          Apply Now
        </button>
      </section>

      {/* Contact Form Section */}
      <section id="contact" style={{
        background: '#f7f7fa',
        padding: '4rem 1rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        <h2 style={{ fontSize: 32, fontWeight: 700, marginBottom: 24, color: '#333' }}>Create Your Custom Security Plan</h2>
        <form onSubmit={handleContactSubmit} style={{
          background: '#fff',
          borderRadius: 12,
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
          padding: '2rem',
          maxWidth: 400,
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
        }}>
          <input 
            type="text" 
            name="name"
            placeholder="Name *" 
            value={contactFormData.name}
            onChange={handleContactInputChange}
            required 
            style={{
              padding: '0.75rem 1rem',
              borderRadius: 6,
              border: '1px solid #ccc',
              fontSize: 16,
              background: '#fff',
              color: '#333',
            }} 
          />
          <input 
            type="email" 
            name="email"
            placeholder="Email *" 
            value={contactFormData.email}
            onChange={handleContactInputChange}
            required 
            style={{
              padding: '0.75rem 1rem',
              borderRadius: 6,
              border: '1px solid #ccc',
              fontSize: 16,
              background: '#fff',
              color: '#333',
            }} 
          />
          <textarea 
            name="message"
            placeholder="Message (optional)" 
            value={contactFormData.message}
            onChange={handleContactInputChange}
            rows={4} 
            style={{
              padding: '0.75rem 1rem',
              borderRadius: 6,
              border: '1px solid #ccc',
              fontSize: 16,
              resize: 'vertical',
              background: '#fff',
              color: '#333',
            }} 
          />
          <button 
            type="submit" 
            disabled={isContactSubmitting}
            style={{
              background: '#b1001a',
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              padding: '0.75rem',
              fontSize: 18,
              fontWeight: 700,
              cursor: isContactSubmitting ? 'not-allowed' : 'pointer',
              marginTop: 8,
              transition: 'background 0.2s',
              opacity: isContactSubmitting ? 0.7 : 1,
            }}
          >
            {isContactSubmitting ? 'Sending...' : 'Submit'}
          </button>
        </form>
      </section>

      {/* Footer */}
      <footer style={{
        background: '#111',
        color: '#fff',
        textAlign: 'center',
        padding: '2rem 1rem',
        fontSize: 15,
        marginTop: 32,
      }}>
        <div style={{ marginBottom: 8 }}>
          <a href="mailto:master.sllc@aol.com" style={{ color: '#fff', textDecoration: 'underline', marginRight: 12 }}>
            master.sllc@aol.com
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={{ color: '#fff', textDecoration: 'underline', marginLeft: 12 }}>
            Instagram
          </a>
        </div>
        <div style={{ color: '#bbb', fontSize: 13 }}>
          &copy; {new Date().getFullYear()} Master Security Services LLC. All rights reserved.
        </div>
      </footer>

      {/* Survey Modal */}
      {showSurvey && (
        <div className={styles.surveyOverlay}>
          <div className={styles.surveyModal}>
            <button className={styles.closeButton} onClick={closeSurvey}>×</button>
            
            <div className={styles.surveyHeader}>
              <h2 className={styles.surveyTitle}>Security Assessment</h2>
              <p className={styles.surveySubtitle}>Help us understand your security needs</p>
              <div className={styles.progressBar}>
                <div 
                  className={styles.progressFill} 
                  style={{ width: `${((currentQuestion + 1) / surveyQuestions.length) * 100}%` }}
                ></div>
              </div>
            </div>

            {surveyQuestions.map((question, index) => (
              <div 
                key={question.id}
                className={`${styles.surveyQuestion} ${index !== currentQuestion ? styles.hidden : ''}`}
              >
                <h3 className={styles.questionText}>{question.question}</h3>
                
                {question.type === 'radio' && question.options && (
                  <div className={styles.optionGroup}>
                    {question.options.map((option) => (
                      <div 
                        key={option}
                        className={`${styles.optionItem} ${
                          surveyAnswers[question.id as keyof typeof surveyAnswers] === option ? styles.selected : ''
                        }`}
                        onClick={() => handleOptionSelect(question.id, option, 'radio')}
                      >
                        <input
                          type="radio"
                          className={styles.optionRadio}
                          checked={surveyAnswers[question.id as keyof typeof surveyAnswers] === option}
                          onChange={() => {}}
                        />
                        <span className={styles.optionText}>{option}</span>
                      </div>
                    ))}
                  </div>
                )}

                {question.type === 'checkbox' && question.options && (
                  <div className={styles.checkboxGroup}>
                    {question.options.map((option) => {
                      const currentAnswers = surveyAnswers[question.id as keyof typeof surveyAnswers] as string[] || [];
                      return (
                        <div 
                          key={option}
                          className={`${styles.checkboxItem} ${
                            currentAnswers.includes(option) ? styles.selected : ''
                          }`}
                          onClick={() => handleOptionSelect(question.id, option, 'checkbox')}
                        >
                          <input
                            type="checkbox"
                            className={styles.checkboxInput}
                            checked={currentAnswers.includes(option)}
                            onChange={() => {}}
                          />
                          <span>{option}</span>
                        </div>
                      );
                    })}
                  </div>
                )}

                {question.type === 'text' && (
                  <input
                    type="text"
                    className={styles.textInput}
                    placeholder={question.placeholder}
                    value={surveyAnswers[question.id as keyof typeof surveyAnswers] as string || ''}
                    onChange={(e) => handleAnswer(question.id, e.target.value)}
                  />
                )}
              </div>
            ))}

            <div className={styles.surveyButtons}>
              <button 
                className={`${styles.surveyButton} ${styles.secondary}`}
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
              >
                Previous
              </button>
              <button 
                className={`${styles.surveyButton} ${styles.primary}`}
                onClick={handleNext}
                disabled={
                  (surveyQuestions[currentQuestion].type === 'radio' && !surveyAnswers[surveyQuestions[currentQuestion].id as keyof typeof surveyAnswers]) ||
                  (surveyQuestions[currentQuestion].type === 'text' && !surveyAnswers[surveyQuestions[currentQuestion].id as keyof typeof surveyAnswers])
                }
              >
                {currentQuestion === surveyQuestions.length - 1 ? 'Submit' : 'Next'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
