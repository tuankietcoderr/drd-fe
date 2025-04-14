'use client';
import {Button} from '@/components/ui/button';
import {Label} from '@/components/ui/label';
import {RadioGroup, RadioGroupItem} from '@/components/ui/radio-group';
import {Separator} from '@/components/ui/separator';
import {ChevronDown, MapPin, Search} from 'lucide-react';
import {useMemo, useRef, useState} from 'react';
import {useOnClickOutside} from 'usehooks-ts';

const JobSearch = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Tìm kiếm việc làm</h2>
      <search className="bg-background flex items-center gap-2 rounded-full border p-2 pl-4">
        <SearchInput />
        <Separator orientation="vertical" className="h-8" />
        <SearchLocation />
        <Separator orientation="vertical" className="h-8" />
        <SearchSalary />
        <Separator orientation="vertical" className="h-8" />
        <Button className="h-auto rounded-full px-6 py-3">
          <Search />
          Tìm kiếm
        </Button>
      </search>
    </div>
  );
};

const SearchInput = () => {
  return (
    <input
      placeholder="Vị trí tuyển dụng, tên công ty"
      className="flex-1 border-none text-sm font-medium leading-none outline-none"
    />
  );
};

const SearchLocation = () => {
  return (
    <Button variant="ghost" className="h-auto w-60 rounded-full py-3 text-left">
      <MapPin />
      <span className="flex-1">Địa điểm</span>
      <ChevronDown />
    </Button>
  );
};

const SALARY_OPTIONS = [
  {
    value: '0-5',
    label: 'Dưới 5 triệu',
  },
  {
    value: '5-10',
    label: '5 - 10 triệu',
  },
  {
    value: '10-15',
    label: '10 - 15 triệu',
  },
  {
    value: '15-20',
    label: '15 - 20 triệu',
  },
  {
    value: '20-30',
    label: '20 - 30 triệu',
  },
  {
    value: '30+',
    label: 'Trên 30 triệu',
  },
];

const SearchSalary = () => {
  const [showSalary, setShowSalary] = useState(false);
  const [selectedSalary, setSelectedSalary] = useState('');

  const elemRef = useRef(null);

  useOnClickOutside(elemRef, () => {
    setShowSalary(false);
  });

  const handleSalaryChange = value => {
    console.log(value);
    setShowSalary(false);
    setSelectedSalary(value);
  };

  const renderSelectedSalary = useMemo(() => {
    const selectedOption = SALARY_OPTIONS.find(
      option => option.value === selectedSalary,
    );
    return selectedOption ? selectedOption.label : '';
  }, [selectedSalary]);

  return (
    <div className="relative" ref={elemRef}>
      <Button
        variant="ghost"
        className="h-auto w-60 rounded-full py-3 text-left"
        onClick={() => setShowSalary(prev => !prev)}>
        <span className="flex-1">
          Mức lương{selectedSalary !== '' ? `: ${renderSelectedSalary}` : ''}
        </span>
        <ChevronDown />
      </Button>
      {showSalary && (
        <div className="absolute left-0 top-full mt-4 w-60 rounded-md border bg-white shadow-lg">
          <RadioGroup
            className="flex flex-col gap-2 p-4"
            onValueChange={handleSalaryChange}
            value={selectedSalary}>
            {SALARY_OPTIONS.map(option => (
              <div className="flex items-center gap-2" key={option.value}>
                <RadioGroupItem value={option.value} id={option.value} />
                <Label htmlFor={option.value} className="font-normal">
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      )}
    </div>
  );
};

export default JobSearch;
