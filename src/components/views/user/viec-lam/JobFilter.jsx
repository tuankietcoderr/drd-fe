'use client';

import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {RadioGroup, RadioGroupItem} from '@/components/ui/radio-group';
import {getVietnamCities} from '@/lib/address';
import {cn} from '@/lib/utils';
import {Check} from 'lucide-react';
import {useEffect, useState} from 'react';
import occupations from '~/__data__/occupations.json';

console.log(occupations);

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

const JobFilter = () => {
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedSalary, setSelectedSalary] = useState(null);
  const [selectedOccupation, setSelectedOccupation] = useState(null);

  useEffect(() => {
    (async function () {
      const data = await getVietnamCities();
      setCities(data);
    })();
  }, []);

  const handleCityChange = newCity => {
    setSelectedCity(newCity);
  };

  const handleSalaryChange = newSalary => {
    setSelectedSalary(newSalary);
  };

  const handleOccupationChange = newOccupation => {
    setSelectedOccupation(newOccupation);
  };

  return (
    <div className="sticky top-4 w-full max-w-sm space-y-4 self-start rounded-lg border p-4">
      <h3 className="text-2xl font-bold">Bộ lọc và tìm kiếm</h3>
      <hr />
      <div className="flex items-center gap-2">
        <Input placeholder="Tìm kiếm tên công ty, hoặc nhiều hơn..." />
        <Button>Tìm kiếm</Button>
      </div>
      <hr />
      <div className="space-y-4">
        <div className="space-y-2">
          <p className="font-semibold">Lọc theo ngành nghề</p>
          <div className="max-h-64 overflow-y-auto rounded-md border bg-white scrollbar-thin">
            {occupations.map(option => (
              <Button
                variant="ghost"
                className="w-full justify-start rounded-none"
                key={option.id}
                onClick={() => handleOccupationChange(option)}>
                <span className="flex-1 text-left">{option.name}</span>
                <Check
                  className={cn({
                    invisible: selectedOccupation?.id !== option.id,
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
              <div className="flex items-center gap-2" key={option.value}>
                <RadioGroupItem value={option.value} id={option.value} />
                <Label htmlFor={option.value}>{option.label}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <p className="font-semibold">Lọc theo thành phố</p>
          <div className="max-h-64 overflow-y-auto rounded-md border bg-white scrollbar-thin">
            {cities.map(option => (
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
        </div>
      </div>
    </div>
  );
};

export default JobFilter;
