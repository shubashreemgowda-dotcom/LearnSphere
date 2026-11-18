
import { useState } from "react";
import {
  BarChart3, Brain, Trophy, Target, BookOpen,
  FlaskConical, Download, TrendingUp, GraduationCap,
  Users, Lightbulb, CheckCircle2, Clock, Star,
  Award, Sparkles
} from "lucide-react";
import "./PerformanceReport.css";

const demo = {
  completion: 86,
  missions: 18,
  totalMissions: 21,
  quiz: 92,
  lab: 88,
  subjects: [
    { name: "Mathematics", completed: 23, total: 25, score: 92 },
    { name: "Physics", completed: 22, total: 25, score: 88 },
    { name: "Biology", completed: 21, total: 25, score: 84 },
    { name: "Chemistry", completed: 20, total: 25, score: 80 }
  ],
  achievements: [
    { title: "Concept Explorer", detail: "Excellent concept understanding", icon: Brain },
    { title: "Virtual Lab Performer", detail: "Strong practical learning skills", icon: FlaskConical },
    { title: "Quiz Champion", detail: "Achieved 92% in assessments", icon: Trophy },
    { title: "Critical Thinker", detail: "Strong analytical problem solving", icon: Lightbulb }
  ]
};

export default function PerformanceReport({
  studentClass,
  selectedInterests = []
}) {
  const [view, setView] = useState("student");

  const recommendations = [
    "Continue advanced mathematics challenges to strengthen problem-solving skills.",
    "Explore more physics simulations to improve practical understanding.",
    "Try interdisciplinary projects connecting science and technology.",
    "Maintain consistent participation in quizzes and virtual laboratories."
  ];

  const handleDownload = () => window.print();

  return (
    <section className="performance-page">

      <div className="performance-header">
        <div>
          <span className="performance-eyebrow">
            LEARNSPHERE / PERFORMANCE INTELLIGENCE
          </span>
          <h1>Your Learning Report</h1>
          <p>A complete overview of learning progress, achievements and academic growth.</p>
        </div>

        <button className="report-download" onClick={handleDownload}>
          <Download size={17} /> Download PDF
        </button>
      </div>

      <div className="report-profile">
        <div className="report-avatar">
          <GraduationCap size={30} />
        </div>

        <div>
          <h2>LearnSphere Demo Student</h2>
          <p>
            Class {studentClass || "9"} ·
            {" "}{selectedInterests.join(", ") || "Science, Technology and Innovation"}
          </p>
        </div>

        <span className="report-live">JURY DEMO DATA</span>
      </div>

      <div className="report-disclaimer">
        <Sparkles size={20} />
        <div>
          <strong>Illustrative Jury Demonstration Report</strong>
          <p>
            This report contains sample values created to demonstrate
            LearnSphere's proposed performance analytics and reporting
            capabilities. These are not verified student assessment results.
          </p>
        </div>
      </div>

      <div className="report-tabs">
        {[
          ["student", "Student Report"],
          ["parent", "Parent Report"],
          ["teacher", "Teacher Report"]
        ].map(([key, label]) => (
          <button
            key={key}
            className={view === key ? "active" : ""}
            onClick={() => setView(key)}
          >
            {key === "student" ? <GraduationCap size={16} /> :
             key === "parent" ? <Users size={16} /> :
             <BookOpen size={16} />}
            {label}
          </button>
        ))}
      </div>

      <div className="report-section-title">
        <div>
          <span>01 / LEARNING OVERVIEW</span>
          <h2>
            {view === "student" ? "Your achievements" :
             view === "parent" ? "Student growth and progress" :
             "Academic performance analysis"}
          </h2>
        </div>
        <BarChart3 size={25} />
      </div>

      <div className="report-stats">

        <article className="report-stat purple">
          <div className="report-stat-icon"><Target /></div>
          <span>Learning completion</span>
          <strong>{demo.completion}%</strong>
          <small>Overall learning progress</small>
        </article>

        <article className="report-stat blue">
          <div className="report-stat-icon"><CheckCircle2 /></div>
          <span>Missions completed</span>
          <strong>{demo.missions}/{demo.totalMissions}</strong>
          <small>Learning missions achieved</small>
        </article>

        <article className="report-stat pink">
          <div className="report-stat-icon"><Trophy /></div>
          <span>Quiz performance</span>
          <strong>{demo.quiz}%</strong>
          <small>Illustrative assessment score</small>
        </article>

        <article className="report-stat green">
          <div className="report-stat-icon"><FlaskConical /></div>
          <span>Lab performance</span>
          <strong>{demo.lab}%</strong>
          <small>Illustrative practical score</small>
        </article>

      </div>

      <div className="report-grid">

        <article className="report-panel">
          <div className="report-panel-heading">
            <div><BarChart3 /><h3>Subject-wise performance</h3></div>
            <span>SCORES</span>
          </div>

          {demo.subjects.map(subject => (
            <div className="subject-progress" key={subject.name}>
              <div className="subject-progress-label">
                <strong>{subject.name}</strong>
                <span>{subject.score}%</span>
              </div>

              <div className="progress-track">
                <div style={{ width: `${subject.score}%` }} />
              </div>

              <small>
                {subject.completed}/{subject.total} learning activities
              </small>
            </div>
          ))}
        </article>

        <article className="report-panel">
          <div className="report-panel-heading">
            <div><Brain /><h3>Learning insights</h3></div>
          </div>

          <div className="insight-card">
            <TrendingUp />
            <div>
              <strong>Strong academic progress</strong>
              <p>
                The demonstration learner has achieved 86% overall
                learning completion across the learning journey.
              </p>
            </div>
          </div>

          <div className="insight-card">
            <Target />
            <div>
              <strong>Assessment performance</strong>
              <p>
                The sample quiz score is 92%, indicating strong
                conceptual understanding in this demonstration.
              </p>
            </div>
          </div>

          <div className="insight-card">
            <Clock />
            <div>
              <strong>Learning consistency</strong>
              <p>
                18 out of 21 sample learning missions have been completed.
              </p>
            </div>
          </div>
        </article>

      </div>

      <div className="report-grid">

        <article className="report-panel">
          <div className="report-panel-heading">
            <div><Trophy /><h3>Achievements and badges</h3></div>
          </div>

          {demo.achievements.map((achievement, index) => {
            const Icon = achievement.icon;

            return (
              <div className="achievement-display" key={achievement.title}>
                <div className="achievement-icon">
                  <Icon size={25} />
                </div>
                <div>
                  <strong>{achievement.title}</strong>
                  <p>{achievement.detail}</p>
                </div>
                <Star size={17} />
              </div>
            );
          })}
        </article>

        <article className="report-panel">
          <div className="report-panel-heading">
            <div><Lightbulb /><h3>Personalized recommendations</h3></div>
          </div>

          {recommendations.map((item, index) => (
            <div className="recommendation" key={index}>
              <CheckCircle2 size={17} />
              {item}
            </div>
          ))}
        </article>

      </div>

      <article className="report-panel">
        <div className="report-panel-heading">
          <div><Award /><h3>Learning journey summary</h3></div>
        </div>

        <p>
          LearnSphere combines concept-based lessons, interactive
          activities, virtual experiments and assessments to create
          an engaging learning experience.
        </p>

        <div className="report-stats">
          <div className="report-stat blue">
            <span>Subjects covered</span>
            <strong>4</strong>
            <small>Core STEM subjects</small>
          </div>

          <div className="report-stat purple">
            <span>Learning activities</span>
            <strong>100</strong>
            <small>Illustrative activity set</small>
          </div>

          <div className="report-stat green">
            <span>Learning modules</span>
            <strong>12</strong>
            <small>Platform learning modules</small>
          </div>

          <div className="report-stat pink">
            <span>Learning approach</span>
            <strong>3D</strong>
            <small>Immersive learning</small>
          </div>
        </div>
      </article>

      <div className="report-disclaimer">
        <Brain size={20} />
        <div>
          <strong>About this report</strong>
          <p>
            All performance percentages, subject scores, completed
            activities and achievements in this jury demonstration
            are illustrative sample data. Live student analytics,
            verified quiz scores and experiment results will be
            populated through actual platform activity tracking.
          </p>
        </div>
      </div>

      <div className="report-footer">
        <span>LEARNSPHERE · LEARNING INTELLIGENCE</span>
        <span>Personalized learning · Continuous growth</span>
      </div>

    </section>
  );
}
