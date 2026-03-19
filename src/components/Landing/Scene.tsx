"use client";

import {Canvas} from "@react-three/fiber";
import Obj from "./Mesh";
import { Suspense } from "react";

export default function Scene() {

    return (
        <Canvas
            camera={{ position: [0, 0, 5] }}
        >
            <Suspense fallback={null}>
                <Obj />
            </Suspense>
        </Canvas>
    );
}