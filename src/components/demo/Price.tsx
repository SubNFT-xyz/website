import React from 'react';
import { CircleCheck } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';

type Props = {
  children: React.ReactNode;
};

function Price({ children }: Props) {
  return (
    <Card className="w-[350px] flex flex-col items-center">
      <CardHeader className="flex flex-col items-center">
        <CardTitle>BASIC</CardTitle>
        <CardDescription>Optimal choice for personal use</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-2">
        <div className="mb-8 flex flex-col items-center">
          <div className="flex items-center justify-center text-center mb-1">
            <span className="text-5xl">$</span> <span className="text-6xl font-extrabold">129</span>
          </div>
          <span className="text-base leading-6 lowercase text-gray-600 dark:text-slate-400">per year</span>
        </div>
        <div className="flex flex-col items-start gap-2 mb-8">
          {/* intros */}
          <div className="flex flex-row gap-2 items-center">
            <CircleCheck className="w-5 h-5" />
            <span>Etiam in libero, et volutpat</span>
          </div>
          <div className="flex flex-row gap-2 items-center">
            <CircleCheck className="w-5 h-5" />
            <span>Aenean ac nunc dolor tristique</span>
          </div>
          <div className="flex flex-row gap-2 items-center">
            <CircleCheck className="w-5 h-5" />
            <span>Cras scelerisque accumsan lib</span>
          </div>
          <div className="flex flex-row gap-2 items-center">
            <CircleCheck className="w-5 h-5" />
            <span>In hac habitasse</span>
          </div>
        </div>
      </CardContent>
      {children}
    </Card>
  );
}

export default Price;
