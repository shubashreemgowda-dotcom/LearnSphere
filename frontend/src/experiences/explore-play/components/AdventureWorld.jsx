
import { Canvas } from "@react-three/fiber";
import { Float, Stars, Sparkles } from "@react-three/drei";
import "./AdventureWorld.css";

const worlds = [
  { subject: "Physics", emoji: "⚡", color: "#b58aff", position: [-4.2, 0, 0] },
  { subject: "Chemistry", emoji: "🧪", color: "#ffad55", position: [-1.4, 0, 0] },
  { subject: "Biology", emoji: "🌱", color: "#65e6a0", position: [1.4, 0, 0] },
  { subject: "Mathematics", emoji: "🔢", color: "#65baff", position: [4.2, 0, 0] },
];

function Portal({ color, position }) {
  return (
    <group position={position}>
      <Float speed={1.5} rotationIntensity={0.08} floatIntensity={0.25}>
        <mesh>
          <torusGeometry args={[0.92, 0.075, 24, 100]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={2.5}
            metalness={0.4}
            roughness={0.2}
          />
        </mesh>

        <mesh position={[0, 0, -0.04]}>
          <circleGeometry args={[0.83, 80]} />
          <meshBasicMaterial
            color={color}
            transparent
            opacity={0.18}
            depthWrite={false}
          />
        </mesh>

        <mesh position={[0, 0, 0.08]}>
          <sphereGeometry args={[0.34, 32, 32]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={2.8}
            transparent
            opacity={0.85}
          />
        </mesh>

        <mesh rotation={[0, 0, 0.5]} position={[0, 0, 0.12]}>
          <torusGeometry args={[0.55, 0.018, 12, 80]} />
          <meshBasicMaterial color="white" transparent opacity={0.7} />
        </mesh>
      </Float>
    </group>
  );
}

function GalaxyScene() {
  return (
    <>
      <color attach="background" args={["#08091c"]} />
      <ambientLight intensity={1.2} />
      <pointLight position={[0, 2, 5]} intensity={3} color="#a78bfa" />
      <Stars radius={70} depth={45} count={2200} factor={3} fade speed={0.6} />
      <Sparkles count={120} scale={14} size={2.5} speed={0.35} color="#c4b5fd" />

      {worlds.map((world) => (
        <Portal key={world.subject} {...world} />
      ))}
    </>
  );
}

export default function AdventureWorld({ onOpenSubject }) {
  return (
    <section className="adventure-world">
      <header className="adventure-world-heading">
        <span>✦ YOUR JOURNEY STARTS HERE ✦</span>
        <h2>Explore the STEM Universe</h2>
        <p>Choose a gateway. Discover a new world of science.</p>
      </header>

      <div className="adventure-world-stage">
        <Canvas camera={{ position: [0, 0, 11], fov: 48 }}>
          <GalaxyScene />
        </Canvas>

        <div className="portal-labels">
          {worlds.map((world) => (
            <button
              key={world.subject}
              className="portal-button"
              style={{ "--portal-color": world.color }}
              onClick={() => onOpenSubject?.(world.subject)}
            >
              <span className="portal-symbol">{world.emoji}</span>
              <span className="portal-name">{world.subject}</span>
              <span className="portal-action">ENTER UNIVERSE ↗</span>
            </button>
          ))}
        </div>
      </div>

      <p className="adventure-world-footer">
        SELECT A PORTAL TO BEGIN YOUR DISCOVERY
      </p>
    </section>
  );
}
