'use client';

import MarkdownRender from '@/components/MarkdownRender';
import {Button} from '@/components/ui/button';
import cvReviewApi from '@/redux/features/cv-review/cvReviewQuery';
import cvReviewSelector from '@/redux/features/cv-review/cvReviewSelector';
import {cvReviewActions} from '@/redux/features/cv-review/cvReviewSlice';
import {useAppDispatch, useAppSelector} from '@/redux/hooks';
import {Rocket, WandSparkles} from 'lucide-react';
import {useState} from 'react';
import {toast} from 'sonner';
import CVOptimizer from './CVOptimizer';

const CVReview = () => {
  const dispatch = useAppDispatch();
  const file = useAppSelector(cvReviewSelector.selectFile);

  const [reviewCVMutation, {isLoading: isReviewLoading, data}] =
    cvReviewApi.useReviewSuggestMutation();
  const [preReviewCVMutation, {isLoading: isPreviewLoading}] =
    cvReviewApi.usePreReviewMutation();

  const isLoading = isReviewLoading || isPreviewLoading;

  const [showOptimizeCV, setShowOptimizeCV] = useState(false);

  const handleReviewCV = () => {
    preReviewCVMutation({file})
      .unwrap()
      .then(res => {
        dispatch(cvReviewActions.setMarkdownContent(res.markdown_content));
        reviewCVMutation({file})
          .unwrap()
          .then(response => {
            dispatch(cvReviewActions.setSuggestions(response.suggestions));
          })
          .catch(error => {
            console.log('CV review error:', error);
            toast.error('Có lỗi xảy ra trong quá trình đánh giá CV');
          });
      })
      .catch(err => {
        console.log('Error uploading CV:', err);
        toast.error('Có lỗi xảy ra trong quá trình đánh giá CV');
      });
  };

  return (
    file && (
      <div className="space-y-4">
        <div className="overflow-hidden rounded-lg border border-primary">
          <h2 className="inline-flex w-full items-center gap-2 bg-primary p-4 text-lg font-bold">
            <WandSparkles className="text-primary-foreground" />
            <span className="text-primary-foreground">Đánh giá CV</span>
          </h2>
          <div className="p-4">
            {isLoading ? (
              <p className="text-sm text-muted-foreground">
                {isPreviewLoading
                  ? 'Đang phân tích CV...'
                  : isReviewLoading
                    ? 'Đang đánh giá CV...'
                    : ''}
              </p>
            ) : (
              <div className="space-y-4">
                {data && (
                  <>
                    <p>
                      Loại khuyết tật:{' '}
                      <span className="font-semibold">
                        {data.review.disability_type}
                      </span>
                    </p>
                    <MarkdownRender className="max-w-none text-sm">
                      {data.review.review_result}
                    </MarkdownRender>
                  </>
                )}
                {!data && !isLoading && (
                  <Button
                    variant="outline"
                    onClick={handleReviewCV}
                    disabled={!file}>
                    <WandSparkles />
                    Đánh giá ngay
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
        {data && !showOptimizeCV && (
          <Button onClick={() => setShowOptimizeCV(prev => !prev)}>
            <Rocket />
            Cải thiện CV
          </Button>
        )}
        {showOptimizeCV && (
          <CVOptimizer onClose={() => setShowOptimizeCV(false)} />
        )}
      </div>
    )
  );
};

export default CVReview;
