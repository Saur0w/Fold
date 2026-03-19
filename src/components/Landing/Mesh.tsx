"use client";

import { useTexture } from "@react-three/drei";

export default function Mesh() {
    const texture = useTexture("/textures/g.jpg");
    return (
        <mesh>
            <planeGeometry args={[3, 3.5]} />
            <meshBasicMaterial map={texture} />
        </mesh>
    );
}