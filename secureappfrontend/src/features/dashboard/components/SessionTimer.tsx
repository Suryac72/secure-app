import { useEffect, useState } from 'react';

const SessionTimer = () => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return <span>Session Time: {seconds}s</span>;
};

export default SessionTimer;
