import {Button} from '@/components/ui/button';
import {Upload} from 'lucide-react';
import Link from 'next/link';

const UploadedCV = () => {
  return (
    <div className="space-y-4 rounded-lg border bg-background p-4 shadow-sm">
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-lg font-bold">CV đã tải lên</h2>
        <Link href="/tai-khoan/cv/tai-len">
          <Button>
            <Upload />
            Tải CV lên
          </Button>
        </Link>
      </div>
      <div>
        <p className="text-center text-sm text-muted-foreground">
          Bạn chưa tải CV lên. Tải CV lên để ứng tuyển vào các công việc phù hợp
          với bạn.
        </p>
      </div>
    </div>
  );
};

export default UploadedCV;
