'use client';
import {Button} from '@/components/ui/button';
import {Label} from '@/components/ui/label';
import {RadioGroup, RadioGroupItem} from '@/components/ui/radio-group';
import {Separator} from '@/components/ui/separator';
import {getVietnamCities} from '@/lib/address';
import {cn} from '@/lib/utils';
import {Check, ChevronDown, MapPin, Search} from 'lucide-react';
import {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {useOnClickOutside} from 'usehooks-ts';

const JobSearch = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Tìm kiếm việc làm</h2>
      <search className="flex items-center gap-2 rounded-full border bg-background p-2 pl-4">
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
  const [data, setData] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [showCity, setShowCity] = useState(false);
  const elemRef = useRef(null);
  const listRef = useRef(null);

  useEffect(() => {
    (async function () {
      const data = await getVietnamCities();
      setData(data);
    })();
  }, []);

  useEffect(() => {
    if (showCity) {
      listRef.current?.scrollTo({
        top:
          36 *
            (data.findIndex(item => item.codename === selectedCity?.codename) ??
              2) -
          40,
        behavior: 'instant',
      });
    }
  }, [showCity, data, selectedCity]);

  const handleCityChange = useCallback(newCity => {
    setSelectedCity(newCity);
    setShowCity(false);
  }, []);

  useOnClickOutside(elemRef, () => {
    setShowCity(false);
  });

  return (
    <div className="relative" ref={elemRef}>
      <Button
        variant="ghost"
        className="h-auto min-w-60 rounded-full py-3 text-left"
        onClick={() => setShowCity(prev => !prev)}>
        <MapPin />
        <span className="flex-1">
          Địa điểm{selectedCity ? `: ${selectedCity.name}` : ''}
        </span>
        <ChevronDown />
      </Button>
      {showCity && (
        <div
          ref={listRef}
          className="absolute left-0 top-full mt-4 max-h-80 w-60 overflow-y-auto rounded-md border bg-white shadow-lg scrollbar-thin">
          {data.map(option => (
            <Button
              variant="ghost"
              className="w-full justify-start rounded-none"
              key={option.codename}
              onClick={() => handleCityChange(option)}>
              <span className="flex-1 text-left">{option.name}</span>
              <Check
                className={cn({
                  invisible: selectedCity?.codename !== option.codename,
                })}
              />
            </Button>
          ))}
        </div>
      )}
    </div>
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
  const [selectedSalary, setSelectedSalary] = useState(null);
  const [showSalary, setShowSalary] = useState(false);
  const elemRef = useRef(null);

  const handleSalaryChange = useCallback(newSalary => {
    setSelectedSalary(newSalary);
    setShowSalary(false);
  }, []);

  useOnClickOutside(elemRef, () => {
    setShowSalary(false);
  });

  const renderSalary = useMemo(() => {
    return SALARY_OPTIONS.find(option => option.value === selectedSalary);
  }, [selectedSalary]);

  return (
    <div className="relative" ref={elemRef}>
      <Button
        variant="ghost"
        className="h-auto min-w-60 rounded-full py-3 text-left"
        onClick={() => setShowSalary(prev => !prev)}>
        <span className="flex-1">
          Mức lương{renderSalary ? `: ${renderSalary.label}` : ''}
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
