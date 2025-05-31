'use client';
import {Button} from '@/components/ui/button';
import {Label} from '@/components/ui/label';
import {RadioGroup, RadioGroupItem} from '@/components/ui/radio-group';
import {Separator} from '@/components/ui/separator';
import {SALARY_OPTIONS} from '@/constants/value';
import {cn} from '@/lib/utils';
import locationSelector from '@/redux/features/location/locationSelector';
import {useAppSelector} from '@/redux/hooks';
import {Banknote, Check, ChevronDown, MapPin, Search} from 'lucide-react';
import {useRouter} from 'next/navigation';
import {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {useOnClickOutside} from 'usehooks-ts';

const JobSearch = () => {
  const router = useRouter();
  const [search, setSearch] = useState({
    title: '',
    location: null,
    salary: null,
  });

  const handleSearch = useCallback(() => {
    const searchParams = new URLSearchParams();
    if (search.title) {
      searchParams.append('keyword', search.title);
    }
    if (search.location) {
      searchParams.append('location', search.location.id);
    }
    if (search.salary) {
      const salary = SALARY_OPTIONS.find(
        option => option.key === search.salary,
      );
      if (salary) {
        searchParams.append('minSalary', salary.minSalary);
        searchParams.append('maxSalary', salary.maxSalary);
      }
    }
    const queryString = searchParams.toString();
    const url = `/viec-lam?${queryString}`;
    router.push(url);
  }, [search, router]);

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Tìm kiếm việc làm</h2>
      <search className="flex items-center gap-2 rounded-full border bg-background p-2 pl-4">
        <SearchInput
          value={search.title}
          onChange={e => {
            setSearch(prev => ({...prev, title: e.target.value}));
          }}
          onSubmit={handleSearch}
        />
        <Separator orientation="vertical" className="hidden h-8 lg:block" />
        <SearchLocation
          value={search.location?.id}
          onChange={location => {
            setSearch(prev => ({...prev, location}));
          }}
        />
        <Separator orientation="vertical" className="hidden h-8 lg:block" />
        <SearchSalary
          value={search.salary}
          onChange={salary => {
            setSearch(prev => ({...prev, salary}));
          }}
        />
        <Separator orientation="vertical" className="hidden h-8 lg:block" />
        <Button
          className="h-auto rounded-full px-6 py-3"
          onClick={handleSearch}>
          <Search />
          Tìm kiếm
        </Button>
      </search>
    </div>
  );
};

const SearchInput = ({value, onChange, onSubmit}) => {
  return (
    <input
      placeholder="Vị trí tuyển dụng, tên công ty"
      className="flex-1 border-none text-sm font-medium leading-none outline-none"
      value={value}
      onChange={onChange}
      onKeyDown={e => {
        if (e.key === 'Enter') {
          e.preventDefault();
          onSubmit();
        }
      }}
    />
  );
};

const SearchLocation = ({onChange, value}) => {
  const [showCity, setShowCity] = useState(false);
  const elemRef = useRef(null);
  const listRef = useRef(null);
  const locations = useAppSelector(locationSelector.selectLocations);

  const selectedCity = useMemo(() => {
    return locations?.find(item => item.id === value);
  }, [locations, value]);

  useEffect(() => {
    if (showCity) {
      listRef.current?.scrollTo({
        top:
          36 *
            (locations.findIndex(item => item.id === selectedCity?.id) ?? 2) -
          40,
        behavior: 'instant',
      });
    }
  }, [showCity, locations, selectedCity]);

  const handleCityChange = useCallback(newCity => {
    setShowCity(false);
    onChange(newCity);
  }, []);

  useOnClickOutside(elemRef, () => {
    setShowCity(false);
  });

  return (
    <div className="relative hidden lg:block" ref={elemRef}>
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
          {locations.map(option => (
            <Button
              variant="ghost"
              className="w-full justify-start rounded-none"
              key={option.id}
              onClick={() => handleCityChange(option)}>
              <span className="flex-1 text-left">{option.name}</span>
              <Check
                className={cn({
                  invisible: selectedCity?.id !== option.id,
                })}
              />
            </Button>
          ))}
        </div>
      )}
    </div>
  );
};

const SearchSalary = ({onChange, value}) => {
  const [showSalary, setShowSalary] = useState(false);
  const elemRef = useRef(null);

  const handleSalaryChange = useCallback(newSalary => {
    setShowSalary(false);
    onChange(newSalary);
  }, []);

  useOnClickOutside(elemRef, () => {
    setShowSalary(false);
  });

  const renderSalary = useMemo(() => {
    return SALARY_OPTIONS.find(option => option.key === value);
  }, [value]);

  return (
    <div className="relative hidden lg:block" ref={elemRef}>
      <Button
        variant="ghost"
        className="h-auto min-w-60 rounded-full py-3 text-left"
        onClick={() => setShowSalary(prev => !prev)}>
        <Banknote />
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
            value={value}>
            {SALARY_OPTIONS.map(option => (
              <div className="flex items-center gap-2" key={option.key}>
                <RadioGroupItem value={option.key} id={option.key} />
                <Label htmlFor={option.key} className="font-normal">
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
