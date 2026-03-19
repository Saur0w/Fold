"use client";

import { useTexture } from "@react-three/drei";
import { vertexShader, fragmentShader } from "@/lib/Shader";

export default function Mesh() {
    const texture = useTexture("/textures/g.jpg");

    return (
        <mesh>
            <planeGeometry args={[3, 3.5]} />
            <shaderMaterial
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={{
                    uTexture: { value: texture },
                }}
            />
        </mesh>
    );
}