import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import YouTubeEmbed from './YouTubeEmbed';
import ProfileCard from '../Profile/ProfileCard';
import LoadingSpinner from '../ui/LoadingSpinner';
import type { Floor } from '../../types/floors';
import type { Profile } from '../../types/profiles';

export default function FloorDetail() {
  const { id } = useParams();
  const [floor, setFloor] = useState<Floor | null>(null);
  const [creator, setCreator] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFloorAndCreator = async () => {
      if (!id) return;

      try {
        const { data: floorData } = await supabase
          .from('floors')
          .select()
          .eq('id', id)
          .single();

        if (floorData?.created_by) {
          const { data: creatorData } = await supabase
            .from('profiles')
            .select()
            .eq('id', floorData.created_by)
            .single();

          setCreator(creatorData);
        }

        setFloor(floorData);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFloorAndCreator();
  }, [id]);

  if (isLoading) return <LoadingSpinner />;
  if (!floor) return <div>Floor not found</div>;

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <div className={`${floor.color} p-8`}>
          <h2 className="text-3xl font-bold mb-4">
            Floor {floor.floor_number}: {floor.name}
          </h2>
          <p className="text-xl mb-4">{floor.description}</p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-8">
          {/* Creator Profile */}
          {creator && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Created by</h3>
              <Link to={`/profile/${creator.id}`}>
                <ProfileCard profile={creator} />
              </Link>
            </div>
          )}

          {/* External Website */}
          {floor.website_url && (
            <div>
              <h3 className="text-lg font-semibold mb-2">External Website</h3>
              <a
                href={floor.website_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-blue-600 hover:text-blue-800"
              >
                Visit Website
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </div>
          )}

          {/* YouTube Video */}
          {floor.youtube_url && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Video Presentation</h3>
              <div className="aspect-video">
                <YouTubeEmbed url={floor.youtube_url} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}