const BENEFITS = [
  {
    title: 'Nhận về các cơ hội tốt nhất',
    description:
      'CV của bạn sẽ được ưu tiên hiển thị với các nhà tuyển dụng đã xác thực. Nhận được lời mời với những cơ hội việc làm hấp dẫn từ các doanh nghiệp uy tín.',
  },
  {
    title: 'Theo dõi số liệu, tối ưu CV',
    description:
      'Theo dõi số lượt xem CV. Biết chính xác nhà tuyển dụng nào trên TopCV đang quan tâm đến CV của bạn.',
  },
  {
    title: 'Chia sẻ CV bất cứ nơi đâu',
    description:
      'Upload một lần và sử dụng đường link gửi tới nhiều nhà tuyển dụng.',
  },
  {
    title: 'Kết nối nhanh chóng với nhà tuyển dụng',
    description:
      'Dễ dàng kết nối với các nhà tuyển dụng nào xem và quan tâm tới CV của bạn.',
  },
];

const UploadCVBenefits = () => {
  return (
    <div className="grid grid-cols-2 gap-4">
      {BENEFITS.map((benefit, index) => (
        <div
          key={index}
          className="rounded-lg border p-4 text-center shadow-sm">
          <h3 className="font-medium">{benefit.title}</h3>
          <p className="text-sm text-muted-foreground">{benefit.description}</p>
        </div>
      ))}
    </div>
  );
};

export default UploadCVBenefits;
