"use client";

import { useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";

export default function Mesh() {
    const { viewport } = useThree();
    const texture = useTexture("/textures/g.jpg");
    return (
        <mesh>
            <planeGeometry args={[3, 3.5]} />
            <meshBasicMaterial map={texture} />
        </mesh>
    );
}