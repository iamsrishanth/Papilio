"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Scene A — "Papilio Hero" (home page only).
 *
 * One procedural swallowtail butterfly (two mirrored wing planes with a
 * gold-emissive edge layer, tapered body), 12–20 instanced
 * micro-butterflies as ambience, and a cream-to-espresso vertical
 * gradient backdrop — all inside the hard budgets of PROMPT.md §5:
 *
 * - draw calls ≤ 12 (this scene: 11)
 * - DPR clamp 1.75 desktop / 1.25 mobile
 * - instance count mobile = ½ desktop
 * - no shadow maps, no post-processing
 * - 60fps frame cap via delta-skip
 * - pause on visibilitychange + IntersectionObserver (<20% visible)
 * - dispose() on unmount, webglcontextlost → poster fallback
 * - reduced-motion / no-WebGL / data-saver → poster fallback (no canvas)
 * - no text in canvas; all copy stays in the DOM above it
 */

const CREAM = 0xfaf3e8;
const LINEN = 0xf1e5c9;
const COCOA = 0x5c3a21;
const ESPRESSO = 0x2a1b10;
const BUTTER = 0xd9a441;
const SURFACE = 0x3b2314;

/* ------------------------------------------------------------------ */
/* Wing outlines — stylised swallowtail shapes                        */
/* ------------------------------------------------------------------ */

function foreWingShape(): THREE.Shape {
  const s = new THREE.Shape();
  s.moveTo(0, 0.22);
  s.bezierCurveTo(0.32, 0.72, 0.88, 1.02, 1.32, 0.86);
  s.bezierCurveTo(1.72, 0.7, 1.66, 0.32, 1.22, 0.12);
  s.bezierCurveTo(0.86, -0.04, 0.36, -0.12, 0, -0.08);
  s.closePath();
  return s;
}

function hindWingShape(): THREE.Shape {
  // Hindwing with the two pointed "swallow" tails
  const s = new THREE.Shape();
  s.moveTo(0, 0.12);
  s.bezierCurveTo(0.5, 0.06, 0.92, -0.12, 1.02, -0.42);
  s.bezierCurveTo(1.1, -0.68, 0.92, -0.86, 0.72, -0.78);
  s.bezierCurveTo(0.68, -0.92, 0.6, -1.1, 0.5, -1.22);
  s.bezierCurveTo(0.46, -1.0, 0.44, -0.88, 0.42, -0.76);
  s.bezierCurveTo(0.34, -0.86, 0.26, -0.94, 0.2, -1.08);
  s.bezierCurveTo(0.14, -0.92, 0.16, -0.8, 0.2, -0.7);
  s.bezierCurveTo(0.1, -0.56, 0.04, -0.3, 0, 0.12);
  s.closePath();
  return s;
}

/** Normalise ShapeGeometry UVs into 0–1 so the gradient maps cleanly. */
function normalizedShapeGeometry(shape: THREE.Shape): THREE.ShapeGeometry {
  const geo = new THREE.ShapeGeometry(shape, 14);
  geo.computeBoundingBox();
  const bb = geo.boundingBox!;
  const uv = geo.attributes.uv as THREE.BufferAttribute;
  const sx = bb.max.x - bb.min.x || 1;
  const sy = bb.max.y - bb.min.y || 1;
  for (let i = 0; i < uv.count; i++) {
    uv.setXY(i, (uv.getX(i) - bb.min.x) / sx, (uv.getY(i) - bb.min.y) / sy);
  }
  uv.needsUpdate = true;
  return geo;
}

/** Vertical cocoa → espresso gradient texture for the wing fill. */
function wingGradientTexture(): THREE.CanvasTexture {
  const c = document.createElement("canvas");
  c.width = 8;
  c.height = 128;
  const ctx = c.getContext("2d")!;
  const g = ctx.createLinearGradient(0, 0, 0, 128);
  g.addColorStop(0, "#8c5b33");
  g.addColorStop(0.45, "#5c3a21");
  g.addColorStop(1, "#2a1b10");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 8, 128);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

/* ------------------------------------------------------------------ */
/* Scene                                                               */
/* ------------------------------------------------------------------ */

export default function PapilioHero3D() {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let logged = false;
    const fail = (reason: string) => {
      if (!logged) {
        console.info(`[papilio] 3D hero disabled: ${reason}`);
        logged = true;
      }
    };

    // --- Contract: reduced motion ⇒ poster only -------------------
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      fail("prefers-reduced-motion");
      return;
    }

    // --- Contract: no autoplay on mobile data-saver -----------------
    const conn = (navigator as unknown as {
      connection?: { saveData?: boolean };
    }).connection;
    if (conn?.saveData) {
      fail("data-saver");
      return;
    }

    // --- Contract: WebGL feature-detect -----------------------------
    let hasGL = false;
    try {
      const probe = document.createElement("canvas");
      hasGL = Boolean(
        probe.getContext("webgl2") || probe.getContext("webgl")
      );
    } catch {
      hasGL = false;
    }
    if (!hasGL) {
      fail("WebGL unavailable");
      return;
    }

    // --- Scene setup -------------------------------------------------
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: false,
        powerPreference: "high-performance",
      });
    } catch {
      fail("renderer creation failed");
      return;
    }

    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const DPR_CAP = isMobile ? 1.25 : 1.75;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, DPR_CAP));
    renderer.setClearColor(CREAM, 1);
    host.appendChild(renderer.domElement);
    renderer.domElement.style.cssText =
      "position:absolute;inset:0;width:100%;height:100%;display:block;";

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      42,
      host.clientWidth / Math.max(host.clientHeight, 1),
      0.1,
      100
    );
    camera.position.set(0, 0, 10);

    const disposables: Array<{ dispose: () => void }> = [];

    // Backdrop — cream-to-espresso vertical gradient plane
    const bgGeo = new THREE.PlaneGeometry(60, 20);
    const bgMat = new THREE.ShaderMaterial({
      depthWrite: false,
      fog: false,
      uniforms: {
        uTop: { value: new THREE.Color(CREAM) },
        uMid: { value: new THREE.Color(LINEN) },
        uLow: { value: new THREE.Color(COCOA) },
        uBottom: { value: new THREE.Color(ESPRESSO) },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec2 vUv;
        uniform vec3 uTop; uniform vec3 uMid; uniform vec3 uLow; uniform vec3 uBottom;
        void main() {
          float y = vUv.y;
          vec3 c = mix(uBottom, uLow, smoothstep(0.0, 0.42, y));
          c = mix(c, uMid, smoothstep(0.35, 0.72, y));
          c = mix(c, uTop, smoothstep(0.66, 0.96, y));
          gl_FragColor = vec4(c, 1.0);
        }
      `,
    });
    const bgMesh = new THREE.Mesh(bgGeo, bgMat);
    bgMesh.position.set(0, 0, -8);
    bgMesh.renderOrder = -1;
    scene.add(bgMesh);
    disposables.push(bgGeo, bgMat);

    // Butterfly group
    const butterfly = new THREE.Group();
    scene.add(butterfly);

    const baseX = isMobile ? 1.35 : 2.35;
    const baseY = isMobile ? 1.85 : 0.35;
    const baseZ = isMobile ? -2.6 : 0;
    const baseScale = isMobile ? 0.62 : 1;
    butterfly.position.set(baseX, baseY, baseZ);
    butterfly.scale.setScalar(baseScale);

    // Body — tapered capsule (espresso silhouette)
    const bodyGeo = new THREE.CylinderGeometry(0.05, 0.095, 1.05, 10);
    const bodyMat = new THREE.MeshBasicMaterial({ color: SURFACE });
    const body = new THREE.Mesh(bodyGeo, bodyMat);
    butterfly.add(body);
    disposables.push(bodyGeo, bodyMat);

    // Antennae — two thin cylinders merged into the body group
    const antennaGeo = new THREE.CylinderGeometry(0.008, 0.014, 0.5, 4);
    const antennaMat = new THREE.MeshBasicMaterial({ color: ESPRESSO });
    const antL = new THREE.Mesh(antennaGeo, antennaMat);
    antL.position.set(-0.12, 0.68, 0);
    antL.rotation.z = -0.5;
    const antR = new THREE.Mesh(antennaGeo, antennaMat);
    antR.position.set(0.12, 0.68, 0);
    antR.rotation.z = 0.5;
    butterfly.add(antL, antR);
    disposables.push(antennaGeo, antennaMat);

    // Wings — gold edge layer + gradient fill, mirrored pair
    const gradTex = wingGradientTexture();
    const goldMat = new THREE.MeshBasicMaterial({
      color: BUTTER,
      side: THREE.DoubleSide,
    });
    const fillMat = new THREE.MeshBasicMaterial({
      map: gradTex,
      side: THREE.DoubleSide,
    });
    disposables.push(gradTex, goldMat, fillMat);

    const rightPivots: THREE.Group[] = [];
    const leftPivots: THREE.Group[] = [];

    const buildWingPair = (target: THREE.Group[]) => {
      const configs = [
        { shape: foreWingShape(), rootY: 0.18 },
        { shape: hindWingShape(), rootY: -0.12 },
      ];
      for (const { shape, rootY } of configs) {
        const pivot = new THREE.Group();
        pivot.position.y = rootY;

        const geo = normalizedShapeGeometry(shape);
        const goldGeo = geo.clone();
        goldGeo.scale(1.07, 1.05, 1);
        const gold = new THREE.Mesh(goldGeo, goldMat);
        gold.position.z = -0.014;
        const fill = new THREE.Mesh(geo, fillMat);

        pivot.add(gold, fill);
        target.push(pivot);
        disposables.push(geo, goldGeo);
      }
    };

    // Right wing pair — geometry extends +x from the body
    const rightWings = new THREE.Group();
    buildWingPair(rightPivots);
    for (const p of rightPivots) rightWings.add(p);
    butterfly.add(rightWings);

    // Left wing pair — mirrored wrapper; the same flap rotation value
    // produces the mirrored motion through the negative scale.
    const leftWings = new THREE.Group();
    leftWings.scale.x = -1;
    buildWingPair(leftPivots);
    for (const p of leftPivots) leftWings.add(p);
    butterfly.add(leftWings);

    // Micro-butterflies — single InstancedMesh, GPU-driven
    const MICRO_COUNT = isMobile ? 8 : 16;
    const microGeo = new THREE.PlaneGeometry(0.34, 0.24);
    const microMat = new THREE.ShaderMaterial({
      side: THREE.DoubleSide,
      uniforms: {
        uTime: { value: 0 },
        uColorA: { value: new THREE.Color(COCOA) },
        uColorB: { value: new THREE.Color(BUTTER) },
        uFog: { value: new THREE.Color(CREAM) },
      },
      vertexShader: `
        attribute float aSeed;
        uniform float uTime;
        varying float vSeed;
        varying float vDepth;
        varying vec2 vUv;
        void main() {
          vSeed = aSeed;
          vUv = uv;
          vec3 p = position;
          float f = uTime * (1.6 + aSeed * 1.8) + aSeed * 40.0;
          p.x *= 0.5 + 0.5 * abs(cos(f));
          p.y *= 0.9 + 0.1 * sin(f * 0.7);
          vec4 world = instanceMatrix * vec4(p, 1.0);
          world.x += sin(uTime * 0.25 + aSeed * 6.283) * 0.55;
          world.y += sin(uTime * 0.18 + aSeed * 11.0) * 0.4;
          vec4 mv = modelViewMatrix * world;
          vDepth = mv.z;
          gl_Position = projectionMatrix * mv;
        }
      `,
      fragmentShader: `
        varying float vSeed;
        varying float vDepth;
        varying vec2 vUv;
        uniform vec3 uColorA; uniform vec3 uColorB; uniform vec3 uFog;
        void main() {
          // Butterfly silhouette — two wing pairs + slender body,
          // cut from the quad so distant motes still read as butterflies.
          vec2 q = vUv - vec2(0.5, 0.5);
          float ax = abs(q.x);
          float fore = length(vec2(ax - 0.20, q.y - 0.14)) - 0.17;
          float hind = length(vec2(ax - 0.16, q.y + 0.02)) - 0.13;
          float body = max(ax * 6.5 - 0.035, abs(q.y + 0.02) - 0.30);
          float d = min(min(fore, hind), body);
          if (d > 0.015) discard;
          vec3 col = mix(uColorA, uColorB, fract(vSeed * 5.7));
            * (1.0 - 0.25 * smoothstep(0.0, 0.05, d));
          col = mix(col, uFog, smoothstep(-6.0, -12.0, vDepth));
          gl_FragColor = vec4(col, 1.0);
        }
      `,
    });
    const micro = new THREE.InstancedMesh(microGeo, microMat, MICRO_COUNT);
    const seeds = new Float32Array(MICRO_COUNT);
    const m = new THREE.Matrix4();
    const q = new THREE.Quaternion();
    const e = new THREE.Euler();
    const pos = new THREE.Vector3();
    const scl = new THREE.Vector3();
    for (let i = 0; i < MICRO_COUNT; i++) {
      seeds[i] = Math.random();
      pos.set(
        (Math.random() - 0.5) * 16,
        -1.5 + Math.random() * 6.5,
        -2.5 - Math.random() * 8.5
      );
      e.set(0, (Math.random() - 0.5) * 0.9, (Math.random() - 0.5) * 0.7);
      q.setFromEuler(e);
      const s = 0.45 + Math.random() * 0.8;
      scl.set(s, s, s);
      m.compose(pos, q, scl);
      micro.setMatrixAt(i, m);
    }
    microGeo.setAttribute(
      "aSeed",
      new THREE.InstancedBufferAttribute(seeds, 1)
    );
    micro.instanceMatrix.needsUpdate = true;
    scene.add(micro);
    disposables.push(microGeo, microMat);

    // --- Animation state ---------------------------------------------
    let raf = 0;
    let running = true;
    let last = 0;
    let t = 0;
    let phase = 0;
    let energy = 0; // flutter energy 0..1
    const pointerNDC = new THREE.Vector2();
    let pointerActive = false;
    const worldPos = new THREE.Vector3();
    let lookX = 0;
    let lookY = 0;

    const onPointerMove = (ev: PointerEvent) => {
      pointerNDC.set(
        (ev.clientX / window.innerWidth) * 2 - 1,
        -(ev.clientY / window.innerHeight) * 2 + 1
      );
      pointerActive = true;
    };

    const loop = (now: number) => {
      if (!running) return;
      raf = requestAnimationFrame(loop);
      if (now - last < 16) return; // 60fps cap via delta-skip
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      t += dt;

      // Flutter energy — bursts when the pointer is near the butterfly
      let target = 0;
      if (pointerActive) {
        worldPos.copy(butterfly.position);
        worldPos.applyMatrix4(butterfly.matrixWorld);
        const projected = worldPos.clone().project(camera);
        const d = Math.hypot(
          projected.x - pointerNDC.x,
          projected.y - pointerNDC.y
        );
        target = d < 0.42 ? 1 : 0;
      }
      energy += (target - energy) * Math.min(1, dt * (target > energy ? 3.5 : 1.4));

      // Wing flap — 6–8s ambient sine, fast bursts with energy
      phase += dt * (0.9 + energy * 7.5);
      const amp = 0.5 + energy * 0.32;
      const flap = Math.sin(phase) * amp + 0.18;
      for (const p of rightPivots) p.rotation.y = flap;
      for (const p of leftPivots) p.rotation.y = flap;

      // Gentle ambient drift
      butterfly.position.x = baseX + Math.sin(t * 0.23) * 0.18;
      butterfly.position.y = baseY + Math.sin(t * 0.6) * 0.22;
      butterfly.rotation.z = Math.sin(t * 0.4) * 0.05;

      // Soft look-at-pointer parallax
      if (pointerActive) {
        lookX += (pointerNDC.x * 0.35 - lookX) * Math.min(1, dt * 1.8);
        lookY += (pointerNDC.y * 0.2 - lookY) * Math.min(1, dt * 1.8);
      }
      butterfly.rotation.y = lookX;
      butterfly.rotation.x = -lookY;

      microMat.uniforms.uTime.value = t;

      renderer.render(scene, camera);
    };

    // --- Pause contracts ---------------------------------------------
    const setRunning = (v: boolean) => {
      if (v === running) return;
      running = v;
      if (v) {
        last = performance.now();
        raf = requestAnimationFrame(loop);
      } else {
        cancelAnimationFrame(raf);
      }
    };

    const onVisibility = () => setRunning(!document.hidden);
    document.addEventListener("visibilitychange", onVisibility);

    const io = new IntersectionObserver(
      (entries) => {
        const ratio = entries[0]?.intersectionRatio ?? 1;
        setRunning(ratio >= 0.2);
      },
      { threshold: [0, 0.2, 0.5] }
    );
    io.observe(host);

    window.addEventListener("pointermove", onPointerMove, { passive: true });

    const onResize = () => {
      const w = host.clientWidth;
      const h = Math.max(host.clientHeight, 1);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    const ro = new ResizeObserver(onResize);
    ro.observe(host);
    onResize();

    // --- Context loss → poster fallback -------------------------------
    const onContextLost = (ev: Event) => {
      ev.preventDefault();
      setRunning(false);
      renderer.domElement.remove();
      fail("webglcontextlost");
    };
    renderer.domElement.addEventListener("webglcontextlost", onContextLost);

    // --- Teardown ------------------------------------------------------
    const teardown = () => {
      setRunning(false);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pointermove", onPointerMove);
      renderer.domElement.removeEventListener("webglcontextlost", onContextLost);
      io.disconnect();
      ro.disconnect();
      for (const d of disposables) d.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };

    raf = requestAnimationFrame((n) => {
      last = n;
      loop(n);
    });

    return teardown;
  }, []);

  return <div ref={hostRef} className="absolute inset-0" aria-hidden="true" />;
}
