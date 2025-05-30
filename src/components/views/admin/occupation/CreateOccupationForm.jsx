'use client';

import {Button} from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {Input} from '@/components/ui/input';
import occupationApi from '@/redux/features/occupation/occupationQuery';
import {createOccupationValidator} from '@/validator/occupation';
import {zodResolver} from '@hookform/resolvers/zod';
import {useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {toast} from 'sonner';

const CreateOccupationForm = ({occupationId}) => {
  const isEditMode = Boolean(occupationId);
  const getOccupationQuery = occupationApi.useGetOccupationDetailQuery(
    {occupationId},
    {
      skip: !isEditMode,
    },
  );
  const [createOccupationMutation, {isLoading: isCreating}] =
    occupationApi.useCreateOccupationMutation();
  const [updateOccupationMutation, {isLoading: isUpdating}] =
    occupationApi.useUpdateOccupationMutation();
  const isLoading = isCreating || isUpdating;
  const form = useForm({
    resolver: zodResolver(createOccupationValidator),
    defaultValues: {
      name: '',
    },
  });

  useEffect(() => {
    if (getOccupationQuery.isSuccess && isEditMode) {
      const occupationData = getOccupationQuery.data;
      form.reset({
        name: occupationData.name,
      });
    }
  }, [getOccupationQuery.isSuccess, isEditMode, getOccupationQuery.data, form]);

  const onSubmit = data => {
    const handler = isEditMode
      ? updateOccupationMutation({occupationId, ...data})
      : createOccupationMutation(data);

    handler
      .unwrap()
      .then(() => {
        if (isEditMode) {
          toast.success('Cập nhật ngành nghề thành công');
          return;
        }
        form.reset();
        toast.success('Tạo ngành nghề thành công');
      })
      .catch(err => {
        console.error('Error creating occupation:', err);

        toast.error(
          `Đã xảy ra lỗi trong quá trình ${isEditMode ? 'cập nhật' : 'tạo'} ngành nghề`,
        );
      });
  };

  if (isEditMode && getOccupationQuery.isError) {
    return (
      <div className="mx-auto max-w-2xl">
        <p className="text-center text-destructive">
          Không thể tải thông tin ngành nghề. Vui lòng thử lại sau.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({field}) => (
              <FormItem className="w-full">
                <FormLabel>Tên ngành nghề</FormLabel>
                <FormControl>
                  <Input placeholder="Nhập tên ngành nghề" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {isEditMode ? (
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading
                ? 'Đang cập nhật ngành nghề...'
                : 'Cập nhật ngành nghề'}
            </Button>
          ) : (
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Đang tạo ngành nghề...' : 'Tạo ngành nghề'}
            </Button>
          )}
        </form>
      </Form>
    </div>
  );
};

export default CreateOccupationForm;
