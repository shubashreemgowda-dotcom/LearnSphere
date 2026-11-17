
import { useState } from "react";
import {
  ArrowLeft,
  Atom,
  FlaskConical,
  Leaf,
  Calculator,
  Play,
  Sparkles,
  Clock,
  ChevronRight,
  Microscope,
  Activity
} from "lucide-react";

import "./VirtualLab.css";

const laboratories = [
  {
    id: "physics",
    name: "Physics",
    subtitle: "Discover the laws of motion and energy",
    icon: Activity,
    experiments: [
      {
        title: "Simple Pendulum",
        subtitle: "Explore oscillations and time period",
        level: "Beginner",
        duration: "15 min",
        objective: "Investigate how the length of a pendulum affects its time period."
      },
      {
        title: "Force & Motion",
        subtitle: "Discover Newton's laws",
        level: "Beginner",
        duration: "15 min",
        objective: "Explore how force and mass influence the motion of objects."
      }
    ]
  },
  {
    id: "chemistry",
    name: "Chemistry",
    subtitle: "Explore reactions and materials",
    icon: FlaskConical,
    experiments: [
      {
        title: "Acid–Base Indicators",
        subtitle: "Explore colour-changing indicators",
        level: "Beginner",
        duration: "15 min",
        objective: "Understand how indicators help identify acidic and basic solutions."
      },
      {
        title: "Separation of Mixtures",
        subtitle: "Discover separation techniques",
        level: "Beginner",
        duration: "15 min",
        objective: "Explore filtration, evaporation and other separation methods."
      }
    ]
  },
  {
    id: "biology",
    name: "Biology",
    subtitle: "Explore the world of living organisms",
    icon: Leaf,
    experiments: [
      {
        title: "Plant Cell Explorer",
        subtitle: "Discover the structure of a plant cell",
        level: "Beginner",
        duration: "15 min",
        objective: "Identify the major parts of a plant cell and understand their functions."
      },
      {
        title: "Photosynthesis Simulator",
        subtitle: "Explore how plants make food",
        level: "Beginner",
        duration: "15 min",
        objective: "Investigate how sunlight, water and carbon dioxide contribute to photosynthesis."
      }
    ]
  },
  {
    id: "mathematics",
    name: "Mathematics",
    subtitle: "Visualise mathematical concepts",
    icon: Calculator,
    experiments: [
      {
        title: "3D Geometry Explorer",
        subtitle: "Discover three-dimensional shapes",
        level: "Beginner",
        duration: "15 min",
        objective: "Explore the faces, edges and vertices of 3D geometric shapes."
      },
      {
        title: "Coordinate Geometry",
        subtitle: "Explore points on a coordinate plane",
        level: "Beginner",
        duration: "15 min",
        objective: "Understand coordinates and how points are represented on a graph."
      }
    ]
  }
];

export default function VirtualLab({ onBack }) {
  const [activeSubject, setActiveSubject] = useState("all");
  const [selectedExperiment, setSelectedExperiment] = useState(null);

  const visibleLabs =
    activeSubject === "all"
      ? laboratories
      : laboratories.filter((lab) => lab.id === activeSubject);

  return (
    <main className="virtual-lab">
      <header className="vl-header">
        <button className="vl-back-button" onClick={onBack}>
          <ArrowLeft size={17} />
          Back to dashboard
        </button>

        <div className="vl-brand">
          <span className="vl-brand-icon">
            <Atom size={22} />
          </span>
          LearnSphere Virtual Labs
        </div>
      </header>

      <section className="vl-hero">
        <div className="vl-eyebrow">
          <Sparkles size={15} />
          LEARN • EXPLORE • EXPERIMENT
        </div>

        <h1>Enter Your STEM Universe</h1>

        <p>
          Step into interactive laboratories, discover scientific concepts
          and learn by experimenting.
        </p>

        <div className="vl-stats">
          <div className="vl-stat">
            <strong>04</strong>
            <span>Laboratories</span>
          </div>
          <div className="vl-stat">
            <strong>08</strong>
            <span>Experiments</span>
          </div>
          <div className="vl-stat">
            <strong>3D</strong>
            <span>Learning environment</span>
          </div>
        </div>
      </section>

      <section>
        <div className="vl-section-heading">
          <div>
            <h2>Choose Your Laboratory</h2>
            <p>Select a subject and begin exploring.</p>
          </div>
        </div>

        <div className="vl-filters">
          {[
            { id: "all", label: "All Subjects" },
            { id: "physics", label: "Physics" },
            { id: "chemistry", label: "Chemistry" },
            { id: "biology", label: "Biology" },
            { id: "mathematics", label: "Mathematics" }
          ].map((filter) => (
            <button
              key={filter.id}
              className={`vl-filter ${
                activeSubject === filter.id ? "active" : ""
              }`}
              onClick={() => setActiveSubject(filter.id)}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <div className="vl-subject-grid">
          {visibleLabs.map((lab) => {
            const SubjectIcon = lab.icon;

            return (
              <article
                className={`vl-subject-card ${lab.id}`}
                key={lab.id}
              >
                <div className="vl-subject-top">
                  <div className="vl-subject-icon">
                    <SubjectIcon size={27} />
                  </div>

                  <div>
                    <h3>{lab.name}</h3>
                    <p>{lab.subtitle}</p>
                  </div>
                </div>

                <div className="vl-experiment-list">
                  {lab.experiments.map((experiment) => (
                    <button
                      className="vl-experiment-button"
                      key={experiment.title}
                      onClick={() => setSelectedExperiment(experiment)}
                    >
                      <div className="vl-experiment-info">
                        <div>
                          <strong>{experiment.title}</strong>
                          <small>{experiment.subtitle}</small>
                        </div>
                      </div>

                      <ChevronRight
                        className="vl-experiment-arrow"
                        size={19}
                      />
                    </button>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {selectedExperiment && (
        <div
          className="vl-modal-overlay"
          onClick={() => setSelectedExperiment(null)}
        >
          <section
            className="vl-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="vl-eyebrow">
              <Microscope size={15} />
              EXPERIMENT PREVIEW
            </div>

            <h2>{selectedExperiment.title}</h2>
            <p>{selectedExperiment.subtitle}</p>

            <div className="vl-modal-meta">
              <span>
                <Sparkles size={14} />
                {selectedExperiment.level}
              </span>
              <span>
                <Clock size={14} />
                {selectedExperiment.duration}
              </span>
            </div>

            <p>
              <strong>Learning objective:</strong>
              <br />
              {selectedExperiment.objective}
            </p>

            <p>
              The interactive experiment workspace is the next
              implementation step.
            </p>

            <button
              className="vl-modal-close"
              onClick={() => setSelectedExperiment(null)}
            >
              Close Preview
            </button>
          </section>
        </div>
      )}
    </main>
  );
}
