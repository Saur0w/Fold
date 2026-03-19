"use client";

import { useThree } from "@react-three/fiber";

export default function Mesh() {
    return (
        <mesh>
            <planeGeometry args={[10, 10]} />
            <meshBasicMaterial color="red" />
        </mesh>
    );
}