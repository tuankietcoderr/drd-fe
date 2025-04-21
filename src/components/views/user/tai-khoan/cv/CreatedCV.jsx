import {Button} from '@/components/ui/button';
import {Plus} from 'lucide-react';
import Link from 'next/link';

const CreatedCV = () => {
  return (
    <div className="space-y-4 rounded-lg border bg-background p-4 shadow-sm">
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-lg font-bold">CV đã tạo</h2>
        <Link href="/tai-khoan/cv/tao-moi">
          <Button>
            <Plus />
            Tạo CV mới
          </Button>
        </Link>
      </div>
      <div>
        <p className="text-center text-sm text-muted-foreground">
          Bạn chưa tạo CV. Tạo CV để ứng tuyển vào các công việc phù hợp với
          bạn.
        </p>
      </div>
    </div>
  );
};

export default CreatedCV;
