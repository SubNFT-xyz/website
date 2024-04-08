import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { Play, Pause, RotateCcw, FastForward } from 'lucide-react';

import { Button } from '../ui/button';

type Props = {
  initRemainPercent: number; // 0.45
};

const period = 1; // day
const fastPeriod = 15; //day
const cycle = 365; // day

function NFT({ initRemainPercent = 1 }: Props) {
  const [enable, setEnable] = useState(true);
  const [startDate] = useState(dayjs());
  const [remainPercent, setRemainPercent] = useState(initRemainPercent);

  const [running, setRunning] = useState(false);
  const [isFast, setIsFast] = useState(false);
  const [date, setDate] = useState(dayjs());

  // update time according to speed and running
  useEffect(() => {
    let timerId;
    const speed = isFast ? fastPeriod : period;

    const incrementDay = () => {
      setDate((prevDate) => prevDate.add(speed, 'day'));
    };

    if (running) {
      timerId = setInterval(incrementDay, 1000);
    } else {
      clearInterval(timerId);
    }

    return () => {
      clearInterval(timerId);
    };
  }, [running, isFast]);

  // calculate remain percent
  useEffect(() => {
    const remainDays = Math.ceil(initRemainPercent * cycle);
    const diffDays = date.diff(startDate, 'day');
    const rawRemainPercent = (remainDays - diffDays) / cycle;
    setRemainPercent(rawRemainPercent < 0 ? 0 : rawRemainPercent);
    if (diffDays >= remainDays) {
      setEnable(false);
      setRunning(false);
    }
  }, [date]);

  const txtRemainPercent = (remainPercent * 100).toFixed(0) + '%';
  const txtRunning = running ? 'Running' : 'Freezed';

  const toggleStart = () => {
    setRunning((prev) => !prev);
  };

  const toggleSpeed = () => {
    setIsFast((prev) => !prev);
  };

  const handleReset = () => {
    setRunning(false);
    setIsFast(false);
    setDate(dayjs());
    setEnable(true);
    setRemainPercent(initRemainPercent);
  };

  return (
    <div className="flex flex-col justify-start items-center">
      {/* Operation panel */}
      <div className="flex flex-row items-center gap-2">
        <Button variant="outline" size="icon" onClick={toggleStart}>
          {!running && <Play />}
          {running && <Pause />}
        </Button>
        <Button variant="outline" size="icon" onClick={toggleSpeed}>
          <FastForward />
        </Button>
        <Button variant="outline" size="icon" onClick={handleReset}>
          <RotateCcw />
        </Button>
      </div>
      {/* NFT Box */}
      <div className="flex flex-col mt-16">
        <span>NFT box</span>
        <span>Now: {dayjs(date).format('YYYY-MM-DD')}</span>
        <span>{txtRemainPercent}</span>
        <span>{txtRunning}</span>
        {!enable && <div>用完了</div>}
      </div>
    </div>
  );
}

export default NFT;
