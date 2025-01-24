import { Home, PlusSquare } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export const BottomNav = () => {
  const location = useLocation();
  
  return (
    <div className="fixed bottom-0 left-0 right-0 border-t bg-white py-2">
      <div className="flex justify-around items-center max-w-lg mx-auto px-4">
        <Link to="/" className={`p-2 ${location.pathname === "/" ? "text-blue-500" : "text-gray-400"}`}>
          <Home size={24} />
        </Link>
        <Link to="/new" className={`p-2 ${location.pathname === "/new" ? "text-blue-500" : "text-gray-400"}`}>
          <PlusSquare size={24} />
        </Link>
      </div>
    </div>
  );
};