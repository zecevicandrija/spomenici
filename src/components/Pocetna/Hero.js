'use client';

import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link'; // Anchor link can stay next/link or native a
import styles from './Hero.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
    const heroRef = useRef(null);
    const videoRef = useRef(null);
    const heroContentRef = useRef(null);
    const heroTitleRef = useRef(null);
    const heroSubtitleRef = useRef(null);
    const t = useTranslations('Hero');

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Hero video parallax with scale
            gsap.fromTo(
                videoRef.current,
                { scale: 1.2 },
                {
                    scale: 1,
                    yPercent: 20,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: heroRef.current,
                        start: 'top top',
                        end: 'bottom top',
                        scrub: 1,
                    },
                }
            );

            // Hero title character animation
            const titleChars = heroTitleRef.current.querySelectorAll('.char');
            gsap.fromTo(
                titleChars,
                {
                    opacity: 0,
                    y: 100,
                    rotateX: -90,
                },
                {
                    opacity: 1,
                    y: 0,
                    rotateX: 0,
                    duration: 1.2,
                    ease: 'power4.out',
                    stagger: 0.03,
                    delay: 0.5,
                }
            );

            // Hero subtitle word animation
            const subtitleWords = heroSubtitleRef.current.querySelectorAll('.word');
            gsap.fromTo(
                subtitleWords,
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: 'power3.out',
                    stagger: 0.05,
                    delay: 1.2,
                }
            );

            // Scroll indicator pulse
            gsap.to('.scrollPulse', {
                y: 10,
                opacity: 0.3,
                duration: 1.5,
                repeat: -1,
                yoyo: true,
                ease: 'power2.inOut',
            });
        }, heroRef); // Scoped

        return () => ctx.revert();
    }, []);

    // Split text into characters
    const splitText = (text) => {
        return text.split('').map((char, i) => (
            <span key={i} className="char" style={{ display: 'inline-block' }}>
                {char === ' ' ? '\u00A0' : char}
            </span>
        ));
    };

    // Split text into words
    const splitWords = (text) => {
        return text.split(' ').map((word, i) => (
            <span key={i} className="word" style={{ display: 'inline-block', marginRight: '0.3em' }}>
                {word}
            </span>
        ));
    };

    return (
        <section ref={heroRef} className={styles.hero}>
            <div className={styles.heroBg}>
                <div className={styles.videoContainer}>
                    <video
                        ref={videoRef}
                        autoPlay
                        muted
                        loop
                        playsInline
                        className={styles.heroVideo}
                        poster="/Assets/slika1.jpg"
                    >
                        <source src="/Assets/novisad.mp4" type="video/mp4" />
                    </video>
                </div>
                <div className={styles.videoOverlay}></div>
                <div className={styles.videoGrain}></div>
            </div>

            <div ref={heroContentRef} className={styles.heroContent}>
                <div className={styles.heroMeta}>
                    <span className={styles.heroLocation}>{t('location')}</span>
                    <span className={styles.heroDivider}></span>
                    <span className={styles.heroYear}>{t('est')}</span>
                </div>

                <h1 ref={heroTitleRef} className={styles.heroTitle}>
                    <span className={styles.titleLine}>{splitText(t('titleMain'))}</span>
                    <span className={`${styles.titleLine} ${styles.titleAccent}`}>
                        {splitText(t('titleAccent'))}
                    </span>
                </h1>

                <p ref={heroSubtitleRef} className={styles.heroSubtitle}>
                    {splitWords(t('subtitle'))}
                </p>

                <div className={styles.heroCta}>
                    <Link href="#monuments" className={styles.ctaButton}>
                        <span className={styles.ctaText}>{t('explore')}</span>
                        <span className={styles.ctaIcon}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <path d="M7 17L17 7M17 7H7M17 7V17" />
                            </svg>
                        </span>
                    </Link>
                </div>
            </div>

            <div className={styles.scrollIndicator}>
                <div className={styles.scrollLine}>
                    <div className={`${styles.scrollDot} scrollPulse`}></div>
                </div>
                <span className={styles.scrollText}>{t('scroll')}</span>
            </div>

            <div className={styles.heroDecorations}>
                <div className={styles.decoCircle}></div>
                <div className={styles.decoLine}></div>
            </div>
        </section>
    );
}
