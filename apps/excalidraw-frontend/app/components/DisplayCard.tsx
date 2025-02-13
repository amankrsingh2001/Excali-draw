import React from 'react';
import { LucideIcon } from 'lucide-react';

interface Details {
  heading?: string;
  description?: string;
  icon?: LucideIcon;
}

export default function DisplayCard({ heading, description, icon: Icon }: Details) {
  return (
    <div className="w-[25%] p-8 h-[80%] rounded-md  shadow-lg  hover:shadow-2xl transition-shadow cursor-pointer">
      <div className="flex flex-col h-full gap-4">
        {Icon && (
          <div className="flex items-center text-orange-500">
            <Icon className="w-10 h-10"  />
          </div>
        )}
        
        <div className="space-y-2">
          {heading && (
            <h4 className="text-xl font-semibold">{heading}</h4>
          )}
          
          {description && (
            <p className="text-md text-slate-800">{description}</p>
          )}
        </div>
      </div>
    </div>
  );
}