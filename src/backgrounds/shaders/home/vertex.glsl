#define PI 3.14159265359

uniform float time;

varying vec2 vUv;

vec3 ripple(float u, float v, float t) {
    float y = sin(PI * (u * t* 0.5) * sin(2. * PI * (v + t)) * 0.5);
    y += sin(PI * (u + v + 0.25 *t));
    return vec3(u, y * (1. / 2.5), v);
}
float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

void main() {
    vec4 modelPosition = modelMatrix * vec4(position, 1.);
    modelPosition.y += sin(random(vUv) * 10. * time);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectionPosition = projectionMatrix * viewPosition;
    gl_Position = projectionPosition;

    vUv = uv;
}