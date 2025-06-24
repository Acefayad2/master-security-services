"use client";

import styles from "../page.module.css";
import { useState } from 'react';
import Link from 'next/link';

export default function ContactPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/send-survey-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: 'acefayad@outlook.com',
          subject: formData.subject || 'Contact Form Submission',
          html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${formData.name}</p>
            <p><strong>Email:</strong> ${formData.email}</p>
            <p><strong>Subject:</strong> ${formData.subject || 'No subject provided'}</p>
            <p><strong>Message:</strong></p>
            <p>${formData.message}</p>
            <p><strong>Submission Date:</strong> ${new Date().toLocaleString()}</p>
          `
        })
      });

      const result = await response.json();
      
      if (result.success) {
        alert('Thank you! Your message has been sent successfully.');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        alert('There was an issue sending your message. Please try again.');
      }
    } catch (error) {
      console.error('Error sending contact form email:', error);
      alert('There was an issue sending your message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ background: '#f5f5f5', minHeight: '100vh' }}>
      <header className={styles.header}>
        <nav className={styles.nav}>
          <Link href="/">
            <img src="/logo.png" alt="Master Security Services Logo" className={styles.navLogo} />
          </Link>
          <div className={styles.navLinks}>
            <Link href="/">HOME</Link>
            <Link href="/about">ABOUT</Link>
            <Link href="/book">BOOK</Link>
            <Link href="/contact" className={styles.active}>CONTACT</Link>
          </div>
          <div className={styles.hamburger} onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </nav>
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
          Contact Us
        </h1>
        <p className={styles.heroSubtitle}>
          We&apos;re here to help. Reach out to us anytime.
        </p>
      </section>

      {/* Contact Section */}
      <section className={styles.contactSection}>
        <div className={styles.contactWrapper}>
          <div className={styles.contactInfo}>
            <h3>Get In Touch</h3>
            <p>
              👤 TayShon Powell
            </p>
            <p>
              📞 +1 (240)-405-8428
            </p>
            <p>
              ✉️ master.sllc@aol.com
            </p>
            <div className={styles.contactButtons}>
              <a href="tel:+12404058428" className={`${styles.contactButtonLink} ${styles.callButton}`}>
                Call
              </a>
              <a href="mailto:master.sllc@aol.com" className={`${styles.contactButtonLink} ${styles.emailButton}`}>
                Email
              </a>
            </div>
          </div>
          <div className={styles.contactForm}>
            <form className={styles.form} onSubmit={handleSubmit}>
              <input type="text" placeholder="Your Name" name="name" value={formData.name} onChange={handleInputChange} required />
              <input type="email" placeholder="Your Email" name="email" value={formData.email} onChange={handleInputChange} required />
              <input type="text" placeholder="Subject" name="subject" value={formData.subject} onChange={handleInputChange} />
              <textarea placeholder="Your Message" name="message" value={formData.message} onChange={handleInputChange} required></textarea>
              <button type="submit" disabled={isSubmitting}>Send Message</button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        background: '#111',
        color: '#fff',
        textAlign: 'center',
        padding: '2rem 1rem',
        fontSize: 15,
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
    </div>
  );
} 