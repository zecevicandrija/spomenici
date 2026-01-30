'use client';

import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Quote.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function Quote() {
    const quoteRef = useRef(null);
    const wrapperRef = useRef(null);
    const t = useTranslations('Quote');

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Frame animation
            gsap.fromTo(
                wrapperRef.current,
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1.2,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: quoteRef.current,
                        start: 'top 75%',
                    }
                }
            );

            // Corners expand animation
            gsap.fromTo(
                '.frameCorner',
                { scale: 0 },
                {
                    scale: 1,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: 'back.out(1.7)',
                    delay: 0.5,
                    scrollTrigger: {
                        trigger: quoteRef.current,
                        start: 'top 75%',
                    }
                }
            );

            // Text reveal
            gsap.fromTo(
                '.quoteContent',
                { y: 30, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    ease: 'power3.out',
                    delay: 0.3,
                    scrollTrigger: {
                        trigger: quoteRef.current,
                        start: 'top 75%',
                    }
                }
            );

        }, quoteRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={quoteRef} className={styles.quoteSection}>
            <div className={styles.bgPattern}></div>
            <div className={styles.bgOverlay}></div>

            <div ref={wrapperRef} className={styles.quoteWrapper}>
                {/* Decorative Corners */}
                <div className={`${styles.frameCorner} ${styles.cornerTL} frameCorner`}></div>
                <div className={`${styles.frameCorner} ${styles.cornerTR} frameCorner`}></div>
                <div className={`${styles.frameCorner} ${styles.cornerBR} frameCorner`}></div>
                <div className={`${styles.frameCorner} ${styles.cornerBL} frameCorner`}></div>

                {/* Main Quote Icon */}
                <div className={styles.quoteIcon}>"</div>

                <div className="quoteContent">
                    <blockquote className={styles.quoteText}>
                        <span className={styles.quoteLine}>
                            {t('text')}
                        </span>
                    </blockquote>

                    <div className={styles.quoteAuthor}>
                        <span className={styles.authorLine}></span>
                        <cite className={styles.authorName}>{t('author')}</cite>
                        <span className={styles.authorLine}></span>
                    </div>
                </div>

                {/* Small decorative lines */}
                <div className={styles.decoLines}>
                    <span></span><span></span><span></span>
                </div>
            </div>
        </section>
    );
}
