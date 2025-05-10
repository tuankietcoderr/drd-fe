'use client';

import {Button} from '@/components/ui/button';
import {Textarea} from '@/components/ui/textarea';
import cvReviewApi from '@/redux/features/cv-review/cvReviewQuery';
import cvReviewSelector from '@/redux/features/cv-review/cvReviewSelector';
import {cvReviewActions} from '@/redux/features/cv-review/cvReviewSlice';
import {useAppDispatch, useAppSelector} from '@/redux/hooks';
import {Download, Eye, Rocket} from 'lucide-react';
import {useState} from 'react';

const CVOptimizer = ({onClose}) => {
  const dispatch = useAppDispatch();
  const suggestions = useAppSelector(cvReviewSelector.selectSuggestions);
  const markdownContent = useAppSelector(
    cvReviewSelector.selectMarkdownContent,
  );
  const [fixCVMutation, {isLoading: isFixing, data: fixedCV, isSuccess}] =
    cvReviewApi.useFixCVToPdfMutation();

  const {
    recommendations = [],
    missingCriteria = [],
    improvement_needed = [],
  } = suggestions || {};
  const [optimizeContent, setOptimizeContent] = useState('');

  const handleOptimizeCV = () => {
    if (!optimizeContent) {
      alert('Vui lòng nhập nội dung CV của bạn');
      return;
    }

    fixCVMutation({
      additional_text: optimizeContent,
      markdown_content: markdownContent,
    })
      .unwrap()
      .then(response => {
        console.log('CV optimization response:', response);
        setOptimizeContent('');
        setShowOptimizeCV(false);
      })
      .catch(error => {
        toast.error('Có lỗi xảy ra trong quá trình tối ưu CV');
        console.log('CV optimization error:', error);
      });
  };

  const onDownloadCV = () => {
    const blob = new Blob([fixedCV], {type: 'application/pdf'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'optimized_cv.pdf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    alert('Tải xuống CV thành công');
  };

  const onPreviewCV = () => {
    const blob = new Blob([fixedCV], {type: 'application/pdf'});
    dispatch(cvReviewActions.setFile(blob));
  };

  return (
    <div className="space-y-2 overflow-hidden rounded-lg border border-primary">
      <h2 className="inline-flex w-full items-center gap-2 bg-primary p-4 text-lg font-bold">
        <Rocket className="text-primary-foreground" />
        <span className="text-primary-foreground">Tối ưu CV</span>
      </h2>
      <div className="space-y-4 p-4">
        {improvement_needed.length > 0 && (
          <div>
            <p className="font-semibold">Gợi ý cải thiện:</p>
          </div>
        )}
        <p className="text-sm text-muted-foreground">
          Bổ sung thêm nội dung để tối ưu CV của bạn.
        </p>
        <Textarea
          placeholder="Nhập nội dung CV của bạn tại đây..."
          onChange={e => setOptimizeContent(e.target.value)}
          value={optimizeContent}
        />
        {isFixing ? (
          <Button disabled>Đang tối ưu CV....</Button>
        ) : isSuccess ? (
          <>
            <Button onClick={onDownloadCV}>
              <Download />
              Tải xuống CV
            </Button>
            <Button onClick={onPreviewCV} variant="outline" className="ml-2">
              <Eye />
              Xem trước CV
            </Button>
          </>
        ) : (
          <Button onClick={handleOptimizeCV}>Hoàn tất</Button>
        )}
        <Button
          className="ml-2"
          variant="ghost"
          type="button"
          onClick={() => {
            setOptimizeContent('');
            onClose();
          }}>
          Huỷ
        </Button>
      </div>
    </div>
  );
};

export default CVOptimizer;
