"use client";

import * as THREE from "three";
import { useThree } from "@react-three/fiber";
import { useTexture} from "@react-three/drei";
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
        uBend: { value: 0.0 },
        uPivot: { value: h * 0.15 },
    }), [texture, h]);


    useGSAP(() => {
        gsap.to(uniforms.uBend, {
            delay: 1,
            value: Math.PI,   // 0 → PI = full fold
            duration: 2.5,
            ease: "expo.in",
        });

        if (!meshRef.current) return;

        gsap.to(meshRef.current.scale, {
            delay: 2,
            x: 2.5,
            y: 2.5,
            duration: 1.2,
            ease: "expo.in"
        });
    }, {
        scope: meshRef,
    });

    return (
        <>
            <mesh ref={meshRef} scale={[1, 1, 1]}>
                <planeGeometry args={[w, h, 120, 120]} />
                <shaderMaterial
                    ref={matRef}
                    vertexShader={vertexShader}
                    fragmentShader={fragmentShader}
                    uniforms={uniforms}
                    side={THREE.DoubleSide}
                />
            </mesh>
        </>
    );
}