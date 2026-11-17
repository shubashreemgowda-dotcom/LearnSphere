
import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft, Atom, BookOpen, CheckCircle2, ChevronRight,
  Lightbulb, RotateCcw, Star, Target, Trophy, Sparkles,
  Lock, Award, Zap, Brain
} from "lucide-react";
import "./PhysicsLessons.css";
import InterestAnimation from "./InterestAnimation";
import LessonVideo from "./LessonVideo";

const interestDetails = {
  Football: { emoji: "⚽" },
  Drawing: { emoji: "🎨" },
  Gardening: { emoji: "🌱" },
  Gaming: { emoji: "🎮" },
  Space: { emoji: "🚀" },
  Music: { emoji: "🎵" },
  Building: { emoji: "🏗️" },
  Animals: { emoji: "🐾" }
};

const lessons = [
  {
    title: "What is Force?",
    subtitle: "Discover the push and pull around you",
    icon: "🧲",
    class6: "A force is a push or a pull. We use forces when opening doors, kicking balls and moving objects.",
    class7: "Force is an interaction that can change an object's state of rest or motion, direction or shape.",
    class8: "Force is a physical interaction that can change an object's velocity or deform it. Its SI unit is the newton (N).",
    concept: "A force is a push or a pull acting on an object. It can make an object move, stop, change direction or change shape.",
    contexts: {
      Football: "When you kick a stationary football, your foot applies a force that makes the ball move.",
      Drawing: "When you press a pencil against paper, your hand applies a force.",
      Gardening: "When you push a spade into soil, you apply force to move the soil.",
      Gaming: "A game character pushing an object applies force that can move it.",
      Space: "A rocket engine produces thrust, a force that helps propel the rocket forward.",
      Music: "When you pluck a guitar string, your finger applies force and makes it vibrate.",
      Building: "Pushing a construction block applies force that can move it.",
      Animals: "An animal's muscles apply forces that help it walk, jump and move."
    },
    mission: "Find one example of a push and one example of a pull connected to your interests."
  },
  {
    title: "Effects of Force",
    subtitle: "Discover what a force can change",
    icon: "⚡",
    class6: "A force can move an object, stop it, change its direction or change its shape.",
    class7: "A force can change an object's speed, direction and shape. It can also start or stop motion.",
    class8: "An unbalanced force can change an object's state of motion. Applied forces can also produce deformation.",
    concept: "A force can start or stop motion, increase or decrease speed, change direction, and change shape.",
    contexts: {
      Football: "A goalkeeper applies force to stop a moving football.",
      Drawing: "Pressing modelling clay with your fingers applies force and changes its shape.",
      Gardening: "Pulling a weed applies force that moves the plant from the soil.",
      Gaming: "When two objects collide in a game, their speeds or directions may change.",
      Space: "Gravity changes the motion of planets and satellites.",
      Music: "Striking a drum applies force to its membrane, making it vibrate.",
      Building: "A force can compress a spring or slightly deform a material.",
      Animals: "When an animal lands after jumping, forces change its motion."
    },
    mission: "Identify an example where force changes speed, direction or shape."
  },
  {
    title: "Types of Motion",
    subtitle: "Explore how objects move",
    icon: "🚀",
    class6: "Motion means a change in an object's position over time.",
    class7: "Objects can show different types of motion, including straight-line, circular and periodic motion.",
    class8: "Motion can be classified by its path and repetition, such as rectilinear, circular, rotational and oscillatory motion.",
    concept: "Motion is the change in position of an object with time. Different objects follow different paths.",
    contexts: {
      Football: "A football travelling across the field changes its position over time.",
      Drawing: "Moving a pencil across paper creates a line.",
      Gardening: "A wheelbarrow moving along a garden path shows motion.",
      Gaming: "A game character moving across a screen demonstrates motion.",
      Space: "Planets move around the Sun in orbital paths.",
      Music: "A plucked guitar string moves repeatedly to and fro.",
      Building: "A construction crane moves materials from one position to another.",
      Animals: "A bird flying and a cheetah running are examples of motion."
    },
    mission: "Find two moving objects around you and identify how they move."
  },
  {
    title: "Speed and Friction",
    subtitle: "Understand how movement changes",
    icon: "🏎️",
    class6: "Speed tells us how fast an object moves. Friction is a force that opposes motion between surfaces in contact.",
    class7: "Average speed is the total distance travelled divided by the total time taken. Friction opposes relative motion between surfaces.",
    class8: "Average speed = Total distance ÷ Total time. Friction acts opposite to relative motion between surfaces in contact.",
    concept: "Speed describes distance travelled per unit time. Friction opposes relative motion between surfaces in contact.",
    contexts: {
      Football: "Football studs help provide grip through friction between shoes and the ground.",
      Drawing: "The pencil tip experiences friction as it moves across paper.",
      Gardening: "Friction between gardening tools and materials affects how easily they slide.",
      Gaming: "Racing games often simulate friction to show how vehicles grip or slide.",
      Space: "A satellite experiences very little air resistance in the near-vacuum of space.",
      Music: "A violin bow rubs against its strings. Friction helps produce vibrations and sound.",
      Building: "Friction between surfaces helps provide grip and affects how materials slide.",
      Animals: "An animal's paws interact with the ground. Friction helps provide grip."
    },
    mission: "Calculate the average speed of an object and find an example of friction in your interest area."
  },
  {
    title: "Balanced and Unbalanced Forces",
    subtitle: "Discover why objects start and stop moving",
    icon: "⚖️",
    class6: "When forces on an object are balanced, they cancel each other. Unbalanced forces can change its motion.",
    class7: "Balanced forces have zero resultant force. Unbalanced forces produce a non-zero resultant force.",
    class8: "The resultant force determines whether an object's velocity changes. Balanced forces produce zero net force.",
    concept: "Balanced forces cancel out. Unbalanced forces produce a net force that can change an object's motion.",
    contexts: {
      Football: "When two players push a stationary ball with equal opposing forces, the forces may balance.",
      Drawing: "A book resting on a table has balanced downward weight and upward support force.",
      Gardening: "A stationary garden cart can have balanced forces when the push and resistance cancel.",
      Gaming: "A game object may remain still when opposing forces are equal.",
      Space: "An object can continue moving at constant velocity when its net force is zero.",
      Music: "A musical instrument resting on a stand experiences balanced forces.",
      Building: "A structure must safely distribute loads and supporting forces.",
      Animals: "An animal standing still experiences forces that balance overall."
    },
    mission: "Find one example of balanced forces and one example of unbalanced forces."
  },
  {
    title: "Newton's Laws of Motion",
    subtitle: "Explore the rules behind movement",
    icon: "🍎",
    class6: "Newton's laws explain how forces affect the movement of objects.",
    class7: "The three laws describe inertia, the relationship between force and acceleration, and action-reaction pairs.",
    class8: "Newton's laws include inertia, F = ma, and action-reaction pairs. They form the foundation of classical mechanics.",
    concept: "Newton's three laws explain inertia, acceleration due to net force, and equal and opposite interaction forces.",
    contexts: {
      Football: "A football remains still until a player kicks it. The kick changes its motion.",
      Drawing: "A pencil stays still on a desk until a force moves it.",
      Gardening: "A loaded garden cart needs more force to accelerate than an empty cart of the same design.",
      Gaming: "A racing game's acceleration model can demonstrate how greater net force changes motion.",
      Space: "A spacecraft moves forward when its engines push exhaust gases backward.",
      Music: "When a drummer strikes a drum, the drum also exerts a force back on the stick.",
      Building: "A heavier construction trolley needs more net force for the same acceleration.",
      Animals: "A bird pushes air backward with its wings and gains forward motion."
    },
    mission: "Identify one everyday example of each of Newton's three laws."
  },
  {
    title: "Gravity and Falling Objects",
    subtitle: "Understand the force that keeps us grounded",
    icon: "🌍",
    class6: "Gravity is a force that attracts objects towards one another. Earth's gravity pulls objects towards its centre.",
    class7: "Gravity is an attractive force between objects with mass. It gives objects weight near Earth's surface.",
    class8: "The gravitational force depends on the masses of objects and the distance between their centres.",
    concept: "Gravity is an attractive force between masses. Near Earth, it gives objects weight and influences falling motion.",
    contexts: {
      Football: "When a football is kicked upward, gravity pulls it back towards the ground.",
      Drawing: "A dropped pencil falls towards Earth because of gravity.",
      Gardening: "Water falls from a watering can towards the ground due to gravity.",
      Gaming: "A platform game uses simulated gravity to make characters fall and jump.",
      Space: "Gravity helps keep planets in orbit around the Sun.",
      Music: "A hanging musical instrument has weight because of Earth's gravity.",
      Building: "Engineers consider the weight of building materials when designing structures.",
      Animals: "An animal jumping into the air returns towards the ground due to gravity."
    },
    mission: "Observe a falling object and explain how gravity affects its movement."
  },
  {
    title: "Work, Energy and Simple Machines",
    subtitle: "Discover how forces help us do useful work",
    icon: "⚙️",
    class6: "Work is done when a force moves an object. Energy helps us perform activities and make changes.",
    class7: "In physics, work is done when a force produces displacement. Energy is the ability to do work.",
    class8: "Work = Force × displacement in the direction of force. Simple machines can change the magnitude or direction of a force.",
    concept: "Work involves force and displacement. Energy is the ability to do work. Simple machines make tasks easier.",
    contexts: {
      Football: "Kicking a football applies force and moves it through a distance.",
      Drawing: "Moving a pencil across paper involves applying force while producing displacement.",
      Gardening: "A spade acts as a simple tool that helps move soil.",
      Gaming: "A game character using a lever to lift an object demonstrates a simple machine.",
      Space: "Solar panels convert light energy into electrical energy for spacecraft.",
      Music: "A drumstick transfers energy to a drum membrane when it is struck.",
      Building: "Pulleys help lift building materials by changing the direction of an applied force.",
      Animals: "Animals use chemical energy from food to move and perform work."
    },
    mission: "Find a simple machine around you and explain how it makes a task easier."
  }
];

// Five questions per chapter.
const questionBank = [
  [
    ["What is a force?", ["A push or a pull", "Only a sound", "A type of colour", "A measurement of time"], 0, "Think about what you do when you move or pull an object.", "A force is an interaction that acts as a push or a pull."],
    ["Which unit measures force?", ["Metre", "Newton", "Second", "Kilogram"], 1, "The unit is named after a famous scientist.", "Force is measured in newtons (N)."],
    ["A student pushes a stationary trolley. What is applied?", ["A force", "A temperature", "A sound wave", "A light ray"], 0, "A push is one way of applying an interaction.", "Pushing the trolley applies a force that can make it move."],
    ["Which example shows a pulling force?", ["Kicking a ball", "Opening a drawer towards you", "Pressing a button", "Pushing a chair"], 1, "Think about bringing an object towards you.", "Opening a drawer towards you involves pulling it."],
    ["Rocket thrust is a type of...", ["Force", "Mass", "Volume", "Temperature"], 0, "Thrust helps change a rocket's motion.", "Thrust is a force produced by the rocket engine."]
  ],
  [
    ["Which is an effect of force?", ["Change an object's shape", "Change its history", "Remove its mass", "Make it invisible"], 0, "Think about pressing a soft object.", "A force can deform an object and change its shape."],
    ["A goalkeeper stops a moving ball. What changes?", ["Its motion", "Its chemical identity", "Its colour", "Its material"], 0, "The ball was moving and then came to rest.", "The applied force changes the ball's state of motion."],
    ["A moving object changes direction after being hit. What caused it?", ["A force", "Its colour", "Its name", "Its temperature alone"], 0, "An interaction can alter direction.", "A force can change the direction of motion."],
    ["Which action can reduce speed?", ["Force opposite to motion", "Changing its name", "Changing its colour", "Looking at it"], 0, "Think about what slows a moving object.", "A force opposite to motion can reduce speed."],
    ["When clay is pressed, what can happen?", ["Its shape changes", "Its mass disappears", "It becomes light", "It stops occupying space"], 0, "Soft materials can be deformed.", "Pressing clay applies force and changes its shape."]
  ],
  [
    ["What does motion mean?", ["Change in position with time", "Change in colour", "Increase in mass", "Change in temperature"], 0, "Compare an object's position at two different times.", "Motion is a change in position over time."],
    ["A playground swing moves to and fro. This is...", ["Oscillatory motion", "Rectilinear motion", "No motion", "Random motion"], 0, "Look for repeated movement around a middle position.", "A swing repeatedly moves to and fro."],
    ["The blades of a rotating fan show...", ["Rotational motion", "Rectilinear motion", "No motion", "Oscillatory motion"], 0, "The blades turn around a fixed axis.", "Fan blades rotate around an axis."],
    ["A car moving along a straight road shows...", ["Rectilinear motion", "Oscillatory motion", "Rotational motion", "No motion"], 0, "Rectilinear motion follows a straight path.", "A straight path is rectilinear motion."],
    ["Which is an example of circular motion?", ["A point on a turning wheel", "A book on a shelf", "A parked car", "A stationary tree"], 0, "Think about a point travelling around a centre.", "A point on a rotating wheel follows a circular path."]
  ],
  [
    ["What is the formula for average speed?", ["Distance ÷ Time", "Time ÷ Distance", "Distance × Time", "Distance + Time"], 0, "Speed describes distance travelled per unit time.", "Average speed is total distance divided by total time."],
    ["A student travels 20 metres in 4 seconds. What is the average speed?", ["4 m/s", "5 m/s", "16 m/s", "24 m/s"], 1, "Divide the distance by the time.", "20 ÷ 4 = 5 m/s."],
    ["What does friction generally oppose?", ["Relative motion between surfaces in contact", "Colour", "Time", "Mass"], 0, "Think about two surfaces sliding against each other.", "Friction opposes relative motion between contacting surfaces."],
    ["Why do shoes have patterned soles?", ["To improve grip", "To remove gravity", "To increase mass", "To produce light"], 0, "Think about walking without slipping.", "Sole patterns help improve grip through friction."],
    ["A bicycle travels 30 metres in 10 seconds. Its average speed is...", ["2 m/s", "3 m/s", "10 m/s", "300 m/s"], 1, "Use distance divided by time.", "30 ÷ 10 = 3 m/s."]
  ],
  [
    ["What are balanced forces?", ["Forces that cancel each other", "Forces that always increase speed", "Forces that remove mass", "Forces that create light"], 0, "Think about equal forces acting in opposite directions.", "Balanced forces have zero resultant force."],
    ["What is the resultant force when equal opposite forces act?", ["Zero", "One newton always", "Double the force", "Infinite"], 0, "Equal opposite forces cancel.", "The net force is zero."],
    ["An object at rest has balanced forces. What happens if the forces remain balanced?", ["It remains at rest", "It must accelerate", "It disappears", "Its mass changes"], 0, "Zero net force means no change in velocity.", "An object at rest remains at rest if the net force stays zero."],
    ["An unbalanced force can change an object's...", ["Velocity", "Name", "Colour only", "Identity"], 0, "Think about what a net force does to motion.", "An unbalanced force can cause acceleration."],
    ["A book rests on a table. Which forces balance?", ["Weight and support force", "Sound and light", "Heat and colour", "Mass and volume"], 0, "The table supports the book against its weight.", "The upward support force balances the downward weight."]
  ],
  [
    ["Who formulated the three laws of motion?", ["Isaac Newton", "Albert Einstein", "Galileo only", "Marie Curie"], 0, "Think of the scientist associated with classical mechanics.", "Isaac Newton formulated the three laws of motion."],
    ["Newton's first law is also called the law of...", ["Inertia", "Gravity only", "Energy", "Sound"], 0, "It describes resistance to a change in motion.", "The first law is the law of inertia."],
    ["Which equation represents Newton's second law?", ["F = ma", "F = m + a", "F = m ÷ a", "F = a ÷ m"], 0, "Force is mass multiplied by acceleration.", "Newton's second law is commonly written as F = ma."],
    ["Action and reaction forces are...", ["Equal and opposite", "Always in the same direction", "Unequal in every case", "Both zero"], 0, "Think about Newton's third law.", "Interaction forces are equal in magnitude and opposite in direction."],
    ["A spacecraft pushes exhaust gases backward. What happens?", ["The spacecraft gains forward thrust", "Gravity disappears", "Its mass becomes zero", "It stops existing"], 0, "Consider the reaction to the backward push.", "The exhaust gases push the spacecraft forward."]
  ],
  [
    ["What is gravity?", ["An attractive force between masses", "A type of sound", "A form of colour", "A measurement of time"], 0, "It is the force that pulls objects towards Earth.", "Gravity is an attractive force between masses."],
    ["Why does a dropped object fall towards Earth?", ["Earth's gravity", "Its colour", "Its shape only", "Sound waves"], 0, "Think about the attractive force of Earth.", "Earth's gravity attracts the object towards its centre."],
    ["What is the weight of an object?", ["The gravitational force acting on it", "Its colour", "Its volume", "Its temperature"], 0, "Weight is a force.", "Weight is the gravitational force acting on an object."],
    ["Which force helps keep planets in orbit around the Sun?", ["Gravity", "Friction from roads", "Magnetic force only", "Sound"], 0, "Think about the attraction between the Sun and planets.", "Gravity helps keep planets in orbit."],
    ["If an object's mass increases, its weight near Earth generally...", ["Increases", "Becomes zero", "Always stays the same", "Changes into volume"], 0, "Weight depends on mass and gravitational field strength.", "For the same gravitational field, greater mass means greater weight."]
  ],
  [
    ["When is work done in physics?", ["When force causes displacement", "When an object only changes colour", "When time passes", "When an object is named"], 0, "Think about force moving an object.", "Work is done when a force produces displacement."],
    ["What is the ability to do work called?", ["Energy", "Density", "Volume", "Temperature"], 0, "It is needed for movement and other changes.", "Energy is the ability to do work."],
    ["Which simple machine is commonly used to lift loads?", ["Pulley", "Thermometer", "Compass", "Stopwatch"], 0, "It uses a wheel and rope.", "A pulley can help lift loads and change the direction of force."],
    ["What is the formula for work when force and displacement are in the same direction?", ["Force × displacement", "Force ÷ time", "Mass × time", "Distance ÷ speed"], 0, "Multiply the applied force by the displacement.", "Work = Force × displacement in the direction of force."],
    ["Solar panels convert sunlight into...", ["Electrical energy", "Sound only", "Friction", "Mass"], 0, "They use light to produce electricity.", "Solar panels convert light energy into electrical energy."]
  ]
];

function makeQuestions(bank) {
  return bank.map(([question, options, answer, hint, explanation]) => ({
    question, options, answer, hint, explanation
  }));
}

const allQuestionSets = questionBank.map(makeQuestions);

// Ten-question final challenge, with coverage from all eight chapters.
const masterQuestions = [
  allQuestionSets[0][0],
  allQuestionSets[1][1],
  allQuestionSets[2][1],
  allQuestionSets[3][0],
  allQuestionSets[4][0],
  allQuestionSets[5][2],
  allQuestionSets[6][0],
  allQuestionSets[7][0],
  allQuestionSets[5][3],
  allQuestionSets[7][2]
];

function getSavedProgress(key) {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
}

export default function PhysicsLessons({
  topic = "Force & Motion",
  studentClass = "6",
  selectedInterests = [],
  onBack
}) {
  const storageKey = `learnsphere-physics-${studentClass}-${topic}`;
  const [saved] = useState(() => getSavedProgress(storageKey));

  const [activeIndex, setActiveIndex] = useState(0);
  const [completed, setCompleted] = useState(saved?.completed || []);
  const [xp, setXp] = useState(saved?.xp || 0);
  const [scores, setScores] = useState(saved?.scores || {});
  const [perfectLessons, setPerfectLessons] = useState(saved?.perfectLessons || []);
  const [badges, setBadges] = useState(saved?.badges || []);

  const [quizMode, setQuizMode] = useState("lesson");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [checked, setChecked] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [hintOpen, setHintOpen] = useState(false);
  const [missionAnswers, setMissionAnswers] = useState(() => {
  try {
    return JSON.parse(localStorage.getItem(`${storageKey}-missions`)) || {};
  } catch {
    return {};
  }
});

const [missionSubmitted, setMissionSubmitted] = useState({});
  const [quizFinished, setQuizFinished] = useState(false);
  const [quizPassed, setQuizPassed] = useState(false);
  const [earnedThisQuiz, setEarnedThisQuiz] = useState(0);

  const lesson = lessons[activeIndex];
  const classNumber = Number(studentClass) || 6;

  const explanation =
    classNumber <= 6 ? lesson.class6 :
    classNumber === 7 ? lesson.class7 :
    lesson.class8;

  const personalisedConnections = selectedInterests
    .filter((interest) => lesson.contexts[interest])
    .map((interest) => ({
      name: interest,
      emoji: interestDetails[interest]?.emoji || "✨",
      example: lesson.contexts[interest]
    }));

  const currentQuestions =
    quizMode === "master" ? masterQuestions : allQuestionSets[activeIndex];

  const currentQuestion = currentQuestions[questionIndex];
  const isCorrect = selectedAnswer === currentQuestion?.answer;

  const progress = Math.round((completed.length / lessons.length) * 100);
  const masterComplete = badges.includes("physics-champion");
  const lessonBadgeCount = lessons.filter((_, index) =>
    badges.includes(`lesson-${index}`)
  ).length;

  function persist(nextCompleted, nextXp, nextScores, nextPerfect, nextBadges) {
    const data = {
      completed: nextCompleted,
      xp: nextXp,
      scores: nextScores,
      perfectLessons: nextPerfect,
      badges: nextBadges
    };

    try {
      localStorage.setItem(storageKey, JSON.stringify(data));
    } catch {
      // The learning session continues if browser storage is unavailable.
    }
  }

  function saveProgress(nextCompleted, nextXp, nextScores, nextPerfect, nextBadges) {
    setCompleted(nextCompleted);
    setXp(nextXp);
    setScores(nextScores);
    setPerfectLessons(nextPerfect);
    setBadges(nextBadges);
    persist(nextCompleted, nextXp, nextScores, nextPerfect, nextBadges);
  }

  function startQuiz(mode = "lesson") {
    setQuizMode(mode);
    setQuestionIndex(0);
    setSelectedAnswer(null);
    setChecked(false);
    setCorrectCount(0);
    setHintOpen(false);
    setQuizFinished(false);
    setQuizPassed(false);
    setEarnedThisQuiz(0);
  }

  function checkAnswer() {
    if (selectedAnswer === null || checked) return;

    setChecked(true);

    if (isCorrect) {
      setCorrectCount((previous) => previous + 1);
      setEarnedThisQuiz((previous) => previous + 10);
    }
  }

  function nextQuestion() {
    if (questionIndex < currentQuestions.length - 1) {
      setQuestionIndex((previous) => previous + 1);
      setSelectedAnswer(null);
      setChecked(false);
      setHintOpen(false);
    } else {
      finishQuiz(correctCount);
    }
  }

  function finishQuiz(finalCorrectCount) {
    const total = currentQuestions.length;
    const passed = finalCorrectCount >= Math.ceil(total * 0.8);
    const isPerfect = finalCorrectCount === total;

    setQuizFinished(true);
    setQuizPassed(passed);

    if (quizMode === "lesson") {
      const lessonId = activeIndex;
      const alreadyCompleted = completed.includes(lessonId);

      const nextCompleted = passed && !alreadyCompleted
        ? [...completed, lessonId]
        : completed;

      const nextXp = xp + (
        alreadyCompleted
          ? 0
          : passed
            ? 50 + finalCorrectCount * 10
            : finalCorrectCount * 10
      );

      const nextScores = {
        ...scores,
        [lessonId]: Math.max(scores[lessonId] || 0, finalCorrectCount)
      };

      const nextPerfect = isPerfect && !perfectLessons.includes(lessonId)
        ? [...perfectLessons, lessonId]
        : perfectLessons;

      let nextBadges = [...badges];

      if (passed && !nextBadges.includes(`lesson-${lessonId}`)) {
        nextBadges.push(`lesson-${lessonId}`);
      }

      if (
        nextCompleted.length === lessons.length &&
        !nextBadges.includes("physics-master-ready")
      ) {
        nextBadges.push("physics-master-ready");
      }

      if (isPerfect && !nextBadges.includes("perfect-quiz")) {
        nextBadges.push("perfect-quiz");
      }

      saveProgress(nextCompleted, nextXp, nextScores, nextPerfect, nextBadges);
    } else {
      const nextXp = xp + (
        passed && !masterComplete
          ? isPerfect ? 100 : 50
          : 0
      );

      const nextBadges = passed && !masterComplete
        ? [...badges, "physics-champion"]
        : badges;

      saveProgress(completed, nextXp, scores, perfectLessons, nextBadges);
    }
  }

  function resetQuiz() {
    startQuiz(quizMode);
  }

  function changeLesson(index) {
    setActiveIndex(index);
    startQuiz("lesson");
  }

  function openMasterChallenge() {
    startQuiz("master");
  }

  function closeMasterChallenge() {
    setQuizMode("lesson");
    setQuizFinished(false);
    setHintOpen(false);
  }

  function renderQuiz(isMaster = false) {
    return (
      <>
        {!quizFinished ? (
          <>
            <div className="physics-question-progress">
              <span>
                QUESTION {questionIndex + 1} OF {currentQuestions.length}
              </span>
              <span>{correctCount} correct so far</span>
            </div>

            <div className="physics-mini-progress">
              <div
                style={{
                  width: `${((questionIndex + 1) / currentQuestions.length) * 100}%`
                }}
              />
            </div>

            <p className="physics-question">{currentQuestion.question}</p>

            <button
              className="physics-hint-button"
              onClick={() => setHintOpen((previous) => !previous)}
            >
              <Lightbulb size={16} />
              {hintOpen ? "Hide hint" : "Need a hint?"}
            </button>

            {hintOpen && (
              <div className="physics-hint-box">
                💡 {currentQuestion.hint}
              </div>
            )}

            <div className="physics-options">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={option}
                  disabled={checked}
                  className={`physics-option ${
                    selectedAnswer === index ? "selected" : ""
                  } ${
                    checked && index === currentQuestion.answer ? "correct" : ""
                  } ${
                    checked && selectedAnswer === index && !isCorrect
                      ? "incorrect"
                      : ""
                  }`}
                  onClick={() => setSelectedAnswer(index)}
                >
                  <span>{String.fromCharCode(65 + index)}</span>
                  {option}
                  {checked && index === currentQuestion.answer && (
                    <CheckCircle2 size={18} />
                  )}
                </button>
              ))}
            </div>

            {checked && (
              <div className={`physics-feedback ${isCorrect ? "success" : "try-again"}`}>
                <strong>
                  {isCorrect ? "Excellent work! 🎉" : "Good try! Keep learning."}
                </strong>
                <p>{currentQuestion.explanation}</p>
              </div>
            )}

            <div className="physics-quiz-actions">
              {!checked ? (
                <button
                  className="physics-primary-button"
                  disabled={selectedAnswer === null}
                  onClick={checkAnswer}
                >
                  Check my answer <ChevronRight size={18} />
                </button>
              ) : (
                <button className="physics-primary-button" onClick={nextQuestion}>
                  {questionIndex === currentQuestions.length - 1
                    ? isMaster ? "Finish challenge" : "See my results"
                    : "Next question"}
                  <ChevronRight size={18} />
                </button>
              )}
            </div>
          </>
        ) : (
          <div className="physics-results-panel">
            <div className="physics-results-icon">
              {quizPassed ? <Trophy size={38} /> : <Brain size={38} />}
            </div>

            <h3>
              {quizPassed
                ? isMaster
                  ? "You are a Physics Champion!"
                  : "Chapter completed!"
                : "Almost there!"}
            </h3>

            <p className="physics-results-score">
              {correctCount} / {currentQuestions.length}
            </p>

            <p>
              {quizPassed
                ? isMaster
                  ? "You unlocked the Physics Champion badge!"
                  : "You reached the 80% pass mark. Great learning!"
                : "You need at least 80% to complete this challenge. Review and try again."}
            </p>

            {quizPassed && (
              <div className="physics-xp-earned">
                <Zap size={19} />
                XP earned during this challenge: {earnedThisQuiz}
              </div>
            )}

            <div className="physics-quiz-actions">
              {!quizPassed && (
                <button className="physics-primary-button" onClick={resetQuiz}>
                  <RotateCcw size={17} /> Retry challenge
                </button>
              )}

              {quizPassed && !isMaster && activeIndex < lessons.length - 1 && (
                <button
                  className="physics-primary-button"
                  onClick={() => changeLesson(activeIndex + 1)}
                >
                  Next chapter <ChevronRight size={18} />
                </button>
              )}

              {quizPassed && !isMaster && activeIndex === lessons.length - 1 && (
                <button
                  className="physics-primary-button"
                  onClick={() => startQuiz("lesson")}
                >
                  Review this chapter
                </button>
              )}

              {quizPassed && isMaster && (
                <button
                  className="physics-primary-button"
                  onClick={closeMasterChallenge}
                >
                  Back to chapters <ChevronRight size={18} />
                </button>
              )}
            </div>
          </div>
        )}
      </>
    );
  }

  return (
    <motion.main
      className="physics-lessons-page"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <button className="physics-back-button" onClick={onBack}>
        <ArrowLeft size={18} /> Back to Physics
      </button>

      <header className="physics-lesson-header">
        <div className="physics-heading-icon">
          <Atom size={30} />
        </div>
        <div>
          <span className="physics-eyebrow">
            EXPLORE & PLAY · CLASS {studentClass}
          </span>
          <h1>{topic}</h1>
          <p>Your interests are now part of your learning journey.</p>
        </div>
      </header>

      <section className="physics-personal-banner">
        <Sparkles size={21} />
        <div>
          <strong>Your learning universe</strong>
          <p>
            Learning connections based on{" "}
            {selectedInterests.length
              ? selectedInterests.join(", ")
              : "your discoveries"}.
          </p>
          <div className="physics-interest-tags">
            {selectedInterests.map((interest) => (
              <span key={interest}>
                {interestDetails[interest]?.emoji || "✨"} {interest}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="physics-rewards-panel">
        <div className="physics-xp-card">
          <Zap size={25} />
          <div>
            <small>YOUR XP</small>
            <strong>{xp} XP</strong>
          </div>
        </div>

        <div className="physics-xp-card">
          <Award size={25} />
          <div>
            <small>BADGES EARNED</small>
            <strong>{badges.length}</strong>
          </div>
        </div>

        <div className="physics-xp-card">
          <Star size={25} />
          <div>
            <small>PERFECT CHAPTERS</small>
            <strong>{perfectLessons.length}</strong>
          </div>
        </div>
      </section>

      <section className="physics-progress-card">
        <div>
          <span>YOUR LEARNING JOURNEY</span>
          <h3>{completed.length} of {lessons.length} chapters completed</h3>
        </div>

        <strong>{progress}%</strong>

        <div className="physics-progress-track">
          <div style={{ width: `${progress}%` }} />
        </div>
      </section>

      <div className="physics-learning-layout">
        <aside className="physics-lesson-sidebar">
          <h3>
            <BookOpen size={18} /> Learning Chapters
          </h3>

          {lessons.map((item, index) => (
            <button
              key={item.title}
              className={`physics-chapter ${
                activeIndex === index ? "active" : ""
              }`}
              onClick={() => changeLesson(index)}
            >
              <span className="physics-chapter-emoji">{item.icon}</span>

              <span className="physics-chapter-text">
                <strong>{index + 1}. {item.title}</strong>
                <small>
                  {completed.includes(index)
                    ? `Completed · ${scores[index] || 0}/5`
                    : "Explore this chapter"}
                </small>
              </span>

              {completed.includes(index)
                ? <CheckCircle2 size={18} className="physics-done-icon" />
                : <ChevronRight size={18} />}
            </button>
          ))}

          <div className="physics-sidebar-badge">
            <Trophy size={22} />
            <strong>{lessonBadgeCount}/8 chapter badges</strong>
            <small>Pass each chapter quiz to earn its badge.</small>
          </div>
        </aside>

        <section className="physics-lesson-content" key={activeIndex}>
          <div className="physics-topic-banner">
            <span>{lesson.icon}</span>
            <div>
              <small>CHAPTER {activeIndex + 1} OF 8</small>
              <h2>{lesson.title}</h2>
              <p>{lesson.subtitle}</p>
            </div>
                    </div>

          <InterestAnimation
            chapterIndex={activeIndex}
            selectedInterests={selectedInterests}
            example={personalisedConnections[0]?.example || ""}
          />
                    {activeIndex === 0 && selectedInterests.includes("Drawing") && (
            <LessonVideo
              title="Discover Force Through Drawing"
              videoSrc="/videos/force-drawing.mp4"
            />
          )}

          <div className="physics-info-section">
            <h3><Lightbulb size={20} /> Let's understand</h3>
            <p>{explanation}</p>
            <div className="physics-concept-box">{lesson.concept}</div>
          </div>

          <div className="physics-personal-section">
            <h3><Sparkles size={20} /> Your interests, your examples</h3>

            {personalisedConnections.length > 0 ? (
              <div className="physics-personal-grid">
                {personalisedConnections.map((connection) => (
                  <article
                    className="physics-personal-card"
                    key={connection.name}
                  >
                    <span className="physics-personal-emoji">
                      {connection.emoji}
                    </span>
                    <strong>{connection.name}</strong>
                    <p>{connection.example}</p>
                  </article>
                ))}
              </div>
            ) : (
              <p>Select interests during onboarding to unlock personalised examples.</p>
            )}
          </div>

          
          <div className="physics-explore-box">
            <span>🎯</span>
            <div>
              <h3>Your real-world mission</h3>
              <p>{lesson.mission}</p>
            </div>
          </div>

          <div className="physics-mission-answer">
            <h3>✍️ Share your discovery</h3>
            <p>Think about the mission and explain what you understood.</p>

            <textarea
              value={missionAnswers[activeIndex] || ""}
              onChange={(e) => {
                setMissionAnswers((prev) => ({
                  ...prev,
                  [activeIndex]: e.target.value
                }));
                setMissionSubmitted((prev) => ({
                  ...prev,
                  [activeIndex]: false
                }));
              }}
              placeholder="Write your answer here..."
              rows={4}
            />

            <button
              disabled={!missionAnswers[activeIndex]?.trim()}
              onClick={() => {
                const updatedAnswers = {
                  ...missionAnswers,
                  [activeIndex]: missionAnswers[activeIndex].trim()
                };

                localStorage.setItem(
                  `${storageKey}-missions`,
                  JSON.stringify(updatedAnswers)
                );

                setMissionAnswers(updatedAnswers);
                setMissionSubmitted((prev) => ({
                  ...prev,
                  [activeIndex]: true
                }));
              }}
            >
              Submit My Answer
            </button>

            {missionSubmitted[activeIndex] && (
              <p className="mission-success">
                ✓ Your answer has been saved on this device!
              </p>
            )}
          </div>

          <section className="physics-quiz-section">
            <div className="physics-quiz-heading">
              <Target size={21} />
              <div>
                <h3>Chapter Challenge</h3>
                <p>5 questions · 80% needed to complete this chapter</p>
              </div>
            </div>

            {completed.includes(activeIndex) && (
              <div className="physics-completed-note">
                <CheckCircle2 size={18} />
                This chapter is completed. Your best score is{" "}
                {scores[activeIndex] || 0}/5.
              </div>
            )}

            {renderQuiz(false)}
          </section>
        </section>
      </div>

      <section className="physics-master-card">
        <div className="physics-master-icon">
          <Trophy size={32} />
        </div>

        <div className="physics-master-copy">
          <span>ULTIMATE CHALLENGE</span>
          <h2>Physics Master Challenge</h2>
          <p>
            Ten mixed questions covering all eight chapters. Earn your champion badge!
          </p>
          <small>
            {completed.length}/8 chapters completed ·{" "}
            {masterComplete
              ? "Challenge completed"
              : "Unlock after all eight chapters"}
          </small>
        </div>

        {completed.length === lessons.length ? (
          <button
            className="physics-primary-button"
            onClick={openMasterChallenge}
          >
            {masterComplete ? "Play again" : "Unlock challenge"}
            <ChevronRight size={18} />
          </button>
        ) : (
          <div className="physics-locked-label">
            <Lock size={18} /> Locked
          </div>
        )}
      </section>

      {quizMode === "master" && (
        <section className="physics-master-overlay">
          <div className="physics-master-window">
            <button
              className="physics-master-close"
              onClick={closeMasterChallenge}
            >
              <ArrowLeft size={18} /> Back to chapters
            </button>

            <div className="physics-master-title">
              <Trophy size={32} />
              <span>PHYSICS MASTER CHALLENGE</span>
              <h2>Are you ready, scientist?</h2>
              <p>10 questions · 80% to earn the champion badge</p>
            </div>

            {renderQuiz(true)}
          </div>
        </section>
      )}
    </motion.main>
  );
}
