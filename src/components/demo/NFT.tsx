import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { Play, Pause } from 'lucide-react';

import { Button } from '../ui/button';
import Price from './Price';
import { Progress } from '../ui/progress';
import { CardFooter } from '../ui/card';

const period = 10; //day
const cycle = 365; // day
const defaultInitRemainPercent = 0.3;

function NFT() {
  const [enable, setEnable] = useState(true);
  const [startDate, setStartDate] = useState(dayjs());
  const [initRemainPercent, setInitRemainPercent] = useState(defaultInitRemainPercent);
  const [remainPercent, setRemainPercent] = useState(defaultInitRemainPercent);

  const [running, setRunning] = useState(false);
  const [date, setDate] = useState(dayjs());

  // update time according to speed and running
  useEffect(() => {
    let timerId;

    const incrementDay = () => {
      setDate((prevDate) => prevDate.add(period, 'day'));
    };

    if (running) {
      timerId = setInterval(incrementDay, 300);
    } else {
      clearInterval(timerId);
    }

    return () => {
      clearInterval(timerId);
    };
  }, [running]);

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

  const toggleStart = () => {
    setRunning((prev) => !prev);
  };

  const handleRenew = () => {
    setEnable(true);
    setStartDate(date);
    setInitRemainPercent(1);
    setRemainPercent(1);
  };
  const btnClassDependEnable = !enable ? 'pointer-events-none opacity-50' : '';
  const estimatedValue = '$' + (129 * remainPercent).toFixed(2);

  return (
    <div className="flex flex-col justify-start items-center">
      {/* NFT Box */}
      <div className="flex flex-col mb-8">
        <Price>
          <span className='my-2'>Estimated Value: {estimatedValue}</span>
          <Progress value={remainPercent * 100} className="w-[60%] mb-4" />
          <CardFooter className="flex flex-row justify-between w-[60%]">
            <Button className={btnClassDependEnable} variant="outline">
              Resell
            </Button>
            <Button variant="outline" onClick={handleRenew}>
              Renew
            </Button>
          </CardFooter>
        </Price>
      </div>
      {/* Operation panel */}
      <div className="flex flex-row items-center gap-2">
        <Button onClick={toggleStart} className={btnClassDependEnable}>
          {!running && <Play />}
          {running && <Pause />}
          <span className="ml-2">Time Machine</span>
        </Button>
      </div>
      <span className="mt-4">Today: {dayjs(date).format('YYYY-MM-DD')}</span>
    </div>
  );
}

export default NFT;
