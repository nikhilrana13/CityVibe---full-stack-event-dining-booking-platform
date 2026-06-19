import { NavLink } from "react-router-dom";
import { LuUtensilsCrossed } from "react-icons/lu";

const AddRestaurantEmptyState = () => {
  return (
    <div className="mt-10 flex items-center justify-center">
      <div className="w-full max-w-4xl bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-10 text-center shadow-2xl relative overflow-hidden">

        {/* Subtle Gradient Glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-600/10 pointer-events-none rounded-3xl"></div>

        {/* Icon */}
        <div className="w-20 h-20 mx-auto rounded-2xl bg-indigo-500/20 flex items-center justify-center mb-6">
          <LuUtensilsCrossed className="text-indigo-400" size={36} />
        </div>

        {/* Heading */}
        <h2 className="text-2xl md:text-3xl font-bold text-black dark:text-white mb-3">
          No Restaurant Added Yet
        </h2>

        {/* Description */}
        <p className="text-gray-500 dark:text-gray-400 text-sm md:text-base max-w-xl mx-auto">
          Start listing your restaurant to manage reservations, showcase your
          menu, and attract customers. You can add only one restaurant under
          your organizer account.
        </p>

        {/* Divider */}
        <div className="w-16 h-[2px] bg-indigo-500/40 mx-auto my-6 rounded-full"></div>

        {/* CTA Button */}
        <NavLink
          to="/organizer/add-restaurant"
          className="inline-flex items-center gap-2 px-8 py-3 rounded-2xl text-white font-semibold text-sm bg-gradient-to-r from-[#6a4dff] to-[#8b5cf6] hover:scale-105 hover:shadow-purple-500/50 transition-all duration-300 shadow-lg shadow-purple-600/30"
        >
          + Add Your Restaurant
        </NavLink>

        {/* Small Note */}
        <p className="text-xs text-gray-400 mt-5">
          Once added, you’ll be able to manage menu items, timings, and dining
          reservations from your dashboard.
        </p>
      </div>
    </div>
  );
};

export default AddRestaurantEmptyState;