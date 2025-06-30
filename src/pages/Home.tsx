
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Volume2, Music, Mic, Zap } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();

  const categories = [
    {
      id: 'volleyball',
      title: 'Volleyball Sounds',
      description: 'Game and crowd sounds for volleyball matches',
      icon: Volume2,
      color: 'from-blue-500 to-cyan-500',
      path: '/volleyball-sounds'
    },
    {
      id: 'bar',
      title: 'Bar Sounds',
      description: 'Ambient sounds for social environments',
      icon: Music,
      color: 'from-green-500 to-emerald-500',
      path: '/bar-sounds'
    },
    {
      id: 'nature',
      title: 'Nature Sounds',
      description: 'Relaxing sounds from nature',
      icon: Mic,
      color: 'from-purple-500 to-pink-500',
      path: '/nature-sounds'
    },
    {
      id: 'effects',
      title: 'Sound Effects',
      description: 'Special effects and fun sounds',
      icon: Zap,
      color: 'from-orange-500 to-red-500',
      path: '/effects-sounds'
    }
  ];

  const handleCategoryClick = (path: string) => {
    console.log(`Navigating to: ${path}`);
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4">
      {/* Header */}
      <div className="mb-8 text-center pt-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">SoundBoard Pro</h1>
        <p className="text-gray-600">Toca una categoría para explorar sonidos</p>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <button
              key={category.id}
              onClick={() => handleCategoryClick(category.path)}
              className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 active:scale-95"
            >
              {/* Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-r ${category.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`} />
              
              {/* Content */}
              <div className="relative z-10">
                <div className={`w-16 h-16 bg-gradient-to-r ${category.color} rounded-xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300`}>
                  <Icon size={28} className="text-white" />
                </div>
                
                <h3 className="text-xl font-bold text-gray-800 mb-2">{category.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{category.description}</p>
              </div>

              {/* Hover Effect */}
              <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-blue-200 transition-colors duration-300" />
            </button>
          );
        })}
      </div>

      {/* Footer */}
      <div className="text-center mt-12 text-gray-500 text-sm">
        <p>Selecciona una categoría para comenzar</p>
      </div>
    </div>
  );
};

export default Home;
