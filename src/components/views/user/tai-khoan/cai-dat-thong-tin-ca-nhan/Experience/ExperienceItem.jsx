import {Button} from '@/components/ui/button';
import ScreenLoader from '@/components/views/ScreenLoader';
import candidateApi from '@/redux/features/candidate/candidateQuery';
import {PenBox, Trash2} from 'lucide-react';
import dynamic from 'next/dynamic';
import {useState} from 'react';
import {toast} from 'sonner';

const AddExperienceModal = dynamic(() => import('./AddExperienceModal'), {
  ssr: false,
  loading: () => <ScreenLoader />,
});

const ExperienceItem = ({experience}) => {
  const [showEditExperienceModal, setShowEditExperienceModal] = useState(false);

  const [deleteExperienceMutation] =
    candidateApi.useDeleteWorkExperienceMutation();

  const onDeleteExperience = () => {
    const yes = confirm(
      'Bạn có chắc chắn muốn xóa thông tin kinh nghiệm này không?',
    );
    if (yes) {
      deleteExperienceMutation({id: experience.id})
        .unwrap()
        .then(res => {
          console.log('Xóa kinh nghiệm thành công', res);
          toast.success('Xóa kinh nghiệm thành công');
        })
        .catch(err => {
          console.log('Xóa kinh nghiệm thất bại', err);
          toast.error('Xóa kinh nghiệm thất bại');
        });
    }
  };

  return (
    <>
      <div className="group flex justify-between gap-2">
        <div>
          <h3 className="text-lg font-semibold">{experience.companyName}</h3>
          <p className="text-sm font-medium">{experience.responsibilities}</p>
          <p className="text-sm text-muted-foreground">
            {experience.time.split('|').join(' - ')}
          </p>
        </div>
        <div className="invisible space-x-1 group-hover:visible">
          <Button
            variant="ghost"
            onClick={() => setShowEditExperienceModal(true)}
            size="icon">
            <PenBox />
          </Button>
          <Button variant="ghost" onClick={onDeleteExperience} size="icon">
            <Trash2 className="text-destructive" />
          </Button>
        </div>
      </div>

      {showEditExperienceModal && (
        <AddExperienceModal
          visible={showEditExperienceModal}
          onClose={() => setShowEditExperienceModal(false)}
          data={experience}
        />
      )}
    </>
  );
};

export const ExperienceItemSkeleton = () => {
  return (
    <div className="space-y-2">
      <div className="h-4 w-1/2 animate-pulse rounded bg-muted" />
      <div className="h-4 w-1/3 animate-pulse rounded bg-muted" />
      <div className="h-4 w-1/4 animate-pulse rounded bg-muted" />
    </div>
  );
};

export default ExperienceItem;
