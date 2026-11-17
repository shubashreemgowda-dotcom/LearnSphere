
import { useRef, useState } from "react";
import { PlayCircle, PauseCircle, RotateCcw, Video } from "lucide-react";
import "./LessonVideo.css";

export default function LessonVideo({ title, videoSrc }) {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [finished, setFinished] = useState(false);

  function togglePlayback() {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  }

  function handleTimeUpdate() {
    const video = videoRef.current;
    if (!video || !video.duration) return;

    setProgress((video.currentTime / video.duration) * 100);
  }

  function handleEnded() {
    setPlaying(false);
    setFinished(true);
    setProgress(100);
  }

  function replay() {
    const video = videoRef.current;
    if (!video) return;

    video.currentTime = 0;
    setFinished(false);
    setProgress(0);
    video.play();
  }

  return (
    <section className="lesson-video-card">
      <div className="lesson-video-heading">
        <span><Video size={18} /> VIDEO LESSON</span>
        <h3>{title}</h3>
        <p>Watch, observe and understand the concept.</p>
      </div>

      <video
        ref={videoRef}
        className="lesson-video-player"
        src={videoSrc}
        playsInline
        preload="metadata"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
      />

      <div className="lesson-video-progress">
        <div style={{ width: `${progress}%` }} />
      </div>

      <div className="lesson-video-controls">
        <button onClick={togglePlayback}>
          {playing ? <PauseCircle size={19} /> : <PlayCircle size={19} />}
          {playing ? "Pause" : "Play"}
        </button>

        <button onClick={replay}>
          <RotateCcw size={17} /> Replay
        </button>

        <span>{finished ? "Video completed!" : `${Math.round(progress)}% watched`}</span>
      </div>
    </section>
  );
}
