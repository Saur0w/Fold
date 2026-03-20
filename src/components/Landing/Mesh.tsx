"use client";

import * as THREE from "three";
import { useThree } from "@react-three/fiber";
import {OrbitControls, useTexture} from "@react-three/drei";
import { vertexShader, fragmentShader } from "@/lib/Shader";
import { useRef, useMemo } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Mesh() {
    const { viewport } = useThree();
    const texture = useTexture("/textures/m.jpg");
    const matRef = useRef<THREE.ShaderMaterial>(null);
    const meshRef = useRef<THREE.Mesh>(null);
    const w = viewport.width  * (200 / window.innerWidth);
    const h = viewport.height * (220 / window.innerHeight);

    const uniforms = useMemo(() => ({
        uTexture: { value: texture },
        uBend: { value: 0 },
    }), [texture]);


    useGSAP(() => {
        gsap.to(uniforms.uBend, {
            delay: 2,
            value: 0.6,
            opacity: 0,
            duration: 1.8,
            ease: "expo.out",
        });

        if (!meshRef.current) return;

        gsap.to(meshRef.current.scale, {
            delay: 2,
            x: 2,
            y: 2,
            duration: 2.5,
            ease: "expo.out",
        });
        gsap.to(meshRef.current.rotation, {
            x: Math.PI,        // starts flat, flips forward toward you
            duration: 2,
            ease: "expo.out",
        });
    }, {
        scope: meshRef,
    });

    return (
        <mesh ref={meshRef} scale={[1, 1, 1]}>
            <OrbitControls />
            <planeGeometry args={[w, h, 120, 120]} />
            <shaderMaterial
                ref={matRef}
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={uniforms}
                side={THREE.DoubleSide}
            />
        </mesh>
    );
}