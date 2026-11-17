
import { useState } from "react";
import { RotateCcw, Play, Pause, Sparkles } from "lucide-react";
import "./InterestAnimation.css";

const interestScenes = {
  Football: {
    emoji: "\u26BD",
    name: "Football field",
    animation: "ball",
    action: "A player kicks the football.",
    result: "The applied force makes the stationary ball move."
  },
  Drawing: {
  emoji: "✏️",
    name: "Creative studio",
    animation: "pencil",
    action: "Your pencil moves across the paper.",
    result: "Your hand applies force to move the pencil."
  },
  Gardening: {
    emoji: "\u{1F331}",
    name: "Garden world",
    animation: "seed",
    action: "A seed begins to grow.",
    result: "A growing plant changes its position and shape over time."
  },
  Gaming: {
    emoji: "\u{1F3AE}",
    name: "Gaming arena",
    animation: "gamer",
    action: "Your game character jumps forward.",
    result: "The character changes its position through motion."
  },
  Space: {
    emoji: "\u{1F680}",
    name: "Space explorer",
    animation: "rocket",
    action: "A rocket engine produces thrust.",
    result: "The thrust force propels the rocket forward."
  },
  Music: {
    emoji: "\u{1F3B5}",
    name: "Music studio",
    animation: "note",
    action: "A musical string vibrates.",
    result: "A force makes the string move repeatedly."
  },
  Building: {
    emoji: "\u{1F9F1}",
    name: "Construction zone",
    animation: "block",
    action: "A construction block is pushed.",
    result: "The applied force changes the block's motion."
  },
  Animals: {
    emoji: "\u{1F43E}",
    name: "Animal kingdom",
    animation: "paw",
    action: "An animal takes a step forward.",
    result: "Muscle forces help the animal move."
  }
};

const chapterMessages = [
  "Discover how a push or pull can make objects move.",
  "See how force can change speed, direction and shape.",
  "Explore different ways objects move.",
  "Discover how speed and friction affect movement.",
  "Compare balanced and unbalanced forces.",
  "Explore how forces affect the motion of objects.",
  "Discover how gravity influences falling objects.",
  "Explore work, energy and simple machines."
];

export default function InterestAnimation({
  chapterIndex = 0,
  selectedInterests = [],
  example = ""
}) {
  const [chosenInterest, setChosenInterest] = useState(
    selectedInterests[0] || "Space"
  );
  const [isPlaying, setIsPlaying] = useState(true);
  const [replayKey, setReplayKey] = useState(0);

  const activeInterest = selectedInterests.includes(chosenInterest)
    ? chosenInterest
    : selectedInterests[0] || "Space";

  const scene = interestScenes[activeInterest] || interestScenes.Space;

  function replayAnimation() {
    setIsPlaying(true);
    setReplayKey((previous) => previous + 1);
  }

  return (
    <section className="interest-animation-card">
      <div className="interest-animation-heading">
        <div>
          <span className="interest-animation-label">
            <Sparkles size={14} /> LEARN THROUGH YOUR INTEREST
          </span>
          <h3>Your STEM animation</h3>
          <p>{chapterMessages[chapterIndex] || chapterMessages[0]}</p>
        </div>
      </div>

      {selectedInterests.length > 1 && (
        <div className="interest-animation-choices">
          <span>Choose your world:</span>
          {selectedInterests.map((interest) => (
            <button
              key={interest}
              className={
                activeInterest === interest ? "active" : ""
              }
              onClick={() => {
                setChosenInterest(interest);
                replayAnimation();
              }}
            >
              {interestScenes[interest]?.emoji} {interest}
            </button>
          ))}
        </div>
      )}

      <div
        className={`interest-animation-scene ${isPlaying ? "is-playing" : "is-paused"}`}
        key={`${activeInterest}-${chapterIndex}-${replayKey}`}
      >
        <div className="interest-scene-sun" />
        <div className="interest-scene-cloud cloud-one" />
        <div className="interest-scene-cloud cloud-two" />

        <div className="interest-scene-title">
          {scene.name}
        </div>

        <div className={`interest-animated-object ${scene.animation}`}>
          {scene.emoji}
        </div>

        <div className="interest-scene-ground">
          <span />
        </div>

        <div className="interest-scene-caption">
          {scene.action}
        </div>
      </div>

      <div className="interest-animation-controls">
        <span>{isPlaying ? "Animation playing" : "Animation paused"}</span>

        <div>
          <button onClick={() => setIsPlaying(!isPlaying)}>
            {isPlaying ? <Pause size={17} /> : <Play size={17} />}
            {isPlaying ? "Pause" : "Play"}
          </button>

          <button onClick={replayAnimation}>
            <RotateCcw size={16} /> Replay
          </button>
        </div>
      </div>

      <div className="interest-animation-explanation">
        <span>💡</span>
        <div>
          <strong>What is happening?</strong>
          <p>{example || scene.result}</p>
          <small>{scene.result}</small>
        </div>
      </div>
    </section>
  );
}
