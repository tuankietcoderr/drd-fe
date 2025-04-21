import {cn} from '@/lib/utils';
import {Loader} from 'lucide-react';

const Spinner = ({isCentered = false, className, iconClassName}) => {
  return (
    <span
      role="status"
      className={cn(
        isCentered && 'flex items-center justify-center',
        className,
      )}>
      <Loader className={cn('animate-spin', iconClassName)} />
      <span className="sr-only">Loading...</span>
    </span>
  );
};

export default Spinner;
