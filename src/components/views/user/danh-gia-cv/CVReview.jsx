'use client';

import MarkdownRender from '@/components/MarkdownRender';
import {Button} from '@/components/ui/button';
import useTextToSpeech from '@/hooks/useTextToSpeech';
import cvReviewApi from '@/redux/features/cv-review/cvReviewQuery';
import cvReviewSelector from '@/redux/features/cv-review/cvReviewSelector';
import {cvReviewActions} from '@/redux/features/cv-review/cvReviewSlice';
import {useAppDispatch, useAppSelector} from '@/redux/hooks';
import {Rocket, WandSparkles} from 'lucide-react';
import {useEffect, useState} from 'react';
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
    const previewToastId = toast.loading('Đang phân tích CV...', {
      duration: 0,
    });
    preReviewCVMutation({file})
      .unwrap()
      .then(res => {
        dispatch(cvReviewActions.setMarkdownContent(res.markdown_content));
        const reviewToastId = toast.loading('Đang đánh giá CV...', {
          duration: 0,
        });
        reviewCVMutation({file})
          .unwrap()
          .then(response => {
            toast.dismiss(reviewToastId);
            dispatch(cvReviewActions.setSuggestions(response.suggestions));
            toast.success('Đánh giá CV thành công');
          })
          .catch(error => {
            toast.dismiss(reviewToastId);
            console.log('CV review error:', error);
            toast.error('Có lỗi xảy ra trong quá trình đánh giá CV');
          });
      })
      .catch(err => {
        console.log('Error uploading CV:', err);
        toast.error('Có lỗi xảy ra trong quá trình đánh giá CV');
      })
      .finally(() => {
        toast.dismiss(previewToastId);
      });
  };

  const {startSpeech} = useTextToSpeech({
    lang: 'vi-VN',
  });

  useEffect(() => {
    if (data) {
      const markdownRenderer = document.getElementById('markdown-renderer');
      if (!markdownRenderer) return;

      const pElems = markdownRenderer.querySelectorAll('p');
      pElems.forEach(p => {
        const firstChild = p.firstChild;
        if (firstChild && firstChild.nodeName === 'STRONG') {
          const innerText = firstChild.innerText;
          const text = p.innerText.replace(innerText?.concat(':'), '');
          const button = document.createElement('button');
          button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-volume2 lucide-volume-2 cursor-pointer"><path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z"></path><path d="M16 9a5 5 0 0 1 0 6"></path><path d="M19.364 18.364a9 9 0 0 0 0-12.728"></path></svg>`;
          firstChild.className = 'inline-flex items-center gap-2';
          button.onclick = () => {
            startSpeech(text);
          };
          firstChild.appendChild(button);
          return;
        }
      });
    }
  }, [data]);

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
                    <MarkdownRender className="max-w-none text-sm text-card-foreground *:text-card-foreground prose-strong:text-card-foreground">
                      {data.review.review_result?.replace('```markdown\n', '')}
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
