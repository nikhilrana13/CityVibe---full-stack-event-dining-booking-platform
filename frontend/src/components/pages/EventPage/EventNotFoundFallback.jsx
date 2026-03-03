import React from 'react';
import { Button } from "../../../components/ui/button";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

const EventNotFoundFallback = () => {
    const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center text-center py-28 space-y-6">

      {/* Soft Icon Circle */}
      <div className="w-24 h-24 rounded-full bg-gradient-to-br 
                      from-purple-100 to-purple-200 
                      flex items-center justify-center 
                      shadow-md">
        <Search size={40} className="text-purple-600" />
      </div>

      {/* Heading */}
      <h2 className="text-2xl font-semibold tracking-tight">
        Event Not Found
      </h2>

      {/* Description */}
      <p className="text-gray-500 max-w-md">
        The event you’re looking for might have been removed,
        expired, or is no longer available.
      </p>

      {/* CTA */}
      <Button
        onClick={() => navigate("/events")}
        className="rounded-xl px-6 py-5"
      >
        Explore Other Events
      </Button>
    </div>
  );
}

export default EventNotFoundFallback;
