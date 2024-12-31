import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Floor from './Floor';
import CreateFloorButton from './CreateFloorButton';
import { supabase } from '../lib/supabase';
import { useAuth } from '../hooks/useAuth';
import type { Floor as FloorType } from '../types/floors';

const Building = () => {
  const [floors, setFloors] = useState<FloorType[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchFloors = async () => {
      const { data } = await supabase
        .from('floors')
        .select()
        .order('floor_number', { ascending: true });
      
      if (data) {
        setFloors(data);
      }
    };

    fetchFloors();

    const subscription = supabase
      .channel('floors')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'floors' }, fetchFloors)
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <div>
      {user && (
        <div className="mb-6">
          <CreateFloorButton />
        </div>
      )}
      <div className="flex flex-col-reverse gap-4 max-w-2xl mx-auto">
        {floors.map((floor) => (
          <Link key={floor.id} to={`/floor/${floor.id}`}>
            <Floor {...floor} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Building;