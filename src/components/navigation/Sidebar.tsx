import React from 'react';
import { Logo } from '../Logo';
import { LogOut } from 'lucide-react';
import { MODULES } from '../../constants/modules';
import { TRANSLATIONS } from '../../constants/translations';
import { useAppearance } from '../../hooks/useAppearance';
import { UserRole } from '../../types/auth';

interface SidebarProps {
  currentModule: string;
  onModuleChange: (module: string) => void;
  onLogout: () => void;
  userRole: UserRole;
}

export function Sidebar({ currentModule, onModuleChange, onLogout, userRole }: SidebarProps) {
  const { colors } = useAppearance();
  
  // Filter modules based on user role
  const allowedModules = MODULES.filter(module => {
    if (userRole === 'admin') return true;
    
    // Modules allowed for normal users
    const userModules = [
      'appointments',
      'sales',
      'clients',
      'pettyCash',
      'expenses',
      'credits',
      'reports'
    ];
    
    return userModules.includes(module.id);
  });
  
  return (
    <div className="w-64 bg-white h-screen shadow-lg flex flex-col">
      <div className="p-4 border-b">
        <Logo showSlogan={false} variant="compact" />
      </div>
      
      <nav className="flex-1 overflow-y-auto p-4">
        {allowedModules.map((module) => (
          <button
            key={module.id}
            onClick={() => onModuleChange(module.id)}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg mb-2 transition-colors`}
            style={{
              backgroundColor: currentModule === module.id ? `${colors.primary}15` : 'transparent',
              color: currentModule === module.id ? colors.primary : 'rgb(75, 85, 99)'
            }}
          >
            {React.cloneElement(module.icon, {
              className: 'h-5 w-5',
              style: { color: currentModule === module.id ? colors.primary : 'currentColor' }
            })}
            <span>{module.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t">
        <button
          onClick={onLogout}
          className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
        >
          <LogOut className="h-5 w-5" />
          <span>{TRANSLATIONS.buttons.logout}</span>
        </button>
      </div>
    </div>
  );
}