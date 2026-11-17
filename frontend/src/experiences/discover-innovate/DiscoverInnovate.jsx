
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Atom,
  Brain,
  Target,
  FlaskConical,
  ChartNoAxesCombined,
  Lightbulb,
  Rocket,
  ChevronRight,
  BookOpen,
  Telescope,
} from "lucide-react";
import "./DiscoverInnovate.css";

export default function DiscoverInnovate({
  studentClass,
  selectedInterests,
  learningPath,
  onOpenLesson,
  onOpenLabs,
  completed = [],
}) {
  const [hypothesis, setHypothesis] = useState("");
  const [prediction, setPrediction] = useState(50);

  const emoji = {
    Football: "⚽",
    Drawing: "🎨",
    Gardening: "🌱",
    Gaming: "🎮",
    Space: "🚀",
    Music: "🎵",
    Building: "🏗️",
    Animals: "🐾",
  };

  return (
    <main className="discover-innovate">
      <header className="innovate-header">
        <div>
          <span className="innovate-kicker">
            DISCOVER • INVESTIGATE • INNOVATE
          </span>
          <h1>Think beyond the textbook.</h1>
          <p>Class {studentClass} · Your scientific exploration workspace</p>
        </div>
        <div className="innovate-orbit">🔬</div>
      </header>

      <section className="innovate-profile">
        <div>
          <span>YOUR SELECTED INTERESTS</span>
          <div className="innovate-interests">
            {selectedInterests.map((interest) => (
              <span key={interest}>
                {emoji[interest] || "✨"} {interest}
              </span>
            ))}
          </div>
        </div>
        <div className="innovate-level">
          <Brain size={22} />
          <div>
            <strong>INNOVATOR</strong>
            <small>Classes 9–10</small>
          </div>
        </div>
      </section>

      <section className="innovate-overview">
        <article>
          <BookOpen size={23} />
          <span>STEM PATHWAYS</span>
          <strong>{learningPath.length}</strong>
        </article>
        <article>
          <Target size={23} />
          <span>EXPLORED</span>
          <strong>{completed.length}</strong>
        </article>
        <article>
          <FlaskConical size={23} />
          <span>LAB ACCESS</span>
          <strong>Open</strong>
        </article>
      </section>

      <section className="innovate-section">
        <div className="innovate-section-heading">
          <div>
            <span>PERSONALISED KNOWLEDGE MAP</span>
            <h2>Explore your STEM pathways</h2>
          </div>
          <ChartNoAxesCombined size={28} />
        </div>

        <div className="innovate-pathways">
          {learningPath.map((item, index) => {
            const Icon = item.icon;
            const done = completed.includes(
              `${selectedInterests[0]}-${index}`
            );

            return (
              <motion.article
                key={`${item.subject}-${index}`}
                className="innovate-path-card"
                whileHover={{ y: -5 }}
              >
                <div className="innovate-card-heading">
                  <Icon size={27} />
                  <span>{item.subject}</span>
                  <small>
                    {done ? "EXPLORED" : `PATHWAY 0${index + 1}`}
                  </small>
                </div>

                <h3>{item.topic}</h3>
                <p>{item.detail}</p>

                <div className="innovate-mission">
                  <Lightbulb size={19} />
                  <span>{item.mission}</span>
                </div>

                <button onClick={() => onOpenLesson(index)}>
                  Investigate concept
                  <ChevronRight size={17} />
                </button>
              </motion.article>
            );
          })}
        </div>
      </section>

      <section className="hypothesis-panel">
        <div className="hypothesis-heading">
          <Telescope size={27} />
          <div>
            <span>SCIENTIFIC THINKING STUDIO</span>
            <h2>Make a hypothesis</h2>
          </div>
        </div>

        <p>Start an investigation by writing your prediction.</p>

        <textarea
          value={hypothesis}
          onChange={(event) => setHypothesis(event.target.value)}
          placeholder="I predict that..."
          rows={3}
        />

        <label>
          Explore a variable <strong>{prediction}%</strong>
        </label>

        <input
          type="range"
          min="0"
          max="100"
          value={prediction}
          onChange={(event) => setPrediction(Number(event.target.value))}
        />

        <p className="hypothesis-note">
          This is a scientific thinking activity, not a measured experiment result.
        </p>
      </section>

      <section className="innovate-lab">
        <div>
          <span>VIRTUAL EXPERIMENT ENVIRONMENT</span>
          <h2>Enter the Virtual Lab</h2>
          <p>Investigate scientific concepts through interactive experiments.</p>
        </div>
        <button onClick={onOpenLabs}>
          Open Laboratory <Rocket size={18} />
        </button>
      </section>

      <footer className="innovate-footer">
        <Atom size={19} />
        Think critically. Test ideas. Create impact.
      </footer>
    </main>
  );
}
