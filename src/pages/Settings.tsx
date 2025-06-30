
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Volume2, RotateCcw } from 'lucide-react';
import { useNavigation } from '../contexts/NavigationContext';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const Settings = () => {
  const navigate = useNavigate();
  const {
    currentVolume,
    setCurrentVolume,
    loopEnabled,
    setLoopEnabled,
    soundSettings,
    setSoundSettings
  } = useNavigation();

  const soundOptions = [
    'Whistle', 'Spike', 'Serve', 'Block', 'Cheer', 'Boom', 'Clap', 'Horn'
  ];

  const handleSoundSettingChange = (event: string, value: string) => {
    setSoundSettings({
      ...soundSettings,
      [event]: value
    });
    console.log(`Sound setting changed: ${event} -> ${value}`);
  };

  const handleVolumeChange = (value: number[]) => {
    setCurrentVolume(value[0]);
    console.log(`Volume changed to: ${value[0]}%`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 px-4 py-4">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-xl hover:bg-gray-100 transition-colors duration-200"
          >
            <ArrowLeft size={24} className="text-gray-600" />
          </button>
          
          <h1 className="text-xl font-bold text-gray-800">Settings</h1>
          
          <div className="w-10" /> {/* Spacer */}
        </div>
      </div>

      <div className="p-4 max-w-2xl mx-auto space-y-6">
        {/* Master Volume */}
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center mb-4">
            <Volume2 size={24} className="text-blue-600 mr-3" />
            <h2 className="text-xl font-bold text-gray-800">Master Volume</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Volume Level</span>
              <span className="text-blue-600 font-semibold">{currentVolume}%</span>
            </div>
            
            <Slider
              value={[currentVolume]}
              onValueChange={handleVolumeChange}
              max={100}
              min={0}
              step={5}
              className="w-full"
            />
            
            <div className="flex justify-between text-sm text-gray-500">
              <span>Mute</span>
              <span>Max</span>
            </div>
          </div>
        </div>

        {/* Sound Settings */}
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Sound Settings</h2>
          <p className="text-gray-600 mb-6 text-sm">Selecciona sonidos predeterminados para eventos específicos</p>
          
          <div className="space-y-4">
            {Object.entries(soundSettings).map(([event, sound]) => (
              <div key={event} className="flex items-center justify-between py-2">
                <label className="text-gray-700 font-medium capitalize">
                  {event.replace(/([A-Z])/g, ' $1').trim()}
                </label>
                <Select value={sound} onValueChange={(value) => handleSoundSettingChange(event, value)}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {soundOptions.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            ))}
          </div>
        </div>

        {/* Loop Settings */}
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center mb-4">
            <RotateCcw size={24} className="text-green-600 mr-3" />
            <h2 className="text-xl font-bold text-gray-800">Loop Settings</h2>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-gray-800">Enable Loop Mode</h3>
              <p className="text-sm text-gray-600">Los sonidos se reproducirán en bucle hasta ser detenidos</p>
            </div>
            
            <Switch
              checked={loopEnabled}
              onCheckedChange={(checked) => {
                setLoopEnabled(checked);
                console.log(`Loop mode ${checked ? 'enabled' : 'disabled'}`);
              }}
            />
          </div>
        </div>

        {/* App Info */}
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h2 className="text-xl font-bold text-gray-800 mb-4">App Info</h2>
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex justify-between">
              <span>Version</span>
              <span>1.0.0</span>
            </div>
            <div className="flex justify-between">
              <span>Build</span>
              <span>2024.06.30</span>
            </div>
            <div className="flex justify-between">
              <span>Developer</span>
              <span>SoundBoard Pro Team</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
