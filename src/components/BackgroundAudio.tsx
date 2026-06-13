"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

export default function BackgroundAudio() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Soft, lounge-style instrumental track for ambient luxury feel
    const audio = new Audio("https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3");
    audio.loop = true;
    audio.volume = 0.25; // Subtle, elegant background volume
    audioRef.current = audio;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const togglePlayback = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          console.log("Audio play blocked by browser policy: ", err);
        });
    }
  };

  return (
    <button
      onClick={togglePlayback}
      className="fixed bottom-6 right-6 z-[99] p-3 rounded-full glass-panel border border-sand/20 hover:border-sunset text-[#fcfbf7] hover:text-sunset transition-all duration-500 flex items-center gap-2 group shadow-2xl"
      aria-label="Toggle cinematic ambient audio"
    >
      {isPlaying ? (
        <>
          <div className="flex items-end gap-[3px] h-3.5 w-3.5 mb-[2px]">
            <span className="w-[2px] bg-sunset rounded-full animate-pulse h-3" style={{ animationDuration: '0.6s' }} />
            <span className="w-[2px] bg-sunset rounded-full animate-pulse h-4" style={{ animationDuration: '0.8s' }} />
            <span className="w-[2px] bg-sunset rounded-full animate-pulse h-2.5" style={{ animationDuration: '0.5s' }} />
            <span className="w-[2px] bg-sunset rounded-full animate-pulse h-3.5" style={{ animationDuration: '0.7s' }} />
          </div>
          <span className="text-[10px] font-sans uppercase tracking-[0.2em] max-w-0 overflow-hidden group-hover:max-w-[80px] transition-all duration-500 ease-out whitespace-nowrap opacity-0 group-hover:opacity-100">
            Mute
          </span>
        </>
      ) : (
        <>
          <VolumeX className="w-3.5 h-3.5 text-sand/60 group-hover:text-sunset transition-colors" />
          <span className="text-[10px] font-sans uppercase tracking-[0.2em] max-w-0 overflow-hidden group-hover:max-w-[100px] transition-all duration-500 ease-out whitespace-nowrap opacity-0 group-hover:opacity-100">
            Ambient On
          </span>
        </>
      )}
    </button>
  );
}
