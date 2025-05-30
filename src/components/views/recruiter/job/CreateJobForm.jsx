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
import {Textarea} from '@/components/ui/textarea';
import {
  DISABILITY_TYPE_ARRAY,
  DISABILITY_TYPE_LABEL,
  DISABILITY_TYPE_REVERSE,
  JOB_TYPE,
  JOB_TYPE_ARRAY,
  JOB_TYPE_REVERSE,
  PROFESSIONAL_LEVEL,
  PROFESSIONAL_LEVEL_ARRAY,
  PROFESSIONAL_LEVEL_LABEL,
  QUALIFICATION_REQUIREMENT,
  QUALIFICATION_REQUIREMENT_ARRAY,
  QUALIFICATION_REQUIREMENT_LABEL,
} from '@/constants/enum';
import locationSelector from '@/redux/features/location/locationSelector';
import occupationSelector from '@/redux/features/occupation/occupationSelector';
import postApi from '@/redux/features/post/postQuery';
import {useAppSelector} from '@/redux/hooks';
import {createJobValidator} from '@/validator/job';
import {zodResolver} from '@hookform/resolvers/zod';
import {ChevronsUpDown} from 'lucide-react';
import {useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {toast} from 'sonner';

const CreateJobForm = ({jobId}) => {
  const isEditMode = Boolean(jobId);
  const locations = useAppSelector(locationSelector.selectLocations);
  const occupations = useAppSelector(occupationSelector.selectOccupations);
  const getJobQuery = postApi.useGetPostDetailQuery(
    {postId: jobId},
    {
      skip: !isEditMode,
    },
  );
  const [createJobMutation, {isLoading: isCreating}] =
    postApi.useCreatePostMutation();
  const [updateJobMutation, {isLoading: isUpdating}] =
    postApi.useUpdatePostMutation();
  const isLoading = isCreating || isUpdating;
  const form = useForm({
    resolver: zodResolver(createJobValidator),
    defaultValues: {
      title: '',
      description: '',
      benefit: '',
      disabilityRequirement: [],
      professionalLevel: PROFESSIONAL_LEVEL.NONE,
      workingTime: '',
      minSalary: 0,
      maxSalary: 0,
      healthConditionRequirement: '',
      type: '',
      locations: [],
      occupations: [],
      qualificationRequirement: QUALIFICATION_REQUIREMENT.NONE,
    },
  });

  useEffect(() => {
    if (getJobQuery.isSuccess && isEditMode) {
      const jobData = getJobQuery.data;
      form.reset({
        title: jobData.title,
        description: jobData.description,
        benefit: jobData.benefit,
        disabilityRequirement: jobData.disabilityRequirement.map(
          type => DISABILITY_TYPE_REVERSE[type] || '',
        ),
        professionalLevel: jobData.professionalLevel || PROFESSIONAL_LEVEL.NONE,
        workingTime: jobData.workingTime || '',
        minSalary: jobData.minSalary || 0,
        maxSalary: jobData.maxSalary || 0,
        healthConditionRequirement: jobData.healthConditionRequirement || '',
        type: JOB_TYPE_REVERSE[jobData.type] || '',
        locations: jobData.locations.map(location => location.id) || [],
        occupations: jobData.occupations.map(occupation => occupation.id) || [],
        qualificationRequirement:
          jobData.qualificationRequirement || QUALIFICATION_REQUIREMENT.NONE,
      });
    }
  }, [getJobQuery.isSuccess, isEditMode, getJobQuery.data, form]);

  console.log('Form initialized with default values:', form.formState.errors);

  const onSubmit = data => {
    const handler = isEditMode
      ? updateJobMutation({postId: jobId, ...data})
      : createJobMutation(data);

    handler
      .unwrap()
      .then(() => {
        if (isEditMode) {
          toast.success('Cập nhật công việc thành công');
          return;
        }
        form.reset();
        toast.success('Tạo công việc thành công');
      })
      .catch(err => {
        console.error('Error creating job:', err);

        toast.error(
          `Đã xảy ra lỗi trong quá trình ${isEditMode ? 'cập nhật' : 'tạo'} công việc`,
        );
      });
  };

  if (isEditMode && getJobQuery.isError) {
    return (
      <div className="mx-auto max-w-2xl">
        <p className="text-center text-destructive">
          Không thể tải thông tin công việc. Vui lòng thử lại sau.
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
            name="title"
            render={({field}) => (
              <FormItem className="w-full">
                <FormLabel>Tiêu đề công việc</FormLabel>
                <FormControl>
                  <Input placeholder="Nhập tiêu đề công việc" {...field} />
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
                <FormLabel>Mô tả công việc</FormLabel>
                <FormControl>
                  <Textarea placeholder="Nhập mô tả công việc" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="benefit"
            render={({field}) => (
              <FormItem className="w-full">
                <FormLabel>Quyền lợi</FormLabel>
                <FormControl>
                  <Textarea placeholder="Nhập quyền lợi" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="disabilityRequirement"
            render={({field}) => (
              <FormItem className="w-full">
                <FormLabel>Yêu cầu khuyết tật</FormLabel>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="w-full">
                      Chọn yêu cầu khuyết tật
                      {field.value.length > 0
                        ? ` (Đã chọn ${field.value.length})`
                        : ''}
                      <ChevronsUpDown className="text-muted-foreground" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    {DISABILITY_TYPE_ARRAY.map(type => (
                      <FormControl key={type.value}>
                        <DropdownMenuCheckboxItem
                          checked={field.value.includes(type.value)}
                          onCheckedChange={checked => {
                            const newValue = checked
                              ? [...field.value, type.value]
                              : field.value.filter(v => v !== type.value);
                            field.onChange(newValue);
                          }}>
                          {type.label}
                        </DropdownMenuCheckboxItem>
                      </FormControl>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                <FormDescription>
                  {form
                    .watch('disabilityRequirement')
                    .map(type => DISABILITY_TYPE_LABEL[type])
                    .join(', ')}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="professionalLevel"
            render={({field}) => (
              <FormItem className="w-full">
                <FormLabel>Trình độ học vấn</FormLabel>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="w-full">
                      {PROFESSIONAL_LEVEL_LABEL[field.value] ||
                        'Chọn trình độ học vấn'}
                      <ChevronsUpDown className="text-muted-foreground" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    {PROFESSIONAL_LEVEL_ARRAY.map(type => (
                      <FormControl key={type.value}>
                        <DropdownMenuCheckboxItem
                          checked={field.value === type.value}
                          onCheckedChange={() => field.onChange(type.value)}>
                          {type.label}
                        </DropdownMenuCheckboxItem>
                      </FormControl>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="qualificationRequirement"
            render={({field}) => (
              <FormItem className="w-full">
                <FormLabel>Trình độ chuyên môn</FormLabel>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="w-full">
                      {QUALIFICATION_REQUIREMENT_LABEL[field.value] ||
                        'Chọn trình độ chuyên môn'}
                      <ChevronsUpDown className="text-muted-foreground" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    {QUALIFICATION_REQUIREMENT_ARRAY.map(type => (
                      <FormControl key={type.value}>
                        <DropdownMenuCheckboxItem
                          checked={field.value === type.value}
                          onCheckedChange={() => field.onChange(type.value)}>
                          {type.label}
                        </DropdownMenuCheckboxItem>
                      </FormControl>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="type"
            render={({field}) => (
              <FormItem className="w-full">
                <FormLabel>Loại công việc</FormLabel>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="w-full">
                      {JOB_TYPE[field.value] || 'Chọn loại công việc'}
                      <ChevronsUpDown className="text-muted-foreground" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    {JOB_TYPE_ARRAY.map(type => (
                      <FormControl key={type.value}>
                        <DropdownMenuCheckboxItem
                          checked={field.value === type.value}
                          onCheckedChange={() => field.onChange(type.value)}>
                          {type.label}
                        </DropdownMenuCheckboxItem>
                      </FormControl>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="locations"
            render={({field}) => (
              <FormItem className="w-full">
                <FormLabel>Vị trí làm việc</FormLabel>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="w-full">
                      {field.value.length > 0
                        ? `Đã chọn ${field.value.length} vị trí`
                        : 'Chọn vị trí làm việc'}
                      <ChevronsUpDown className="text-muted-foreground" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    {locations.map(location => (
                      <FormControl key={location.id}>
                        <DropdownMenuCheckboxItem
                          checked={field.value.includes(location.id)}
                          onCheckedChange={checked => {
                            const newValue = checked
                              ? [...field.value, location.id]
                              : field.value.filter(v => v !== location.id);
                            field.onChange(newValue);
                          }}>
                          {location.name}
                        </DropdownMenuCheckboxItem>
                      </FormControl>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                <FormDescription>
                  {field.value
                    .map(
                      id =>
                        locations.find(location => location.id === id)?.name,
                    )
                    .join(', ')}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="occupations"
            render={({field}) => (
              <FormItem className="w-full">
                <FormLabel>Ngành nghề</FormLabel>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="w-full">
                      {field.value.length > 0
                        ? `Đã chọn ${field.value.length} ngành nghề`
                        : 'Chọn ngành nghề'}
                      <ChevronsUpDown className="text-muted-foreground" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    {occupations.map(occupation => (
                      <FormControl key={occupation.id}>
                        <DropdownMenuCheckboxItem
                          checked={field.value.includes(occupation.id)}
                          onCheckedChange={checked => {
                            const newValue = checked
                              ? [...field.value, occupation.id]
                              : field.value.filter(v => v !== occupation.id);
                            field.onChange(newValue);
                          }}>
                          {occupation.name}
                        </DropdownMenuCheckboxItem>
                      </FormControl>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                <FormDescription>
                  {field.value
                    .map(
                      id =>
                        occupations.find(location => location.id === id)?.name,
                    )
                    .join(', ')}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="workingTime"
            render={({field}) => (
              <FormItem className="w-full">
                <FormLabel>Thời gian làm việc</FormLabel>
                <FormControl>
                  <Input placeholder="Nhập thời gian làm việc" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="minSalary"
            render={({field}) => (
              <FormItem className="w-full">
                <FormLabel>Mức lương tối thiểu</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Nhập mức lương tối thiểu"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="maxSalary"
            render={({field}) => (
              <FormItem className="w-full">
                <FormLabel>Mức lương tối đa</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Nhập mức lương tối đa"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="healthConditionRequirement"
            render={({field}) => (
              <FormItem className="w-full">
                <FormLabel>Yêu cầu sức khỏe</FormLabel>
                <FormControl>
                  <Input placeholder="Nhập yêu cầu sức khỏe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {isEditMode ? (
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Đang cập nhật công việc...' : 'Cập nhật công việc'}
            </Button>
          ) : (
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Đang tạo công việc...' : 'Tạo công việc'}
            </Button>
          )}
        </form>
      </Form>
    </div>
  );
};

export default CreateJobForm;
