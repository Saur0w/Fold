"use client";

import * as THREE from "three";
import { useTexture } from "@react-three/drei";
import { vertexShader, fragmentShader } from "@/lib/Shader";
import { useRef, useMemo } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Mesh() {
    const texture = useTexture("/textures/g.jpg");
    const matRef = useRef<THREE.ShaderMaterial>(null);
    const meshRef = useRef<THREE.Mesh>(null);

    const uniforms = useMemo(() => ({
        uTexture: { value: texture },
        uBend: { value: 0 },
    }), [texture]);


    useGSAP(() => {
        gsap.to(uniforms.uBend, {
            value: 1,
            duration: 1.4,
            delay: 2,
            ease: "power2.out",
        });
    }, {
        scope: meshRef,
    });

    return (
        <mesh ref={meshRef}>
            <planeGeometry args={[3, 3.5, 1, 20]} />
            <shaderMaterial
                ref={matRef}
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={uniforms}
            />
        </mesh>
    );
}