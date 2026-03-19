"use client";

import { Canvas } from "@react-three/fiber";
import Mesh from "./Mesh";
import { Suspense } from "react";

export default function Scene() {
    return (
        <Canvas>
            <Suspense fallback={null}>
                <Mesh />
            </Suspense>
        </Canvas>
    );
}