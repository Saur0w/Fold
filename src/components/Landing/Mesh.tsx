"use client";

import * as THREE from "three";
import { useThree, ThreeEvent } from "@react-three/fiber";
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

    const w = viewport.width  * (200 / window.innerWidth);
    const h = viewport.height * (220 / window.innerHeight);

    const uniforms = useMemo(() => ({
        uTexture: { value: texture },
        uBend:  { value: 0.0 },
        uPivot: { value: 0.0 },
        uCurve: { value: 0.4 },
        uMouse: { value: new THREE.Vector2(0.5, 0.5) },
        uHover: { value: 0.0 },
    }), [texture]);

    const handlePointerMove = (e: ThreeEvent<PointerEvent>) => {
        if (!meshRef.current) return;

        if (e.uv) {
            uniforms.uMouse.value.set(e.uv.x, e.uv.y);
        }
    };

    const handlePointerEnter = () => {
        document.body.style.cursor = "pointer";
        gsap.to(uniforms.uHover, {
            value: 1,
            duration: 0.4,
            ease: "power2.out",
        });
    };

    const handlePointerLeave = () => {
        document.body.style.cursor = "default";
        gsap.to(uniforms.uHover, {
            value: 0,
            duration: 0.6,
            ease: "power2.out",
        });
    };

    useGSAP(() => {
        if (!meshRef.current) return;

        const tl = gsap.timeline({ delay: 0.5 });

        tl.to(meshRef.current.scale, {
            x: 0.85,
            y: 0.85,
            duration: 0.8,
            ease: "power2.out",
        })
            .to(uniforms.uBend, {
                value: Math.PI,
                duration: 2.2,
                ease: "power3.inOut",
            }, "flip")
            .to(meshRef.current.scale, {
                x: 2.5,
                y: 2.5,
                duration: 2.2,
                ease: "power3.inOut",
            }, "flip");

    }, { scope: meshRef });

    return (
        <mesh
            ref={meshRef}
            scale={[1, 1, 1]}
            onPointerMove={handlePointerMove}
            onPointerEnter={handlePointerEnter}
            onPointerLeave={handlePointerLeave}
        >
            <planeGeometry args={[w, h, 128, 128]} />
            <shaderMaterial
                ref={matRef}
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={uniforms}
                side={THREE.DoubleSide}
                transparent
            />
        </mesh>
    );
}