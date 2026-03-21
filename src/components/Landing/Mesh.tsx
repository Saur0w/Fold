"use client";

import * as THREE from "three";
import { useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import { vertexShader, fragmentShader } from "@/lib/Shader";
import { useRef, useMemo } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Mesh() {
    const { viewport } = useThree();
    const texture = useTexture("/textures/m.jpg");
    const matRef = useRef<THREE.ShaderMaterial>(null);
    const meshRef = useRef<THREE.Mesh>(null);

    const w = viewport.width * (200 / window.innerWidth);
    const h = viewport.height * (220 / window.innerHeight);

    const uniforms = useMemo(() => ({
        uTexture: { value: texture },
        uBend: { value: 0.0 },
        uPivot: { value: 0.0 }, // Set to 0.0 to flip from the exact center, adjust as needed
    }), [texture]);

    useGSAP(() => {
        if (!meshRef.current) return;

        // Create a timeline to choreograph the motion perfectly
        const tl = gsap.timeline({ delay: 0.5 });

        // Phase 1: Anticipation (slight zoom out)
        tl.to(meshRef.current.scale, {
            x: 0.85,
            y: 0.85,
            duration: 0.8,
            ease: "power2.out"
        })
            // Phase 2: The Backflip & Cinematic Scale Up
            // Using the "flip" label ensures both animations fire at the exact same time
            .to(uniforms.uBend, {
                value: Math.PI,   // 0 → PI = full 180 degree backflip
                duration: 2.2,
                ease: "power3.inOut",
            }, "flip")
            .to(meshRef.current.scale, {
                x: 4.5, // Scale up enough to engulf the camera
                y: 4.5,
                duration: 2.2,
                ease: "power3.inOut"
            }, "flip");

    }, {
        scope: meshRef,
    });

    return (
        <mesh ref={meshRef} scale={[1, 1, 1]}>
            <planeGeometry args={[w, h, 64, 64]} />
            <shaderMaterial
                ref={matRef}
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={uniforms}
                side={THREE.DoubleSide}
                transparent={true}
            />
        </mesh>
    );
}