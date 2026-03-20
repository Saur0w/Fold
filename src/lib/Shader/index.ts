export const vertexShader = `
    varying vec2 vUv;
    uniform float uBend;
    
    void main() {
        vUv = uv;
        vec3 pos = position;
        float PI = 3.14;
       
       
        
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