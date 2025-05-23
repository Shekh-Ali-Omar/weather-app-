
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { WeatherProvider } from "./context/WeatherContext";
import CurrentPage from "./pages/CurrentPage";
import ForecastPage from "./pages/ForecastPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <WeatherProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<CurrentPage />} />
            <Route path="/forecast" element={<ForecastPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </WeatherProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
