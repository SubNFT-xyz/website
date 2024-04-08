import { useState } from 'react';
import FakeWallet from './FakeWallet';
import Mint from './Mint';
import NFT from './NFT';

export default function DemoView() {
  const [step, setStep] = useState(0);

  const handleNextStep = () => {
    setStep(step + 1);
  };
  return (
    <div className="h-screen">
      <div className="flex flex-row justify-between m-4 items-center">
        <h1 className="px-4 sm:px-6 max-w-3xl text-2xl md:text-3xl font-bold leading-tighter tracking-tighter font-heading">
          Subscription NFT Demo
        </h1>
        <FakeWallet />
      </div>
      {step == 0 && <Mint onChange={handleNextStep} />}
      {step != 0 && <NFT />}
    </div>
  );
}
