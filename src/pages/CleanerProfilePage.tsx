import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Cleaner, Review, Service } from '@/types';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { Star, MapPin, CheckCircle, Calendar, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { Skeleton } from '@/components/ui/Skeleton';

export const CleanerProfilePage = () => {
  const [cleaner, setCleaner] = useState<Cleaner | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'about' | 'services' | 'reviews'>('about');
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('');
  const [taskDetails, setTaskDetails] = useState('');

  useEffect(() => {
    const cleanerId = window.location.pathname.split('/').pop();
    if (cleanerId) {
      fetchCleanerProfile(cleanerId);
    }
  }, []);

  const fetchCleanerProfile = async (cleanerId: string) => {
    try {
      const [cleanerRes, reviewsRes, servicesRes] = await Promise.all([
        supabase
          .from('cleaners')
          .select('*, profiles(*)')
          .eq('id', cleanerId)
          .maybeSingle(),
        supabase
          .from('reviews')
          .select('*, profiles(*)')
          .eq('cleaner_id', cleanerId)
          .order('created_at', { ascending: false }),
        supabase
          .from('cleaner_services')
          .select('*, services(*)')
          .eq('cleaner_id', cleanerId),
      ]);

      if (cleanerRes.error) throw cleanerRes.error;
      setCleaner(cleanerRes.data);
      setReviews(reviewsRes.data || []);
      setServices(servicesRes.data?.map((cs: any) => cs.services) || []);
    } catch (error) {
      console.error('Error fetching cleaner profile:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="pt-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Card className="p-8">
            <div className="flex items-start gap-8 mb-8">
              <Skeleton className="w-32 h-32 rounded-full" />
              <div className="flex-1 space-y-4">
                <Skeleton className="h-8 w-64" />
                <Skeleton className="h-4 w-48" />
                <Skeleton className="h-4 w-32" />
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  if (!cleaner) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="pt-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Card className="p-12 text-center">
            <p className="text-gray-600 text-lg">Cleaner not found</p>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pt-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="p-8 mb-8">
              <div className="flex flex-col md:flex-row items-start gap-8">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-green-500 flex items-center justify-center text-white text-4xl font-bold flex-shrink-0">
                  {cleaner.profiles?.full_name.charAt(0)}
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-3xl font-bold text-gray-900">
                      {cleaner.profiles?.full_name}
                    </h1>
                    {cleaner.verified && (
                      <CheckCircle className="w-6 h-6 text-blue-600" />
                    )}
                  </div>

                  <div className="flex items-center gap-4 text-gray-600 mb-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-5 h-5" />
                      <span>{cleaner.city}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold text-gray-900">
                        {cleaner.rating.toFixed(1)}
                      </span>
                      <span>({cleaner.total_reviews} reviews)</span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <span className="text-3xl font-bold text-blue-600">
                      {cleaner.hourly_rate} RON
                    </span>
                    <span className="text-gray-600 text-lg">/hour</span>
                  </div>

                  <Button
                    variant="primary"
                    size="lg"
                    onClick={() => setBookingModalOpen(true)}
                  >
                    <Calendar className="w-5 h-5 mr-2" />
                    Book This Cleaner
                  </Button>
                </div>
              </div>
            </Card>

            <Card className="p-8">
              <div className="border-b border-gray-200 mb-6">
                <div className="flex gap-6">
                  {(['about', 'services', 'reviews'] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`pb-4 px-2 font-semibold capitalize transition-colors relative ${
                        activeTab === tab
                          ? 'text-blue-600'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      {tab}
                      {activeTab === tab && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"
                        />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {activeTab === 'about' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">About</h3>
                  <p className="text-gray-600 leading-relaxed">
                    {cleaner.bio || 'No bio available.'}
                  </p>
                </motion.div>
              )}

              {activeTab === 'services' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    Services Offered
                  </h3>
                  {services.length === 0 ? (
                    <p className="text-gray-600">No services listed yet.</p>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {services.map((service) => (
                        <div
                          key={service.id}
                          className="p-4 border border-gray-200 rounded-xl hover:border-blue-600 transition-colors"
                        >
                          <h4 className="font-semibold text-gray-900 mb-1">
                            {service.name}
                          </h4>
                          <p className="text-sm text-gray-600">{service.description}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}

              {activeTab === 'reviews' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    Client Reviews
                  </h3>
                  {reviews.length === 0 ? (
                    <p className="text-gray-600">No reviews yet.</p>
                  ) : (
                    <div className="space-y-4">
                      {reviews.map((review) => (
                        <div
                          key={review.id}
                          className="p-4 border border-gray-200 rounded-xl"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-semibold text-gray-900">
                              {review.profiles?.full_name}
                            </span>
                            <div className="flex items-center gap-1">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < review.rating
                                      ? 'fill-yellow-400 text-yellow-400'
                                      : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-gray-600">{review.comment}</p>
                          <p className="text-xs text-gray-400 mt-2">
                            {new Date(review.created_at).toLocaleDateString()}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}
            </Card>
          </motion.div>
        </div>
      </main>

      <Modal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        title="Book This Cleaner"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date
            </label>
            <Input
              type="date"
              value={bookingDate}
              onChange={(e) => setBookingDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Time
            </label>
            <Input
              type="time"
              value={bookingTime}
              onChange={(e) => setBookingTime(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Task Details
            </label>
            <textarea
              value={taskDetails}
              onChange={(e) => setTaskDetails(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl border border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all duration-200 min-h-[120px]"
              placeholder="Describe what you need cleaned..."
            />
          </div>

          <Button variant="primary" size="lg" className="w-full">
            Confirm Booking
          </Button>
        </div>
      </Modal>

      <Footer />
    </div>
  );
};
