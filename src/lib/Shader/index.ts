export const vertexShader = `
    varying vec2 vUv;
    uniform float uBend;
    uniform float uPivot;

    const float PI = 3.14159265;

    void main() {
        vUv = uv;
        vec3 pos = position;
        
        float dist = pos.y - uPivot;
        
        float weight = smoothstep(-0.3, 0.3, dist);
        
        float angle = weight * uBend;
        
        pos.y = uPivot + dist * cos(angle);
        pos.z = dist * sin(angle);
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