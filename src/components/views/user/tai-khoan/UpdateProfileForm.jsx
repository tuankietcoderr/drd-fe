'use client';

import {Button} from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Form,
  FormControl,
  FormDescription,
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
import {
  DISABILITY_TYPE_ARRAY,
  PROFESSIONAL_LEVEL_ARRAY,
  QUALIFICATION_REQUIREMENT_ARRAY,
} from '@/constants/enum';
import candidateApi from '@/redux/features/candidate/candidateQuery';
import candidateSelector from '@/redux/features/candidate/candidateSelector';
import uploadApi from '@/redux/features/upload/uploadQuery';
import {useAppSelector} from '@/redux/hooks';
import {updateCandidateInfoValidator} from '@/validator/candidate';
import {zodResolver} from '@hookform/resolvers/zod';
import {ChevronsUpDown} from 'lucide-react';
import Image from 'next/image';
import {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {toast} from 'sonner';

const UpdateProfileForm = ({onClose}) => {
  const candidate = useAppSelector(candidateSelector.selectCandidate);
  const [updateCandidateInfoMutation, {isLoading: isUpdating}] =
    candidateApi.useUpdateCandidateInfoMutation();
  const [uploadFileMutation, {isLoading: isUploading}] =
    uploadApi.useUploadFileMutation();
  const isLoading = isUploading || isUpdating;
  const [file, setFile] = useState(null);
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  const form = useForm({
    resolver: zodResolver(updateCandidateInfoValidator),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      avatar: '',
      currentAddress: '',
      disabilityCause: '',
      disabilityStatus: [],
      economicStatus: '',
      educationLevel: '',
      professionalLevel: '',
      healthStatus: '',
      expectedSalary: 0,
      major: '',
      hobbies: '',
    },
  });

  useEffect(() => {
    if (candidate) {
      form.reset({
        name: candidate.name || '',
        email: candidate.email || '',
        phone: candidate.phone || '',
        avatar: candidate.avatar || '',
        currentJobStatus: candidate.currentJobStatus || '',
        currentAddress: candidate.currentAddress || '',
        disabilityCause: candidate.disabilityCause || '',
        disabilityStatus: candidate.disabilityStatus || [],
        economicStatus: candidate.economicStatus || '',
        qualificationLevel: candidate.qualificationLevel || '',
        professionalLevel: candidate.professionalLevel || '',
        healthStatus: candidate.healthStatus || '',
        expectedSalary: candidate.expectedSalary || 0,
        major: candidate.major || '',
        qualificationLevel: candidate.qualificationLevel || '',
        hobbies: candidate.hobbies || '',
      });
    }
  }, [candidate, form]);

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
      return Promise.resolve(null);
    }

    return uploadFileMutation({file})
      .unwrap()
      .then(res => {
        return Promise.resolve(res);
      })
      .catch(() => {
        return Promise.reject('Lỗi khi cập nhật ảnh đại diện');
      });
  };

  const onSubmit = data => {
    uploadFile().then(uploaded => {
      const payload = {
        ...data,
        candidateId: candidate.id,
      };
      if (uploaded) {
        payload.avatar = uploaded.url;
      }
      updateCandidateInfoMutation(payload)
        .unwrap()
        .then(() => {
          toast.success('Cập nhật thông tin thành công');
          onClose();
        })
        .catch(err => {
          toast.error('Cập nhật thông tin thất bại');
        });
    });
  };

  return (
    <div className="space-y-4 rounded-lg border bg-background p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Chỉnh sửa thông tin</h2>
        <Button variant="outline" onClick={onClose}>
          Huỷ
        </Button>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4"
          key={isClient ? 'client' : 'server'}>
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

          <FormField
            control={form.control}
            name="name"
            render={({field}) => (
              <FormItem className="w-full">
                <FormLabel>Tên</FormLabel>
                <FormControl>
                  <Input placeholder="Nhập tên của bạn" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="gender"
            render={({field}) => (
              <FormItem>
                <FormLabel>Giới tính</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn giới tính" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {['Nam', 'Nữ', 'Khác'].map(g => (
                      <SelectItem key={g} value={g}>
                        {g}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="currentJobStatus"
            render={({field}) => (
              <FormItem>
                <FormLabel>Trạng thái làm việc</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn trạng thái làm việc" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {['Đang tìm việc', 'Đang làm việc', 'Đã nghỉ việc'].map(
                      g => (
                        <SelectItem key={g} value={g}>
                          {g}
                        </SelectItem>
                      ),
                    )}
                  </SelectContent>
                </Select>
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
                  <Input
                    placeholder="Nhập email"
                    {...field}
                    type="email"
                    readOnly
                    disabled
                  />
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
                  <Input
                    placeholder="Nhập số điện thoại"
                    {...field}
                    type="tel"
                    readOnly
                    disabled
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="currentAddress"
            render={({field}) => (
              <FormItem className="w-full">
                <FormLabel>Địa chỉ hiện tại</FormLabel>
                <FormControl>
                  <Input placeholder="Nhập địa chỉ hiện tại" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="professionalLevel"
            render={({field}) => (
              <FormItem>
                <FormLabel>Trình độ học vấn</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn trình độ học vấn" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {PROFESSIONAL_LEVEL_ARRAY.slice(1).map(g => (
                      <SelectItem key={g.label} value={g.label}>
                        {g.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="qualificationLevel"
            render={({field}) => (
              <FormItem>
                <FormLabel>Trình độ chuyên môn</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn trình độ chuyên môn" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {QUALIFICATION_REQUIREMENT_ARRAY.slice(1).map(g => (
                      <SelectItem key={g.label} value={g.label}>
                        {g.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="disabilityStatus"
            render={({field}) => (
              <FormItem className="w-full">
                <FormLabel>Tình trạng khuyết tật</FormLabel>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="w-full">
                      Chọn tình trạng khuyết tật
                      {field.value.length > 0
                        ? ` (Đã chọn ${field.value.length})`
                        : ''}
                      <ChevronsUpDown className="text-muted-foreground" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    {DISABILITY_TYPE_ARRAY.map(type => (
                      <FormControl key={type.label}>
                        <DropdownMenuCheckboxItem
                          checked={field.value.includes(type.label)}
                          onCheckedChange={checked => {
                            const newValue = checked
                              ? [...field.value, type.label]
                              : field.value.filter(v => v !== type.label);
                            field.onChange(newValue);
                          }}>
                          {type.label}
                        </DropdownMenuCheckboxItem>
                      </FormControl>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                <FormDescription>
                  {form.watch('disabilityStatus').join(', ')}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="disabilityCause"
            render={({field}) => (
              <FormItem className="w-full">
                <FormLabel>Lí do khuyết tật</FormLabel>
                <FormControl>
                  <Input placeholder="Nhập lý do khuyết tật" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="healthStatus"
            render={({field}) => (
              <FormItem className="w-full">
                <FormLabel>Trạng thái sức khỏe</FormLabel>
                <FormControl>
                  <Input placeholder="Nhập trạng thái sức khỏe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="expectedSalary"
            render={({field}) => (
              <FormItem className="w-full">
                <FormLabel>Mức lương mong muốn</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Nhập mức lương mong muốn"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="economicStatus"
            render={({field}) => (
              <FormItem className="w-full">
                <FormLabel>Hoàn cảnh kinh tế</FormLabel>
                <FormControl>
                  <Input placeholder="Nhập hoàn cảnh kinh tế" {...field} />
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

          <FormField
            control={form.control}
            name="hobbies"
            render={({field}) => (
              <FormItem className="w-full">
                <FormLabel>Sở thích</FormLabel>
                <FormControl>
                  <Input placeholder="Nhập sở thích" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Đang cập nhật...' : 'Cập nhật'}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default UpdateProfileForm;
