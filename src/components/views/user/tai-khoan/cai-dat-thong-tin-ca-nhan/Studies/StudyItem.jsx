import {Button} from '@/components/ui/button';
import ScreenLoader from '@/components/views/ScreenLoader';
import candidateApi from '@/redux/features/candidate/candidateQuery';
import {PenBox, Trash2} from 'lucide-react';
import dynamic from 'next/dynamic';
import {useState} from 'react';
import {toast} from 'sonner';

const AddStudyModal = dynamic(() => import('./AddStudyModal'), {
  ssr: false,
  loading: () => <ScreenLoader />,
});

const StudyItem = ({study}) => {
  const [showEditStudyModal, setShowEditStudyModal] = useState(false);

  const [deleteStudyMutation] = candidateApi.useDeleteStudyExperienceMutation();

  const onDeleteStudy = () => {
    const yes = confirm(
      'Bạn có chắc chắn muốn xóa thông tin học vấn này không?',
    );
    if (yes) {
      deleteStudyMutation({id: study.id})
        .unwrap()
        .then(res => {
          console.log('Xóa học vấn thành công', res);
          toast.success('Xóa học vấn thành công');
        })
        .catch(err => {
          console.log('Xóa học vấn thất bại', err);
          toast.error('Xóa học vấn thất bại');
        });
    }
  };

  return (
    <>
      <div className="group flex justify-between gap-2">
        <div>
          <h3 className="text-lg font-semibold">{study.institutionName}</h3>
          <p className="text-sm font-medium">{study.major}</p>
          <p className="text-sm text-muted-foreground">
            {study.time.split('|').join(' - ')}
          </p>
        </div>
        <div className="invisible space-x-1 group-hover:visible">
          <Button
            variant="ghost"
            onClick={() => setShowEditStudyModal(true)}
            size="icon">
            <PenBox />
          </Button>
          <Button variant="ghost" onClick={onDeleteStudy} size="icon">
            <Trash2 className="text-destructive" />
          </Button>
        </div>
      </div>

      {showEditStudyModal && (
        <AddStudyModal
          visible={showEditStudyModal}
          onClose={() => setShowEditStudyModal(false)}
          data={study}
        />
      )}
    </>
  );
};

export const StudyItemSkeleton = () => {
  return (
    <div className="space-y-2">
      <div className="h-4 w-1/2 animate-pulse rounded bg-muted" />
      <div className="h-4 w-1/3 animate-pulse rounded bg-muted" />
      <div className="h-4 w-1/4 animate-pulse rounded bg-muted" />
    </div>
  );
};

export default StudyItem;
