import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SparkleCursor } from "./components/SparkleCursor";
import Index from "./pages/Index";
import Gallery from "./pages/Gallery";
import Playlist from "./pages/Playlist";
import Letters from "./pages/Letters";
import Games from "./pages/Games";
import WishWall from "./pages/WishWall";
import Timeline from "./pages/Timeline";
import Surprises from "./pages/Surprises";
import AboutUs from "./pages/AboutUs";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <SparkleCursor />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/playlist" element={<Playlist />} />
          <Route path="/letters" element={<Letters />} />
          <Route path="/games" element={<Games />} />
          <Route path="/wish-wall" element={<WishWall />} />
          <Route path="/timeline" element={<Timeline />} />
          <Route path="/surprises" element={<Surprises />} />
          <Route path="/about" element={<AboutUs />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
