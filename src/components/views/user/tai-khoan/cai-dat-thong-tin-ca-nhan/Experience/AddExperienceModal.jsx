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
import candidateApi from '@/redux/features/candidate/candidateQuery';
import {addExperienceValidator} from '@/validator/candidate';
import {zodResolver} from '@hookform/resolvers/zod';
import {useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {toast} from 'sonner';

const AddExperienceModal = ({visible, onClose, data}) => {
  const isEdit = !!data;
  const [addExperienceMutation, {isLoading: isAdding}] =
    candidateApi.useAddWorkExperienceMutation();
  const [updateExperienceMutation, {isLoading: isEditting}] =
    candidateApi.useUpdateWorkExperienceMutation();

  const isLoading = isAdding || isEditting;

  const form = useForm({
    resolver: zodResolver(addExperienceValidator),
    defaultValues: {
      startDate: '',
      endDate: '',
      companyName: '',
      responsibilities: '',
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

  const onAddExperience = _data => {
    const payload = {
      ..._data,
      time: `${_data.startDate}|${_data.endDate}`,
      sort: 0,
    };

    if (isEdit) {
      payload.id = data.id;
    }

    const handler = isEdit ? updateExperienceMutation : addExperienceMutation;

    handler(payload)
      .unwrap()
      .then(res => {
        console.log('Thêm kinh nghiệm thành công', res);
        toast.success('Thêm kinh nghiệm thành công');
        onClose();
      })
      .catch(err => {
        console.log('Thêm kinh nghiệm thất bại', err);
        toast.error('Thêm kinh nghiệm thất bại');
      });
  };

  return (
    <Dialog open={visible} onOpenChange={onClose}>
      <DialogContent className="max-h-[80vh] overflow-auto border-none scrollbar-thin">
        <DialogHeader>
          <DialogTitle>{isEdit ? 'Chỉnh sửa' : 'Thêm'} kinh nghiệm</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form className="space-y-4">
            <FormField
              control={form.control}
              name="companyName"
              render={({field}) => (
                <FormItem className="w-full">
                  <FormLabel>Cơ sở đào tạo</FormLabel>
                  <FormControl>
                    <Input placeholder="Nhập tên công ty" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="responsibilities"
              render={({field}) => (
                <FormItem className="w-full">
                  <FormLabel>Chức vụ</FormLabel>
                  <FormControl>
                    <Input placeholder="Nhập chức vụ" {...field} />
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
            onClick={form.handleSubmit(onAddExperience)}>
            {isLoading
              ? 'Đang xử lí...'
              : isEdit
                ? 'Chỉnh sửa kinh nghiệm'
                : 'Thêm kinh nghiệm'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddExperienceModal;
