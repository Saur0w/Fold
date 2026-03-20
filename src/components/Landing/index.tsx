"use client";

import styles from "./style.module.scss";
import Scene from "./Scene";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

interface ImageProps {
    src: string;
    alt: string;
}

const images: ImageProps[] = [
    { src: "/images/look.jpg",    alt: "m" },
    { src: "/images/h.jpg",    alt: "h" },
    { src: "/images/t.jpg",    alt: "t" },
    { src: "/images/b.jpg",    alt: "b" },
    { src: "/images/f.jpg", alt: "look at the sky" },
    { src: "/images/musician.jpg", alt: "Musician" },
    { src: "/images/rosa.jpg", alt: "rosa" },
    { src: "/images/nurture.jpg", alt: "Nurture" },
    { src: "/images/adf.jpg",    alt: "adf" },
    { src: "/images/green.jpg",    alt: "green" },
    { src: "/images/narin.jpg",    alt: "Narin" },
];

export default function Landing() {
    const containerRef = useRef<HTMLDivElement>(null);
    const sceneRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const imgs = containerRef.current?.querySelectorAll("img");
        if (!imgs) return;

        const tl = gsap.timeline({ delay: 1 });

        imgs.forEach((img, i) => {
            tl.set(img, {
                opacity: 0,
            }, i * .15);
        });

        tl.set(sceneRef.current, {
            opacity: 1,
        });
    }, []);

    return (
        <section className={styles.landing}>
            <div className={styles.scene} ref={sceneRef} style={{ opacity: 0 }}>
                <Scene />
            </div>

            <div className={styles.imageContainer} ref={containerRef}>
                {images.map((image, index) => (
                    <Image
                        key={index}
                        src={image.src}
                        alt={image.alt}
                        fill
                        sizes="100vw"
                        style={{
                            objectFit: "cover",
                            zIndex: images.length - index
                        }}
                    />
                ))}
            </div>
        </section>
    );
}