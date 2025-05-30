import {Button} from '@/components/ui/button';

const CVOptimizeCTA = () => {
  return (
    <div className="space-y-2 rounded-lg border bg-background p-4 shadow-sm">
      <h3 className="font-semibold text-primary">CV của bạn đã đủ tốt?</h3>
      <p className="text-sm text-muted-foreground">
        Tối ưu hóa CV của bạn với các mẹo và hướng dẫn từ vieclamnkt.top để nổi
        bật hơn trong mắt nhà tuyển dụng.
      </p>
      <div className="flex gap-4">
        <div className="flex size-16 flex-col items-center justify-center gap-2 rounded-full bg-muted p-2 leading-none">
          <p className="text-xl font-semibold leading-none">0</p>
          <p className="text-sm leading-none">luợt</p>
        </div>
        <div className="flex-1 space-y-4">
          <p className="text-sm text-muted-foreground">
            Mỗi lượt Nhà tuyển dụng xem CV mang đến một cơ hội để bạn gần hơn
            với công việc phù hợp.
          </p>
          <Button variant="outline">Khám phá ngay</Button>
        </div>
      </div>
    </div>
  );
};

export default CVOptimizeCTA;
