'use client';

import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Textarea} from '@/components/ui/textarea';
import useTextToSpeech from '@/hooks/useTextToSpeech';
import cvReviewApi from '@/redux/features/cv-review/cvReviewQuery';
import cvReviewSelector from '@/redux/features/cv-review/cvReviewSelector';
import {cvReviewActions} from '@/redux/features/cv-review/cvReviewSlice';
import {useAppDispatch, useAppSelector} from '@/redux/hooks';
import {Download, Eye, Rocket, Sparkles, Volume2} from 'lucide-react';
import {useEffect, useState} from 'react';
import {toast} from 'sonner';

const CVOptimizer = ({onClose}) => {
  const dispatch = useAppDispatch();
  const suggestions = useAppSelector(cvReviewSelector.selectSuggestions);
  const markdownContent = useAppSelector(
    cvReviewSelector.selectMarkdownContent,
  );
  const [fixCVMutation, {isLoading: isFixing, data: fixedCV, isSuccess}] =
    cvReviewApi.useFixCVToPdfMutation();
  const {startSpeech} = useTextToSpeech({
    lang: 'vi-VN',
  });

  const {
    recommendations = {},
    missing_criteria = [],
    improvement_needed = [],
    de_xuat = {},
  } = suggestions;

  const [optimizeContent, setOptimizeContent] = useState('');
  const [optimizeData, setOptimizeData] = useState([]);

  useEffect(() => {
    setOptimizeData(
      [...improvement_needed, ...missing_criteria].map(item => ({
        key: item,
        label: de_xuat[item] ?? '',
        rcm: recommendations[item] ?? '',
        value: '',
      })),
    );
  }, [de_xuat, improvement_needed, missing_criteria, recommendations]);

  const onChangeInput = (key, value) => {
    setOptimizeData(prev => {
      const newData = [...prev];
      const index = newData.findIndex(data => data.key === key);
      if (index !== -1) {
        newData[index].value = value;
      }
      return newData;
    });
  };

  const handleOptimizeCV = () => {
    const filledCriteria = [...optimizeData].reduce((acc, item) => {
      acc[item.key] = item.value;
      return acc;
    }, {});

    const loadingId = toast.loading('Đang tối ưu CV...', {
      duration: 0,
    });

    fixCVMutation({
      additional_text: optimizeContent,
      markdown_content: markdownContent,
      filled_criteria: filledCriteria,
    })
      .unwrap()
      .then(() => {
        setOptimizeContent('');
        toast.dismiss(loadingId);
        toast.success('Tối ưu CV thành công');
      })
      .catch(error => {
        toast.dismiss(loadingId);
        toast.error('Có lỗi xảy ra trong quá trình tối ưu CV');
        console.log('CV optimization error:', error);
      });
  };

  const onDownloadCV = () => {
    const url = URL.createObjectURL(fixedCV);
    const a = document.createElement('a');
    a.href = url;
    a.setAttribute('download', 'optimized_cv.pdf');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('Tải xuống CV thành công');
  };

  const onPreviewCV = () => {
    dispatch(cvReviewActions.setFile(fixedCV));
  };

  return (
    <div className="space-y-2 overflow-hidden rounded-lg border border-primary">
      <h2 className="inline-flex w-full items-center gap-2 bg-primary p-4 text-lg font-bold">
        <Rocket className="text-primary-foreground" />
        <span className="text-primary-foreground">Tối ưu CV</span>
      </h2>
      <div className="space-y-4 p-4">
        {optimizeData.length > 0 && !isSuccess && (
          <div className="space-y-4">
            {optimizeData.map(item => (
              <OptimizerInput
                key={item.key}
                item={item}
                onChange={onChangeInput}
              />
            ))}
          </div>
        )}
        {!isSuccess && (
          <div className="space-y-2">
            <Label htmlFor={`CV_SUGGEST_OTHER`}>Khác</Label>
            <Textarea
              id={`CV_SUGGEST_OTHER`}
              placeholder="Nhập nội dung bổ sung của bạn"
              onChange={e => setOptimizeContent(e.target.value)}
              value={optimizeContent}
            />
            <p className="inline-flex items-center gap-2 text-sm font-medium text-primary">
              <Sparkles size={16} className="text-primary" />
              <span className="inline-block">
                <span>Bổ sung thêm nội dung để tối ưu CV của bạn.</span>

                <button
                  onClick={() =>
                    startSpeech('Bổ sung thêm nội dung để tối ưu CV của bạn.')
                  }
                  className="ml-2">
                  <Volume2 size={16} />
                </button>
              </span>
            </p>
          </div>
        )}

        <div className="flex flex-wrap items-center gap-2">
          {isFixing ? (
            <Button disabled>Đang tối ưu CV....</Button>
          ) : isSuccess ? (
            <>
              <Button onClick={onDownloadCV}>
                <Download />
                Tải xuống CV
              </Button>
              <Button onClick={onPreviewCV} variant="outline">
                <Eye />
                Xem trước CV
              </Button>
              <Button
                variant="ghost"
                type="button"
                onClick={() => {
                  window.scrollTo({
                    top: 0,
                    behavior: 'smooth',
                  });
                  location.href = '/danh-gia-cv';
                }}>
                Tải lên CV khác
              </Button>
            </>
          ) : (
            <>
              <Button onClick={handleOptimizeCV}>Hoàn tất</Button>
              <Button
                variant="ghost"
                type="button"
                onClick={() => {
                  setOptimizeContent('');
                  onClose();
                }}>
                Huỷ
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const OptimizerInput = ({onChange, item}) => {
  const {startSpeech} = useTextToSpeech({
    lang: 'vi-VN',
  });

  return (
    <div className="space-y-2">
      <Label htmlFor={`CV_SUGGEST_${item.key}`}>{item.label}</Label>
      <Input
        id={`CV_SUGGEST_${item.key}`}
        value={item.value}
        placeholder={`Nhập ${item.label.toLowerCase()} của bạn`}
        onChange={e => onChange(item.key, e.target.value)}
      />
      <p className="inline-flex gap-2 text-sm font-medium text-primary">
        <Sparkles size={16} className="text-primary" />
        <span className="inline-block flex-1">
          {item.rcm}
          <button onClick={() => startSpeech(item.rcm)} className="ml-2">
            <Volume2 size={16} />
          </button>
        </span>
      </p>
    </div>
  );
};

export default CVOptimizer;
