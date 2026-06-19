import OrganizerTable from '@/components/organizers/OrganizerTable';
import React from 'react';

const Organizers = () => {
  return (
     <div className="p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-semibold">
              Organizer Approvals
            </h1>
            <p className="text-gray-500 text-sm">
              Review and approve organizer verification requests
            </p>
          </div>
          <OrganizerTable/>
        </div>
  );
}

export default Organizers;
