import React from 'react';
import { useApp } from '../../context/AppContext';

// Legacy component name retained; authenticated profiles cannot be switched locally.
export function RoleSwitcher() {
  const { currentUser } = useApp();
  if (!currentUser) return null;
  return <span className="text-xs font-semibold">{currentUser.role}</span>;
}
