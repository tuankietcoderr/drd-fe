'use client';

import {Button} from '@/components/ui/button';
import ScreenLoader from '@/components/views/ScreenLoader';
import candidateApi from '@/redux/features/candidate/candidateQuery';
import {Plus} from 'lucide-react';
import dynamic from 'next/dynamic';
import {useState} from 'react';
import StudyItem, {StudyItemSkeleton} from './StudyItem';

const AddStudyModal = dynamic(() => import('./AddStudyModal'), {
  ssr: false,
  loading: () => <ScreenLoader />,
});

const Studies = () => {
  const {data, isLoading, isError, isSuccess} =
    candidateApi.useGetStudyExperienceQuery();
  const [showAddStudyModal, setShowAddStudyModal] = useState(false);

  return (
    <>
      <div className="space-y-4 rounded-lg border bg-background p-4">
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-lg font-semibold">Học vấn</h2>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setShowAddStudyModal(true)}>
            <Plus />
          </Button>
        </div>
        <div className="space-y-2">
          {isLoading ? (
            Array.from({length: 3}).map((_, index) => (
              <StudyItemSkeleton key={index} />
            ))
          ) : isError ? (
            <p className="text-sm text-muted-foreground">
              Không thể tải thông tin học vấn. Vui lòng thử lại sau.
            </p>
          ) : isSuccess ? (
            data.length > 0 ? (
              data.map(item => <StudyItem study={item} key={item.id} />)
            ) : (
              <p className="text-sm text-muted-foreground">Chưa có thông tin</p>
            )
          ) : null}
        </div>
      </div>

      {showAddStudyModal && (
        <AddStudyModal
          visible={showAddStudyModal}
          onClose={() => setShowAddStudyModal(false)}
        />
      )}
    </>
  );
};

export default Studies;
