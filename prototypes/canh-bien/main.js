// Người giữ biển — cảnh thử (prototype)
// © Võ Thái Anh. Model 3D: Kenney (CC0). Thư viện: three.js (MIT).
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const errBox = document.getElementById('err');
window.addEventListener('error', e => { errBox.textContent += (e.message || e) + '\n'; });

// ---------- Renderer / scene / camera ----------
const isMobile = Math.min(innerWidth, innerHeight) < 700;
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(Math.min(devicePixelRatio, isMobile ? 1.75 : 2));
renderer.setSize(innerWidth, innerHeight);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.0;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
scene.fog = new THREE.Fog(0xe9a07a, 40, 220);

const camera = new THREE.PerspectiveCamera(45, innerWidth / innerHeight, 0.1, 1000);
camera.position.set(11.5, 8, 14);

const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 0.6, 1.8);
controls.enableDamping = true;
controls.enablePan = false;
controls.minDistance = 7;
controls.maxDistance = 48;
controls.minPolarAngle = 0.35;
controls.maxPolarAngle = 1.42;
controls.autoRotate = true;
controls.autoRotateSpeed = 0.35;
function fitCam() { const k = camera.aspect < 0.8 ? 1.75 : camera.aspect < 1.2 ? 1.3 : 1; camera.position.set(11.5 * k, 8 * k, 14 * k); }
fitCam();
controls.addEventListener('start', () => { controls.autoRotate = false; });

// ---------- Waves (shared JS + GLSL) ----------
// [dirX, dirZ, k (tần số), tốc độ], biên độ riêng
const WAVES = [
  [0.96, 0.28, 0.16, 1.0], [-0.37, 0.93, 0.26, 1.35],
  [0.71, -0.71, 0.52, 2.0], [-0.98, -0.2, 0.95, 2.6],
];
const WAMP = [0.32, 0.2, 0.09, 0.045];
const S = { amp: 1 }; // hệ số sóng hiện tại (bão > 1)
function waveH(x, z, t) {
  let h = 0;
  for (let i = 0; i < 4; i++) { const w = WAVES[i]; h += WAMP[i] * Math.sin((w[0] * x + w[1] * z) * w[2] + t * w[3]); }
  return h * S.amp;
}
function waveSlope(x, z, t) {
  let dx = 0, dz = 0;
  for (let i = 0; i < 4; i++) { const w = WAVES[i]; const c = WAMP[i] * Math.cos((w[0] * x + w[1] * z) * w[2] + t * w[3]) * w[2]; dx += c * w[0]; dz += c * w[1]; }
  return [dx * S.amp, dz * S.amp];
}

// ---------- Presets (thời điểm trong ngày) ----------
const C = h => new THREE.Color(h);
const PRESETS = {
  day:    { zen: C(0x3f86d6), hor: C(0xbfe2f2), deep: C(0x0d4a66), shallow: C(0x2896b0), fog: C(0xcde6f0), fogN: 50, fogF: 240,
            sunCol: C(0xfff3dd), sunI: 2.6, sunDir: new THREE.Vector3(0.35, 0.85, 0.4), hemiI: 1.1, hemiSky: C(0xcfe8ff), hemiGround: C(0x6a7f8a),
            amp: 1, cloud: 0.35, stars: 0, lantern: 0, rain: 0, exposure: 1.0, foam: 0.5, sunStr: 1.2 },
  sunset: { zen: C(0x2c3d78), hor: C(0xff9b5c), deep: C(0x16294a), shallow: C(0x3f6a8a), fog: C(0xe39c78), fogN: 40, fogF: 220,
            sunCol: C(0xffb36b), sunI: 2.2, sunDir: new THREE.Vector3(-0.75, 0.16, -0.64), hemiI: 0.9, hemiSky: C(0xffc29a), hemiGround: C(0x4a4060),
            amp: 1, cloud: 0.45, stars: 0.1, lantern: 0.6, rain: 0, exposure: 1.05, foam: 0.45, sunStr: 2.0 },
  night:  { zen: C(0x040916), hor: C(0x1a2850), deep: C(0x040b18), shallow: C(0x10243c), fog: C(0x0f1830), fogN: 30, fogF: 170,
            sunCol: C(0x9fb8ff), sunI: 0.55, sunDir: new THREE.Vector3(0.4, 0.6, -0.7), hemiI: 0.35, hemiSky: C(0x6a80c0), hemiGround: C(0x101524),
            amp: 0.9, cloud: 0.25, stars: 1, lantern: 1.4, rain: 0, exposure: 1.15, foam: 0.25, sunStr: 0.8 },
  storm:  { zen: C(0x23282f), hor: C(0x56606b), deep: C(0x15232b), shallow: C(0x34505a), fog: C(0x4a545e), fogN: 12, fogF: 95,
            sunCol: C(0xb8c4d0), sunI: 0.7, sunDir: new THREE.Vector3(0.2, 0.9, 0.3), hemiI: 0.75, hemiSky: C(0x9aa6b4), hemiGround: C(0x2c333a),
            amp: 2.7, cloud: 1, stars: 0, lantern: 1.1, rain: 1, exposure: 1.0, foam: 1, sunStr: 0.1 },
};
const state = {};
for (const [k, v] of Object.entries(PRESETS.sunset)) state[k] = v && v.clone ? v.clone() : v;
let target = PRESETS.sunset;

// ---------- Lights ----------
const hemi = new THREE.HemisphereLight(0xffffff, 0x444444, 1);
scene.add(hemi);
const sun = new THREE.DirectionalLight(0xffffff, 2);
sun.castShadow = true;
sun.shadow.mapSize.set(isMobile ? 1024 : 2048, isMobile ? 1024 : 2048);
const sc = sun.shadow.camera; sc.left = -16; sc.right = 16; sc.top = 16; sc.bottom = -16; sc.near = 1; sc.far = 80;
sun.shadow.bias = -0.0008; sun.shadow.normalBias = 0.03;
scene.add(sun, sun.target);

// ---------- Sky dome ----------
const skyMat = new THREE.ShaderMaterial({
  side: THREE.BackSide, depthWrite: false, fog: false,
  uniforms: { uZen: { value: new THREE.Color() }, uHor: { value: new THREE.Color() }, uFog: { value: new THREE.Color() },
              uSunDir: { value: new THREE.Vector3() }, uSunCol: { value: new THREE.Color() }, uCloud: { value: 0.4 },
              uTime: { value: 0 }, uFlash: { value: 0 }, uStars: { value: 0 } },
  vertexShader: `varying vec3 vDir; void main(){ vDir = normalize(position); vec4 p = projectionMatrix * modelViewMatrix * vec4(position,1.0); gl_Position = p.xyww; }`,
  fragmentShader: `
    uniform vec3 uZen, uHor, uFog, uSunDir, uSunCol; uniform float uCloud, uTime, uFlash, uStars; varying vec3 vDir;
    float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453); }
    float noise(vec2 p){ vec2 i=floor(p), f=fract(p); f=f*f*(3.0-2.0*f);
      return mix(mix(hash(i),hash(i+vec2(1,0)),f.x), mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),f.x), f.y); }
    float fbm(vec2 p){ float s=0.0, a=0.5; for(int i=0;i<5;i++){ s+=a*noise(p); p*=2.03; a*=0.5; } return s; }
    void main(){
      vec3 d = normalize(vDir);
      float y = d.y;
      vec3 col = mix(uHor, uZen, pow(clamp(y,0.0,1.0), 0.55));
      col = mix(col, uFog, smoothstep(0.08, -0.05, y));
      float sd = max(dot(d, normalize(uSunDir)), 0.0);
      col += uSunCol * (pow(sd, 8.0) * 0.35 + pow(sd, 64.0) * 0.6) * (1.0 - uCloud * 0.8);
      col += uSunCol * smoothstep(0.9990, 0.9996, sd) * 2.5 * (1.0 - uCloud);
      // stars
      if (uStars > 0.0 && y > 0.0) {
        vec2 g = d.xz / (y + 0.35) * 160.0; vec2 cell = floor(g);
        float h = hash(cell); float tw = 0.6 + 0.4 * sin(uTime * 2.0 + h * 40.0);
        float st = step(0.985, h) * smoothstep(0.35, 0.0, length(fract(g) - 0.5)) * tw;
        col += vec3(st) * uStars * smoothstep(0.0, 0.25, y);
      }
      // clouds
      if (y > -0.02) {
        vec2 cp = d.xz / (y + 0.12) * 1.6 + vec2(uTime * 0.015, uTime * 0.006);
        float n = fbm(cp);
        float cov = smoothstep(0.75 - uCloud * 0.45, 1.05 - uCloud * 0.35, n);
        vec3 cc = mix(uHor * 1.05, mix(uZen, uHor, 0.5) * 0.7, uCloud);
        cc += uSunCol * pow(sd, 6.0) * 0.4 * (1.0 - uCloud);
        col = mix(col, cc, cov * smoothstep(-0.02, 0.15, y) * (0.55 + uCloud * 0.4));
      }
      col += vec3(0.75, 0.8, 1.0) * uFlash;
      gl_FragColor = vec4(col, 1.0);
      #include <tonemapping_fragment>
      #include <colorspace_fragment>
    }`,
});
const sky = new THREE.Mesh(new THREE.SphereGeometry(450, 48, 24), skyMat);
sky.frustumCulled = false;
scene.add(sky);

// ---------- Ocean ----------
const waterUniforms = {
  uTime: { value: 0 }, uAmp: { value: 1 },
  uW: { value: WAVES.map(w => new THREE.Vector4(...w)) }, uA: { value: WAMP.slice() },
  uDeep: { value: new THREE.Color() }, uShallow: { value: new THREE.Color() },
  uZen: { value: new THREE.Color() }, uHor: { value: new THREE.Color() },
  uSunDir: { value: new THREE.Vector3() }, uSunCol: { value: new THREE.Color() }, uSunStr: { value: 1 },
  uFogCol: { value: new THREE.Color() }, uFogNear: { value: 40 }, uFogFar: { value: 220 }, uFoam: { value: 0.5 }, uFlash: { value: 0 },
};
const waterMat = new THREE.ShaderMaterial({
  uniforms: waterUniforms, transparent: true, fog: false,
  vertexShader: `
    uniform float uTime, uAmp; uniform vec4 uW[4]; uniform float uA[4];
    varying vec3 vPos; varying vec3 vN; varying float vH;
    void main(){
      vec4 wp = modelMatrix * vec4(position, 1.0);
      float h = 0.0, dx = 0.0, dz = 0.0;
      for (int i = 0; i < 4; i++) {
        float ph = dot(uW[i].xy, wp.xz) * uW[i].z + uTime * uW[i].w;
        h += uA[i] * sin(ph);
        float c = uA[i] * cos(ph) * uW[i].z; dx += c * uW[i].x; dz += c * uW[i].y;
      }
      h *= uAmp; dx *= uAmp; dz *= uAmp;
      wp.y += h; vH = h; vPos = wp.xyz; vN = normalize(vec3(-dx, 1.0, -dz));
      gl_Position = projectionMatrix * viewMatrix * wp;
    }`,
  fragmentShader: `
    uniform float uTime, uAmp, uSunStr, uFogNear, uFogFar, uFoam, uFlash;
    uniform vec3 uDeep, uShallow, uZen, uHor, uSunDir, uSunCol, uFogCol;
    varying vec3 vPos; varying vec3 vN; varying float vH;
    float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453); }
    float noise(vec2 p){ vec2 i=floor(p), f=fract(p); f=f*f*(3.0-2.0*f);
      return mix(mix(hash(i),hash(i+vec2(1,0)),f.x), mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),f.x), f.y); }
    void main(){
      vec2 p = vPos.xz;
      // gợn sóng nhỏ
      vec3 rip = vec3(
        sin(p.x * 1.9 + uTime * 1.6) * 0.06 + sin((p.x + p.y) * 3.7 - uTime * 2.3) * 0.035 + (noise(p * 1.3 + uTime * 0.4) - 0.5) * 0.12,
        0.0,
        cos(p.y * 2.3 - uTime * 1.4) * 0.06 + sin((p.x - p.y) * 4.1 + uTime * 2.0) * 0.03 + (noise(p * 1.3 - uTime * 0.37 + 9.0) - 0.5) * 0.12);
      vec3 N = normalize(vN + rip * (0.6 + uAmp * 0.25));
      vec3 V = normalize(cameraPosition - vPos);
      float fres = 0.04 + 0.96 * pow(1.0 - max(dot(N, V), 0.0), 5.0);
      vec3 R = reflect(-V, N);
      vec3 skyc = mix(uHor, uZen, pow(clamp(R.y, 0.0, 1.0), 0.55));
      vec3 base = mix(uDeep, uShallow, clamp(vH * 0.55 + 0.45, 0.0, 1.0));
      // tán xạ dưới mặt nước ở đỉnh sóng
      float sss = pow(max(dot(V, -normalize(uSunDir + vec3(0.0, -0.3, 0.0))), 0.0), 3.0) * clamp(vH, 0.0, 1.0);
      base += uShallow * sss * 0.8;
      vec3 col = mix(base, skyc, clamp(fres * 0.7, 0.0, 0.75));
      vec3 L = normalize(uSunDir);
      float spec = pow(max(dot(R, L), 0.0), 220.0) * 6.0 + pow(max(dot(R, L), 0.0), 24.0) * 0.25;
      col += uSunCol * spec * uSunStr;
      // bọt sóng
      float fn = noise(p * 2.2 + uTime * 0.3) * noise(p * 5.1 - uTime * 0.5);
      float foam = smoothstep(0.5 * uAmp, 0.75 * uAmp, vH + fn * 0.3 * uAmp) * uFoam * smoothstep(0.2, 0.5, fn);
      col = mix(col, vec3(0.92, 0.95, 0.97), foam * 0.8);
      col += vec3(0.7, 0.75, 0.9) * uFlash * 0.4;
      float d = length(vPos - cameraPosition);
      float f = smoothstep(uFogNear, uFogFar, d);
      col = mix(col, uFogCol, f);
      gl_FragColor = vec4(col, mix(0.88, 1.0, max(f, fres)));
      #include <tonemapping_fragment>
      #include <colorspace_fragment>
    }`,
});
const ocean = new THREE.Mesh(new THREE.PlaneGeometry(520, 520, isMobile ? 180 : 260, isMobile ? 180 : 260), waterMat);
ocean.rotation.x = -Math.PI / 2;
ocean.renderOrder = 2;
scene.add(ocean);

// ---------- Model loader ----------
const manager = new THREE.LoadingManager();
const pbar = document.getElementById('pbar');
manager.onProgress = (_u, l, t) => { pbar.style.width = (l / t * 100).toFixed(0) + '%'; };
const loader = new GLTFLoader(manager);
const cache = new Map();
function getModel(path) {
  if (!cache.has(path)) cache.set(path, loader.loadAsync('./models/' + path + '.glb').then(g => {
    g.scene.traverse(o => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; } });
    return g.scene;
  }));
  return cache.get(path);
}
const _box = new THREE.Box3(), _v = new THREE.Vector3();
// Tạo bản sao model, tự co giãn: w = bề ngang lớn nhất, h = chiều cao. Gốc của wrapper = tâm đáy model.
async function make(path, { w, h, s } = {}) {
  const src = await getModel(path);
  const m = src.clone(true);
  _box.setFromObject(m); _box.getSize(_v);
  let k = s ?? 1;
  if (w) k = w / Math.max(_v.x, _v.z); else if (h) k = h / _v.y;
  m.scale.setScalar(k);
  _box.setFromObject(m);
  const c = _box.getCenter(new THREE.Vector3());
  m.position.set(-c.x, -_box.min.y, -c.z);
  const g = new THREE.Group(); g.add(m);
  g.userData.size = _box.getSize(new THREE.Vector3());
  return g;
}
async function put(parent, path, opts, x = 0, y = 0, z = 0, ry = 0) {
  const g = await make(path, opts);
  g.position.set(x, y, z); g.rotation.y = ry; parent.add(g); return g;
}

// ---------- Build the world ----------
const floaters = []; // vật nổi bập bềnh theo sóng: { obj, x, z, base, roll }
const fishes = [];
let raft, flag, lanternLight, lanternBulb, cages = [];
const DECK = 0.85; // độ cao mặt sàn bè (so với mặt nước)

const woodMat = new THREE.MeshStandardMaterial({ color: 0x9a6a45, roughness: 0.85 });
const woodDark = new THREE.MeshStandardMaterial({ color: 0x6e4a31, roughness: 0.9 });
const floatMat = new THREE.MeshStandardMaterial({ color: 0x2f6fb3, roughness: 0.55 });
const ropeMat = new THREE.MeshStandardMaterial({ color: 0xd8c9a3, roughness: 1 });

function netTexture() {
  const c = document.createElement('canvas'); c.width = c.height = 128;
  const g = c.getContext('2d'); g.clearRect(0, 0, 128, 128);
  g.strokeStyle = 'rgba(30,40,45,0.9)'; g.lineWidth = 3;
  g.beginPath(); g.moveTo(0, 64); g.lineTo(64, 0); g.lineTo(128, 64); g.lineTo(64, 128); g.closePath(); g.stroke();
  g.beginPath(); g.moveTo(0, 0); g.lineTo(0, 0); g.stroke();
  const t = new THREE.CanvasTexture(c); t.wrapS = t.wrapT = THREE.RepeatWrapping; t.colorSpace = THREE.SRGBColorSpace;
  return t;
}
const netTex = netTexture();

function buildCage(cx, cz, size) {
  const cage = new THREE.Group();
  cage.position.set(cx, 0, cz);
  const half = size / 2, wW = 0.75, top = 0.38;
  // lối đi bằng ván quanh lồng
  const planksPerSide = Math.round(size / 0.32);
  const plankGeo = new THREE.BoxGeometry(wW, 0.07, 0.28);
  for (let side = 0; side < 4; side++) {
    for (let i = 0; i < planksPerSide; i++) {
      const t = -half + (i + 0.5) * (size / planksPerSide);
      const m = new THREE.Mesh(plankGeo, (i + side) % 5 === 0 ? woodDark : woodMat);
      m.castShadow = m.receiveShadow = true;
      m.rotation.y = (side % 2) * Math.PI / 2;
      m.rotation.z = (Math.random() - 0.5) * 0.04;
      const off = half + wW / 2 - 0.02;
      if (side === 0) m.position.set(t, top, -off); if (side === 1) m.position.set(off, top, t);
      if (side === 2) m.position.set(-t, top, off); if (side === 3) m.position.set(-off, top, -t);
      if (side % 2 === 1) m.rotation.y = Math.PI / 2;
      m.scale.x = 1; cage.add(m);
    }
    // phao nhựa xanh bên dưới
    const fl = new THREE.Mesh(new THREE.CylinderGeometry(0.26, 0.26, size + wW * 2, 14), floatMat);
    fl.castShadow = true; fl.rotation.z = Math.PI / 2;
    const off = half + wW / 2;
    if (side === 0) fl.position.set(0, 0.1, -off); if (side === 2) fl.position.set(0, 0.1, off);
    if (side === 1) { fl.rotation.set(Math.PI / 2, 0, 0); fl.position.set(off, 0.1, 0); }
    if (side === 3) { fl.rotation.set(Math.PI / 2, 0, 0); fl.position.set(-off, 0.1, 0); }
    cage.add(fl);
  }
  // lưới
  const netMat = new THREE.MeshBasicMaterial({ map: netTex, transparent: true, side: THREE.DoubleSide, depthWrite: false, opacity: 0.75, alphaTest: 0.05 });
  const depth = 3.2, up = 0.7;
  for (let side = 0; side < 4; side++) {
    const tex = netTex.clone(); tex.needsUpdate = true; tex.repeat.set(size * 2.2, (depth + up) * 2.2);
    const m = new THREE.Mesh(new THREE.PlaneGeometry(size, depth + up), netMat.clone()); m.material.map = tex;
    m.position.y = top + up - (depth + up) / 2;
    m.rotation.y = side * Math.PI / 2;
    m.position.x = Math.sin(side * Math.PI / 2) * half; m.position.z = Math.cos(side * Math.PI / 2) * half;
    cage.add(m);
  }
  // cọc + dây thành lồng
  const postGeo = new THREE.CylinderGeometry(0.05, 0.05, up + 0.15, 6);
  const n = 4;
  for (let side = 0; side < 4; side++) for (let i = 0; i < n; i++) {
    const t = -half + i * (size / n);
    const p = new THREE.Mesh(postGeo, woodDark); p.castShadow = true;
    const a = side * Math.PI / 2, ca = Math.cos(a), sa = Math.sin(a);
    p.position.set(ca * t + sa * half, top + up / 2, -sa * t + ca * half);
    cage.add(p);
  }
  const rope = new THREE.Mesh(new THREE.TorusGeometry(half * Math.SQRT2, 0.025, 4, 4), ropeMat);
  rope.rotation.set(Math.PI / 2, 0, Math.PI / 4); rope.position.y = top + up; cage.add(rope);
  scene.add(cage);
  cages.push({ obj: cage, x: cx, z: cz, size });
  floaters.push({ obj: cage, x: cx, z: cz, base: 0, roll: 0.5 });
  return cage;
}

async function build() {
  raft = new THREE.Group();
  scene.add(raft);
  floaters.push({ obj: raft, x: 0, z: -1.25, base: 0, roll: 0.35 });

  // --- Sàn bè: 3x2 ô + cầu tàu ---
  const T = 2.5;
  const tiles = [];
  for (const x of [-T, 0, T]) for (const z of [-T, 0]) tiles.push([x, z, 'pk/structure-platform']);
  tiles.push([0, T, 'pk/structure-platform-dock']);
  for (const [x, z, p] of tiles) {
    const g = await make(p, { w: T + 0.02 });
    g.position.set(x, DECK - g.userData.size.y, z);
    raft.add(g);
  }
  // phao dưới bè
  for (const x of [-T, 0, T]) for (const z of [-T * 1.45, -T * 0.55, T * 0.35]) {
    if (z > 0 && x !== 0) continue;
    const f = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.42, 1.6, 16), floatMat);
    f.rotation.z = Math.PI / 2; f.position.set(x, 0.05, z); f.castShadow = true; raft.add(f);
  }

  // --- Chòi nghỉ (mái lá) ---
  const hut = await put(raft, 'pk/structure-roof', { w: 3.5 }, -2.6, DECK, -2.4, 0);
  await put(raft, 'sk/bedroll', { w: 1.6 }, -2.9, DECK, -2.6, Math.PI / 2);
  await put(raft, 'sk/box', { w: 0.6 }, -1.8, DECK, -3.3, 0.3);
  await put(raft, 'pk/bottle-large', { h: 0.35 }, -1.75, DECK + 0.62, -3.3, 0);
  // đèn bão treo dưới mái
  lanternBulb = new THREE.Mesh(new THREE.SphereGeometry(0.11, 12, 8), new THREE.MeshBasicMaterial({ color: 0xffc070 }));
  lanternBulb.position.set(-2.2, DECK + 2.0, -1.8); raft.add(lanternBulb);
  lanternLight = new THREE.PointLight(0xffb060, 0, 14, 1.6);
  lanternLight.position.copy(lanternBulb.position); raft.add(lanternLight);

  // --- Đồ trên sàn ---
  await put(raft, 'sk/workbench', { w: 1.5 }, 2.4, DECK, -3.05, 0);
  await put(raft, 'pk/barrel', { h: 0.95 }, 3.35, DECK, -0.9, 0.2);
  await put(raft, 'pk/barrel', { h: 0.95 }, 3.15, DECK, -0.05, 1.1);
  await put(raft, 'sk/barrel-open', { h: 0.85 }, 2.35, DECK, -0.35, 0);
  await put(raft, 'pk/crate', { w: 0.85 }, 3.3, DECK, 0.9, 0.35);
  await put(raft, 'pk/chest', { w: 0.9 }, 0.3, DECK, -3.35, 0);
  await put(raft, 'sk/campfire-fishing-stand', { w: 1.5 }, 0.6, DECK, -1.15, 0.4);
  await put(raft, 'sk/bucket', { h: 0.5 }, 1.25, DECK, 0.95, 0);
  await put(raft, 'sk/fish-large', { w: 0.7 }, 0.55, DECK + 0.02, 1.15, 1.2);
  await put(raft, 'sk/resource-planks', { w: 1.4 }, -3.1, DECK, 0.65, 0.15);
  await put(raft, 'pk/tool-paddle', { h: 1.6 }, -0.8, DECK, 3.4, 0.6);
  flag = await put(raft, 'pk/flag-high', { h: 4.2 }, -3.55, DECK, 0.95, -0.4);
  // thuyền nhỏ buộc cạnh cầu tàu
  const boat = await make('pk/boat-row-small', { w: 2.6 });
  boat.rotation.y = Math.PI / 2; scene.add(boat);
  floaters.push({ obj: boat, x: 5.3, z: -0.6, base: -0.15, roll: 1, ry: 0.12 });

  // --- Lồng cá ---
  buildCage(-3.25, 6.5, 5);
  buildCage(3.25, 6.5, 5);
  // cá trong lồng
  for (const cg of cages) for (let i = 0; i < 9; i++) {
    const f = await make(i % 3 ? 'sk/fish' : 'sk/fish-large', { w: i % 3 ? 0.55 : 0.75 });
    scene.add(f);
    fishes.push({ obj: f, cx: cg.x, cz: cg.z, r: 0.6 + Math.random() * 1.3, sp: (0.35 + Math.random() * 0.35) * (Math.random() < 0.5 ? 1 : -1),
                  ph: Math.random() * 6.28, depth: -0.35 - Math.random() * 1.2 });
  }
  // phao góc lồng
  for (const cg of cages) for (const [dx, dz] of [[-1, -1], [1, -1], [1, 1], [-1, 1]]) {
    if (Math.sign(dx) !== Math.sign(cg.x)) continue;
    const b = await make(dx > 0 && dz > 0 ? 'wc/buoy-flag' : 'wc/buoy', { w: 0.65 });
    scene.add(b);
    const o = cg.size / 2 + 1.25;
    floaters.push({ obj: b, x: cg.x + dx * o, z: cg.z + dz * o, base: -0.25, roll: 1.4 });
  }

  // --- Đảo xa ---
  const island = new THREE.Group(); island.position.set(-62, 0, -95); scene.add(island);
  await put(island, 'pk/patch-sand', { w: 34 }, 0, -0.6, 0);
  await put(island, 'pk/rocks-a', { w: 16 }, -6, -0.5, -3);
  await put(island, 'pk/rocks-b', { w: 11 }, 7, -0.5, 2, 1.2);
  await put(island, 'pk/rocks-sand-a', { w: 12 }, 2, -0.4, 7, 0.4);
  await put(island, 'pk/palm-straight', { h: 11 }, 3, 0.2, -2);
  await put(island, 'pk/palm-bend', { h: 9.5 }, -1, 0.2, 4, 2.1);
  await put(island, 'pk/palm-bend', { h: 8.5 }, 8, 0.2, -4, -0.8);
  const rock2 = new THREE.Group(); rock2.position.set(78, 0, -48); scene.add(rock2);
  await put(rock2, 'pk/rocks-b', { w: 14 }, 0, -0.8, 0, 0.6);
  await put(rock2, 'pk/rocks-sand-a', { w: 9 }, -6, -0.6, 4, 2);

  // --- Tàu thuyền xa ---
  const fb = await make('wc/boat-fishing-small', { w: 4.5 }); scene.add(fb);
  movers.push({ obj: fb, kind: 'circle', cx: 4, cz: -6, r: 42, sp: 0.022, ph: 2.2, base: -0.25 });
  const cargo = await make('wc/ship-cargo-a', { w: 30 }); scene.add(cargo);
  movers.push({ obj: cargo, kind: 'line', z: -170, x0: -240, x1: 240, sp: 1.6, ph: 0.25, base: -0.6 });

  // --- Đồ trôi dạt (kiểu Raft) ---
  const debris = ['pk/barrel', 'sk/box', 'sk/resource-planks', 'pk/crate'];
  for (let i = 0; i < 5; i++) {
    const d = await make(debris[i % debris.length], { w: i % 4 === 2 ? 1.6 : 0.9 });
    scene.add(d);
    movers.push({ obj: d, kind: 'drift', z: -14 + i * 7.5 + Math.random() * 3, x0: 60, x1: -60, sp: 0.9 + Math.random() * 0.5, ph: Math.random(), base: -0.35, spin: Math.random() * 6 });
  }
}
const movers = [];

// ---------- Mòng biển ----------
const gulls = [];
{
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute([0, 0, 0, -0.9, 0.0, -0.25, 0, 0, -0.35, 0, 0, 0, 0.9, 0.0, -0.25, 0, 0, -0.35], 3));
  geo.computeVertexNormals();
  const mat = new THREE.MeshLambertMaterial({ color: 0xf2f2f2, side: THREE.DoubleSide });
  for (let i = 0; i < 6; i++) {
    const m = new THREE.Mesh(geo.clone(), mat); scene.add(m);
    gulls.push({ obj: m, r: 10 + Math.random() * 14, h: 9 + Math.random() * 7, sp: 0.15 + Math.random() * 0.12, ph: Math.random() * 6.28, fl: Math.random() * 6 });
  }
}

// ---------- Mưa ----------
const RAIN_N = isMobile ? 1400 : 2600;
const rainGeo = new THREE.BufferGeometry();
const rainPos = new Float32Array(RAIN_N * 6);
const rainSeed = new Float32Array(RAIN_N * 3);
for (let i = 0; i < RAIN_N; i++) { rainSeed[i * 3] = (Math.random() - 0.5) * 60; rainSeed[i * 3 + 1] = Math.random() * 30; rainSeed[i * 3 + 2] = (Math.random() - 0.5) * 60; }
rainGeo.setAttribute('position', new THREE.BufferAttribute(rainPos, 3));
const rainMat = new THREE.LineBasicMaterial({ color: 0xc8d4e0, transparent: true, opacity: 0 });
const rain = new THREE.LineSegments(rainGeo, rainMat); rain.frustumCulled = false; scene.add(rain);

// ---------- Bắn tóe khi cá nhảy ----------
const splashes = [];
const ringGeo = new THREE.RingGeometry(0.2, 0.32, 24);
function splash(x, z, t) {
  const m = new THREE.Mesh(ringGeo, new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.8, depthWrite: false }));
  m.rotation.x = -Math.PI / 2; m.position.set(x, waveH(x, z, t) + 0.04, z); m.renderOrder = 3;
  scene.add(m); splashes.push({ m, t0: t });
}
let jumper = null, nextJump = 3;

// ---------- Mode buttons ----------
const buttons = [...document.querySelectorAll('#bar button')];
let mode = 'sunset';
buttons.forEach(b => b.addEventListener('click', () => {
  mode = b.dataset.mode; target = PRESETS[mode];
  buttons.forEach(x => x.classList.toggle('on', x === b));
  document.getElementById('sub').textContent = { day: 'Ca trực · Ngày 1/5 · Trời quang', sunset: 'Ca trực · Ngày 1/5 · Chiều tà', night: 'Ca trực · Đêm 1/5 · Gió nhẹ', storm: 'Ca trực · Ngày 3/5 · Bão tới!' }[mode];
}));

// ---------- Loop ----------
const clock = new THREE.Clock();
let flash = 0, nextFlash = 2;
const tmpV = new THREE.Vector3();

function lerpState(dt) {
  const k = 1 - Math.exp(-dt * 1.6);
  for (const [key, v] of Object.entries(target)) {
    if (v.isColor) state[key].lerp(v, k);
    else if (v.isVector3) state[key].lerp(v, k).normalize();
    else state[key] += (v - state[key]) * k;
  }
}

function apply() {
  const s = state;
  S.amp = s.amp;
  skyMat.uniforms.uZen.value.copy(s.zen); skyMat.uniforms.uHor.value.copy(s.hor); skyMat.uniforms.uFog.value.copy(s.fog);
  skyMat.uniforms.uSunDir.value.copy(s.sunDir); skyMat.uniforms.uSunCol.value.copy(s.sunCol);
  skyMat.uniforms.uCloud.value = s.cloud; skyMat.uniforms.uStars.value = s.stars; skyMat.uniforms.uFlash.value = flash;
  const wu = waterUniforms;
  wu.uAmp.value = s.amp; wu.uDeep.value.copy(s.deep); wu.uShallow.value.copy(s.shallow); wu.uZen.value.copy(s.zen); wu.uHor.value.copy(s.hor);
  wu.uSunDir.value.copy(s.sunDir); wu.uSunCol.value.copy(s.sunCol); wu.uSunStr.value = s.sunStr;
  wu.uFogCol.value.copy(s.fog); wu.uFogNear.value = s.fogN; wu.uFogFar.value = s.fogF; wu.uFoam.value = s.foam; wu.uFlash.value = flash;
  scene.fog.color.copy(s.fog); scene.fog.near = s.fogN; scene.fog.far = s.fogF;
  sun.color.copy(s.sunCol); sun.intensity = s.sunI + flash * 3;
  sun.position.copy(s.sunDir).multiplyScalar(40); sun.target.position.set(0, 0, 2);
  hemi.color.copy(s.hemiSky); hemi.groundColor.copy(s.hemiGround); hemi.intensity = s.hemiI + flash * 2;
  renderer.toneMappingExposure = s.exposure;
  if (lanternLight) { lanternLight.intensity = s.lantern * 6 * (0.92 + Math.sin(clock.elapsedTime * 13) * 0.04 + Math.sin(clock.elapsedTime * 7.3) * 0.04); lanternBulb.material.color.setRGB(1, 0.75, 0.4).multiplyScalar(0.3 + s.lantern * 0.8); }
  rainMat.opacity = s.rain * 0.55;
}

function tick() {
  const dt = Math.min(clock.getDelta(), 0.05);
  const t = clock.elapsedTime;
  lerpState(dt); apply();
  skyMat.uniforms.uTime.value = t; waterUniforms.uTime.value = t;

  // vật nổi theo sóng
  for (const f of floaters) {
    const h = waveH(f.x, f.z, t), [dx, dz] = waveSlope(f.x, f.z, t);
    f.obj.position.set(f.x, h * 0.85 + f.base, f.z);
    f.obj.rotation.set(dz * f.roll * 0.9, f.ry ?? f.obj.rotation.y, -dx * f.roll * 0.9);
  }
  // cá bơi
  for (const fi of fishes) {
    const a = fi.ph + t * fi.sp;
    const x = fi.cx + Math.cos(a) * fi.r, z = fi.cz + Math.sin(a) * fi.r;
    fi.obj.position.set(x, fi.depth + Math.sin(t * 1.3 + fi.ph) * 0.12 + waveH(fi.cx, fi.cz, t) * 0.5, z);
    fi.obj.rotation.y = -a + (fi.sp > 0 ? 0 : Math.PI);
  }
  // cá nhảy (không nhảy khi bão)
  if (fishes.length && mode !== 'storm') {
    if (!jumper && t > nextJump) {
      const cg = cages[Math.floor(Math.random() * cages.length)];
      const ang = Math.random() * 6.28, r = Math.random() * 1.4;
      jumper = { f: fishes[Math.floor(Math.random() * fishes.length)], t0: t, x: cg.x + Math.cos(ang) * r, z: cg.z + Math.sin(ang) * r, dir: Math.random() * 6.28 };
      jumper.f.jump = true; splash(jumper.x, jumper.z, t);
    }
    if (jumper) {
      const u = (t - jumper.t0) / 0.9;
      const o = jumper.f.obj;
      const x = jumper.x + Math.cos(jumper.dir) * (u - 0.5) * 1.2, z = jumper.z + Math.sin(jumper.dir) * (u - 0.5) * 1.2;
      o.position.set(x, waveH(x, z, t) + Math.sin(Math.min(u, 1) * Math.PI) * 1.3 - 0.2, z);
      o.rotation.set(0, -jumper.dir, 0); o.rotateZ((0.5 - u) * 2.2);
      if (u >= 1) { splash(x, z, t); jumper.f.jump = false; jumper = null; nextJump = t + 3 + Math.random() * 5; }
    }
  }
  for (let i = splashes.length - 1; i >= 0; i--) {
    const s = splashes[i], u = (t - s.t0) / 1.2;
    s.m.scale.setScalar(1 + u * 5); s.m.material.opacity = 0.8 * (1 - u);
    if (u >= 1) { scene.remove(s.m); s.m.material.dispose(); splashes.splice(i, 1); }
  }
  // tàu, đồ trôi
  for (const m of movers) {
    let x, z, ry;
    if (m.kind === 'circle') { const a = m.ph + t * m.sp; x = m.cx + Math.cos(a) * m.r; z = m.cz + Math.sin(a) * m.r; ry = -a; }
    else { const L = m.x1 - m.x0; const u = ((t * m.sp / Math.abs(L) + m.ph) % 1); x = m.x0 + L * u; z = m.z; ry = (m.kind === 'line' ? (L > 0 ? Math.PI / 2 : -Math.PI / 2) : m.spin + t * 0.1); }
    const [dx, dz] = waveSlope(x, z, t);
    m.obj.position.set(x, waveH(x, z, t) * 0.9 + m.base, z);
    m.obj.rotation.set(dz * 0.6, ry, -dx * 0.6);
  }
  // cờ bay theo gió
  if (flag) { const g = 0.08 + S.amp * 0.05; flag.children[0].rotation.y = Math.sin(t * (2 + S.amp)) * g; }
  // mòng biển (bay đi chỗ khác khi bão)
  for (const g of gulls) {
    const a = g.ph + t * g.sp;
    const away = state.rain * 120;
    g.obj.position.set(Math.cos(a) * (g.r + away), g.h + Math.sin(t * 0.7 + g.ph) * 0.8, 3 + Math.sin(a) * (g.r + away));
    g.obj.rotation.set(0, -a, 0);
    const pos = g.obj.geometry.attributes.position; const fy = Math.sin(t * 6 + g.fl) * 0.35;
    pos.setY(1, fy); pos.setY(4, fy); pos.needsUpdate = true;
  }
  // mưa
  if (state.rain > 0.02) {
    const cx = controls.target.x, cz = controls.target.z;
    for (let i = 0; i < RAIN_N; i++) {
      const sx = rainSeed[i * 3], sz = rainSeed[i * 3 + 2];
      let y = (rainSeed[i * 3 + 1] - t * 22) % 30; if (y < 0) y += 30;
      const x = cx + sx + y * 0.25, z = cz + sz;
      rainPos.set([x, y - 1, z, x + 0.22, y, z], i * 6);
    }
    rainGeo.attributes.position.needsUpdate = true;
  }
  // sét
  if (mode === 'storm' && t > nextFlash) { flash = 1; nextFlash = t + 3 + Math.random() * 6; }
  flash = Math.max(0, flash - dt * (flash > 0.5 ? 6 : 2.5));
  if (flash > 0 && flash < 0.6 && Math.random() < 0.04) flash = 0.9;

  sky.position.copy(camera.position);
  controls.update();
  renderer.render(scene, camera);
}

addEventListener('resize', () => {
  camera.aspect = innerWidth / innerHeight; camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
});

apply();
renderer.setAnimationLoop(tick);
build().then(() => {
  const l = document.getElementById('load'); l.style.opacity = 0; setTimeout(() => l.remove(), 700);
}).catch(e => { errBox.textContent += 'Lỗi tải model: ' + e.message + '\n'; });
// cho phép test tự động chọn chế độ qua #day/#night/#storm
if (['#day', '#night', '#storm', '#sunset'].includes(location.hash)) {
  const b = buttons.find(x => '#' + x.dataset.mode === location.hash); b && b.click();
  for (const [k, v] of Object.entries(target)) state[k] = v.clone ? v.clone() : v;
}
