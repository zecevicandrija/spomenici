'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import styles from './Tomic.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function TomicPage() {
    const t = useTranslations('TomicPage');
    const containerRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                '.heroTitle span',
                { y: 100, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1.2,
                    stagger: 0.2,
                    ease: 'power4.out',
                    delay: 0.2
                }
            );

            gsap.fromTo(
                '.frameCorner',
                { scale: 0 },
                {
                    scale: 1,
                    duration: 1,
                    stagger: 0.1,
                    ease: 'back.out(1.7)',
                    delay: 0.8
                }
            );

            gsap.fromTo(
                '.fadeContent',
                { y: 30, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    stagger: 0.2,
                    ease: 'power3.out',
                    delay: 0.5
                }
            );

            gsap.fromTo(
                '.factCard',
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.2,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: '.factsSection',
                        start: 'top 80%',
                    }
                }
            );

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <main ref={containerRef} className={styles.pageContainer}>
            <Navbar />

            <section className={styles.heroSection}>
                <div className={styles.heroContent}>
                    <h1 className={`${styles.heroTitle} heroTitle`}>
                        <span className={styles.titleLine}>{t('title').split('–')[0]}</span>
                        <span className={`${styles.titleLine} ${styles.titleAccent}`}>
                            {t('title').split('–')[1] || "GLAS BORBE"}
                        </span>
                    </h1>

                    <div className="fadeContent">
                        <div className={styles.storyTitle}>{t('storyTitle')}</div>
                        <p className={styles.storyText}>{t('storyText1')}</p>
                        <p className={styles.storyText}>{t('storyText2')}</p>
                        <p className={styles.storyText}>{t('storyText3')}</p>
                        <p className={styles.storyText}>{t('storyText4')}</p>
                    </div>
                </div>

                <div className={styles.heroImageWrapper}>
                    <div className={styles.imageFrame}>
                        <div className={`${styles.frameCorner} ${styles.cornerTL} frameCorner`}></div>
                        <div className={`${styles.frameCorner} ${styles.cornerTR} frameCorner`}></div>
                        <div className={`${styles.frameCorner} ${styles.cornerBR} frameCorner`}></div>
                        <div className={`${styles.frameCorner} ${styles.cornerBL} frameCorner`}></div>

                        <div className={styles.imageInner}>
                            <Image
                                src="/Assets/slika1.jpg"
                                alt="Jaša Tomić"
                                width={600}
                                height={800}
                                className={styles.heroImage}
                                priority
                            />
                        </div>
                    </div>
                </div>
            </section>

            <section className={`${styles.factsSection} factsSection`}>
                <div className={styles.factsContainer}>
                    <div className={`${styles.factCard} factCard`}>
                        <h3 className={styles.factTitle}>{t('didYouKnowTitle')}</h3>
                        <p className={styles.factText}>{t('fact1')}</p>
                    </div>
                    <div className={`${styles.factCard} factCard`}>
                        <h3 className={styles.factTitle}>1856—1922</h3>
                        <p className={styles.factText}>{t('fact2')}</p>
                    </div>
                    <div className={`${styles.factCard} factCard`}>
                        <h3 className={styles.factTitle}>{t('locationLabel')}</h3>
                        <p className={styles.factText}>{t('fact3')}</p>
                    </div>
                </div>
            </section>

            <section className={styles.quoteFooter}>
                <blockquote className={styles.quoteText}>
                    "{t('quote')}"
                </blockquote>

                <div className={styles.locationBlock}>
                    <span className={styles.locationLabel}>{t('locationLabel')}</span>
                    <span className={styles.locationValue}>{t('locationValue')}</span>
                </div>
            </section>

            <Footer />
        </main>
    );
}
