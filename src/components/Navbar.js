'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslations, useLocale } from 'next-intl';
import { Link, usePathname } from '../i18n/routing';
import styles from './Navbar.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function Navbar() {
    const navRef = useRef(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const t = useTranslations('Navbar');
    const pathname = usePathname();
    const locale = useLocale();

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Navbar animation on scroll
            ScrollTrigger.create({
                start: 'top -100',
                end: 99999,
                toggleClass: { className: styles.navbarScrolled, targets: navRef.current },
            });
        });
        return () => ctx.revert();
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <nav ref={navRef} className={styles.navbar}>
            <div className={styles.navContainer}>
                <Link href="/" className={styles.logo}>
                    <img
                        src="/Assets/logocentra.jpeg"
                        alt="Omladinski Centar Srbije"
                        className={styles.logoImage}
                    />
                </Link>

                <div className={styles.navCenter}>
                    <div className={styles.navLine}></div>
                </div>

                <ul className={`${styles.navLinks} ${isMenuOpen ? styles.navLinksOpen : ''}`}>
                    <li>
                        <Link href="/" className={styles.navLink} onClick={closeMenu}>
                            <span className={styles.navLinkNum}>01</span>
                            <span className={styles.navLinkText}>{t('home')}</span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/#monuments" className={styles.navLink} onClick={closeMenu}>
                            <span className={styles.navLinkNum}>02</span>
                            <span className={styles.navLinkText}>{t('monuments')}</span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/#kontakt" className={styles.navLink} onClick={closeMenu}>
                            <span className={styles.navLinkNum}>03</span>
                            <span className={styles.navLinkText}>{t('contact')}</span>
                        </Link>
                    </li>
                </ul>

                <div className={styles.langSwitcher}>
                    <Link
                        href={pathname}
                        locale="sr"
                        className={`${styles.langBtn} ${locale === 'sr' ? styles.langActive : ''}`}
                    >
                        SR
                    </Link>
                    <span className={styles.langDivider}>/</span>
                    <Link
                        href={pathname}
                        locale="en"
                        className={`${styles.langBtn} ${locale === 'en' ? styles.langActive : ''}`}
                    >
                        EN
                    </Link>
                </div>

                <button
                    className={`${styles.menuToggle} ${isMenuOpen ? styles.menuToggleOpen : ''}`}
                    aria-label="Menu"
                    onClick={toggleMenu}
                >
                    <span></span>
                    <span></span>
                </button>
            </div>
        </nav>
    );
}
