export const vertexShader = `
    varying vec2 vUv;
    uniform float uBend;

    void main() {
        vUv = uv;
        vec3 pos = position;

        // normalize Y (bottom = 0, top = 1)
        float t = uv.y;

        // only fold top half
        float fold = smoothstep(0.5, 1.0, t);

        // angle goes up to PI (180°)
        float angle = fold * uBend * 3.1415;

        // distance from fold line (center)
        float y = pos.y;
        
        float s = sin(angle);
        float c = cos(angle);

        pos.y -= y * c;
        pos.z -= y * s; 

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