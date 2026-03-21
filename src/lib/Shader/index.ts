export const vertexShader = `
    varying vec2 vUv;
uniform float uProgress; // 0 → 1

const float PI = 3.14159265;

void main() {
    vUv = uv;
    vec3 pos = position;

    float t = uv.y; // 0 = bottom, 1 = top

    // Top (t=1) leads: completes flip at uProgress=0.5
    // Bottom (t=0) lags: starts at uProgress=0.5, done at 1.0
    float localP = clamp(uProgress * 2.0 - (1.0 - t), 0.0, 1.0);
    float angle = localP * PI; // 0 → PI (half rotation per vertex)

    float origY = pos.y;
    pos.y = origY * cos(angle);   // folds down toward bottom
    pos.z = origY * sin(angle);   // bulges in +Z (toward viewer)

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