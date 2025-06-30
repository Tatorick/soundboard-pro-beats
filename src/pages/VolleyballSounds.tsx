
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Settings, ArrowLeft, Play, Pause } from 'lucide-react';
import { useNavigation } from '../contexts/NavigationContext';

const VolleyballSounds = () => {
  const navigate = useNavigate();
  const { currentVolume, loopEnabled } = useNavigation();
  const [playingSound, setPlayingSound] = useState<string | null>(null);

  const gameSounds = [
    { id: 'whistle', name: 'Whistle', color: 'from-blue-500 to-blue-600' },
    { id: 'spike', name: 'Spike', color: 'from-green-500 to-green-600' },
    { id: 'serve', name: 'Serve', color: 'from-purple-500 to-purple-600' },
    { id: 'block', name: 'Block', color: 'from-orange-500 to-orange-600' },
    { id: 'net', name: 'Net Hit', color: 'from-red-500 to-red-600' },
    { id: 'bounce', name: 'Ball Bounce', color: 'from-cyan-500 to-cyan-600' }
  ];

  const crowdSounds = [
    { id: 'cheer', name: 'Cheer', color: 'from-pink-500 to-pink-600' },
    { id: 'boom', name: 'Boom', color: 'from-indigo-500 to-indigo-600' },
    { id: 'clap', name: 'Clap', color: 'from-teal-500 to-teal-600' },
    { id: 'horn', name: 'Horn', color: 'from-yellow-500 to-yellow-600' },
    { id: 'crowd', name: 'Crowd', color: 'from-emerald-500 to-emerald-600' },
    { id: 'stadium', name: 'Stadium', color: 'from-violet-500 to-violet-600' }
  ];

  const playSound = (soundId: string) => {
    console.log(`Playing sound: ${soundId} at volume: ${currentVolume}%, loop: ${loopEnabled}`);
    
    // Simular reproducción de audio
    if (playingSound === soundId) {
      setPlayingSound(null);
    } else {
      setPlayingSound(soundId);
      // Simular que el sonido se detiene después de 2 segundos si no está en loop
      if (!loopEnabled) {
        setTimeout(() => {
          setPlayingSound(null);
        }, 2000);
      }
    }
  };

  const SoundButton = ({ sound, section }: { sound: any; section: string }) => {
    const isPlaying = playingSound === sound.id;
    
    return (
      <button
        key={sound.id}
        onClick={() => playSound(sound.id)}
        className="group relative bg-white rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 active:scale-95"
      >
        {/* Gradient Background */}
        <div className={`absolute inset-0 bg-gradient-to-r ${sound.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`} />
        
        {/* Content */}
        <div className="relative z-10 text-center">
          <div className={`w-12 h-12 bg-gradient-to-r ${sound.color} rounded-xl flex items-center justify-center mb-3 mx-auto group-hover:scale-110 transition-transform duration-300`}>
            {isPlaying ? (
              <Pause size={20} className="text-white" />
            ) : (
              <Play size={20} className="text-white" />
            )}
          </div>
          
          <h3 className="font-semibold text-gray-800 text-sm">{sound.name}</h3>
          {isPlaying && (
            <div className="mt-2">
              <div className="w-full bg-gray-200 rounded-full h-1">
                <div className="bg-blue-500 h-1 rounded-full animate-pulse" style={{ width: '60%' }} />
              </div>
            </div>
          )}
        </div>

        {/* Hover Effect */}
        <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-blue-200 transition-colors duration-300" />
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 px-4 py-4">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <button
            onClick={() => navigate('/')}
            className="p-2 rounded-xl hover:bg-gray-100 transition-colors duration-200"
          >
            <ArrowLeft size={24} className="text-gray-600" />
          </button>
          
          <h1 className="text-xl font-bold text-gray-800">Volleyball Sounds</h1>
          
          <button
            onClick={() => navigate('/settings')}
            className="p-2 rounded-xl hover:bg-gray-100 transition-colors duration-200"
          >
            <Settings size={24} className="text-gray-600" />
          </button>
        </div>
      </div>

      <div className="p-4 max-w-4xl mx-auto">
        {/* Game Sounds Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Game Sounds</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {gameSounds.map((sound) => (
              <SoundButton key={sound.id} sound={sound} section="game" />
            ))}
          </div>
        </div>

        {/* Crowd Sounds Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Crowd Sounds</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {crowdSounds.map((sound) => (
              <SoundButton key={sound.id} sound={sound} section="crowd" />
            ))}
          </div>
        </div>

        {/* Current Status */}
        {playingSound && (
          <div className="fixed top-20 left-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-xl shadow-lg z-40 max-w-md mx-auto">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">
                Reproduciendo: {gameSounds.concat(crowdSounds).find(s => s.id === playingSound)?.name}
              </span>
              <span className="text-xs opacity-80">Vol: {currentVolume}%</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VolleyballSounds;
