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
import locationApi from '@/redux/features/location/locationQuery';
import {createLocationValidator} from '@/validator/location';
import {zodResolver} from '@hookform/resolvers/zod';
import {useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {toast} from 'sonner';

const CreateLocationForm = ({locationId}) => {
  const isEditMode = Boolean(locationId);
  const getLocationQuery = locationApi.useGetLocationDetailQuery(
    {locationId},
    {
      skip: !isEditMode,
    },
  );
  const [createLocationMutation, {isLoading: isCreating}] =
    locationApi.useCreateLocationMutation();
  const [updateLocationMutation, {isLoading: isUpdating}] =
    locationApi.useUpdateLocationMutation();
  const isLoading = isCreating || isUpdating;
  const form = useForm({
    resolver: zodResolver(createLocationValidator),
    defaultValues: {
      name: '',
    },
  });

  useEffect(() => {
    if (getLocationQuery.isSuccess && isEditMode) {
      const locationData = getLocationQuery.data;
      form.reset({
        name: locationData.name,
      });
    }
  }, [getLocationQuery.isSuccess, isEditMode, getLocationQuery.data, form]);

  const onSubmit = data => {
    const handler = isEditMode
      ? updateLocationMutation({locationId, ...data})
      : createLocationMutation(data);

    handler
      .unwrap()
      .then(() => {
        if (isEditMode) {
          toast.success('Cập nhật địa điểm thành công');
          return;
        }
        form.reset();
        toast.success('Tạo địa điểm thành công');
      })
      .catch(err => {
        console.error('Error creating location:', err);

        toast.error(
          `Đã xảy ra lỗi trong quá trình ${isEditMode ? 'cập nhật' : 'tạo'} địa điểm`,
        );
      });
  };

  if (isEditMode && getLocationQuery.isError) {
    return (
      <div className="mx-auto max-w-2xl">
        <p className="text-center text-destructive">
          Không thể tải thông tin địa điểm. Vui lòng thử lại sau.
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
                <FormLabel>Tên địa điểm</FormLabel>
                <FormControl>
                  <Input placeholder="Nhập tên địa điểm" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {isEditMode ? (
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Đang cập nhật địa điểm...' : 'Cập nhật địa điểm'}
            </Button>
          ) : (
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Đang tạo địa điểm...' : 'Tạo địa điểm'}
            </Button>
          )}
        </form>
      </Form>
    </div>
  );
};

export default CreateLocationForm;
