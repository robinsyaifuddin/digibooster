
import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Box, Sphere, Torus, OrbitControls, Float } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';

// 3D Service Icons Component
const ServiceIcon = ({ position, color, type, onClick }: { 
  position: [number, number, number], 
  color: string, 
  type: 'website' | 'design' | 'marketing' | 'photo',
  onClick: () => void 
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime + position[0]) * 0.1;
      
      if (hovered) {
        meshRef.current.scale.setScalar(1.2);
      } else {
        meshRef.current.scale.setScalar(1);
      }
    }
  });

  const getGeometry = () => {
    switch (type) {
      case 'website':
        return <boxGeometry args={[1, 1, 1]} />;
      case 'design':
        return <sphereGeometry args={[0.7]} />;
      case 'marketing':
        return <torusGeometry args={[0.6, 0.3, 8, 16]} />;
      case 'photo':
        return <boxGeometry args={[1.2, 0.8, 0.2]} />;
      default:
        return <boxGeometry args={[1, 1, 1]} />;
    }
  };

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={0.5}>
      <mesh
        ref={meshRef}
        position={position}
        onClick={onClick}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
        castShadow
        receiveShadow
      >
        {getGeometry()}
        <meshStandardMaterial
          color={color}
          roughness={0.1}
          metalness={0.8}
          emissive={hovered ? color : '#000000'}
          emissiveIntensity={hovered ? 0.2 : 0}
        />
      </mesh>
      
      <Text
        position={[position[0], position[1] - 1.5, position[2]]}
        fontSize={0.3}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {type.toUpperCase()}
      </Text>
    </Float>
  );
};

// Floating Particles Component
const FloatingParticles = () => {
  const particlesRef = useRef<THREE.Points>(null);
  
  const particleGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const particleCount = 100;
    const positions = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geometry;
  }, []);
  
  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += 0.001;
      particlesRef.current.rotation.x += 0.0005;
    }
  });

  return (
    <points ref={particlesRef} geometry={particleGeometry}>
      <pointsMaterial color="#03d5eb" size={0.05} sizeAttenuation transparent opacity={0.6} />
    </points>
  );
};

// Main 3D Scene Component
const DigitalServices3DScene = ({ onServiceClick }: { onServiceClick: (service: string) => void }) => {
  return (
    <>
      {/* Ambient lighting */}
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#03d5eb" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ffffff" />
      
      {/* Floating particles */}
      <FloatingParticles />
      
      {/* Service icons positioned in a circle */}
      <ServiceIcon 
        position={[-3, 0, 0]} 
        color="#03d5eb" 
        type="website"
        onClick={() => onServiceClick('website-dan-aplikasi')}
      />
      <ServiceIcon 
        position={[3, 0, 0]} 
        color="#10b981" 
        type="design"
        onClick={() => onServiceClick('desain-grafis')}
      />
      <ServiceIcon 
        position={[0, 0, -3]} 
        color="#f59e0b" 
        type="marketing"
        onClick={() => onServiceClick('digital-marketing')}
      />
      <ServiceIcon 
        position={[0, 0, 3]} 
        color="#ef4444" 
        type="photo"
        onClick={() => onServiceClick('foto-dan-videografi')}
      />
      
      {/* Central floating text */}
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
        <Text
          position={[0, 2, 0]}
          fontSize={0.8}
          color="#03d5eb"
          anchorX="center"
          anchorY="middle"
        >
          DIGITAL SERVICES
        </Text>
      </Float>
      
      {/* Orbit controls for interaction */}
      <OrbitControls 
        enablePan={false} 
        enableZoom={true} 
        enableRotate={true}
        maxDistance={10}
        minDistance={3}
        autoRotate
        autoRotateSpeed={0.5}
      />
    </>
  );
};

// Main component
const DigitalServices3D = ({ onServiceClick }: { onServiceClick: (service: string) => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="w-full h-full absolute inset-0"
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        shadows
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <DigitalServices3DScene onServiceClick={onServiceClick} />
      </Canvas>
      
      {/* Interactive overlay with instructions */}
      <div className="absolute bottom-4 left-4 text-white/80 text-sm">
        <p>🖱️ Drag to rotate • 🔍 Scroll to zoom • 👆 Click services</p>
      </div>
    </motion.div>
  );
};

export default DigitalServices3D;
