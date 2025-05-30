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
import {Textarea} from '@/components/ui/textarea';
import recruiterApi from '@/redux/features/recruiter/recruiterQuery';
import uploadApi from '@/redux/features/upload/uploadQuery';
import {updateProfileValidator} from '@/validator/recruiter';
import {zodResolver} from '@hookform/resolvers/zod';
import Image from 'next/image';
import {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {toast} from 'sonner';

const ProfileForm = () => {
  const getRecruiterInfoQuery = recruiterApi.useGetRecruiterInfoQuery();
  const [file, setFile] = useState(null);
  const [uploadFileMutation, {isLoading: isUploading}] =
    uploadApi.useUploadFileMutation();
  const [updateRecruiterProfileMutation, {isLoading: isUpdating}] =
    recruiterApi.useUpdateRecruiterProfileMutation();
  const isLoading = isUploading || isUpdating;
  const form = useForm({
    resolver: zodResolver(updateProfileValidator),
    defaultValues: {
      businessType: '',
      companyName: '',
      description: '',
      phone: '',
      email: '',
      address: '',
      avatar: null,
    },
  });

  useEffect(() => {
    if (getRecruiterInfoQuery.isSuccess) {
      const recruiterInfo = getRecruiterInfoQuery.data;
      form.reset({
        businessType: recruiterInfo.businessType || '',
        companyName: recruiterInfo.companyName || '',
        description: recruiterInfo.description || '',
        phone: recruiterInfo.phone || '',
        email: recruiterInfo.email || '',
        address: recruiterInfo.address || '',
        avatar: recruiterInfo.avatar || null,
      });
    }
  }, [getRecruiterInfoQuery.data, getRecruiterInfoQuery.isSuccess, form]);

  const onChangeAvatar = e => {
    e.preventDefault();
    const file = e.target.files[0];
    if (file) {
      setFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        form.setValue('avatar', reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      form.setValue('avatar', null);
      setFile(null);
    }
  };

  const uploadFile = async () => {
    if (!file) {
      return Promise.resolve();
    }

    return uploadFileMutation({file})
      .unwrap()
      .then(res => {
        return Promise.resolve(res);
      })
      .catch(() => {
        return Promise.reject('Failed to update avatar');
      });
  };

  const onSubmit = async data => {
    uploadFile().then(uploaded => {
      console.log('Uploaded file:', uploaded);
      const payload = {
        ...data,
        avatar: uploaded.url || null,
      };
      updateRecruiterProfileMutation(payload)
        .unwrap()
        .then(() => {
          toast.success('Cập nhật thông tin thành công');
        })
        .catch(err => {
          console.error('Error updating profile:', err);
          toast.error('Cập nhật thông tin thất bại');
        });
    });
  };

  if (getRecruiterInfoQuery.isError) {
    return (
      <div className="mx-auto max-w-2xl">
        <p className="text-center text-destructive">
          Không thể tải thông tin. Vui lòng thử lại sau.
        </p>
      </div>
    );
  }

  if (getRecruiterInfoQuery.isLoading) {
    return (
      <div className="mx-auto max-w-2xl">
        <p className="text-center">Đang tải thông tin...</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="companyName"
            render={({field}) => (
              <FormItem className="w-full">
                <FormLabel>Tên công ty</FormLabel>
                <FormControl>
                  <Input placeholder="Nhập tên công ty" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({field}) => (
              <FormItem className="w-full">
                <FormLabel>Mô tả công ty</FormLabel>
                <FormControl>
                  <Textarea placeholder="Nhập mô tả công ty" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="businessType"
            render={({field}) => (
              <FormItem className="w-full">
                <FormLabel>Loại hình doanh nghiệp</FormLabel>
                <FormControl>
                  <Input placeholder="Nhập loại hình doanh nghiệp" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address"
            render={({field}) => (
              <FormItem className="w-full">
                <FormLabel>Địa chỉ</FormLabel>
                <FormControl>
                  <Input placeholder="Nhập địa chỉ công ty" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({field}) => (
              <FormItem className="w-full">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Nhập email liên hệ" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({field}) => (
              <FormItem className="w-full">
                <FormLabel>Số điện thoại</FormLabel>
                <FormControl>
                  <Input placeholder="Nhập số điện thoại liên hệ" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="avatar"
            render={({field}) => (
              <FormItem className="w-full">
                <FormLabel>Ảnh đại diện</FormLabel>
                <Image
                  src={form.watch('avatar') || '/images/default-avatar.png'}
                  alt="Avatar"
                  width={100}
                  height={100}
                  className="border"
                  unoptimized
                />
                <FormControl>
                  <Input
                    type="file"
                    placeholder="Nhập URL ảnh đại diện"
                    accept="image/*"
                    onChange={onChangeAvatar}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Đang cập nhật...' : 'Cập nhật thông tin'}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ProfileForm;
