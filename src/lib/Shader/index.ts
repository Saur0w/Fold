export const vertexShader = `
    varying vec2 vUv;
    uniform float uBend;
    
    void main() {
        vUv = uv;
        vec3 pos = position;
        
        float bend = uBend * (pos.y + 1.75);
        pos.z += bend * bend * 0.3;
        
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
`;

export const fragmentShader = `
  uniform sampler2D uTexture;
  varying vec2 vUv;

  void main() {
    vec4 texColor = texture2D(uTexture, vUv);
    gl_FragColor = texColor;
  }
`;