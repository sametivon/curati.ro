import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Calendar, Clock, MapPin, Star, User, Briefcase } from 'lucide-react';
import { motion } from 'framer-motion';

type ViewMode = 'client' | 'cleaner';

export const DashboardPage = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('client');

  const mockBookings = [
    {
      id: '1',
      cleanerName: 'Maria Ionescu',
      service: 'House Cleaning',
      date: '2025-10-25',
      time: '10:00',
      status: 'pending',
      location: 'București',
    },
    {
      id: '2',
      cleanerName: 'Ion Popescu',
      service: 'Office Cleaning',
      date: '2025-10-22',
      time: '14:00',
      status: 'accepted',
      location: 'Cluj-Napoca',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pt-20">
        <div className="bg-gradient-to-br from-blue-600 to-green-500 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
            <p className="text-blue-100">Manage your bookings and profile</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <Card className="p-2 inline-flex gap-2">
              <button
                onClick={() => setViewMode('client')}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                  viewMode === 'client'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <User className="w-5 h-5 inline mr-2" />
                Client View
              </button>
              <button
                onClick={() => setViewMode('cleaner')}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                  viewMode === 'cleaner'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Briefcase className="w-5 h-5 inline mr-2" />
                Cleaner View
              </button>
            </Card>
          </div>

          {viewMode === 'client' && (
            <motion.div
              key="client"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm mb-1">Active Bookings</p>
                      <p className="text-3xl font-bold text-gray-900">3</p>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm mb-1">Total Spent</p>
                      <p className="text-3xl font-bold text-gray-900">1,250 RON</p>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                      <Star className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm mb-1">Completed</p>
                      <p className="text-3xl font-bold text-gray-900">12</p>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
                      <Clock className="w-6 h-6 text-purple-600" />
                    </div>
                  </div>
                </Card>
              </div>

              <Card className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">My Bookings</h2>
                <div className="space-y-4">
                  {mockBookings.map((booking) => (
                    <div
                      key={booking.id}
                      className="p-4 border border-gray-200 rounded-xl hover:border-blue-600 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-gray-900 text-lg mb-1">
                            {booking.service}
                          </h3>
                          <p className="text-gray-600">with {booking.cleanerName}</p>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            booking.status === 'pending'
                              ? 'bg-yellow-100 text-yellow-700'
                              : 'bg-green-100 text-green-700'
                          }`}
                        >
                          {booking.status}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          {new Date(booking.date).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          {booking.time}
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          {booking.location}
                        </div>
                      </div>

                      <div className="flex gap-2 mt-4">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                        {booking.status === 'pending' && (
                          <Button variant="ghost" size="sm">
                            Cancel
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          )}

          {viewMode === 'cleaner' && (
            <motion.div
              key="cleaner"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm mb-1">Pending Requests</p>
                      <p className="text-3xl font-bold text-gray-900">5</p>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-orange-600" />
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm mb-1">This Month</p>
                      <p className="text-3xl font-bold text-gray-900">3,200 RON</p>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                      <Star className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm mb-1">Rating</p>
                      <p className="text-3xl font-bold text-gray-900">4.8★</p>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-yellow-100 flex items-center justify-center">
                      <Star className="w-6 h-6 text-yellow-600" />
                    </div>
                  </div>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Booking Requests
                  </h2>
                  <div className="space-y-4">
                    {mockBookings.map((booking) => (
                      <div
                        key={booking.id}
                        className="p-4 border border-gray-200 rounded-xl"
                      >
                        <h3 className="font-semibold text-gray-900 mb-2">
                          {booking.service}
                        </h3>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-3">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            {new Date(booking.date).toLocaleDateString()}
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            {booking.time}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="secondary" size="sm">
                            Accept
                          </Button>
                          <Button variant="outline" size="sm">
                            Decline
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                <Card className="p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Profile Settings
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Hourly Rate
                      </label>
                      <input
                        type="number"
                        className="w-full px-4 py-3 rounded-2xl border border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none"
                        placeholder="50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Bio
                      </label>
                      <textarea
                        className="w-full px-4 py-3 rounded-2xl border border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none min-h-[120px]"
                        placeholder="Tell clients about your experience..."
                      />
                    </div>
                    <Button variant="primary" size="md" className="w-full">
                      Save Changes
                    </Button>
                  </div>
                </Card>
              </div>
            </motion.div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};
