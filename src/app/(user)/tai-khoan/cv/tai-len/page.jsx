import UploadCV from '@/components/views/user/tai-khoan/cv/tai-len/UploadCV';
import UploadCVBenefits from '@/components/views/user/tai-khoan/cv/tai-len/UploadCVBenefits';

const page = () => {
  return (
    <div className="overflow-hidden rounded-lg border bg-background shadow-sm">
      <div className="space-y-2 bg-gradient-to-r from-primary to-primary/70 p-8 text-primary-foreground">
        <h3 className="text-xl font-bold">
          Tải lên CV để các cơ hội việc làm tự tìm đến bạn
        </h3>
        <p>
          Giảm đến 50% thời gian cần thiết để tìm được một công việc phù hợp
        </p>
      </div>
      <div className="space-y-4 p-8">
        <p className="text-sm">
          Bạn đã có sẵn CV của mình, chỉ cần tải CV lên, hệ thống sẽ tự động đề
          xuất CV của bạn tới những nhà tuyển dụng uy tín.
          <br />
          Tiết kiệm thời gian, tìm việc thông minh, nắm bắt cơ hội và làm chủ
          đường đua nghề nghiệp của chính mình.
        </p>
        <UploadCV />
        <hr />
        <UploadCVBenefits />
      </div>
    </div>
  );
};

export default page;
