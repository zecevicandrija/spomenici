'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Hero from './Hero';
import Monuments from './Monuments';
import Quote from './Quote';
import Navbar from '../Navbar';
import Footer from '../Footer';
import styles from './Pocetna.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function Pocetna() {
    const [isLoaded, setIsLoaded] = useState(false);

    // Disable scrolling when loading
    useEffect(() => {
        if (!isLoaded) {
            document.documentElement.style.overflow = 'hidden';
            document.body.style.overflow = 'hidden';
        } else {
            document.documentElement.style.overflow = '';
            document.body.style.overflow = '';
        }
        return () => {
            document.documentElement.style.overflow = '';
            document.body.style.overflow = '';
        };
    }, [isLoaded]);
    // Page load animation
    useEffect(() => {
        const loadTl = gsap.timeline();
        loadTl.to({}, { duration: 0.5, onComplete: () => setIsLoaded(true) });
    }, []);

    return (
        <main className={`${styles.main} ${isLoaded ? styles.loaded : ''}`}>

            {/* Loading Screen */}
            <div className={`${styles.loadingScreen} ${isLoaded ? styles.loadingHidden : ''}`}>
                <div className={styles.loadingText}>Učitavanje</div>
                <div className={styles.loadingBar}>
                    <div className={styles.loadingProgress}></div>
                </div>
            </div>

            <Navbar />
            <Hero />
            <Monuments />
            <Quote />
            <Footer />
        </main>
    );
}
