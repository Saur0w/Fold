export const vertexShader = `
    varying vec2 vUv;
    uniform float uBend;
    uniform float uPivot;

    void main() {
        vUv = uv;
        vec3 pos = position;
        
        // 1. Distance from the pivot point
        float dist = pos.y - uPivot;
        
        // 2. Rigid Rotation
        // By rotating all vertices uniformly around the pivot, 
        // we guarantee NO stretching at any point.
        pos.y = uPivot + dist * cos(uBend);
        pos.z = dist * sin(uBend);
        
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
`;

export const fragmentShader = `
    uniform sampler2D uTexture;
    varying vec2 vUv;

    void main() {
        vec2 uv = vUv;

        // When the plane flips 180 degrees, the back face becomes visible.
        if (!gl_FrontFacing) {
            uv.y = 1.0 - vUv.y; // Fixes upside-down
            uv.x = 1.0 - vUv.x; // Fixes horizontal mirroring (reading left-to-right)
        }

        vec4 texColor = texture2D(uTexture, uv);
        gl_FragColor = texColor;
    }
`;