'use client';
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';
import {Button} from '@/components/ui/button';
import Formatter from '@/utils/formatter';
import {UserRoundPen} from 'lucide-react';

const CandidateProfileDetail = ({candidate, showEdit = false, onOpenEdit}) => {
  return (
    <div className="space-y-4 rounded-lg border bg-background p-4 shadow-sm">
      <div className="flex items-center gap-4">
        <Avatar className="size-20 border">
          <AvatarImage src={candidate.avatar} alt={candidate.name} />
          <AvatarFallback className="text-xl font-bold">
            {candidate.name?.charAt(0).toUpperCase() || 'U'}
          </AvatarFallback>
        </Avatar>
        {showEdit && (
          <div className="flex-1">
            <Button onClick={onOpenEdit} variant="outline">
              <UserRoundPen />
              Chỉnh sửa thông tin
            </Button>
          </div>
        )}
      </div>
      <p className="text-xs text-muted-foreground">
        Cập nhật lần cuối vào{' '}
        <span>
          {Formatter.date(candidate.updatedAt).format('DD/MM/YYYY [lúc] HH:mm')}
        </span>
      </p>
      <div className="space-y-4 text-sm">
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground">Tên</p>
          <p className="font-medium">{candidate.name}</p>
        </div>
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground">Giới tính</p>
          <p className="font-medium">
            {candidate.gender || 'Không có thông tin'}
          </p>
        </div>
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground">Trạng thái làm việc</p>
          <p className="font-medium">
            {candidate.currentJobStatus || 'Không có thông tin'}
          </p>
        </div>
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground">Email</p>
          <p className="font-medium">{candidate.email}</p>
        </div>
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground">Số điện thoại</p>
          <p className="font-medium">{candidate.phone}</p>
        </div>
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground">Địa chỉ hiện tại</p>
          <p className="font-medium">
            {candidate.currentAddress || 'Không có thông tin'}
          </p>
        </div>
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground">Trình độ học vấn</p>
          <p className="font-medium">
            {candidate.professionalLevel || 'Không có thông tin'}
          </p>
        </div>
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground">Trình độ chuyên môn</p>
          <p className="font-medium">
            {candidate.qualificationLevel || 'Không có thông tin'}
          </p>
        </div>
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground">Tình trạng khuyết tật</p>
          <p className="font-medium">
            {candidate.disabilityStatus.join(', ') || 'Không có thông tin'}
          </p>
        </div>
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground">Lý do khuyết tật</p>
          <p className="font-medium">
            {candidate.disabilityCause || 'Không có thông tin'}
          </p>
        </div>
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground">Tình trạng sức khoẻ</p>
          <p className="font-medium">
            {candidate.healthStatus || 'Không có thông tin'}
          </p>
        </div>
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground">Mức lương mong muốn</p>
          <p className="font-medium">
            {candidate.expectedSalary || 'Không có thông tin'}
          </p>
        </div>
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground">Hoàn cảnh kinh tế</p>
          <p className="font-medium">
            {candidate.economicStatus || 'Không có thông tin'}
          </p>
        </div>
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground">Chuyên ngành</p>
          <p className="font-medium">
            {candidate.major || 'Không có thông tin'}
          </p>
        </div>
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground">Sở thích</p>
          <p className="font-medium">
            {candidate.hobbies || 'Không có thông tin'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CandidateProfileDetail;
