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
        uProgress: { value: 0 },
    }), [texture]);


    useGSAP(() => {
        gsap.to(uniforms.uProgress, {
            delay: 1,
            value: 1,
            duration: 2.5,
            ease: "expo.in"
        });

        if (!meshRef.current) return;

        gsap.to(meshRef.current.scale, {
            delay: 2,
            x: 2.5,
            y: 2.5,
            duration: 1.3,
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