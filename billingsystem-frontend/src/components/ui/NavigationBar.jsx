import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const NavigationBar = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const currentUser = {
    name: 'John Smith',
    role: 'Cashier',
    initials: 'JS'
  };

  const navigationItems = [
    {
      path: '/counter-billing-dashboard',
      label: 'Dashboard',
      icon: 'LayoutDashboard'
    },
    {
      path: '/table-management',
      label: 'Tables',
      icon: 'Utensils'
    },
    {
      path: '/order-history',
      label: 'Orders',
      icon: 'Receipt'
    },
    {
      path: '/inventory-management',
      label: 'Inventory',
      icon: 'Package'
    }
  ];

  const isActive = (path) => location?.pathname === path;

  const handleLogout = () => {
    console.log('Logout clicked');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleUserMenu = () => {
    setUserMenuOpen(!userMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 h-[60px] bg-card shadow-elevation-2 z-[1000]">
        <div className="h-full px-6 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-accent/10 rounded-md flex items-center justify-center transition-smooth">
                <Icon name="Store" size={24} color="var(--color-accent)" />
              </div>
              <span className="text-xl font-heading font-semibold text-foreground hidden sm:block">
                RestaurantPOS Pro
              </span>
            </div>

            <div className="hidden lg:flex items-center gap-2">
              {navigationItems?.map((item) => (
                <Link
                  key={item?.path}
                  to={item?.path}
                  className={`
                    flex items-center gap-2 px-4 h-12 rounded-md
                    transition-smooth touch-target
                    ${isActive(item?.path)
                      ? 'bg-accent text-accent-foreground shadow-elevation-1'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground hover-lift'
                    }
                  `}
                >
                  <Icon name={item?.icon} size={20} />
                  <span className="font-medium">{item?.label}</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={toggleUserMenu}
              className="relative flex items-center gap-3 px-3 h-12 rounded-md hover:bg-muted transition-smooth touch-target"
            >
              <div className="w-8 h-8 bg-primary text-primary-foreground rounded-md flex items-center justify-center font-medium text-sm">
                {currentUser?.initials}
              </div>
              <div className="hidden sm:block text-left">
                <div className="text-sm font-medium text-foreground">{currentUser?.name}</div>
                <div className="text-xs text-muted-foreground caption">{currentUser?.role}</div>
              </div>
              <Icon name="ChevronDown" size={16} className="text-muted-foreground" />
            </button>

            <button
              onClick={toggleMobileMenu}
              className="lg:hidden flex items-center justify-center w-12 h-12 rounded-md hover:bg-muted transition-smooth touch-target"
              aria-label="Toggle menu"
            >
              <Icon name={isMobileMenuOpen ? 'X' : 'Menu'} size={24} />
            </button>
          </div>
        </div>

        {userMenuOpen && (
          <>
            <div
              className="fixed inset-0 z-[1010]"
              onClick={() => setUserMenuOpen(false)}
            />
            <div className="absolute top-[68px] right-6 w-64 bg-popover rounded-md shadow-elevation-3 z-[1020] overflow-hidden">
              <div className="p-4 border-b border-border">
                <div className="text-sm font-medium text-popover-foreground">{currentUser?.name}</div>
                <div className="text-xs text-muted-foreground caption mt-1">{currentUser?.role}</div>
              </div>
              <div className="p-2">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 h-12 rounded-md hover:bg-muted text-foreground transition-smooth touch-target"
                >
                  <Icon name="LogOut" size={20} />
                  <span className="font-medium">Logout</span>
                </button>
              </div>
            </div>
          </>
        )}
      </nav>
      {isMobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-background z-[1010] lg:hidden"
            onClick={closeMobileMenu}
          />
          <div className="fixed top-[60px] left-0 right-0 bottom-0 bg-card z-[1020] lg:hidden overflow-y-auto custom-scrollbar">
            <div className="p-6 space-y-2">
              {navigationItems?.map((item) => (
                <Link
                  key={item?.path}
                  to={item?.path}
                  onClick={closeMobileMenu}
                  className={`
                    flex items-center gap-3 px-4 h-14 rounded-md
                    transition-smooth touch-target
                    ${isActive(item?.path)
                      ? 'bg-accent text-accent-foreground shadow-elevation-1'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                    }
                  `}
                >
                  <Icon name={item?.icon} size={24} />
                  <span className="font-medium text-lg">{item?.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default NavigationBar;