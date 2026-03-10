import { useState, useEffect } from "react";

export function useCountdown(mins: number) {
  const [secs, decrement] = useState(mins * 60);
  const [progress, increment] = useState(0);

  useEffect(() => {
    if (secs > 0) {
      const progressLevel = setInterval(() => {
        increment(progress + 100 / (mins * 60));
        decrement(secs - 1);
      }, 1000);
      return () => clearInterval(progressLevel);
    }
  }, [progress, secs, mins]);

  const hr = parseInt((secs / 3600).toString(), 10)
  const min = parseInt(((secs / 60) % 60).toString(), 10);
  const sec = parseInt((secs % 60).toString(), 10);
  const hours = hr < 10 ? "0" + hr : hr;
  const minutes = min < 10 ? "0" + min : min;
  const seconds = sec < 10 ? "0" + sec : sec;
  return [progress, hours, minutes, seconds];
}
