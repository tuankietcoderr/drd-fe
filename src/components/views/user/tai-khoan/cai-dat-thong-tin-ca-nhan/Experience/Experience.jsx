'use client';

import {Button} from '@/components/ui/button';
import ScreenLoader from '@/components/views/ScreenLoader';
import candidateApi from '@/redux/features/candidate/candidateQuery';
import {Plus} from 'lucide-react';
import dynamic from 'next/dynamic';
import {useState} from 'react';
import ExperienceItem, {ExperienceItemSkeleton} from './ExperienceItem';

const AddExperienceModal = dynamic(() => import('./AddExperienceModal'), {
  ssr: false,
  loading: () => <ScreenLoader />,
});

const Experience = () => {
  const {data, isLoading, isError, isSuccess} =
    candidateApi.useGetWorkExperienceQuery();
  const [showAddExperienceModal, setShowAddExperienceModal] = useState(false);

  return (
    <>
      <div className="space-y-4 rounded-lg border bg-background p-4">
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-lg font-semibold">Kinh nghiệm</h2>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setShowAddExperienceModal(true)}>
            <Plus />
          </Button>
        </div>
        <div className="space-y-2">
          {isLoading ? (
            Array.from({length: 3}).map((_, index) => (
              <ExperienceItemSkeleton key={index} />
            ))
          ) : isError ? (
            <p className="text-sm text-muted-foreground">
              Không thể tải thông tin kinh nghiệm. Vui lòng thử lại sau.
            </p>
          ) : isSuccess ? (
            data.length > 0 ? (
              data.map(item => (
                <ExperienceItem experience={item} key={item.id} />
              ))
            ) : (
              <p className="text-sm text-muted-foreground">Chưa có thông tin</p>
            )
          ) : null}
        </div>
      </div>

      {showAddExperienceModal && (
        <AddExperienceModal
          visible={showAddExperienceModal}
          onClose={() => setShowAddExperienceModal(false)}
        />
      )}
    </>
  );
};

export default Experience;
