export const vertexShader = `
  // vertex shader
varying vec2 vUv;
uniform float uBend; // 0 = flat, 1 = fully bent

void main() {
  vUv = uv;

  vec3 pos = position;

  // bend forward along Z using Y position as the curve axis
  float bend = uBend * (pos.y + 1.75); // 1.75 = half plane height
  pos.z -= bend * bend * 0.3;          // quadratic curve = natural fold

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