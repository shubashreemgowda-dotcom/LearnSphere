import { motion } from "framer-motion";
import {
  Sparkles,
  Compass,
  Trophy,
  ChevronRight,
  FlaskConical,
  Atom,
  Leaf,
  Calculator,
  Star,
  Play,
  Map,
  BookOpen,
  Zap,
  Target,
  Gift,
} from "lucide-react";
import "./ExplorePlay.css";
import AdventureWorld from "./components/AdventureWorld";

const subjects = [
  {
    name: "Physics",
    icon: "⚡",
    description: "Discover how the world moves",
    color: "physics",
    progress: 65,
  },
  {
    name: "Chemistry",
    icon: "🧪",
    description: "Explore the magic of matter",
    color: "chemistry",
    progress: 40,
  },
  {
    name: "Biology",
    icon: "🌱",
    description: "Meet the wonders of life",
    color: "biology",
    progress: 75,
  },
  {
    name: "Mathematics",
    icon: "🔢",
    description: "Solve puzzles and patterns",
    color: "math",
    progress: 50,
  },
];

const adventures = [
  {
    title: "The Mystery of Motion",
    subject: "Physics",
    icon: "🚀",
    description: "Discover the science behind movement.",
    color: "adventure-purple",
  },
  {
    title: "The Secret Garden",
    subject: "Biology",
    icon: "🌻",
    description: "Explore plants and the world of living things.",
    color: "adventure-green",
  },
  {
    title: "The Magic Lab",
    subject: "Chemistry",
    icon: "🧪",
    description: "Become a young science explorer.",
    color: "adventure-orange",
  },
];

function ExplorePlay({
  studentClass,
  selectedInterests = [],
  learningPath = [],
  completed = [],
   onOpenLesson,
  onOpenLabs,
  onOpenSubject,
}) {
  const studentName = "Explorer";
  const firstInterest = selectedInterests[0] || "Science";
  const safePath = Array.isArray(learningPath) ? learningPath : [];
  const completedCount = Array.isArray(completed) ? completed.length : 0;

  const getLessonTitle = (lesson, index) => {
    if (typeof lesson === "string") return lesson;
    return lesson?.title || lesson?.name || `Discovery Mission ${index + 1}`;
  };

  return (
    <motion.div
      className="explore-play"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55 }}
    >
      {/* Welcome section */}
      <section className="explore-welcome">
        <div className="welcome-copy">
          <div className="explore-eyebrow">
            <Sparkles size={15} />
            YOUR STEM ADVENTURE STARTS HERE
          </div>

          <h1>
            Hello, Explorer! <span>🌈</span>
          </h1>

          <p>
            Ready to turn your curiosity into amazing discoveries?
            Let's explore the world of STEM together!
          </p>

          <div className="explore-tags">
            <span>Class {studentClass}</span>
            <span>✨ {firstInterest}</span>
          </div>

          <button
            className="explore-primary-button"
            onClick={() => onOpenLesson?.(0)}
          >
            <Play size={17} fill="currentColor" />
            Start Exploring
            <ChevronRight size={18} />
          </button>
        </div>

        <div className="welcome-art">
          <div className="welcome-orbit orbit-one" />
          <div className="welcome-orbit orbit-two" />
          <span className="floating-star star-one">⭐</span>
          <span className="floating-star star-two">✨</span>
          <span className="floating-star star-three">💫</span>
          <div className="explorer-mascot">🤖</div>
          <div className="mascot-caption">
            <Sparkles size={14} />
            Let's discover!
          </div>
        </div>
      </section>
      {/* Interactive 3D STEM Adventure World */}
<AdventureWorld
  onOpenLesson={(index) => onOpenLesson?.(index)}
  onOpenSubject={onOpenSubject}
/>

      {/* Progress cards */}
      <section className="explore-stats">
        <div className="explore-stat-card">
          <div className="stat-icon stat-purple">
            <Trophy size={22} />
          </div>
          <div>
            <strong>{completedCount}</strong>
            <span>Missions completed</span>
          </div>
        </div>

        <div className="explore-stat-card">
          <div className="stat-icon stat-yellow">
            <Star size={22} />
          </div>
          <div>
            <strong>{completedCount * 10}</strong>
            <span>Stars earned</span>
          </div>
        </div>

        <div className="explore-stat-card">
          <div className="stat-icon stat-green">
            <Compass size={22} />
          </div>
          <div>
            <strong>4</strong>
            <span>Worlds to explore</span>
          </div>
        </div>
      </section>

      {/* Subject worlds */}
      <section className="explore-section">
        <div className="explore-section-heading">
          <div>
            <span className="section-kicker">CHOOSE YOUR WORLD</span>
            <h2>Where shall we explore? 🗺️</h2>
            <p>Every subject is a new adventure waiting for you.</p>
          </div>
          <div className="heading-decoration">🌍</div>
        </div>

        <div className="subject-world-grid">
          {subjects.map((subject, index) => (
            <motion.div
              className={`subject-world-card ${subject.color}`}
              key={subject.name}
              whileHover={{ y: -7, scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div className="subject-card-top">
                <span className="subject-emoji">{subject.icon}</span>
                <span className="world-number">WORLD 0{index + 1}</span>
              </div>

              <h3>{subject.name}</h3>
              <p>{subject.description}</p>

              <div className="subject-progress">
                <div className="progress-label">
                  <span>Discovery progress</span>
                  <strong>{subject.progress}%</strong>
                </div>
                <div className="progress-track">
                  <div
                    className="progress-fill"
                    style={{ width: `${subject.progress}%` }}
                  />
                </div>
              </div>

              <button
                className="world-explore-button"
                onClick={() => onOpenLesson?.(index)}
              >
                Explore world <ChevronRight size={16} />
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Adventure missions */}
      <section className="explore-section">
        <div className="explore-section-heading">
          <div>
            <span className="section-kicker">LEARN THROUGH STORIES</span>
            <h2>Your adventure missions 🎯</h2>
            <p>Learn new things by completing exciting missions.</p>
          </div>
          <div className="heading-decoration">🏆</div>
        </div>

        <div className="adventure-grid">
          {adventures.map((adventure, index) => (
            <motion.div
              className={`adventure-card ${adventure.color}`}
              key={adventure.title}
              whileHover={{ y: -5 }}
            >
              <div className="adventure-illustration">
                <span>{adventure.icon}</span>
                <div className="adventure-sparkle">✨</div>
              </div>

              <div className="adventure-content">
                <span className="adventure-subject">{adventure.subject}</span>
                <h3>{adventure.title}</h3>
                <p>{adventure.description}</p>
                <button onClick={() => onOpenLesson?.(index)}>
                  Begin mission <ArrowRightFallback />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Personal learning path */}
      <section className="explore-section">
        <div className="explore-section-heading">
          <div>
            <span className="section-kicker">MADE FOR YOUR CURIOSITY</span>
            <h2>Your learning trail 🧭</h2>
            <p>
              A learning journey inspired by your interest in {firstInterest}.
            </p>
          </div>
          <div className="heading-decoration">📚</div>
        </div>

        <div className="learning-trail-card">
          <div className="trail-decoration">🌳</div>
          <div className="trail-content">
            {safePath.length > 0 ? (
              safePath.slice(0, 4).map((lesson, index) => (
                <button
                  className="trail-step"
                  key={index}
                  onClick={() => onOpenLesson?.(index)}
                >
                  <span className="trail-step-icon">
                    {index === 0 ? "🌟" : index === 1 ? "🔍" : index === 2 ? "🧩" : "🏁"}
                  </span>
                  <span className="trail-step-text">
                    <strong>{getLessonTitle(lesson, index)}</strong>
                    <small>Discovery step {index + 1}</small>
                  </span>
                  <ChevronRight size={19} />
                </button>
              ))
            ) : (
              <div className="trail-empty">
                <span>🗺️</span>
                <div>
                  <strong>Your adventure is waiting!</strong>
                  <p>Choose a mission to begin your learning journey.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Virtual labs */}
      <section className="explore-lab-banner">
        <div className="lab-banner-art">🧪</div>
        <div className="lab-banner-copy">
          <span>PUT YOUR CURIOSITY TO THE TEST</span>
          <h2>Welcome to the Virtual Lab!</h2>
          <p>
            Explore experiments, discover what happens and learn by trying.
          </p>
        </div>
        <button onClick={onOpenLabs}>
          Visit Virtual Lab <ChevronRight size={18} />
        </button>
      </section>

      {/* Rewards */}
      <section className="explore-reward-banner">
        <div className="reward-icon">🎁</div>
        <div>
          <span>YOUR NEXT DISCOVERY AWAITS</span>
          <h3>Keep exploring. Keep earning stars!</h3>
          <p>Every mission you complete brings you one step further.</p>
        </div>
        <div className="reward-stars">⭐ ⭐ ⭐</div>
      </section>
    </motion.div>
  );
}

function ArrowRightFallback() {
  return <ChevronRight size={17} />;
}

export default ExplorePlay;