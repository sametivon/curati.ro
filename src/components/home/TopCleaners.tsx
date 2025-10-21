import { motion } from 'framer-motion';
import { Star, MapPin, CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Cleaner } from '@/types';
import { Skeleton } from '@/components/ui/Skeleton';

export const TopCleaners = () => {
  const [cleaners, setCleaners] = useState<Cleaner[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetchTopCleaners();
  }, []);

  const fetchTopCleaners = async () => {
    try {
      const { data, error } = await supabase
        .from('cleaners')
        .select('*, profiles(*)')
        .order('rating', { ascending: false })
        .limit(6);

      if (error) throw error;
      setCleaners(data || []);
    } catch (error) {
      console.error('Error fetching cleaners:', error);
    } finally {
      setLoading(false);
    }
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % Math.max(1, cleaners.length - 2));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + Math.max(1, cleaners.length - 2)) % Math.max(1, cleaners.length - 2));
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Top Rated Cleaners</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Meet our most trusted and highly rated cleaning professionals
          </p>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="p-6">
                <Skeleton className="w-24 h-24 rounded-full mx-auto mb-4" />
                <Skeleton className="h-6 w-3/4 mx-auto mb-2" />
                <Skeleton className="h-4 w-1/2 mx-auto mb-4" />
                <Skeleton className="h-10 w-full" />
              </Card>
            ))}
          </div>
        ) : cleaners.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">No cleaners available yet. Check back soon!</p>
          </div>
        ) : (
          <div className="relative">
            <div className="overflow-hidden">
              <motion.div
                className="flex gap-6"
                animate={{ x: `-${currentIndex * 33.333}%` }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
              >
                {cleaners.map((cleaner) => (
                  <motion.div
                    key={cleaner.id}
                    className="min-w-[100%] md:min-w-[calc(33.333%-16px)]"
                  >
                    <Card hover className="p-6 h-full">
                      <div className="text-center">
                        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-green-500 mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                          {cleaner.profiles?.full_name.charAt(0)}
                        </div>
                        <div className="flex items-center justify-center gap-2 mb-2">
                          <h3 className="text-xl font-semibold text-gray-900">
                            {cleaner.profiles?.full_name}
                          </h3>
                          {cleaner.verified && (
                            <CheckCircle className="w-5 h-5 text-blue-600" />
                          )}
                        </div>
                        <div className="flex items-center justify-center gap-2 text-gray-600 mb-3">
                          <MapPin className="w-4 h-4" />
                          <span className="text-sm">{cleaner.city}</span>
                        </div>
                        <div className="flex items-center justify-center gap-1 mb-4">
                          <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                          <span className="font-semibold text-gray-900">
                            {cleaner.rating.toFixed(1)}
                          </span>
                          <span className="text-gray-600 text-sm">
                            ({cleaner.total_reviews} reviews)
                          </span>
                        </div>
                        <div className="mb-6">
                          <span className="text-2xl font-bold text-blue-600">
                            {cleaner.hourly_rate} RON
                          </span>
                          <span className="text-gray-600">/hour</span>
                        </div>
                        <Button
                          variant="primary"
                          size="md"
                          className="w-full"
                          onClick={() => (window.location.href = `/cleaner/${cleaner.id}`)}
                        >
                          View Profile
                        </Button>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {cleaners.length > 3 && (
              <>
                <button
                  onClick={prevSlide}
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-shadow z-10"
                >
                  <ChevronLeft className="w-6 h-6 text-gray-900" />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-shadow z-10"
                >
                  <ChevronRight className="w-6 h-6 text-gray-900" />
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
