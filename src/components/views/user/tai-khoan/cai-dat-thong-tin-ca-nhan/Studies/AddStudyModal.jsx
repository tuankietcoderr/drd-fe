'use client';
import {Button} from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {Input} from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {DEGREE_CLASSIFICATION_LABEL} from '@/constants/enum';
import candidateApi from '@/redux/features/candidate/candidateQuery';
import {addStudyValidator} from '@/validator/candidate';
import {zodResolver} from '@hookform/resolvers/zod';
import {useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {toast} from 'sonner';

const AddStudyModal = ({visible, onClose, data}) => {
  const isEdit = !!data;
  const [addStudyMutation, {isLoading: isAdding}] =
    candidateApi.useAddStudyExperienceMutation();
  const [updateStudyMutation, {isLoading: isEditting}] =
    candidateApi.useUpdateStudyExperienceMutation();

  const isLoading = isAdding || isEditting;

  const form = useForm({
    resolver: zodResolver(addStudyValidator),
    defaultValues: {
      degreeClassification: '',
      major: '',
      institutionName: '',
      startDate: '',
      endDate: '',
    },
  });

  useEffect(() => {
    if (data) {
      form.reset({
        ...data,
        startDate: data.time.split('|')[0],
        endDate: data.time.split('|')[1],
      });
    }
  }, [data]);

  const onAddStudy = _data => {
    const payload = {
      ..._data,
      time: `${_data.startDate}|${_data.endDate}`,
      sort: 0,
    };

    if (isEdit) {
      payload.id = data.id;
    }

    const handler = isEdit ? updateStudyMutation : addStudyMutation;

    handler(payload)
      .unwrap()
      .then(res => {
        console.log('Thêm học vấn thành công', res);
        toast.success('Thêm học vấn thành công');
        onClose();
      })
      .catch(err => {
        console.log('Thêm học vấn thất bại', err);
        toast.error('Thêm học vấn thất bại');
      });
  };

  return (
    <Dialog open={visible} onOpenChange={onClose}>
      <DialogContent className="max-h-[80vh] overflow-auto border-none scrollbar-thin">
        <DialogHeader>
          <DialogTitle>{isEdit ? 'Chỉnh sửa' : 'Thêm'} học vấn</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form className="space-y-4">
            <FormField
              control={form.control}
              name="institutionName"
              render={({field}) => (
                <FormItem className="w-full">
                  <FormLabel>Cơ sở đào tạo</FormLabel>
                  <FormControl>
                    <Input placeholder="Nhập cơ sở đào tạo" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="major"
              render={({field}) => (
                <FormItem className="w-full">
                  <FormLabel>Chuyên ngành</FormLabel>
                  <FormControl>
                    <Input placeholder="Nhập chuyên ngành" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-4">
              <FormField
                control={form.control}
                name="startDate"
                render={({field}) => (
                  <FormItem className="w-full flex-1">
                    <FormLabel>Thời gian bắt đầu</FormLabel>
                    <FormControl>
                      <Input placeholder="Tháng/Năm" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="endDate"
                render={({field}) => (
                  <FormItem className="w-full flex-1">
                    <FormLabel>Thời gian kết thúc</FormLabel>
                    <FormControl>
                      <Input placeholder="Tháng/Năm" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="degreeClassification"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Xếp loại</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn xếp loại" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.values(DEGREE_CLASSIFICATION_LABEL).map(
                        degreeClassification => (
                          <SelectItem
                            key={degreeClassification}
                            value={degreeClassification}>
                            {degreeClassification}
                          </SelectItem>
                        ),
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary" type="button">
              Huỷ
            </Button>
          </DialogClose>
          <Button
            type="submit"
            className="flex-1"
            disabled={isLoading}
            onClick={form.handleSubmit(onAddStudy)}>
            {isLoading
              ? 'Đang xử lí...'
              : isEdit
                ? 'Chỉnh sửa học vấn'
                : 'Thêm học vấn'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddStudyModal;
