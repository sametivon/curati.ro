import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Cleaner } from '@/types';
import { ROMANIAN_CITIES } from '@/types';
import { Card } from '@/components/ui/Card';
import { Skeleton } from '@/components/ui/Skeleton';
import { Star, MapPin, CheckCircle, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { motion } from 'framer-motion';

export const ServicesPage = () => {
  const [cleaners, setCleaners] = useState<Cleaner[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCity, setSelectedCity] = useState('');
  const [minRating, setMinRating] = useState(0);
  const [maxPrice, setMaxPrice] = useState(200);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchCleaners();
  }, [selectedCity, minRating, maxPrice]);

  const fetchCleaners = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from('cleaners')
        .select('*, profiles(*)')
        .gte('rating', minRating)
        .lte('hourly_rate', maxPrice)
        .order('rating', { ascending: false });

      if (selectedCity) {
        query = query.eq('city', selectedCity);
      }

      const { data, error } = await query;

      if (error) throw error;
      setCleaners(data || []);
    } catch (error) {
      console.error('Error fetching cleaners:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pt-20">
        <div className="bg-gradient-to-br from-blue-600 to-green-500 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold mb-2">Find Your Perfect Cleaner</h1>
            <p className="text-blue-100">Browse verified cleaning professionals in Romania</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            <motion.aside
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className={`lg:w-80 ${showFilters ? 'block' : 'hidden lg:block'}`}
            >
              <Card className="p-6 sticky top-24">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Filters</h2>
                  <button
                    onClick={() => setShowFilters(false)}
                    className="lg:hidden text-gray-600 hover:text-gray-900"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      City
                    </label>
                    <select
                      value={selectedCity}
                      onChange={(e) => setSelectedCity(e.target.value)}
                      className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none"
                    >
                      <option value="">All Cities</option>
                      {ROMANIAN_CITIES.map((city) => (
                        <option key={city} value={city}>
                          {city}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Minimum Rating: {minRating}★
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="5"
                      step="0.5"
                      value={minRating}
                      onChange={(e) => setMinRating(Number(e.target.value))}
                      className="w-full accent-blue-600"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Max Price: {maxPrice} RON/hour
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="200"
                      step="10"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(Number(e.target.value))}
                      className="w-full accent-blue-600"
                    />
                  </div>

                  <Button
                    variant="outline"
                    size="md"
                    className="w-full"
                    onClick={() => {
                      setSelectedCity('');
                      setMinRating(0);
                      setMaxPrice(200);
                    }}
                  >
                    Reset Filters
                  </Button>
                </div>
              </Card>
            </motion.aside>

            <div className="flex-1">
              <div className="flex items-center justify-between mb-6">
                <p className="text-gray-600">
                  {loading ? 'Loading...' : `${cleaners.length} cleaners found`}
                </p>
                <button
                  onClick={() => setShowFilters(true)}
                  className="lg:hidden flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-gray-300 hover:border-blue-600 transition-colors"
                >
                  <SlidersHorizontal className="w-5 h-5" />
                  Filters
                </button>
              </div>

              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <Card key={i} className="p-6">
                      <Skeleton className="w-20 h-20 rounded-full mx-auto mb-4" />
                      <Skeleton className="h-6 w-3/4 mx-auto mb-2" />
                      <Skeleton className="h-4 w-1/2 mx-auto mb-4" />
                      <Skeleton className="h-10 w-full" />
                    </Card>
                  ))}
                </div>
              ) : cleaners.length === 0 ? (
                <Card className="p-12 text-center">
                  <p className="text-gray-600 text-lg">No cleaners found. Try adjusting your filters.</p>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {cleaners.map((cleaner) => (
                    <motion.div
                      key={cleaner.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Card hover className="p-6 h-full group relative overflow-hidden">
                        <div className="text-center">
                          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-green-500 mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                            {cleaner.profiles?.full_name.charAt(0)}
                          </div>
                          <div className="flex items-center justify-center gap-2 mb-2">
                            <h3 className="text-lg font-semibold text-gray-900">
                              {cleaner.profiles?.full_name}
                            </h3>
                            {cleaner.verified && (
                              <CheckCircle className="w-4 h-4 text-blue-600" />
                            )}
                          </div>
                          <div className="flex items-center justify-center gap-2 text-gray-600 mb-3">
                            <MapPin className="w-4 h-4" />
                            <span className="text-sm">{cleaner.city}</span>
                          </div>
                          <div className="flex items-center justify-center gap-1 mb-4">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="font-semibold text-gray-900">
                              {cleaner.rating.toFixed(1)}
                            </span>
                            <span className="text-gray-600 text-sm">
                              ({cleaner.total_reviews})
                            </span>
                          </div>
                          <div className="mb-4">
                            <span className="text-xl font-bold text-blue-600">
                              {cleaner.hourly_rate} RON
                            </span>
                            <span className="text-gray-600 text-sm">/hour</span>
                          </div>

                          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 space-y-2">
                            <Button
                              variant="primary"
                              size="sm"
                              className="w-full"
                              onClick={() => (window.location.href = `/cleaner/${cleaner.id}`)}
                            >
                              View Profile
                            </Button>
                            <Button
                              variant="secondary"
                              size="sm"
                              className="w-full"
                            >
                              Book Now
                            </Button>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};
