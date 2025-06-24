"use client";

import styles from "../page.module.css";
import { useState } from 'react';
import Link from 'next/link';

export default function AboutPage() {
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
            <Link href="/about" className={styles.active}>ABOUT</Link>
            <Link href="/book">BOOK</Link>
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
      {/* Hero Section */}
      <section className={styles.hero}>
        <h1 className={styles.heroTitle}>
          ABOUT MASTER SECURITY
        </h1>
        <p className={styles.heroSubtitle}>
          Our Commitment to Excellence and Protection
        </p>
      </section>

      {/* About Section */}
      <section className={styles.aboutSection}>
        <div className={styles.aboutGrid}>
          {/* Column 1 */}
          <div className={styles.aboutCard}>
            <div className={styles.circularImageContainer}>
              <img
                src="/powell.png"
                alt="Officer Powell, C.E.O"
                className={styles.circularImage}
              />
            </div>
            <h2 className={styles.ceoCaption}>
              Officer, Powell C.E.O
            </h2>
            <div className={styles.ceoDescription}>
              <ul className={styles.descriptionList}>
                <li className={styles.descriptionItem}>
                  <span className={styles.descriptionIcon}>✓</span>
                  <span>Over a decade of experience in the security industry</span>
                </li>
                <li className={styles.descriptionItem}>
                  <span className={styles.descriptionIcon}>✓</span>
                  <span>Comprehensive protection services for high-profile individuals and prominent storefronts</span>
                </li>
                <li className={styles.descriptionItem}>
                  <span className={styles.descriptionIcon}>✓</span>
                  <span>Seasoned special agent with over 100 arrests nationwide</span>
                </li>
                <li className={styles.descriptionItem}>
                  <span className={styles.descriptionIcon}>✓</span>
                  <span>Ensured safe apprehension of high-level threat fugitives​</span>
                </li>
                <li className={styles.descriptionItem}>
                  <span className={styles.descriptionIcon}>✓</span>
                  <span>Strong commitment to serving the community</span>
                </li>
              </ul>
            </div>
          </div>
          {/* Column 2 */}
          <div className={styles.aboutCard}>
            <div className={styles.circularImageContainer}>
              <img
                src="/crampton.png"
                alt="Officer Crampton, C.O.O"
                className={styles.circularImage}
              />
            </div>
            <h2 className={styles.ceoCaption}>
              Officer, Crampton C.O.O
            </h2>
            <div className={styles.ceoDescription}>
              <ul className={styles.descriptionList}>
                <li className={styles.descriptionItem}>
                  <span className={styles.descriptionIcon}>✓</span>
                  <span>Background: Baltimore native, born and raised.</span>
                </li>
                <li className={styles.descriptionItem}>
                  <span className={styles.descriptionIcon}>✓</span>
                  <span>Experience: 23 years in the Baltimore City Police Department and Baltimore City Sheriff Office.</span>
                </li>
                <li className={styles.descriptionItem}>
                  <span className={styles.descriptionIcon}>✓</span>
                  <span>Current Role: Works for the Department of Homeland Security, dedicated to protection and safety.</span>
                </li>
                <li className={styles.descriptionItem}>
                  <span className={styles.descriptionIcon}>✓</span>
                  <span>Achievements: Over 1000 arrests.</span>
                </li>
                <li className={styles.descriptionItem}>
                  <span className={styles.descriptionIcon}>✓</span>
                  <span>Specialized Units: Served as a Detective in the Criminal Intelligence Unit, Drug Unit, and Patrol within the Baltimore City Police Department.</span>
                </li>
              </ul>
            </div>
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