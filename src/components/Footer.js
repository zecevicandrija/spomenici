'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslations } from 'next-intl';
import { Link } from '../i18n/routing';
import styles from './Footer.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
    const footerRef = useRef(null);
    const t = useTranslations('Navbar');

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Footer stagger reveal
            gsap.fromTo(
                footerRef.current.querySelectorAll('.footerReveal'),
                { opacity: 0, y: 40 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: footerRef.current,
                        start: 'top 85%',
                    },
                }
            );
        });
        return () => ctx.revert();
    }, []);

    return (
        <footer ref={footerRef} id="kontakt" className={styles.footer}>
            <div className={styles.footerContainer}>
                <div className={styles.footerTop}>
                    <div className={`${styles.footerBrand} footerReveal`}>
                        <Link href="/" className={styles.footerLogo}>
                            <img
                                src="/Assets/logocentra.jpeg"
                                alt="Omladinski Centar Srbije"
                                className={styles.footerLogoImage}
                            />
                        </Link>
                        <Link href="/" className={styles.footerLogo}>
                            <img
                                src="/Assets/logo2.jpeg"
                                alt="Logo 2"
                                className={styles.footerLogoImageSecond}
                            />
                        </Link>
                        <p className={styles.footerTagline}>
                            Čuvamo istoriju za buduće generacije
                        </p>
                    </div>

                    <div className={`${styles.footerNav} footerReveal`}>
                        <h4>Navigacija</h4>
                        <ul>
                            <li><Link href="/">{t('home')}</Link></li>
                            <li><Link href="/#monuments">{t('monuments')}</Link></li>
                            <li><Link href="/#kontakt">{t('contact')}</Link></li>
                        </ul>
                    </div>

                    <div className={`${styles.footerContact} footerReveal`}>
                        <h4>Kontakt</h4>
                        <ul>
                            <li>Novi Sad, Srbija</li>
                            <li>omladinskicentarsrbije@gmail.com</li>
                        </ul>
                    </div>

                    <div className={`${styles.footerSocial} footerReveal`}>
                        <h4>Društvene mreže</h4>
                        <div className={styles.socialLinks}>
                            <a href="https://www.instagram.com/omladinskicentarsrbije" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>

                <div className={`${styles.footerDivider} footerReveal`}></div>

                <div className={`${styles.footerBottom} footerReveal`}>
                    <p className={styles.copyright}>
                        © {new Date().getFullYear()} Omladinski Centar Srbije.
                    </p>
                    <p className={styles.footerMade}>
                        <span>Sa poštovanjem prema istoriji</span>
                    </p>
                </div>
            </div>
        </footer>
    );
}
