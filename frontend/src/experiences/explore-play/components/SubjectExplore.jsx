
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Atom,
  FlaskConical,
  Leaf,
  Calculator,
  BookOpen,
  Play,
  Star,
  Trophy,
  Sparkles,
} from "lucide-react";
import "./SubjectExplore.css";

const subjectData = {
  Biology: {
    emoji: "🌱",
    color: "#45bd83",
    tagline: "Discover the amazing world of living things!",
    description:
      "Explore cells, plants, animals and the incredible systems that make life possible.",
    topics: [
      { title: "Cell Explorer", icon: "🔬", detail: "Travel inside a living cell." },
      { title: "Plant Kingdom", icon: "🌿", detail: "Discover how plants grow and survive." },
      { title: "Human Body", icon: "🫀", detail: "Explore the systems inside your body." },
      { title: "Animal World", icon: "🦋", detail: "Meet fascinating living organisms." },
    ],
    mission: "The Secret Garden",
  },
  Physics: {
    emoji: "⚡",
    color: "#8b68ed",
    tagline: "Discover the science behind everything!",
    description:
      "Explore motion, forces, light, sound and energy through interactive discoveries.",
    topics: [
      { title: "Force & Motion", icon: "🚀", detail: "Discover why objects move." },
      { title: "Light Explorer", icon: "🔦", detail: "Explore reflection and shadows." },
      { title: "Energy World", icon: "⚡", detail: "Discover different forms of energy." },
      { title: "Sound Lab", icon: "🔊", detail: "Explore vibrations and sound waves." },
    ],
    mission: "The Mystery of Motion",
  },
  Chemistry: {
    emoji: "🧪",
    color: "#f4a34f",
    tagline: "Discover the magic of matter!",
    description:
      "Explore materials, elements, mixtures and the transformations around us.",
    topics: [
      { title: "Matter Explorer", icon: "🧊", detail: "Discover states of matter." },
      { title: "Elements World", icon: "⚛️", detail: "Meet the building blocks of matter." },
      { title: "Mixture Mission", icon: "🥣", detail: "Explore mixtures and separation." },
      { title: "Reaction Station", icon: "✨", detail: "Understand chemical changes." },
    ],
    mission: "The Magic Lab",
  },
  Mathematics: {
    emoji: "🔢",
    color: "#4d9de0",
    tagline: "Every pattern has a story. Find yours!",
    description:
      "Solve puzzles, discover patterns and explore the mathematics hidden in everyday life.",
    topics: [
      { title: "Shape Explorer", icon: "🔺", detail: "Discover geometry around you." },
      { title: "Number Quest", icon: "🔢", detail: "Solve exciting number challenges." },
      { title: "Pattern World", icon: "🧩", detail: "Find and create hidden patterns." },
      { title: "Graph Adventure", icon: "📊", detail: "Turn information into visual stories." },
    ],
    mission: "The Puzzle Peak",
  },
};

const subjectIcons = {
  Biology: Leaf,
  Physics: Atom,
  Chemistry: FlaskConical,
  Mathematics: Calculator,
};

export default function SubjectExplore({
  subject,
  onBack,
  onOpenTopic,
}) {
  const data = subjectData[subject] || subjectData.Biology;
  const SubjectIcon = subjectIcons[subject] || Leaf;

  return (
    <motion.section
      className="subject-explore-page"
      initial={{ opacity: 0, x: 35 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -25 }}
    >
      <button className="subject-back-button" onClick={onBack}>
        <ArrowLeft size={18} />
        Back to STEM Galaxy
      </button>

      <div
        className="subject-hero"
        style={{ "--subject-color": data.color }}
      >
        <div className="subject-hero-content">
          <span className="subject-eyebrow">
            <Sparkles size={15} /> YOUR SUBJECT ADVENTURE
          </span>
          <div className="subject-title-row">
            <span className="subject-big-emoji">{data.emoji}</span>
            <div>
              <h1>{subject}</h1>
              <p>{data.tagline}</p>
            </div>
          </div>
          <p className="subject-description">{data.description}</p>
        </div>
        <div className="subject-hero-icon">
          <SubjectIcon size={100} strokeWidth={1.2} />
        </div>
      </div>

      <div className="subject-section-heading">
        <div>
          <span>YOUR DISCOVERY PATH</span>
          <h2>Choose what to explore</h2>
        </div>
        <BookOpen size={27} />
      </div>

      <div className="subject-topic-grid">
        {data.topics.map((topic, index) => (
          <motion.button
            className="subject-topic-card"
            key={topic.title}
            whileHover={{ y: -6, scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onOpenTopic?.(subject, topic.title)}
          >
            <div className="subject-topic-top">
              <span>{topic.icon}</span>
              <small>TOPIC 0{index + 1}</small>
            </div>
            <h3>{topic.title}</h3>
            <p>{topic.detail}</p>
            <div className="subject-topic-action">
              <span>Explore topic</span>
              <Play size={15} fill="currentColor" />
            </div>
          </motion.button>
        ))}
      </div>

      <div className="subject-mission-banner">
        <div className="mission-banner-icon">🏆</div>
        <div>
          <span>YOUR SPECIAL MISSION</span>
          <h3>{data.mission}</h3>
          <p>Complete a challenge and earn discovery stars!</p>
        </div>
        <Star size={28} />
      </div>
    </motion.section>
  );
}
