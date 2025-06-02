'use client';

import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {RadioGroup, RadioGroupItem} from '@/components/ui/radio-group';
import {SALARY_OPTIONS} from '@/constants/value';
import {cn} from '@/lib/utils';
import locationSelector from '@/redux/features/location/locationSelector';
import occupationSelector from '@/redux/features/occupation/occupationSelector';
import {useAppSelector} from '@/redux/hooks';
import {createQueryString} from '@/utils/converter';
import {Check, ListFilter, X} from 'lucide-react';
import {useSearchParams} from 'next/navigation';
import {useEffect, useState} from 'react';
import {useMediaQuery} from 'usehooks-ts';

const JobFilter = () => {
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedSalary, setSelectedSalary] = useState(null);
  const [selectedOccupation, setSelectedOccupation] = useState(null);
  const [keyword, setKeyword] = useState('');
  const locations = useAppSelector(locationSelector.selectLocations);
  const occupations = useAppSelector(occupationSelector.selectOccupations);
  const searchParams = useSearchParams();
  const [isClient, setIsClient] = useState(false);
  const [showSearch, setShowSearch] = useState(true);
  const isNotMobile = useMediaQuery('(min-width: 768px)');

  useEffect(() => {
    setShowSearch(isNotMobile);
  }, [isNotMobile]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const locationId = searchParams.get('location');
    const minSalary = searchParams.get('minSalary');
    const maxSalary = searchParams.get('maxSalary');
    const occupationId = searchParams.get('occupation');
    const keyword = searchParams.get('keyword');

    if (keyword) {
      setKeyword(keyword);
    }

    if (locationId) {
      setSelectedCity(locationId);
    }
    if (minSalary && maxSalary && !isNaN(minSalary) && !isNaN(maxSalary)) {
      const minSalaryNum = parseInt(minSalary, 10);
      const maxSalaryNum = parseInt(maxSalary, 10);

      const salary = SALARY_OPTIONS.find(
        option =>
          option.minSalary === minSalaryNum &&
          option.maxSalary === maxSalaryNum,
      );
      if (salary) {
        setSelectedSalary(salary.key);
      }
    }

    if (occupationId) {
      setSelectedOccupation(occupationId);
    }
  }, [searchParams]);

  const handleCityChange = newCity => {
    setSelectedCity(newCity);
  };

  const handleSalaryChange = newSalary => {
    setSelectedSalary(newSalary);
  };

  const handleOccupationChange = newOccupation => {
    setSelectedOccupation(newOccupation);
  };

  const handleFilter = () => {
    const urlSearch = new URLSearchParams();
    if (selectedCity) {
      urlSearch.append('location', selectedCity);
    }
    if (selectedSalary) {
      const salary = SALARY_OPTIONS.find(
        option => option.key === selectedSalary,
      );
      if (salary) {
        urlSearch.append('minSalary', salary.minSalary);
        urlSearch.append('maxSalary', salary.maxSalary);
      }
    }
    if (selectedOccupation) {
      urlSearch.append('occupation', selectedOccupation);
    }

    if (keyword) {
      urlSearch.append('keyword', keyword);
    }

    const queryString = urlSearch.toString();
    const url = `/viec-lam?${queryString}`;
    location.href = url;
  };

  const handleSearch = () => {
    const url = createQueryString(searchParams, 'keyword', keyword);
    location.href = url;
  };

  const onResetFilter = () => {
    setSelectedCity(null);
    setSelectedSalary(null);
    setSelectedOccupation(null);
    setKeyword('');
    location.href = '/viec-lam';
  };

  return !isClient ? (
    <div className="top-4 hidden h-[80vh] w-full max-w-sm space-y-4 self-start rounded-lg border p-4 md:sticky" />
  ) : (
    <>
      {showSearch && (
        <div
          className="fixed inset-0 z-[49] bg-black/50 md:hidden"
          onClick={() => setShowSearch(false)}
        />
      )}

      {!showSearch && (
        <button
          className="fixed bottom-28 right-4 z-20 rounded-full border bg-white p-4 shadow-md"
          onClick={() => setShowSearch(true)}>
          <ListFilter />
        </button>
      )}

      {showSearch && (
        <div className="fixed inset-x-8 top-4 z-50 max-h-[95vh] w-auto space-y-4 self-start overflow-auto rounded-lg border bg-background p-4 md:sticky md:max-h-[90vh] md:max-w-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold">Bộ lọc và tìm kiếm</h3>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setShowSearch(false)}
              className="md:hidden">
              <X />
            </Button>
          </div>
          <hr />
          <div className="flex items-center gap-2">
            <Input
              placeholder="Tìm kiếm tên công ty, hoặc nhiều hơn..."
              value={keyword}
              onChange={e => setKeyword(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  handleSearch();
                }
              }}
            />
            <Button onClick={handleSearch}>Tìm kiếm</Button>
          </div>
          <hr />
          <div className="space-y-4">
            <div className="space-y-2">
              <p className="font-semibold">Lọc theo ngành nghề</p>
              <div className="max-h-36 overflow-y-auto rounded-md border bg-white scrollbar-thin">
                {occupations.map(option => (
                  <Button
                    variant="ghost"
                    className="w-full justify-start rounded-none"
                    key={option.id}
                    onClick={() => handleOccupationChange(option.id)}>
                    <span className="flex-1 text-left">{option.name}</span>
                    <Check
                      className={cn({
                        invisible: Number(selectedOccupation) !== option.id,
                      })}
                    />
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <p className="font-semibold">Lọc theo mức lương</p>
              <RadioGroup
                className="flex flex-col gap-3 rounded-lg border px-4 py-2"
                onValueChange={handleSalaryChange}
                value={selectedSalary}>
                {SALARY_OPTIONS.map(option => (
                  <div className="flex items-center gap-2" key={option.key}>
                    <RadioGroupItem value={option.key} id={option.key} />
                    <Label htmlFor={option.key}>{option.label}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <p className="font-semibold">Lọc theo thành phố</p>
              <div className="max-h-36 overflow-y-auto rounded-md border bg-white scrollbar-thin">
                {locations.map(option => (
                  <Button
                    variant="ghost"
                    className="w-full justify-start rounded-none"
                    key={option.id}
                    onClick={() => handleCityChange(option.id)}>
                    <span className="flex-1 text-left">{option.name}</span>
                    <Check
                      className={cn({
                        invisible: Number(selectedCity) !== option.id,
                      })}
                    />
                  </Button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                className="w-full"
                onClick={onResetFilter}>
                Xóa bộ lọc
              </Button>
              <Button className="w-full" onClick={handleFilter}>
                Áp dụng
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default JobFilter;
