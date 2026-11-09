'use client';

import React, { useEffect, useState } from 'react';

export function LiveClock() {
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString('en-US', {
          timeZone: 'Asia/Jakarta',
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })
      );
    };
    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <span className="font-mono text-xs text-muted-ink tabular-nums">
      Jakarta {time ? `${time} UTC+7` : 'UTC+7'}
    </span>
  );
}

