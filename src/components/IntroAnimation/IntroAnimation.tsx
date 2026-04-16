import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import './IntroAnimation.css';

interface IntroAnimationProps {
  name: string;
  onComplete: () => void;
}

export const IntroAnimation: React.FC<IntroAnimationProps> = ({ name, onComplete }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState('Initializing');
  const [showButton, setShowButton] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const sceneRef = useRef<any>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 1.2, 5.5);
    camera.lookAt(0, 0, 0);

    // Fog
    scene.fog = new THREE.FogExp2(0x080810, 0.07);

    // Lights
    const ambLight = new THREE.AmbientLight(0x4040ff, 0.5);
    scene.add(ambLight);

    const pt1 = new THREE.PointLight(0x7c6cfc, 3, 14);
    pt1.position.set(3, 3, 3);
    pt1.castShadow = true;
    scene.add(pt1);

    const pt2 = new THREE.PointLight(0xfc6c8f, 2.5, 12);
    pt2.position.set(-3, -1, 2);
    scene.add(pt2);

    const pt3 = new THREE.PointLight(0xffd166, 2, 10);
    pt3.position.set(0, -3, -2);
    scene.add(pt3);

    const frontLight = new THREE.DirectionalLight(0xffffff, 0.9);
    frontLight.position.set(0, 0, 5);
    scene.add(frontLight);

    // Cube group
    const cubeGroup = new THREE.Group();
    scene.add(cubeGroup);

    // Face textures
    const faceData = [
      { text: 'DREAM', bg: '#0d0b1e', accent: '#7c6cfc' },
      { text: 'CODE', bg: '#0d0b1e', accent: '#fc6c8f' },
      { text: 'CREATE', bg: '#0d0b1e', accent: '#ffd166' },
      { text: name.toUpperCase(), bg: '#0d0b1e', accent: '#7c6cfc' },
      { text: 'EXPLORE', bg: '#0d0b1e', accent: '#fc6c8f' },
      { text: 'BUILD', bg: '#0d0b1e', accent: '#ffd166' },
    ];

    function makeFaceTexture(data: any) {
      const size = 512;
      const c = document.createElement('canvas');
      c.width = c.height = size;
      const cx = c.getContext('2d')!;

      cx.fillStyle = data.bg;
      cx.fillRect(0, 0, size, size);

      cx.fillStyle = 'rgba(255,255,255,0.03)';
      cx.fillRect(16, 16, size - 32, size - 32);

      cx.strokeStyle = data.accent + '88';
      cx.lineWidth = 4;
      cx.strokeRect(20, 20, size - 40, size - 40);

      cx.strokeStyle = 'rgba(255,255,255,0.06)';
      cx.lineWidth = 1;
      cx.strokeRect(36, 36, size - 72, size - 72);

      const corners = [[30, 30], [size - 30, 30], [30, size - 30], [size - 30, size - 30]];
      corners.forEach(([x, y]) => {
        cx.beginPath();
        cx.arc(x, y, 4, 0, Math.PI * 2);
        cx.fillStyle = data.accent + 'bb';
        cx.fill();
      });

      const grd = cx.createRadialGradient(size / 2, size / 2, 10, size / 2, size / 2, size * 0.4);
      grd.addColorStop(0, data.accent + '18');
      grd.addColorStop(1, 'transparent');
      cx.fillStyle = grd;
      cx.fillRect(0, 0, size, size);

      cx.textAlign = 'center';
      cx.textBaseline = 'middle';
      cx.font = `bold ${data.text.length > 5 ? 68 : 88}px "Bebas Neue", sans-serif`;
      cx.fillStyle = '#ffffff';
      cx.shadowColor = data.accent;
      cx.shadowBlur = 10;
      cx.fillText(data.text, size / 2, size / 2 - 18);
      cx.shadowBlur = 0;

      cx.font = '28px "DM Sans", sans-serif';
      cx.fillStyle = data.accent + '99';
      cx.fillText('· · ·', size / 2, size / 2 + 65);

      return new THREE.CanvasTexture(c);
    }

    const materials = faceData.map(d => new THREE.MeshPhysicalMaterial({
      map: makeFaceTexture(d),
      transparent: true,
      opacity: 0.97,
      roughness: 0.05,
      metalness: 0.1,
      transmission: 0.05,
      reflectivity: 0.9,
      side: THREE.DoubleSide,
    }));

    const cubeGeo = new THREE.BoxGeometry(2, 2, 2);
    const cube = new THREE.Mesh(cubeGeo, materials);
    cube.castShadow = true;
    cube.receiveShadow = true;
    cubeGroup.add(cube);

    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x7c6cfc,
      wireframe: true,
      transparent: true,
      opacity: 0.12,
    });
    const wire = new THREE.Mesh(new THREE.BoxGeometry(2.01, 2.01, 2.01), wireMat);
    cubeGroup.add(wire);

    const edgesGeo = new THREE.EdgesGeometry(cubeGeo);
    const edgeMat = new THREE.LineBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.25,
    });
    const edges = new THREE.LineSegments(edgesGeo, edgeMat);
    cubeGroup.add(edges);

    // Particles
    const partCount = 300;
    const partGeo = new THREE.BufferGeometry();
    const partPos = new Float32Array(partCount * 3);
    const partSizes = new Float32Array(partCount);
    const partColors = new Float32Array(partCount * 3);
    const palColors = [
      new THREE.Color(0x7c6cfc),
      new THREE.Color(0xfc6c8f),
      new THREE.Color(0xffd166),
      new THREE.Color(0xffffff),
    ];

    for (let i = 0; i < partCount; i++) {
      const r = 2.5 + Math.random() * 4;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      partPos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      partPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      partPos[i * 3 + 2] = r * Math.cos(phi);
      partSizes[i] = Math.random() * 3 + 1;
      const c = palColors[Math.floor(Math.random() * palColors.length)];
      partColors[i * 3] = c.r;
      partColors[i * 3 + 1] = c.g;
      partColors[i * 3 + 2] = c.b;
    }

    partGeo.setAttribute('position', new THREE.BufferAttribute(partPos, 3));
    partGeo.setAttribute('size', new THREE.BufferAttribute(partSizes, 1));
    partGeo.setAttribute('color', new THREE.BufferAttribute(partColors, 3));

    const partMat = new THREE.PointsMaterial({
      size: 0.04,
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
      sizeAttenuation: true,
    });
    const partSystem = new THREE.Points(partGeo, partMat);
    scene.add(partSystem);

    // Ground plane
    const planeMat = new THREE.MeshPhysicalMaterial({
      color: 0x080810,
      roughness: 0.1,
      metalness: 0.8,
      transparent: true,
      opacity: 0.5,
    });
    const plane = new THREE.Mesh(new THREE.PlaneGeometry(20, 20), planeMat);
    plane.rotation.x = -Math.PI / 2;
    plane.position.y = -1.5;
    plane.receiveShadow = true;
    scene.add(plane);

    // Animation state
    let introPhase = 0;
    let introTimer = 0;
    let exploding = false;
    let explodeTimer = 0;

    const clock = new THREE.Clock();
    let totalTime = 0;

    // Mouse interaction
    const mouse = { x: 0, y: 0 };
    let isDragging = false;
    let dragStart = { x: 0, y: 0 };
    let rotVelocity = { x: 0, y: 0 };
    let isHovering = false;
    let zoomTarget = 5.5;
    let currentZoom = 5.5;

    const raycaster = new THREE.Raycaster();
    const mouseNDC = new THREE.Vector2();

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.y = (e.clientY / window.innerHeight - 0.5) * 2;

      mouseNDC.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseNDC.y = -(e.clientY / window.innerHeight) * 2 + 1;
      raycaster.setFromCamera(mouseNDC, camera);
      const hits = raycaster.intersectObject(cube);
      const wasHovering = isHovering;
      isHovering = hits.length > 0;
      if (isHovering !== wasHovering) {
        canvas.style.cursor = isHovering ? 'grab' : 'default';
        const scaleTarget = isHovering ? 1.06 : 1.0;
        gsapScaleTo(cubeGroup, scaleTarget, 0.3);
      }

      if (isDragging) {
        const dragDelta = {
          x: (e.clientX - dragStart.x) * 0.008,
          y: (e.clientY - dragStart.y) * 0.008
        };
        rotVelocity.x = dragDelta.y;
        rotVelocity.y = dragDelta.x;
        cubeGroup.rotation.x += dragDelta.y;
        cubeGroup.rotation.y += dragDelta.x;
        dragStart = { x: e.clientX, y: e.clientY };
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      if (introPhase < 2) return;
      isDragging = true;
      dragStart = { x: e.clientX, y: e.clientY };
      canvas.style.cursor = 'grabbing';
    };

    const handleMouseUp = () => {
      isDragging = false;
      canvas.style.cursor = isHovering ? 'grab' : 'default';
    };

    const handleWheel = (e: WheelEvent) => {
      if (introPhase < 2) return;
      e.preventDefault();
      zoomTarget = Math.max(2.5, Math.min(9, zoomTarget + e.deltaY * 0.008));
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('wheel', handleWheel, { passive: false });

    function gsapScaleTo(obj: any, target: number, dur: number) {
      const start = obj.scale.x;
      const t0 = performance.now();
      function step(now: number) {
        const t = Math.min((now - t0) / (dur * 1000), 1);
        const e = 1 - Math.pow(1 - t, 3);
        obj.scale.setScalar(start + (target - start) * e);
        if (t < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    }

    // Render loop
    function animate() {
      const animId = requestAnimationFrame(animate);
      const dt = clock.getDelta();
      totalTime += dt;
      introTimer += dt;

      if (!exploding) {
        if (introPhase === 0) {
          const t = Math.min(introTimer / 0.4, 1);
          const ease = 1 - Math.pow(1 - t, 3);
          cubeGroup.scale.setScalar(ease);
          cubeGroup.rotation.y += dt * 4;
          cubeGroup.rotation.x += dt * 2;
          if (t >= 1) { introPhase = 1; introTimer = 0; }
        } else if (introPhase === 1) {
          cubeGroup.rotation.y += dt * 3.5;
          cubeGroup.rotation.x += dt * 1.8;
          if (introTimer > 0.8) { introPhase = 2; introTimer = 0; }
        } else {
          if (isDragging) {
            cubeGroup.rotation.x += rotVelocity.x;
            cubeGroup.rotation.y += rotVelocity.y;
            rotVelocity.x = 0;
            rotVelocity.y = 0;
          } else {
            rotVelocity.x *= 0.92;
            rotVelocity.y *= 0.92;
            cubeGroup.rotation.x += rotVelocity.x;
            cubeGroup.rotation.y += rotVelocity.y;
            const speed = Math.sqrt(rotVelocity.x ** 2 + rotVelocity.y ** 2);
            if (speed < 0.002) {
              cubeGroup.rotation.y += dt * 0.35;
              const targetX = mouse.y * 0.25;
              cubeGroup.rotation.x += (targetX - (cubeGroup.rotation.x % (Math.PI * 2))) * 0.02;
            }
          }
          currentZoom += (zoomTarget - currentZoom) * 0.08;
          camera.position.z = currentZoom;
          if (!isDragging) {
            cubeGroup.position.y = Math.sin(totalTime * 0.8) * 0.1;
          }
        }

        pt1.position.x = Math.sin(totalTime * 0.7) * 4;
        pt1.position.z = Math.cos(totalTime * 0.7) * 4;
        pt2.position.x = Math.cos(totalTime * 0.5) * 4;
        pt2.position.z = Math.sin(totalTime * 0.5) * 4;
        partSystem.rotation.y += dt * 0.08;
        partSystem.rotation.x += dt * 0.03;
        edgeMat.opacity = 0.15 + 0.12 * Math.sin(totalTime * 2);
      } else {
        explodeTimer += dt;
        const t = Math.min(explodeTimer / 0.8, 1);
        cubeGroup.scale.setScalar(1 + t * 3);
        cubeGroup.rotation.y += dt * (1 + t * 5);
        materials.forEach(m => m.opacity = (1 - t) * 0.88);
        wireMat.opacity = (1 - t) * 0.12;
        edgeMat.opacity = (1 - t) * 0.25;
        partMat.opacity = (1 - t) * 0.7;
        if (t >= 1) {
          cancelAnimationFrame(animId);
          onComplete();
        }
      }

      renderer.render(scene, camera);
    }

    cubeGroup.scale.setScalar(0);
    animate();

    // Progress sequence - FASTER
    const stages = [
      { label: 'Loading assets', pct: 25, delay: 200 },
      { label: 'Building 3D space', pct: 55, delay: 450 },
      { label: 'Calibrating cube', pct: 80, delay: 750 },
      { label: 'Ready', pct: 100, delay: 1100 },
    ];

    stages.forEach(s => {
      setTimeout(() => {
        setProgress(s.pct);
        setStage(s.label);
        if (s.pct === 100) {
          setTimeout(() => setShowButton(true), 150);
        }
      }, s.delay);
    });

    sceneRef.current = { exploding: () => { exploding = true; } };

    // Resize handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      canvas.removeEventListener('wheel', handleWheel);
      renderer.dispose();
    };
  }, [name, onComplete]);

  const handleEnter = () => {
    setIsExiting(true);
    if (sceneRef.current) {
      sceneRef.current.exploding();
    }
  };

  return (
    <div className={`intro-loader ${isExiting ? 'exit' : ''}`}>
      <canvas ref={canvasRef} id="three-canvas"></canvas>
      <div className="vignette"></div>
      <div className="grid-floor"></div>

      <div className="corner corner-bl">PORTFOLIO / V2025</div>
      <div className="corner corner-br">DESIGN + CODE</div>

      <div id="loader-ui" className={isExiting ? 'exit' : ''}>
        <div className="loader-top">
          <div className="brand">{name}</div>
          <div className="status-pill" style={progress === 100 ? { color: '#6cfc9f', borderColor: 'rgba(108,252,159,.3)' } : {}}>
            ● {progress === 100 ? 'Ready' : 'Loading'}
          </div>
        </div>

        <div className="center-label">
          <div className="entering-text">Entering the world of</div>
        </div>

        <div className="bottom-block">
          <div className="big-name">{name.toUpperCase()}</div>
          <div className="tagline">AI Explorer</div>
          <div className="progress-section">
            <div className="prog-header">
              <span id="prog-stage">{stage}</span>
              <span id="prog-pct">{progress}%</span>
            </div>
            <div className="prog-track">
              <div className="prog-fill" style={{ width: `${progress}%` }}></div>
            </div>
          </div>
          {showButton && (
            <button className="enter-btn" onClick={handleEnter}>
              <span>Enter Portfolio</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default IntroAnimation;
