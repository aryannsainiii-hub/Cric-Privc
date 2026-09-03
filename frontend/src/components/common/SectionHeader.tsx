import React from 'react';

interface SectionHeaderProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, description, action, className = '' }) => (
  <div className={`flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between ${className}`}>
    <div>
      <h2 className="font-display text-2xl md:text-3xl font-medium text-white">{title}</h2>
      {description && <p className="mt-1 max-w-2xl text-sm text-slate-400">{description}</p>}
    </div>
    {action && <div className="mt-3 sm:mt-0">{action}</div>}
  </div>
);

export default SectionHeader;
