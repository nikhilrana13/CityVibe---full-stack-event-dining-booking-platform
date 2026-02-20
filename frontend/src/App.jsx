import { Route, Routes } from "react-router-dom"
import Homepage from "./pages/Homepage"
import Diningpage from "./pages/Diningpage"
import Eventspage from "./pages/Eventspage"
import { Toaster } from "./components/ui/sonner"
import ListYourEvents from "./pages/ListYourEvents"
import OrganizerDashboard from "./pages/OrganizerDashboard"


const App = () => {
  return (
    <div className="w-full">
      <div id="recaptcha-container"></div>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/dining" element={<Diningpage />} />
        <Route path="/events" element={<Eventspage />} />
        {/* for organizers */}
        <Route path="/events/list-your-events" element={<ListYourEvents />} />
        <Route path="/organizer" element={<OrganizerDashboard />} />
        
      </Routes>
      <Toaster />
    </div>
  )
}

export default App