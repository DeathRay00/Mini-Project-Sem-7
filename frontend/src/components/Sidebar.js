import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Calendar, 
  FileText, 
  Pill, 
  Activity, 
  Users, 
  Heart 
} from 'lucide-react';

const iconMap = {
  LayoutDashboard,
  Calendar,
  FileText,
  Pill,
  Activity,
  Users
};

const Sidebar = ({ navigationItems, userRole }) => {
  const location = useLocation();

  const getIcon = (iconName) => {
    const IconComponent = iconMap[iconName];
    return IconComponent ? <IconComponent size={20} /> : null;
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <div className="flex items-center justify-center w-10 h-10 bg-blue-600 rounded-xl">
            <Heart className="w-5 h-5 text-white" />
          </div>
          Clynicx
        </div>
        <div className="mt-2 text-sm text-gray-500">
          {userRole} Portal
        </div>
      </div>
      
      <nav className="sidebar-nav">
        {navigationItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`nav-item ${
              location.pathname === item.path || 
              (item.path !== '/patient' && item.path !== '/doctor' && location.pathname.startsWith(item.path))
                ? 'active' 
                : ''
            }`}
          >
            {getIcon(item.icon)}
            {item.name}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;