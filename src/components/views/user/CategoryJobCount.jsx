'use client';

import occupationSelector from '@/redux/features/occupation/occupationSelector';
import {useAppSelector} from '@/redux/hooks';
import OccupationItem from './OccupationItem';

const CategoryJobCount = () => {
  const occupations = useAppSelector(occupationSelector.selectOccupations);

  return (
    <div className="flex-1 space-y-4">
      <h2 className="text-2xl font-bold">Việc làm theo ngành nghề</h2>
      <div className="grid grid-cols-1 gap-4 rounded-lg border p-4 md:grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
        {occupations.length === 0 ? (
          <p className="col-span-full text-center text-muted-foreground">
            Không có ngành nghề nào
          </p>
        ) : (
          occupations.map(occupation => (
            <OccupationItem key={occupation.id} occupation={occupation} />
          ))
        )}
      </div>
    </div>
  );
};

export default CategoryJobCount;
