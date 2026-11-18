
import { useState } from "react";
import { motion } from "framer-motion";
import "./ExperimentDetail.css";
import {
  ArrowLeft, FlaskConical, Lightbulb, BookOpen,
  Play, CheckCircle2, Sparkles, RotateCcw,
  ChevronRight, Beaker, Atom, Leaf, Calculator
} from "lucide-react";

const experiments = {
  "Simple Pendulum": {
    aim: "Understand how the length of a pendulum affects its time period.",
    concept: "A pendulum swings due to gravity. Its time period depends mainly on its length.",
    materials: ["Pendulum illustration", "Length control", "Virtual timer"],
    steps: [
      "Observe the pendulum and identify its bob, string and fixed support.",
      "Start with a short string length in the simulation.",
      "Observe one complete oscillation.",
      "Increase the string length and compare the time period.",
      "Record how the time period changes."
    ],
    observation: "A longer pendulum generally takes more time to complete one oscillation.",
    type: "pendulum"
  },
  "Force & Motion": {
    aim: "Explore the relationship between force, mass and acceleration.",
    concept: "Newton's second law states that force equals mass multiplied by acceleration.",
    materials: ["Virtual trolley", "Force control", "Mass control"],
    steps: [
      "Observe the trolley in the virtual experiment.",
      "Choose a mass for the trolley.",
      "Apply a virtual force using the slider.",
      "Observe the calculated acceleration.",
      "Change the mass and compare the results."
    ],
    observation: "For the same mass, increasing force increases acceleration.",
    type: "force"
  },
  "Acid–Base Indicators": {
    aim: "Understand how indicators help identify acidic and basic solutions.",
    concept: "Indicators change colour depending on the nature of a solution.",
    materials: ["Virtual indicator", "Sample selector", "Observation chart"],
    steps: [
      "Select an indicator in the simulation.",
      "Choose an acidic, neutral or basic sample.",
      "Observe the predicted colour change.",
      "Compare the colours for different samples.",
      "Record your observations."
    ],
    observation: "Different indicators show different colour responses in acidic and basic solutions.",
    type: "indicator"
  },
  "Separation of Mixtures": {
    aim: "Learn how different techniques separate mixtures.",
    concept: "Separation methods use differences in properties such as particle size, solubility and density.",
    materials: ["Virtual mixture samples", "Method selector", "Observation panel"],
    steps: [
      "Select a mixture from the available samples.",
      "Observe the properties of its components.",
      "Choose a suitable separation method.",
      "Check whether your selected method is appropriate.",
      "Compare your answer with the scientific explanation."
    ],
    observation: "The correct separation technique depends on the properties of the mixture.",
    type: "separation"
  },
  "Plant Cell Explorer": {
    aim: "Explore the main structures of a plant cell.",
    concept: "Plant cells contain specialised organelles that perform different functions.",
    materials: ["Interactive cell diagram", "Organelle labels"],
    steps: [
      "Observe the plant cell illustration.",
      "Select an organelle.",
      "Read its function.",
      "Explore the other organelles.",
      "Identify the structures unique to plant cells."
    ],
    observation: "The cell wall, chloroplasts and large central vacuole are important plant-cell structures.",
    type: "cell"
  },
  "Photosynthesis": {
    aim: "Explore the factors that influence photosynthesis.",
    concept: "Plants use light energy, water and carbon dioxide to produce glucose and oxygen.",
    materials: ["Virtual plant", "Light control", "Water and CO₂ controls"],
    steps: [
      "Observe the virtual plant.",
      "Adjust the light level.",
      "Change the water availability.",
      "Adjust the carbon dioxide level.",
      "Compare the conceptual photosynthesis activity."
    ],
    observation: "Light, water and carbon dioxide are important factors in photosynthesis.",
    type: "photosynthesis"
  },
  "3D Geometry": {
    aim: "Explore how dimensions affect the volume of a cuboid.",
    concept: "The volume of a cuboid is length multiplied by breadth multiplied by height.",
    materials: ["Virtual cuboid", "Dimension controls", "Calculator"],
    steps: [
      "Observe the virtual cuboid.",
      "Change its length.",
      "Change its breadth and height.",
      "Observe the calculated volume.",
      "Compare the volume for different dimensions."
    ],
    observation: "Increasing any one dimension while keeping the others constant increases volume.",
    type: "geometry"
  },
  "Coordinate Geometry": {
    aim: "Understand how points are represented on a Cartesian plane.",
    concept: "A point is represented using an ordered pair (x, y).",
    materials: ["Cartesian plane", "X and Y controls"],
    steps: [
      "Observe the horizontal X-axis and vertical Y-axis.",
      "Move the X control.",
      "Move the Y control.",
      "Observe the point's new position.",
      "Calculate its distance from the origin."
    ],
    observation: "The coordinates determine the exact position of a point on the plane.",
    type: "coordinates"
  }
};

function ExperimentVisual({ type }) {
  const illustrations = {
    pendulum: (
      <svg viewBox="0 0 320 210">
        <path d="M110 24 H210" stroke="currentColor" strokeWidth="7" strokeLinecap="round"/>
        <path d="M160 28 L160 143" stroke="#38bdf8" strokeWidth="3"/>
        <circle cx="160" cy="151" r="17" fill="#3b82f6"/>
        <path d="M160 28 L105 137" stroke="#94a3b8" strokeWidth="2" strokeDasharray="5 5"/>
        <circle cx="105" cy="145" r="15" fill="#14b8a6"/>
        <path d="M91 180 Q160 205 229 180" stroke="#8b5cf6" strokeWidth="2" fill="none"/>
        <text x="175" y="105" fill="currentColor" fontSize="12">Length</text>
      </svg>
    ),
    force: (
      <svg viewBox="0 0 320 210">
        <path d="M30 165 H290" stroke="currentColor" strokeWidth="4"/>
        <rect x="95" y="105" width="115" height="55" rx="12" fill="#3b82f6"/>
        <circle cx="120" cy="166" r="10" fill="#64748b"/>
        <circle cx="185" cy="166" r="10" fill="#64748b"/>
        <path d="M215 130 H285 M270 115 L285 130 L270 145" stroke="#14b8a6" strokeWidth="5" fill="none" strokeLinecap="round"/>
        <text x="230" y="105" fill="currentColor" fontSize="12">Force</text>
      </svg>
    ),
    indicator: (
      <svg viewBox="0 0 320 210">
        {[70,160,250].map((x,i)=>(
          <g key={x}>
            <path d={`M${x-30} 75 L${x-23} 165 Q${x} 180 ${x+23} 165 L${x+30} 75`} fill="none" stroke="currentColor" strokeWidth="3"/>
            <path d={`M${x-23} 125 L${x-19} 164 Q${x} 174 ${x+19} 164 L${x+23} 125 Z`} fill={["#ef4444","#a78bfa","#22c55e"][i]} opacity=".8"/>
          </g>
        ))}
        <text x="160" y="30" textAnchor="middle" fill="currentColor" fontSize="13">Indicator colour test</text>
      </svg>
    ),
    separation: (
      <svg viewBox="0 0 320 210">
        <path d="M65 45 H255 L180 145 H140 Z" fill="#38bdf8" opacity=".3" stroke="#38bdf8" strokeWidth="3"/>
        <path d="M140 145 V175 H180 V145" stroke="currentColor" strokeWidth="3" fill="none"/>
        <path d="M100 75 L220 75" stroke="#14b8a6" strokeWidth="5" strokeDasharray="5 5"/>
        <path d="M160 175 V190" stroke="#14b8a6" strokeWidth="3"/>
      </svg>
    ),
    cell: (
      <svg viewBox="0 0 320 210">
        <rect x="40" y="35" width="240" height="145" rx="48" fill="#86efac" fillOpacity=".2" stroke="#16a34a" strokeWidth="7"/>
        <rect x="54" y="49" width="212" height="117" rx="40" fill="#bbf7d0" fillOpacity=".3" stroke="#22c55e" strokeWidth="2"/>
        <circle cx="145" cy="105" r="27" fill="#a78bfa"/>
        <ellipse cx="215" cy="80" rx="19" ry="10" fill="#f59e0b"/>
        <ellipse cx="85" cy="135" rx="19" ry="10" fill="#f59e0b"/>
        <rect x="165" y="125" width="72" height="25" rx="10" fill="#38bdf8" opacity=".7"/>
      </svg>
    ),
    photosynthesis: (
      <svg viewBox="0 0 320 210">
        <path d="M160 180 V80" stroke="#16a34a" strokeWidth="7"/>
        <path d="M160 125 Q65 115 90 55 Q150 45 160 125" fill="#22c55e"/>
        <path d="M160 105 Q245 90 235 40 Q175 40 160 105" fill="#86efac"/>
        <circle cx="70" cy="35" r="20" fill="#fbbf24"/>
        <path d="M70 5 V0 M40 35 H30 M100 35 H110" stroke="#fbbf24" strokeWidth="3"/>
        <path d="M110 180 H210" stroke="#a16207" strokeWidth="6" strokeLinecap="round"/>
        <path d="M125 180 Q160 155 195 180" fill="#a16207"/>
      </svg>
    ),
    geometry: (
      <svg viewBox="0 0 320 210">
        <path d="M65 85 L165 35 L260 85 L160 135 Z" fill="#60a5fa" fillOpacity=".5" stroke="#3b82f6" strokeWidth="3"/>
        <path d="M65 85 V155 L160 195 V135 M260 85 V155 L160 195" fill="#3b82f6" fillOpacity=".2" stroke="#3b82f6" strokeWidth="3"/>
      </svg>
    ),
    coordinates: (
      <svg viewBox="0 0 320 210">
        <path d="M35 165 H285 M160 190 V20" stroke="currentColor" strokeWidth="3"/>
        <path d="M275 157 L285 165 L275 173 M152 30 L160 20 L168 30" stroke="currentColor" strokeWidth="3" fill="none"/>
        <path d="M220 85 V165 H220" stroke="#38bdf8" strokeDasharray="5 4" strokeWidth="2"/>
        <circle cx="220" cy="85" r="8" fill="#8b5cf6"/>
        <text x="230" y="76" fill="currentColor" fontSize="13">(x, y)</text>
      </svg>
    )
  };

  return <div className="experiment-visual">{illustrations[type]}</div>;
}

function ActivityPanel({ type }) {
  const [length, setLength] = useState(1);
  const [mass, setMass] = useState(2);
  const [force, setForce] = useState(10);
  const [sample, setSample] = useState("acidic");
  const [mixture, setMixture] = useState("sand-water");
  const [method, setMethod] = useState("filtration");
  const [organelle, setOrganelle] = useState("Nucleus");
  const [light, setLight] = useState(70);
  const [water, setWater] = useState(70);
  const [co2, setCo2] = useState(70);
  const [l, setL] = useState(4);
  const [b, setB] = useState(3);
  const [h, setH] = useState(2);
  const [x, setX] = useState(2);
  const [y, setY] = useState(3);

  const [feedback, setFeedback] = useState("");

  const resetFeedback = () => setFeedback("");

  return (
    <div className="activity-panel">
      {type === "pendulum" && <>
        <h3>Adjust the pendulum length</h3>
        <label>String length: {length} m</label>
        <input type="range" min="1" max="5" value={length} onChange={e=>{setLength(+e.target.value);resetFeedback();}}/>
        <div className="experiment-result">
          <strong>Relative time period</strong>
          <h2>{(2*Math.PI*Math.sqrt(length/9.81)).toFixed(2)} seconds</h2>
          <p>Estimated using the simple pendulum formula.</p>
        </div>
        <p>Notice how the time period changes when the length increases.</p>
      </>}

      {type === "force" && <>
        <h3>Apply force to the trolley</h3>
        <label>Mass: {mass} kg</label>
        <input type="range" min="1" max="10" value={mass} onChange={e=>setMass(+e.target.value)}/>
        <label>Applied force: {force} N</label>
        <input type="range" min="1" max="50" value={force} onChange={e=>setForce(+e.target.value)}/>
        <div className="experiment-result">
          <strong>Calculated acceleration</strong>
          <h2>{(force/mass).toFixed(2)} m/s²</h2>
          <p>Acceleration = Force ÷ Mass</p>
        </div>
      </>}

      {type === "indicator" && <>
        <h3>Choose a sample solution</h3>
        <select value={sample} onChange={e=>setSample(e.target.value)}>
          <option value="acidic">Acidic</option>
          <option value="neutral">Neutral</option>
          <option value="basic">Basic</option>
        </select>
        <div className="indicator-result">
          <div className={`indicator-drop ${sample}`}/>
          <strong>{sample === "acidic" ? "Red / pink" : sample === "neutral" ? "Purple" : "Blue / green"}</strong>
          <p>Illustrative red-cabbage indicator response.</p>
        </div>
      </>}

      {type === "separation" && <>
        <h3>Choose a mixture</h3>
        <select value={mixture} onChange={e=>{setMixture(e.target.value);resetFeedback();}}>
          <option value="sand-water">Sand + Water</option>
          <option value="salt-water">Salt + Water</option>
          <option value="oil-water">Oil + Water</option>
        </select>
        <h3>Choose a separation method</h3>
        <select value={method} onChange={e=>{setMethod(e.target.value);resetFeedback();}}>
          <option value="filtration">Filtration</option>
          <option value="evaporation">Evaporation</option>
          <option value="separating-funnel">Separating funnel</option>
        </select>
        <button className="activity-check" onClick={()=>setFeedback(
          (mixture==="sand-water" && method==="filtration") ||
          (mixture==="salt-water" && method==="evaporation") ||
          (mixture==="oil-water" && method==="separating-funnel")
          ? "Correct! You selected a suitable separation method."
          : "Try again. Think about the properties of the mixture."
        )}>Check my answer</button>
        {feedback && <p className="activity-feedback">{feedback}</p>}
      </>}

      {type === "cell" && <>
        <h3>Explore plant cell organelles</h3>
        <div className="organelle-options">
          {["Cell wall","Nucleus","Chloroplast","Vacuole"].map(item=><button className={organelle===item?"selected":""} key={item} onClick={()=>setOrganelle(item)}>{item}</button>)}
        </div>
        <div className="experiment-result">
          <h2>{organelle}</h2>
          <p>{{
            "Cell wall":"Provides support and protection to the plant cell.",
            "Nucleus":"Contains genetic information and controls cell activities.",
            "Chloroplast":"Contains chlorophyll and helps capture light energy.",
            "Vacuole":"Stores cell sap and helps maintain cell firmness."
          }[organelle]}</p>
        </div>
      </>}

      {type === "photosynthesis" && <>
        <h3>Change the photosynthesis factors</h3>
        <label>Light intensity: {light}%</label>
        <input type="range" min="0" max="100" value={light} onChange={e=>setLight(+e.target.value)}/>
        <label>Water availability: {water}%</label>
        <input type="range" min="0" max="100" value={water} onChange={e=>setWater(+e.target.value)}/>
        <label>CO₂ availability: {co2}%</label>
        <input type="range" min="0" max="100" value={co2} onChange={e=>setCo2(+e.target.value)}/>
        <div className="experiment-result">
          <strong>Conceptual activity level</strong>
          <h2>{Math.min(light,water,co2)}%</h2>
          <p>A simplified learning model based on the limiting factor.</p>
        </div>
      </>}

      {type === "geometry" && <>
        <h3>Change the cuboid dimensions</h3>
        <label>Length: {l} units</label>
        <input type="range" min="1" max="10" value={l} onChange={e=>setL(+e.target.value)}/>
        <label>Breadth: {b} units</label>
        <input type="range" min="1" max="10" value={b} onChange={e=>setB(+e.target.value)}/>
        <label>Height: {h} units</label>
        <input type="range" min="1" max="10" value={h} onChange={e=>setH(+e.target.value)}/>
        <div className="experiment-result">
          <strong>Volume</strong>
          <h2>{l*b*h} cubic units</h2>
          <p>Volume = Length × Breadth × Height</p>
        </div>
      </>}

      {type === "coordinates" && <>
        <h3>Move the point on the Cartesian plane</h3>
        <label>X coordinate: {x}</label>
        <input type="range" min="-5" max="5" value={x} onChange={e=>setX(+e.target.value)}/>
        <label>Y coordinate: {y}</label>
        <input type="range" min="-5" max="5" value={y} onChange={e=>setY(+e.target.value)}/>
        <div className="coordinate-grid">
          <span className="coordinate-point" style={{left:`${((x+5)/10)*100}%`,bottom:`${((y+5)/10)*100}%`}}/>
        </div>
        <div className="experiment-result">
          <strong>Point coordinates</strong>
          <h2>({x}, {y})</h2>
          <p>Distance from origin: {Math.sqrt(x*x+y*y).toFixed(2)} units</p>
        </div>
      </>}
    </div>
  );
}

export default function ExperimentDetail({ experiment, onBack }) {
  const [started, setStarted] = useState(false);
  const [quizAnswer, setQuizAnswer] = useState("");
  const [quizChecked, setQuizChecked] = useState(false);

  if (!experiment) return null;

  const normalizedTitle = (experiment.title || "").toLowerCase();
  const data = experiments[experiment.title]
    || (normalizedTitle.includes("pendulum") ? experiments["Simple Pendulum"]
    : normalizedTitle.includes("force") ? experiments["Force & Motion"]
    : normalizedTitle.includes("acid") || normalizedTitle.includes("base") ? experiments["Acid–Base Indicators"]
    : normalizedTitle.includes("separation") ? experiments["Separation of Mixtures"]
    : normalizedTitle.includes("plant") || normalizedTitle.includes("cell") ? experiments["Plant Cell Explorer"]
    : normalizedTitle.includes("photosynthesis") ? experiments["Photosynthesis"]
    : normalizedTitle.includes("3d") || normalizedTitle.includes("geometry explorer") ? experiments["3D Geometry"]
    : normalizedTitle.includes("coordinate") ? experiments["Coordinate Geometry"]
    : experiments["Simple Pendulum"]);

  const quiz = {
    pendulum: ["What happens to the time period when pendulum length increases?", ["It decreases","It increases","It stays the same"], 1],
    force: ["Which equation represents Newton's second law?", ["F = ma","F = m/a","F = a/m"], 0],
    indicator: ["What can an indicator help identify?", ["Temperature","Nature of a solution","Mass"], 1],
    separation: ["Which method can separate sand from water?", ["Filtration","Magnetism","Freezing"], 0],
    cell: ["Which organelle captures light energy?", ["Nucleus","Chloroplast","Vacuole"], 1],
    photosynthesis: ["Which gas do plants use in photosynthesis?", ["Oxygen","Nitrogen","Carbon dioxide"], 2],
    geometry: ["How do we calculate cuboid volume?", ["l + b + h","l × b × h","2(l+b)"], 1],
    coordinates: ["How is a point represented?", ["(x, y)","(x + y)","(x × y)"], 0]
  }[data.type];

  return (
    <motion.section className="experiment-detail" initial={{opacity:0,y:18}} animate={{opacity:1,y:0}}>
      <button className="experiment-back" onClick={onBack}><ArrowLeft size={18}/> Back to Virtual Labs</button>

      <div className="experiment-heading">
        <span className="experiment-eyebrow"><Sparkles size={15}/> VIRTUAL SCIENCE STUDIO</span>
        <h1>{experiment.title}</h1>
        <p>{experiment.description || data.aim}</p>
      </div>

      <ExperimentVisual type={data.type}/>

      <section className="learning-video-panel">
        <div>
          <span className="experiment-eyebrow">BEFORE YOU EXPERIMENT</span>
          <h2>Learn the concept first</h2>
          <p>Watch a topic-specific lesson, then use the blueprint and procedure below to perform the virtual experiment.</p>
        </div>
        <a
          className="video-search-link"
          href={`https://www.youtube.com/results?search_query=${encodeURIComponent(experiment.title + " science lesson for students")}`}
          target="_blank"
          rel="noreferrer"
        >
          <Play size={18} fill="currentColor" /> Find lesson videos
        </a>
        <small>Opens relevant video lessons on YouTube. Choose an age-appropriate educational explanation.</small>
      </section>

      <section className="blueprint-section">
        <span className="experiment-eyebrow"><Atom size={15}/> EXPERIMENT BLUEPRINT</span>
        <h2>Study the setup before you begin</h2>
        <p>Use this labelled visual as a guide to understand the main parts and how the experiment is arranged.</p>
        <div className="blueprint-canvas"><ExperimentVisual type={data.type}/></div>
        <div className="blueprint-caption"><strong>Blueprint guide</strong><span>{data.materials.join(" • ")}</span></div>
      </section>

      <div className="experiment-info-grid">
        <article className="experiment-info-card">
          <TargetIcon/>
          <h3>Experiment Aim</h3>
          <p>{data.aim}</p>
        </article>
        <article className="experiment-info-card">
          <Lightbulb/>
          <h3>Scientific Concept</h3>
          <p>{data.concept}</p>
        </article>
      </div>

      <section className="procedure-section">
        <span className="experiment-eyebrow"><BookOpen size={15}/> YOUR EXPERIMENT GUIDE</span>
        <h2>Step-by-step procedure</h2>
        <div className="procedure-layout">
          <div className="procedure-materials">
            <h3><FlaskConical size={18}/> Materials / Virtual Tools</h3>
            {data.materials.map((item,i)=><p key={i}><CheckCircle2 size={15}/>{item}</p>)}
            <div className="safety-note"><strong>Safety first</strong><p>Follow teacher or laboratory supervision for any physical experiment. This virtual activity does not require handling chemicals or laboratory equipment.</p></div>
          </div>
          <div className="procedure-steps">
            {data.steps.map((step,i)=>(
              <div className="procedure-step" key={i}>
                <span>{String(i+1).padStart(2,"0")}</span>
                <p>{step}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="observation-card">
          <Lightbulb/>
          <div><strong>Expected observation</strong><p>{data.observation}</p></div>
        </div>
      </section>

      <section className="perform-section">
        <div className="perform-heading">
          <span className="experiment-eyebrow"><Sparkles size={15}/> INTERACTIVE LAB</span>
          <h2>Now, let's perform!</h2>
          <p>Experiment with the controls and discover the science yourself.</p>
        </div>
        {!started ? (
          <button className="perform-start" onClick={()=>setStarted(true)}><Play size={20} fill="currentColor"/> Let's Perform! <ChevronRight size={18}/></button>
        ) : (
          <>
            <ActivityPanel type={data.type}/>
            <button className="perform-reset" onClick={()=>setStarted(false)}><RotateCcw size={16}/> Reset activity</button>
          </>
        )}
      </section>

      <section className="experiment-quiz">
        <span className="experiment-eyebrow"><BookOpen size={15}/> TEST YOUR UNDERSTANDING</span>
        <h2>Quick knowledge check</h2>
        <p>{quiz[0]}</p>
        <div className="quiz-options">
          {quiz[1].map((option,i)=>(
            <button key={i} className={quizAnswer===String(i)?"selected":""} onClick={()=>{setQuizAnswer(String(i));setQuizChecked(false);}}>{option}</button>
          ))}
        </div>
        <button className="activity-check" disabled={!quizAnswer} onClick={()=>setQuizChecked(true)}>Check answer</button>
        {quizChecked && <p className="activity-feedback">{Number(quizAnswer)===quiz[2]?"Correct! Excellent scientific thinking.":"Not quite. Review the procedure and try again."}</p>}
      </section>
    </motion.section>
  );
}

function TargetIcon() {
  return <Atom size={24}/>;
}
