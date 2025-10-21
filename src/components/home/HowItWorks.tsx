import { motion } from 'framer-motion';
import { Search, Users, Calendar } from 'lucide-react';

const steps = [
  {
    icon: Search,
    title: 'Post Your Need',
    description: 'Tell us what you need cleaned and where',
  },
  {
    icon: Users,
    title: 'Compare Cleaners',
    description: 'Browse verified professionals with real reviews',
  },
  {
    icon: Calendar,
    title: 'Book & Relax',
    description: 'Schedule a time that works for you and enjoy',
  },
];

export const HowItWorks = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Getting your space cleaned has never been easier
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                className="relative"
              >
                <div className="bg-white rounded-3xl p-8 text-center shadow-sm hover:shadow-lg transition-shadow duration-200">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-600 to-green-500 mb-6">
                    <Icon className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl font-bold shadow-lg">
                    {index + 1}
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>

                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-blue-600 to-green-500 opacity-30" />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
