import { Button } from '../ui/button';
import { CardFooter } from '../ui/card';
import Price from './Price';

type Props = {
  onChange: () => void;
};

function Mint({ onChange }: Props) {
  return (
    <div className="flex flex-col items-center gap-4">
      <Price>
        <CardFooter>
          <Button onClick={onChange}>Get Started</Button>
        </CardFooter>
      </Price>
    </div>
  );
}

export default Mint;
