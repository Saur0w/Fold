"use client";

import styles from "./style.module.scss";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

export default function Header() {
    const logoRef = useRef<HTMLDivElement>(null);
    const navRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const navSplit = new SplitText(navRef.current, { type: "words" });

        gsap.from(logoRef.current, {
            opacity: 0,
            duration: 0.6,
            ease: "power3.out",
        });

        gsap.from(navSplit.words, {
            yPercent: 110,
            opacity: 0,
            duration: 0.6,
            stagger: 0.08,
            ease: "power3.out",
            delay: 3.5,
        });
    }, []);

    return (
        <header className={styles.header}>
            <div className={styles.logo} ref={logoRef}>
                SAUROW
            </div>
            <div className={styles.nav} ref={navRef}>
                <span>AVAILABLE TO DO FREELANCE <br />SAUUROW@GMAIL.COM</span>
                <span>WEB DESIGN UI UX<br />MOTION DESIGN</span>
                <span>SOCIAL:<br />X DR LI</span>
            </div>
        </header>
    );
}