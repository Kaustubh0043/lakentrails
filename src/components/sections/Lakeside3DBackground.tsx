"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export default function Lakeside3DBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const [isMobile, setIsMobile] = useState(true); // Default to true for SSR safety

  useEffect(() => {
    // Detect mobile device or small screen width
    const checkMobile = () => {
      const mobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );
      setIsMobile(window.innerWidth < 1024 || mobileUA);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  useEffect(() => {
    if (isMobile || !containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. Scene setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x030a16, 0.008);

    // 2. Camera setup
    const camera = new THREE.PerspectiveCamera(60, width / height, 1, 1000);
    camera.position.set(0, 45, 120);
    camera.lookAt(0, 0, 0);

    // 3. Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.setClearColor(0x030a16, 1.0);
    container.appendChild(renderer.domElement);

    // 4. Create Interactive Wave Particles Grid
    const SEPARATION = 2.0;
    const AMOUNTX = 130;
    const AMOUNTY = 130;
    const numParticles = AMOUNTX * AMOUNTY;

    const positions = new Float32Array(numParticles * 3);
    const colors = new Float32Array(numParticles * 3);

    // Color gradient definitions matching the LakeNtrails sunset theme:
    const colorFront = new THREE.Color(0xff5e3a);  // Sunset Orange
    const colorMid = new THREE.Color(0xd97c36);    // Golden Sand
    const colorBack = new THREE.Color(0x7c497d);   // Deep Violet
    const colorFarBack = new THREE.Color(0x321a4f); // Twilight Purple

    let index = 0;
    for (let ix = 0; ix < AMOUNTX; ix++) {
      for (let iy = 0; iy < AMOUNTY; iy++) {
        const x = ix * SEPARATION - (AMOUNTX * SEPARATION) / 2;
        const z = iy * SEPARATION - (AMOUNTY * SEPARATION) / 2;
        
        positions[index] = x;
        positions[index + 1] = 0;
        positions[index + 2] = z;

        const t = iy / AMOUNTY; // 0 to 1
        let particleColor = new THREE.Color();
        if (t < 0.3) {
          particleColor.copy(colorFront).lerp(colorMid, t / 0.3);
        } else if (t < 0.7) {
          particleColor.copy(colorMid).lerp(colorBack, (t - 0.3) / 0.4);
        } else {
          particleColor.copy(colorBack).lerp(colorFarBack, (t - 0.7) / 0.3);
        }

        colors[index] = particleColor.r;
        colors[index + 1] = particleColor.g;
        colors[index + 2] = particleColor.b;

        index += 3;
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.8,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // 5. Add Twilight Starry Sky Background (Twinkling Stars)
    const starCount = 350;
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 0.7);
      const distance = 300 + Math.random() * 200;

      starPositions[i * 3] = distance * Math.sin(phi) * Math.cos(theta);
      starPositions[i * 3 + 1] = distance * Math.cos(phi) + 20;
      starPositions[i * 3 + 2] = distance * Math.sin(phi) * Math.sin(theta);

      const r = Math.random();
      if (r < 0.1) {
        starColors[i * 3] = 1.0;
        starColors[i * 3 + 1] = 0.9;
        starColors[i * 3 + 2] = 0.7;
      } else if (r < 0.2) {
        starColors[i * 3] = 0.7;
        starColors[i * 3 + 1] = 0.95;
        starColors[i * 3 + 2] = 1.0;
      } else {
        starColors[i * 3] = 1.0;
        starColors[i * 3 + 1] = 1.0;
        starColors[i * 3 + 2] = 1.0;
      }
    }

    const starGeometry = new THREE.BufferGeometry();
    starGeometry.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));
    starGeometry.setAttribute("color", new THREE.BufferAttribute(starColors, 3));

    const starMaterial = new THREE.PointsMaterial({
      size: 1.2,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    });

    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    // 6. Mouse & Interaction Handlers
    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current.targetX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.targetY = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // 7. Animation Loop
    let count = 0;
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const mouse = mouseRef.current;
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      const positionsAttr = particles.geometry.attributes.position as THREE.BufferAttribute;
      const posArray = positionsAttr.array as Float32Array;

      count += 0.015;

      let idx = 0;
      for (let ix = 0; ix < AMOUNTX; ix++) {
        for (let iy = 0; iy < AMOUNTY; iy++) {
          const gridX = ix * SEPARATION - (AMOUNTX * SEPARATION) / 2;
          const gridZ = iy * SEPARATION - (AMOUNTY * SEPARATION) / 2;

          let waveY = 
            Math.sin(ix * 0.13 + count) * 2.0 +
            Math.cos(iy * 0.13 + count) * 2.0 +
            Math.sin((ix + iy) * 0.05 + count * 0.7) * 1.5;

          const targetWorldX = mouse.x * 60;
          const targetWorldZ = -mouse.y * 60;

          const dx = gridX - targetWorldX;
          const dz = gridZ - targetWorldZ;
          const dist = Math.sqrt(dx * dx + dz * dz);

          if (dist < 40) {
            const force = (1.0 - dist / 40) * 8.0;
            waveY += Math.sin(dist * 0.3 - count * 4) * force;
          }

          posArray[idx + 1] = waveY;
          idx += 3;
        }
      }

      particles.geometry.attributes.position.needsUpdate = true;

      particles.rotation.y = count * 0.02;
      stars.rotation.y = count * 0.005;

      starMaterial.opacity = 0.4 + Math.sin(count * 2.0) * 0.2;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);

      renderer.dispose();
      geometry.dispose();
      material.dispose();
      starGeometry.dispose();
      starMaterial.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [isMobile]);

  // Mobile fallback: render a static background image instead of WebGL
  if (isMobile) {
    return (
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat opacity-80 pointer-events-none z-0 bg-[#030a16]"
        style={{
          backgroundImage: "url('/images/resort_background_hd_widescreen_v6.webp')",
          maskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 75%, rgba(0,0,0,0) 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 75%, rgba(0,0,0,0) 100%)"
        }}
      />
    );
  }

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 w-full h-full pointer-events-none z-0 bg-[#030a16]"
      style={{
        maskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 75%, rgba(0,0,0,0) 100%)",
        WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 75%, rgba(0,0,0,0) 100%)"
      }}
    />
  );
}
