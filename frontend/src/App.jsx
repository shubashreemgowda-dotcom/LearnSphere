
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Atom, BookOpen, Brain, Calculator, FlaskConical, Leaf,
  Lightbulb, Rocket, Sparkles, Trophy, Target, ArrowLeft,
  ChevronRight, Compass, Microscope, Star, Activity, Play,
  RotateCcw
} from "lucide-react";
import "./App.css";
import ExplorePlay from "./experiences/explore-play/ExplorePlay";
import DiscoverInnovate from "./experiences/discover-innovate/DiscoverInnovate";
import SubjectExplore from "./experiences/explore-play/components/SubjectExplore";
import PhysicsLessons from "./experiences/explore-play/components/PhysicsLessons";

const interests = [
  { name: "Football", emoji: "⚽", description: "Sports and movement" },
  { name: "Drawing", emoji: "🎨", description: "Art and creativity" },
  { name: "Gardening", emoji: "🌱", description: "Nature and plants" },
  { name: "Gaming", emoji: "🎮", description: "Games and technology" },
  { name: "Space", emoji: "🚀", description: "The universe" },
  { name: "Music", emoji: "🎵", description: "Sound and rhythm" },
  { name: "Building", emoji: "🏗️", description: "Design and structures" },
  { name: "Animals", emoji: "🐾", description: "Living organisms" },
];

const journeys = {
  Football: [
    { subject: "Physics", icon: Atom, topic: "Force & Motion", detail: "Discover how force changes the movement of a football.", mission: "Explore what makes a football travel farther." },
    { subject: "Mathematics", icon: Calculator, topic: "Angles & Statistics", detail: "Understand scoring probabilities, angles and match statistics.", mission: "Calculate the success rate of a player's shots." },
    { subject: "Biology", icon: Leaf, topic: "Muscles & Movement", detail: "Discover how muscles help players run, jump and kick.", mission: "Connect body movement with muscle function." },
    { subject: "Chemistry", icon: FlaskConical, topic: "Materials & Chemistry", detail: "Explore the materials used in sports equipment.", mission: "Investigate why different materials have different properties." },
  ],
  Drawing: [
    { subject: "Mathematics", icon: Calculator, topic: "Geometry & Patterns", detail: "Discover shapes, symmetry and proportions in art.", mission: "Create a symmetrical geometric design." },
    { subject: "Physics", icon: Atom, topic: "Light & Colour", detail: "Understand reflection, light and colour.", mission: "Explore how light changes what we see." },
    { subject: "Chemistry", icon: FlaskConical, topic: "Colour Chemistry", detail: "Explore pigments and how colours are created.", mission: "Investigate how natural colours are produced." },
    { subject: "Biology", icon: Leaf, topic: "Vision & The Eye", detail: "Discover how our eyes recognise colour and shapes.", mission: "Explore how vision helps us understand artwork." },
  ],
  Gardening: [
    { subject: "Biology", icon: Leaf, topic: "Plant Growth", detail: "Understand photosynthesis, roots and plant development.", mission: "Design a healthy growing environment for a plant." },
    { subject: "Chemistry", icon: FlaskConical, topic: "Soil Chemistry", detail: "Explore soil nutrients and pH.", mission: "Investigate what makes soil suitable for plants." },
    { subject: "Mathematics", icon: Calculator, topic: "Measurement", detail: "Calculate garden area and water requirements.", mission: "Plan a small garden using measurements." },
    { subject: "Physics", icon: Atom, topic: "Water & Energy", detail: "Understand water movement and sunlight energy.", mission: "Explore how water reaches plant roots." },
  ],
  Gaming: [
    { subject: "Mathematics", icon: Calculator, topic: "Logic & Probability", detail: "Explore patterns, scores and probability.", mission: "Solve a game-based probability challenge." },
    { subject: "Physics", icon: Atom, topic: "Motion & Gravity", detail: "Understand movement and gravity in games.", mission: "Investigate the path of a moving object." },
    { subject: "Biology", icon: Leaf, topic: "Brain & Learning", detail: "Discover how the brain processes information.", mission: "Explore how memory helps solve challenges." },
    { subject: "Chemistry", icon: FlaskConical, topic: "Materials", detail: "Explore the materials behind digital devices.", mission: "Investigate the materials used in screens." },
  ],
  Space: [
    { subject: "Physics", icon: Atom, topic: "Gravity & Motion", detail: "Discover how gravity affects planets and satellites.", mission: "Explore why planets orbit the Sun." },
    { subject: "Mathematics", icon: Calculator, topic: "Distance & Scale", detail: "Understand enormous distances and proportions.", mission: "Compare the sizes of planets." },
    { subject: "Chemistry", icon: FlaskConical, topic: "Elements in Space", detail: "Explore elements found in stars and planets.", mission: "Discover what stars are made of." },
    { subject: "Biology", icon: Leaf, topic: "Life in Space", detail: "Explore the conditions needed for living organisms.", mission: "Imagine the requirements for life beyond Earth." },
  ],
  Music: [
    { subject: "Physics", icon: Atom, topic: "Sound Waves", detail: "Discover vibrations, frequency and sound.", mission: "Compare sounds with different pitches." },
    { subject: "Mathematics", icon: Calculator, topic: "Patterns & Rhythm", detail: "Explore fractions, patterns and musical timing.", mission: "Create a repeating rhythm pattern." },
    { subject: "Biology", icon: Leaf, topic: "Hearing & The Brain", detail: "Understand how ears and the brain process sound.", mission: "Explore how we recognise different sounds." },
    { subject: "Chemistry", icon: FlaskConical, topic: "Materials & Instruments", detail: "Explore materials used to create instruments.", mission: "Compare materials used in musical instruments." },
  ],
  Building: [
    { subject: "Mathematics", icon: Calculator, topic: "Geometry & Measurement", detail: "Explore dimensions, shapes and calculations.", mission: "Design a structure using geometric shapes." },
    { subject: "Physics", icon: Atom, topic: "Force & Stability", detail: "Understand loads, forces and balance.", mission: "Explore what makes a structure stable." },
    { subject: "Chemistry", icon: FlaskConical, topic: "Construction Materials", detail: "Discover the properties of construction materials.", mission: "Compare the properties of construction materials." },
    { subject: "Biology", icon: Leaf, topic: "Biomimicry", detail: "Discover how nature inspires engineering.", mission: "Find a natural structure that inspires a design." },
  ],
  Animals: [
    { subject: "Biology", icon: Leaf, topic: "Animal Adaptations", detail: "Understand habitats, adaptations and ecosystems.", mission: "Explore how an animal survives in its habitat." },
    { subject: "Mathematics", icon: Calculator, topic: "Patterns in Nature", detail: "Discover numbers and patterns in living organisms.", mission: "Find mathematical patterns in nature." },
    { subject: "Chemistry", icon: FlaskConical, topic: "Life Processes", detail: "Explore the chemistry behind living systems.", mission: "Discover how organisms use nutrients." },
    { subject: "Physics", icon: Atom, topic: "Movement & Energy", detail: "Understand how animals move and use energy.", mission: "Compare different animal movements." },
  ],
};

const laboratories = [
  {
    name: "Physics",
    icon: Activity,
    color: "#3b82f6",
    description: "Discover motion, forces and energy.",
    experiments: [
      {
        title: "Simple Pendulum",
        description: "Explore oscillations and time period.",
        concept: "A pendulum is a weight suspended from a fixed point that swings back and forth.",
        explanation: "When a pendulum is displaced and released, gravity pulls it towards its resting position. This produces repeated oscillations.",
        observation: "Changing the length of a pendulum changes its time period. A longer pendulum generally takes more time to complete one oscillation.",
        realWorld: "Pendulum clocks, scientific instruments and measurements of time.",
        emoji: "⏱️",
        fact: "The time period depends mainly on the pendulum's length and the strength of gravity."
      },
      {
        title: "Force & Motion",
        description: "Discover Newton's laws of motion.",
        concept: "Force is a push or pull that can change an object's motion.",
        explanation: "An object can accelerate when an unbalanced force acts on it. Its acceleration depends on the net force and its mass.",
        observation: "Increasing the applied force increases acceleration when mass stays constant.",
        realWorld: "Sports, vehicle movement, rockets and everyday activities.",
        emoji: "🏀",
        fact: "Newton's second law is represented by F = ma."
      }
    ]
  },
  {
    name: "Chemistry",
    icon: FlaskConical,
    color: "#a855f7",
    description: "Explore reactions and materials.",
    experiments: [
      {
        title: "Acid–Base Indicators",
        description: "Explore colour-changing indicators.",
        concept: "Indicators are substances that change colour depending on whether a solution is acidic or basic.",
        explanation: "Different indicators respond to different pH conditions. For example, red cabbage extract contains pigments that change colour in acidic and basic solutions.",
        observation: "The colour of an indicator changes depending on the solution being tested.",
        realWorld: "Laboratories, water testing, soil testing and chemistry experiments.",
        emoji: "🧪",
        fact: "The pH scale commonly ranges from 0 to 14."
      },
      {
        title: "Separation of Mixtures",
        description: "Discover different separation techniques.",
        concept: "A mixture contains two or more substances that can often be separated using physical methods.",
        explanation: "Filtration, evaporation, sedimentation and sieving are methods used to separate mixtures based on differences in physical properties.",
        observation: "Different mixtures require different separation methods.",
        realWorld: "Water purification, food processing and recycling.",
        emoji: "⚗️",
        fact: "Filtration separates insoluble solids from liquids."
      }
    ]
  },
  {
    name: "Biology",
    icon: Leaf,
    color: "#22c55e",
    description: "Explore cells and living systems.",
    experiments: [
      {
        title: "Plant Cell Explorer",
        description: "Discover the structure of plant cells.",
        concept: "The plant cell is the basic structural and functional unit of plants.",
        explanation: "Plant cells contain structures such as the cell wall, cell membrane, nucleus, cytoplasm, vacuole and chloroplasts.",
        observation: "Each cell structure has a specific function that helps the plant survive.",
        realWorld: "Agriculture, plant growth, biotechnology and life sciences.",
        emoji: "🌿",
        fact: "Chloroplasts contain chlorophyll, which absorbs light energy."
      },
      {
        title: "Photosynthesis Simulator",
        description: "Explore how plants make food.",
        concept: "Photosynthesis is the process through which green plants use light energy to produce glucose.",
        explanation: "Plants use carbon dioxide and water, with light energy, to produce glucose and release oxygen.",
        observation: "Light, water and carbon dioxide are important factors in photosynthesis.",
        realWorld: "Agriculture, ecosystems, food chains and the oxygen cycle.",
        emoji: "☀️",
        fact: "Photosynthesis converts light energy into chemical energy."
      }
    ]
  },
  {
    name: "Mathematics",
    icon: Calculator,
    color: "#ec4899",
    description: "Visualise mathematical concepts.",
    experiments: [
      {
        title: "3D Geometry Explorer",
        description: "Explore three-dimensional shapes.",
        concept: "Three-dimensional objects have length, width and height.",
        explanation: "Solids such as cubes, spheres, cones and cylinders have different faces, edges, vertices and curved surfaces.",
        observation: "Rotating a 3D shape helps us understand its structure from different angles.",
        realWorld: "Architecture, product design, engineering and construction.",
        emoji: "🔷",
        fact: "A cube has six square faces, twelve edges and eight vertices."
      },
      {
        title: "Coordinate Geometry",
        description: "Discover points on a coordinate plane.",
        concept: "Coordinate geometry describes the position of points using numerical coordinates.",
        explanation: "A point on a two-dimensional plane is represented by an ordered pair (x, y), measured from the horizontal and vertical axes.",
        observation: "Changing either coordinate moves a point horizontally or vertically.",
        realWorld: "Maps, navigation, computer graphics and engineering drawings.",
        emoji: "📈",
        fact: "The origin of the Cartesian plane is (0, 0)."
      }
    ]
  }
];

function ExperimentAnimation({ experiment }) {
  const [playing, setPlaying] = useState(true);
  const [speed, setSpeed] = useState(1);

  const isPendulum = experiment.title === "Simple Pendulum";
  const isMotion = experiment.title === "Force & Motion";
  const isCell = experiment.title === "Plant Cell Explorer";
  const isPhotosynthesis = experiment.title === "Photosynthesis Simulator";
  const isGeometry = experiment.title === "3D Geometry Explorer";
  const isChemistry = experiment.subject === "Chemistry";
  const isMath = experiment.subject === "Mathematics";

  return (
    <div style={{
      padding: "25px",
      borderRadius: "22px",
      background: "linear-gradient(145deg, rgba(30,41,75,0.95), rgba(15,23,42,0.98))",
      border: "1px solid rgba(148,163,184,0.2)",
      overflow: "hidden"
    }}>
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "10px"
      }}>
        <span style={{ fontSize: "13px", letterSpacing: "2px", color: "#a5b4fc" }}>
          INTERACTIVE VISUAL LAB
        </span>
        <span style={{
          fontSize: "12px",
          padding: "6px 12px",
          borderRadius: "20px",
          background: "rgba(34,197,94,0.15)",
          color: "#86efac"
        }}>
          ● SIMULATION
        </span>
      </div>

      <div style={{
        minHeight: "230px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        margin: "20px 0"
      }}>
        {isPendulum && (
          <div style={{ width: "200px", height: "200px", position: "relative" }}>
            <div style={{
              position: "absolute",
              top: "12px",
              left: "50%",
              width: "90px",
              height: "5px",
              borderRadius: "10px",
              background: "#94a3b8",
              transform: "translateX(-50%)"
            }} />
            <motion.div
              animate={playing ? { rotate: [-35, 35, -35] } : { rotate: 0 }}
              transition={{ duration: 2 / speed, repeat: playing ? Infinity : 0, ease: "easeInOut" }}
              style={{
                position: "absolute",
                top: "15px",
                left: "50%",
                width: "3px",
                height: "145px",
                background: "#cbd5e1",
                transformOrigin: "top center"
              }}
            >
              <div style={{
                position: "absolute",
                bottom: "-17px",
                left: "-16px",
                width: "35px",
                height: "35px",
                borderRadius: "50%",
                background: "linear-gradient(135deg,#60a5fa,#2563eb)",
                boxShadow: "0 0 25px rgba(59,130,246,0.6)"
              }} />
            </motion.div>
            <div style={{
              position: "absolute",
              top: "0",
              left: "50%",
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              background: "#fbbf24",
              transform: "translateX(-50%)"
            }} />
          </div>
        )}

        {isMotion && (
          <div style={{ width: "100%", position: "relative", height: "150px" }}>
            <div style={{
              position: "absolute",
              bottom: "25px",
              width: "100%",
              height: "4px",
              background: "#64748b"
            }} />
            <motion.div
              animate={playing ? { x: [0, 220, 0] } : { x: 0 }}
              transition={{ duration: 4 / speed, repeat: playing ? Infinity : 0, ease: "easeInOut" }}
              style={{
                position: "absolute",
                bottom: "30px",
                left: "10%",
                fontSize: "55px"
              }}
            >
              🏀
            </motion.div>
            <div style={{
              position: "absolute",
              top: "10px",
              left: "15%",
              color: "#93c5fd",
              fontSize: "13px"
            }}>
              Applied force → Motion
            </div>
          </div>
        )}

        {isChemistry && (
          <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "25px",
            flexWrap: "wrap"
          }}>
            {["#a78bfa", "#f472b6", "#60a5fa"].map((color, i) => (
              <motion.div
                key={color}
                animate={playing ? {
                  y: [0, -12, 0],
                  scale: [1, 1.08, 1]
                } : { y: 0 }}
                transition={{
                  duration: 2,
                  repeat: playing ? Infinity : 0,
                  delay: i * 0.3
                }}
                style={{
                  width: "65px",
                  height: "95px",
                  borderRadius: "12px 12px 25px 25px",
                  border: "3px solid #cbd5e1",
                  background: `linear-gradient(to top, ${color} 65%, transparent 65%)`,
                  boxShadow: `0 0 25px ${color}55`
                }}
              />
            ))}
          </div>
        )}

        {isCell && (
          <motion.div
            animate={playing ? { rotate: 360 } : { rotate: 0 }}
            transition={{ duration: 25, repeat: playing ? Infinity : 0, ease: "linear" }}
            style={{
              width: "190px",
              height: "140px",
              borderRadius: "48%",
              border: "9px solid #86efac",
              background: "rgba(34,197,94,0.13)",
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <div style={{
              width: "52px",
              height: "52px",
              borderRadius: "50%",
              background: "#a78bfa",
              boxShadow: "0 0 25px #a78bfa"
            }} />
            {["#4ade80", "#facc15", "#60a5fa"].map((color, i) => (
              <div key={color} style={{
                position: "absolute",
                width: "18px",
                height: "18px",
                borderRadius: "50%",
                background: color,
                top: `${20 + i * 25}%`,
                left: `${15 + i * 25}%`
              }} />
            ))}
          </motion.div>
        )}

        {isPhotosynthesis && (
          <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "12px"
          }}>
            <motion.div
              animate={playing ? { rotate: [-8, 8, -8] } : { rotate: 0 }}
              transition={{ duration: 3, repeat: playing ? Infinity : 0 }}
              style={{ fontSize: "95px" }}
            >
              🌱
            </motion.div>
            <motion.div
              animate={playing ? { y: [-10, 10, -10], opacity: [0.4, 1, 0.4] } : { opacity: 1 }}
              transition={{ duration: 2, repeat: playing ? Infinity : 0 }}
              style={{ fontSize: "25px" }}
            >
              ☀️
            </motion.div>
            <span style={{ color: "#86efac", fontSize: "13px" }}>
              Light + Water + Carbon dioxide
            </span>
          </div>
        )}

        {isGeometry && (
          <motion.div
            animate={playing ? { rotateX: 360, rotateY: 360 } : { rotateX: 0, rotateY: 0 }}
            transition={{ duration: 8 / speed, repeat: playing ? Infinity : 0, ease: "linear" }}
            style={{
              width: "110px",
              height: "110px",
              background: "linear-gradient(135deg,#60a5fa,#a78bfa)",
              border: "2px solid #c4b5fd",
              boxShadow: "0 0 40px rgba(139,92,246,0.35)",
              transformStyle: "preserve-3d"
            }}
          />
        )}

        {isMath && !isGeometry && (
          <div style={{
            width: "220px",
            height: "180px",
            position: "relative",
            borderLeft: "3px solid #e879f9",
            borderBottom: "3px solid #e879f9"
          }}>
            {[0, 1, 2, 3, 4].map((n) => (
              <div key={n} style={{
                position: "absolute",
                left: `${n * 20 + 5}%`,
                bottom: `${n * 17 + 10}%`,
                width: "13px",
                height: "13px",
                borderRadius: "50%",
                background: "#f472b6",
                boxShadow: "0 0 15px #f472b6"
              }} />
            ))}
            <motion.div
              animate={playing ? { opacity: [0.3, 1, 0.3] } : { opacity: 1 }}
              transition={{ duration: 2, repeat: playing ? Infinity : 0 }}
              style={{
                position: "absolute",
                left: "10%",
                top: "10%",
                color: "#f9a8d4",
                fontSize: "13px"
              }}
            >
              (x, y)
            </motion.div>
          </div>
        )}
      </div>

      <div style={{
        display: "flex",
        justifyContent: "center",
        gap: "12px",
        flexWrap: "wrap"
      }}>
        <button
          onClick={() => setPlaying(!playing)}
          style={{
            border: "none",
            borderRadius: "12px",
            padding: "11px 20px",
            background: "#6366f1",
            color: "white",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "8px"
          }}
        >
          {playing ? "Pause animation" : "Play animation"}
          <Play size={16} />
        </button>

        <button
          onClick={() => {
            setPlaying(false);
            setSpeed(1);
          }}
          style={{
            border: "1px solid #64748b",
            borderRadius: "12px",
            padding: "11px 16px",
            background: "transparent",
            color: "white",
            cursor: "pointer"
          }}
        >
          <RotateCcw size={15} /> Reset
        </button>

        <button
          onClick={() => setSpeed(speed === 1 ? 2 : 1)}
          style={{
            border: "1px solid #64748b",
            borderRadius: "12px",
            padding: "11px 16px",
            background: "transparent",
            color: "white",
            cursor: "pointer"
          }}
        >
          Speed: {speed}x
        </button>
      </div>
    </div>
  );
}

export default function App() {
  const [page, setPage] = useState("home");
  const [studentClass, setStudentClass] = useState("");
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [activeJourney, setActiveJourney] = useState(0);
  const [completed, setCompleted] = useState([]);
  const [activeSubject, setActiveSubject] = useState(null);
  const [activeTopic, setActiveTopic] = useState(null);
  const [activeExperiment, setActiveExperiment] = useState(null);

  const toggleInterest = (name) => {
    setSelectedInterests((old) =>
      old.includes(name)
        ? old.filter((item) => item !== name)
        : [...old, name]
    );
  };

  const startJourney = () => {
    if (studentClass && selectedInterests.length > 0) {
      setPage("dashboard");
    }
  };

  const learningPath = selectedInterests.flatMap(
    (interest) => journeys[interest] || []
  );

  const isJunior = Number(studentClass) <= 8;

  const openExperiment = (subject, experiment) => {
    setActiveExperiment({ ...experiment, subject });
  };

  return (
    <main className="app">
      <nav className="navbar">
        <a className="brand" href="#" onClick={() => setPage("home")}>
          <span className="brand-icon"><Atom /></span>
          LearnSphere
        </a>
        <div className="nav-links">
          <a href="#subjects" onClick={() => setPage("home")}>STEM Universe</a>
          <a href="#discover" onClick={() => setPage("home")}>Discover</a>
        </div>
        <span className="nav-label">DISCOVER STEM IN EVERYTHING</span>
      </nav>

      <AnimatePresence mode="wait">
        {page === "home" && (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <section className="hero">
              <div className="hero-content">
                <div className="eyebrow"><Sparkles size={16} /> LEARNING WITHOUT LIMITS</div>
                <h1>Discover STEM<br />in <span>Everything.</span></h1>
                <p>Your curiosity is the beginning of every discovery. Explore science through the things you already love.</p>
                <button className="primary-button" onClick={() => setPage("onboarding")}>
                  Begin Your Journey <Rocket size={18} />
                </button>
                <div className="hero-note">
                  <BookOpen size={18} /> Designed for curious minds in Classes 6–10
                </div>
              </div>

              <div className="universe">
                <div className="orbit orbit-one" />
                <div className="orbit orbit-two" />
                <div className="universe-core"><Atom size={70} /></div>
                <div className="floating-icon icon-one"><Lightbulb /></div>
                <div className="floating-icon icon-two"><Rocket /></div>
              </div>
            </section>

            <section className="subjects" id="subjects">
              <div className="section-heading">
                <span>THE STEM UNIVERSE</span>
                <h2>Four subjects. Infinite possibilities.</h2>
                <p>Discover how everyday experiences connect to STEM.</p>
              </div>
              <div className="subject-grid">
                {[
                  ["Mathematics", Calculator, "math"],
                  ["Physics", Atom, "physics"],
                  ["Chemistry", FlaskConical, "chemistry"],
                  ["Biology", Leaf, "biology"],
                ].map(([name, Icon, color]) => (
                  <motion.article
                    className={`subject-card ${color}`}
                    key={name}
                    whileHover={{ y: -8 }}
                  >
                    <Icon size={34} />
                    <h3>{name}</h3>
                    <p>Explore concepts through real-world discoveries.</p>
                  </motion.article>
                ))}
              </div>
            </section>

            <section className="discover" id="discover">
              <div className="section-heading">
                <span>TWO LEARNING WORLDS</span>
                <h2>One platform. Two experiences.</h2>
                <p>Learning adapts to your stage of discovery.</p>
              </div>
              <div className="experience-grid">
                <article className="experience-card play-card">
                  <span className="experience-icon">🌈</span>
                  <span className="class-label">CLASSES 6–8</span>
                  <h3>Explore & Play</h3>
                  <p>Colourful journeys, visual stories and playful challenges.</p>
                </article>
                <article className="experience-card innovate-card">
                  <span className="experience-icon">🚀</span>
                  <span className="class-label">CLASSES 9–10</span>
                  <h3>Discover & Innovate</h3>
                  <p>Interactive models, real-world missions and analytical challenges.</p>
                </article>
              </div>
            </section>
          </motion.div>
        )}

        {page === "onboarding" && (
          <motion.section
            className="onboarding-page"
            key="onboarding"
            initial={{ opacity: 0, x: 35 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -35 }}
          >
            <button className="back-button" onClick={() => setPage("home")}>
              <ArrowLeft size={17} /> Back to home
            </button>

            <div className="section-heading">
              <span><Sparkles size={15} /> YOUR PERSONAL DISCOVERY ENGINE</span>
              <h2>Let's make learning yours.</h2>
              <p>Tell us a little about yourself. Your interests will shape your STEM journey.</p>
            </div>

            <div className="onboarding-card">
              <h3><span className="step-number">01</span> Which class are you studying in?</h3>
              <div className="class-options">
                {[6, 7, 8, 9, 10].map((grade) => (
                  <button
                    key={grade}
                    className={studentClass === String(grade) ? "class-option active" : "class-option"}
                    onClick={() => setStudentClass(String(grade))}
                  >
                    Class {grade}
                  </button>
                ))}
              </div>

              <h3><span className="step-number">02</span> What are you curious about?</h3>
              <p className="selection-hint">Choose one or more interests.</p>

              <div className="interest-options">
                {interests.map((item) => (
                  <button
                    key={item.name}
                    className={selectedInterests.includes(item.name) ? "interest-option active" : "interest-option"}
                    onClick={() => toggleInterest(item.name)}
                  >
                    <span>{item.emoji}</span>
                    <span>{item.name}</span>
                    {selectedInterests.includes(item.name) && <span>✓</span>}
                  </button>
                ))}
              </div>

              <div className="selection-count">
                {selectedInterests.length} interest{selectedInterests.length === 1 ? "" : "s"} selected
              </div>

              <button
                className="primary-button journey-button"
                disabled={!studentClass || selectedInterests.length === 0}
                onClick={startJourney}
              >
                Generate My Learning Journey <Rocket size={18} />
              </button>
            </div>
          </motion.section>
        )}

        {page === "dashboard" && (
          <motion.section
            key="dashboard"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <button className="back-button" onClick={() => setPage("onboarding")}>
              <ArrowLeft size={17} /> Edit my interests
            </button>

            {isJunior ? (
              <ExplorePlay
                studentClass={studentClass}
                selectedInterests={selectedInterests}
                learningPath={learningPath}
                completed={completed}
                onOpenLesson={(index) => {
                  setActiveJourney(index);
                  setPage("lesson");
                }}
                onOpenLabs={() => {
                  setActiveExperiment(null);
                  setPage("labs");
                }}
                onOpenSubject={(subject) => {
                  setActiveSubject(subject);
                  setPage("subject");
                }}
              />
            ) : (
              <DiscoverInnovate
                studentClass={studentClass}
                selectedInterests={selectedInterests}
                learningPath={learningPath}
                completed={completed}
                onOpenLesson={(index) => {
                  setActiveJourney(index);
                  setPage("lesson");
                }}
                onOpenLabs={() => {
                  setActiveExperiment(null);
                  setPage("labs");
                }}
              />
            )}
          </motion.section>
        )}

        {page === "subject" && activeSubject && (
          <SubjectExplore
            key={`subject-${activeSubject}`}
            subject={activeSubject}
            onBack={() => {
              setActiveSubject(null);
              setPage("dashboard");
            }}
            onOpenTopic={(subject, topic) => {
              setActiveTopic(topic);
              if (subject === "Physics") {
                setPage("physicsLessons");
              }
            }}
          />
        )}

        {page === "physicsLessons" && activeTopic && (
          <PhysicsLessons
            topic={activeTopic}
            studentClass={studentClass}
            selectedInterests={selectedInterests}
            onBack={() => setPage("subject")}
          />
        )}

        {page === "lesson" && (
          <motion.section
            className="lesson-page"
            key="lesson"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <button className="back-button" onClick={() => setPage("dashboard")}>
              <ArrowLeft size={17} /> Back to dashboard
            </button>

            <div className="lesson-card">
              {learningPath[activeJourney] ? (
                <>
                  <div className="eyebrow"><BookOpen size={17} /> YOUR LEARNING JOURNEY</div>
                  <h1>{learningPath[activeJourney].topic}</h1>
                  <p>{learningPath[activeJourney].detail}</p>
                  <h3>Your mission</h3>
                  <p>{learningPath[activeJourney].mission}</p>
                  <button
                    className="primary-button"
                    onClick={() => {
                      setCompleted((old) =>
                        old.includes(activeJourney) ? old : [...old, activeJourney]
                      );
                      setPage("dashboard");
                    }}
                  >
                    Mark as completed <Trophy size={18} />
                  </button>
                </>
              ) : (
                <p>This learning activity is not available yet.</p>
              )}
            </div>
          </motion.section>
        )}

        {page === "labs" && (
          <motion.section
            className="lesson-page"
            key="labs"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <button
              className="back-button"
              onClick={() => {
                if (activeExperiment) {
                  setActiveExperiment(null);
                } else {
                  setPage("dashboard");
                }
              }}
            >
              <ArrowLeft size={17} />
              {activeExperiment ? "Back to laboratories" : "Back to dashboard"}
            </button>

            {!activeExperiment ? (
              <div className="lesson-card">
                <div className="eyebrow">
                  <FlaskConical size={17} /> LEARNSPHERE VIRTUAL LABS
                </div>

                <h1>Welcome to Your Virtual Laboratory</h1>
                <p>
                  Don't just learn STEM. Experience it! Explore experiments,
                  discover scientific concepts and learn by doing.
                </p>

                <div style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
                  gap: "14px",
                  margin: "25px 0"
                }}>
                  {[
                    ["04", "Laboratories"],
                    ["08", "Experiments"],
                    ["3D", "Visual Learning"]
                  ].map(([number, label]) => (
                    <div key={label} style={{
                      padding: "17px",
                      borderRadius: "15px",
                      background: "rgba(99, 102, 241, 0.12)",
                      border: "1px solid rgba(148, 163, 184, 0.18)"
                    }}>
                      <h2 style={{ margin: 0, fontSize: "26px" }}>{number}</h2>
                      <small>{label}</small>
                    </div>
                  ))}
                </div>

                <h2 style={{ marginTop: "35px" }}>Explore Your Laboratories</h2>
                <p>Choose a subject and discover its experiments.</p>

                <div style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                  gap: "20px",
                  marginTop: "25px"
                }}>
                  {laboratories.map((subject) => {
                    const Icon = subject.icon;

                    return (
                      <div
                        key={subject.name}
                        style={{
                          padding: "23px",
                          borderRadius: "20px",
                          background: "rgba(30, 41, 75, 0.75)",
                          border: `1px solid ${subject.color}55`
                        }}
                      >
                        <div style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "13px",
                          marginBottom: "12px",
                          color: subject.color
                        }}>
                          <Icon size={28} />
                          <h2 style={{ margin: 0, fontSize: "22px" }}>
                            {subject.name}
                          </h2>
                        </div>

                        <p>{subject.description}</p>

                        <div style={{
                          display: "grid",
                          gap: "12px",
                          marginTop: "20px"
                        }}>
                          {subject.experiments.map((experiment) => (
                            <button
                              key={experiment.title}
                              type="button"
                              onClick={() => openExperiment(subject.name, experiment)}
                              style={{
                                width: "100%",
                                textAlign: "left",
                                color: "inherit",
                                cursor: "pointer",
                                padding: "14px",
                                borderRadius: "12px",
                                background: "rgba(255,255,255,0.06)",
                                border: "1px solid rgba(255,255,255,0.09)"
                              }}
                            >
                              <strong>{experiment.emoji} {experiment.title}</strong>
                              <p style={{
                                fontSize: "13px",
                                margin: "7px 0 0",
                                opacity: 0.8
                              }}>
                                {experiment.description}
                              </p>
                              <span style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "5px",
                                marginTop: "12px",
                                fontSize: "12px",
                                color: subject.color
                              }}>
                                Explore experiment <ChevronRight size={14} />
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <motion.div
                key={activeExperiment.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="lesson-card"
              >
                <div className="eyebrow">
                  <Microscope size={17} /> {activeExperiment.subject.toUpperCase()} LABORATORY
                </div>

                <h1>{activeExperiment.emoji} {activeExperiment.title}</h1>
                <p>{activeExperiment.description}</p>

                <div style={{
                  margin: "25px 0",
                  padding: "18px",
                  borderRadius: "15px",
                  background: "rgba(99,102,241,0.12)",
                  border: "1px solid rgba(129,140,248,0.25)"
                }}>
                  <h3><Lightbulb size={19} /> What will you discover?</h3>
                  <p>{activeExperiment.concept}</p>
                </div>

                <h2>Explore the animated experiment</h2>
                <ExperimentAnimation experiment={activeExperiment} />

                <div style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                  gap: "16px",
                  marginTop: "25px"
                }}>
                  <div style={{
                    padding: "20px",
                    borderRadius: "15px",
                    background: "rgba(59,130,246,0.10)"
                  }}>
                    <h3>📖 How does it work?</h3>
                    <p>{activeExperiment.explanation}</p>
                  </div>

                  <div style={{
                    padding: "20px",
                    borderRadius: "15px",
                    background: "rgba(34,197,94,0.10)"
                  }}>
                    <h3>🔍 What should you observe?</h3>
                    <p>{activeExperiment.observation}</p>
                  </div>

                  <div style={{
                    padding: "20px",
                    borderRadius: "15px",
                    background: "rgba(168,85,247,0.10)"
                  }}>
                    <h3>🌍 Real-world applications</h3>
                    <p>{activeExperiment.realWorld}</p>
                  </div>

                  <div style={{
                    padding: "20px",
                    borderRadius: "15px",
                    background: "rgba(236,72,153,0.10)"
                  }}>
                    <h3>⭐ Did you know?</h3>
                    <p>{activeExperiment.fact}</p>
                  </div>
                </div>

                <button
                  className="primary-button"
                  style={{ marginTop: "25px" }}
                  onClick={() => setActiveExperiment(null)}
                >
                  Explore another experiment <ChevronRight size={18} />
                </button>
              </motion.div>
            )}
          </motion.section>
        )}
      </AnimatePresence>
    </main>
  );
}
