import React from 'react';
import { LucideIcon } from 'lucide-react';

interface Details {
  heading?: string;
  description?: string;
  icon?: LucideIcon;
}

export default function DisplayCard({ heading, description, icon: Icon }: Details) {
  return (
    <div className="w-[80%] md:w-[25%] min-h-[32vh] p-8 rounded-md shadow-lg hover:shadow-2xl transition-shadow cursor-pointer gap-12">
      <div className="flex flex-col h-full gap-4 ">
          <div className=' py-2'>
          {Icon && (
              <div className="flex items-center text-orange-500 justify-center md:justify-start">
                <Icon className="w-6 h-6 md:w-10 md:h-10   "  />
              </div>
            )}

          </div>
                
        <div className="flex flex-col gap-4 ">
          {heading && (
            <h4 className="text-md md:text-xl font-semibold text-center md:text-start">{heading}</h4>
          )}
          
          {description && (
            <p className="text-sm md:text-lg  text-slate-800 text-center md:text-start">{description}</p>
          )}
        </div>
      </div>
    </div>
  );
}