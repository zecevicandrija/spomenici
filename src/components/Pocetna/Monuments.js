'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from '../../i18n/routing';
import styles from './Monuments.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function Monuments() {
    const monumentsRef = useRef(null);
    const monumentCardsRef = useRef([]);
    const [activeCard, setActiveCard] = useState(null);
    const t = useTranslations('Monuments');

    const monumentsData = [
        {
            id: 1,
            key: "miletic",
            name: "Svetozar Miletić",
            year: "1826–1901",
            image: "/Assets/slika1.jpg",
            link: "/svetozar-miletic",
            color: "#C84B31"
        },
        {
            id: 2,
            key: "zmaj",
            name: "Jovan Jovanović Zmaj",
            year: "1833–1904",
            image: "/Assets/jojozmaj.jpg",
            link: "/jovan-jovanovic-zmaj",
            color: "#2D4263"
        },
        {
            id: 3,
            key: "kej",
            name: t('items.kej.name'),
            year: "1971",
            image: "/Assets/kej.jpg",
            link: "/kej-zrtava-racije",
            color: "#1c1c1c"
        },
        {
            id: 4,
            key: "porodica",
            name: t('items.porodica.name'),
            year: "1971",
            image: "/Assets/racije.jpg",
            link: "/porodica",
            color: "#1A472A"
        },
        // {
        //     id: 5,
        //     key: "trandafil",
        //     name: "Marija Trandafil",
        //     year: "1816–1883",
        //     image: "/Assets/slika1.jpg",
        //     link: "/marija-trandafil",
        //     color: "#6B2D5C"
        // },
        {
            id: 6,
            key: "tomic",
            name: "Jaša Tomić",
            year: "1856–1922",
            image: "/Assets/slika1.jpg",
            link: "/jasa-tomic",
            color: "#1C3F60"
        }
    ];

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Brutalist text reveal
            // Optimized smooth fade-up animation
            gsap.fromTo(
                '.monumentsTitle span',
                {
                    opacity: 0,
                    y: 50,
                    filter: "blur(10px)"
                },
                {
                    opacity: 1,
                    y: 0,
                    filter: "blur(0px)",
                    duration: 1,
                    stagger: 0.2,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: monumentsRef.current,
                        start: 'top 75%',
                        once: true
                    }
                }
            );

            // Subtitle fade
            gsap.fromTo(
                '.monumentsSubtitle',
                { y: 30, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    delay: 0.5,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: monumentsRef.current,
                        start: 'top 70%',
                    }
                }
            );

            // Cards animation with 3D effect
            monumentCardsRef.current.forEach((card, index) => {
                if (!card) return;

                // Initial reveal
                gsap.fromTo(
                    card,
                    {
                        rotateX: -15,
                        y: 100,
                        opacity: 0,
                        scale: 0.9
                    },
                    {
                        rotateX: 0,
                        y: 0,
                        opacity: 1,
                        scale: 1,
                        duration: 1.2,
                        ease: 'power4.out',
                        scrollTrigger: {
                            trigger: card,
                            start: 'top 90%',
                        }
                    }
                );

                // Continuous parallax
                gsap.to(card, {
                    y: index % 2 === 0 ? -30 : 30,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: card,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: 1.5
                    }
                });
            });

            // Background shapes animation
            gsap.to('.bgShape', {
                rotation: 360,
                duration: 20,
                repeat: -1,
                ease: 'none'
            });

        }, monumentsRef);

        return () => ctx.revert();
    }, []);

    const addToRefs = (el) => {
        if (el && !monumentCardsRef.current.includes(el)) {
            monumentCardsRef.current.push(el);
        }
    };

    return (
        <section ref={monumentsRef} id="monuments" className={styles.monumentsSection}>
            {/* Background geometric shapes */}
            <div className={styles.bgShapes}>
                <div className={`${styles.bgShape} ${styles.shape1} bgShape`}></div>
                <div className={`${styles.bgShape} ${styles.shape2} bgShape`}></div>
                <div className={`${styles.bgShape} ${styles.shape3} bgShape`}></div>
            </div>

            <div className={styles.sectionContainer}>
                {/* Brutalist Header */}
                <div className={styles.sectionHeader}>
                    <div className={styles.headerTop}>
                        <span className={styles.sectionLabel}>
                            <span className={styles.labelLine}></span>
                            {t('label')}
                        </span>
                        <div className={styles.yearDisplay}>1826—1971</div>
                    </div>

                    <h2 className={`${styles.sectionTitle} monumentsTitle`}>
                        <span className={styles.titleMain}>{t('titleMain')}</span>
                        <span className={styles.titleAccent}>{t('titleAccent')}</span>
                    </h2>

                    <div className={styles.headerBottom}>
                        <p className={`${styles.sectionDescription} monumentsSubtitle`}>
                            {t('subtitle')}
                        </p>
                        <div className={styles.decorativeGrid}>
                            <span></span><span></span><span></span>
                            <span></span><span></span><span></span>
                        </div>
                    </div>
                </div>

                {/* Monument Cards Grid */}
                <div className={styles.monumentsGrid}>
                    {monumentsData.map((monument, index) => (
                        <article
                            key={monument.id}
                            ref={addToRefs}
                            className={styles.monumentCard}
                            onMouseEnter={() => setActiveCard(monument.id)}
                            onMouseLeave={() => setActiveCard(null)}
                            style={{ '--card-color': monument.color }}
                        >
                            {/* Card Number */}
                            <div className={styles.cardNumber}>
                                <span>{String(monument.id).padStart(2, '0')}</span>
                            </div>

                            {/* Image Container with Brutalist Frame */}
                            <div className={styles.cardVisual}>
                                <div className={styles.brutalistFrame}>
                                    <span className={styles.frameCorner} style={{ top: 0, left: 0 }}></span>
                                    <span className={styles.frameCorner} style={{ top: 0, right: 0 }}></span>
                                    <span className={styles.frameCorner} style={{ bottom: 0, right: 0 }}></span>
                                    <span className={styles.frameCorner} style={{ bottom: 0, left: 0 }}></span>
                                </div>

                                <div className={styles.imageWrapper}>
                                    <img
                                        src={monument.image}
                                        alt={monument.name}
                                        className={styles.cardImage}
                                    />
                                    <div className={styles.imageOverlay}></div>
                                    <div className={styles.colorOverlay}></div>
                                </div>

                                {/* Category Badge */}
                                <div className={styles.categoryBadge}>
                                    <span>{t(`items.${monument.key}.category`)}</span>
                                </div>
                            </div>

                            {/* Card Content */}
                            <div className={styles.cardContent}>
                                <div className={styles.contentHeader}>
                                    <h3 className={styles.cardTitle}>{monument.name}</h3>
                                    <span className={styles.cardYear}>{monument.year}</span>
                                </div>

                                <div className={styles.dividerLine}></div>

                                <p className={styles.cardDescription}>{t(`items.${monument.key}.desc`)}</p>

                                <Link href={monument.link} className={styles.cardButton}>
                                    <span className={styles.buttonBg}></span>
                                    <span className={styles.buttonText}>{t('explore')}</span>
                                    <svg className={styles.buttonIcon} viewBox="0 0 24 24" fill="none">
                                        <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
                                    </svg>
                                </Link>
                            </div>

                            {/* Decorative Elements */}
                            <div className={styles.cardDecor}>
                                <span className={styles.decorDot}></span>
                                <span className={styles.decorLine}></span>
                            </div>
                        </article>
                    ))}
                </div>

                {/* Bottom Decorative Section */}
                <div className={styles.bottomDecor}>
                    <div className={styles.decorText}>NOVI SAD</div>
                    <div className={styles.decorPattern}>
                        {[...Array(12)].map((_, i) => (
                            <span key={i}></span>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}