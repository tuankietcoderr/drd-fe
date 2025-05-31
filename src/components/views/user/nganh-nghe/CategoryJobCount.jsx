'use client';

import occupationSelector from '@/redux/features/occupation/occupationSelector';
import {useAppSelector} from '@/redux/hooks';
import OccupationItem from '../OccupationItem';

const CategoryJobCount = ({currentOccupation}) => {
  const occupations = useAppSelector(occupationSelector.selectOccupations);

  const occupationsFiltered = occupations.filter(
    occupation => String(occupation.id) !== currentOccupation,
  );

  return (
    <div className="flex-1 space-y-4">
      <h2 className="text-2xl font-bold">Ngành nghề khác</h2>
      <div className="grid grid-cols-1 gap-4 rounded-lg border p-4 md:grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
        {occupationsFiltered.length === 0 ? (
          <p className="col-span-full text-center text-muted-foreground">
            Không có ngành nghề nào
          </p>
        ) : (
          occupationsFiltered.map(occupation => (
            <OccupationItem key={occupation.id} occupation={occupation} />
          ))
        )}
      </div>
    </div>
  );
};

export default CategoryJobCount;
