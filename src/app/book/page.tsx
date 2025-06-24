"use client";

import styles from "../page.module.css";
import bookStyles from "./book.module.css";
import { useState } from 'react';
import Link from 'next/link';

export default function BookPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
            <Link href="/book" className={styles.active}>BOOK</Link>
            <Link href="/contact">CONTACT</Link>
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

      <main className={bookStyles.main}>
        <section className={bookStyles.hero}>
          <h1 className={bookStyles.title}>Schedule a Consultation</h1>
          <p className={bookStyles.subtitle}>
            Book a time that works for you. We&apos;re ready to discuss your security needs.
          </p>
        </section>

        <section className={bookStyles.bookingSection}>
          <div className={bookStyles.bookingContainer}>
            {/* Calendly Inline Widget */}
            <div className={bookStyles.calendlyEmbed}>
              {/* 
                Replace this with your actual Calendly link.
                Go to your Calendly event, click &quot;Share&quot;, then &quot;Add to Website&quot;, 
                choose &quot;Inline Embed&quot; and copy the URL from the code snippet.
              */}
              <iframe
                src="https://calendly.com/d/cn3q-j2g-3k2/master-security-services-consultation"
                width="100%"
                height="100%"
                frameBorder="0"
              ></iframe>
            </div>
            
            <div className={bookStyles.instructions}>
              <h3>How to Book</h3>
              <ol>
                <li>Select a date and time from the calendar that works for you.</li>
                <li>Enter your details to confirm the appointment.</li>
                <li>You&apos;ll receive a confirmation email with all the details.</li>
              </ol>
              <p className={bookStyles.altContact}>
                Prefer to speak with someone? <Link href="/contact">Contact us directly</Link>.
              </p>
            </div>
          </div>
        </section>
      </main>

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
    </div>
  );
} 