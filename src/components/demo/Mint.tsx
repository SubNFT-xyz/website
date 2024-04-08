import { Button } from '../ui/button';

type Props = {
  onChange: () => void;
};

function Mint({ onChange }: Props) {
  return (
    <div className='flex flex-col items-center gap-4'>
      Mint Box
      <Button onClick={onChange}>Pay</Button>
    </div>
  );
}

export default Mint;
