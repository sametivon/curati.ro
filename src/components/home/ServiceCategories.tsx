import { motion } from 'framer-motion';
import { Home, Building, Leaf, Utensils, Droplet, Square } from 'lucide-react';
import { Card } from '@/components/ui/Card';

const categories = [
  {
    id: 'home',
    name: 'Home Cleaning',
    icon: Home,
    description: 'Professional home cleaning services',
    color: 'from-blue-500 to-blue-600',
  },
  {
    id: 'office',
    name: 'Office Cleaning',
    icon: Building,
    description: 'Commercial space cleaning',
    color: 'from-green-500 to-green-600',
  },
  {
    id: 'garden',
    name: 'Garden Care',
    icon: Leaf,
    description: 'Garden and outdoor maintenance',
    color: 'from-emerald-500 to-emerald-600',
  },
  {
    id: 'kitchen',
    name: 'Kitchen',
    icon: Utensils,
    description: 'Deep kitchen cleaning',
    color: 'from-orange-500 to-orange-600',
  },
  {
    id: 'bathroom',
    name: 'Bathroom',
    icon: Droplet,
    description: 'Complete bathroom sanitization',
    color: 'from-cyan-500 to-cyan-600',
  },
  {
    id: 'windows',
    name: 'Windows',
    icon: Square,
    description: 'Window and glass cleaning',
    color: 'from-sky-500 to-sky-600',
  },
];

export const ServiceCategories = () => {
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
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Browse Services
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find the perfect cleaning service for your needs
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <Card hover className="p-8 group">
                  <a href={`/services?category=${category.id}`} className="block">
                    <div
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-gray-600">{category.description}</p>
                  </a>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
