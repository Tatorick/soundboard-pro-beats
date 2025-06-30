
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NavigationProvider } from "./contexts/NavigationContext";
import Home from "./pages/Home";
import VolleyballSounds from "./pages/VolleyballSounds";
import Settings from "./pages/Settings";
import BottomNavigation from "./components/BottomNavigation";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <NavigationProvider>
          <div className="min-h-screen bg-gray-50 pb-20">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/volleyball-sounds" element={<VolleyballSounds />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <BottomNavigation />
          </div>
        </NavigationProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
