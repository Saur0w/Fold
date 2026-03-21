export const vertexShader = `
    varying vec2 vUv;
    uniform float uBend;
    uniform float uPivot;
    uniform float uCurve;

    const float PI = 3.14159265359;

    void main() {
        vUv = uv;
        vec3 pos = position;

        float flex = sin(vUv.y * PI) * uCurve * sin(uBend);
        pos.z -= flex;
        float distY = pos.y - uPivot;
        float distZ = pos.z;

        pos.y = uPivot + distY * cos(uBend) - distZ * sin(uBend);
        pos.z = distY * sin(uBend) + distZ * cos(uBend);

        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
`;

export const fragmentShader = `
    uniform sampler2D uTexture;
    varying vec2 vUv;

    void main() {
        vec2 uv = vUv;

        if (!gl_FrontFacing) {
            uv.y = 1.0 - vUv.y;
        }

        vec4 texColor = texture2D(uTexture, uv);
        gl_FragColor = texColor;
    }
`;