import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: LucideIcon;
  color: 'green' | 'blue' | 'amber' | 'red' | 'purple';
  small?: boolean;
}

export function MetricCard({ title, value, change, trend, icon: Icon, color, small = false }: MetricCardProps) {
  const getColorClasses = (color: string) => {
    switch (color) {
      case 'green':
        return 'text-green-600 bg-green-100';
      case 'blue':
        return 'text-blue-600 bg-blue-100';
      case 'amber':
        return 'text-amber-600 bg-amber-100';
      case 'red':
        return 'text-red-600 bg-red-100';
      case 'purple':
        return 'text-purple-600 bg-purple-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getTrendColor = (trend: string) => {
    return trend === 'up' ? 'text-green-600' : 'text-red-600';
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className={`text-sm font-medium text-gray-600 ${small ? 'mb-1' : 'mb-2'}`}>
            {title}
          </p>
          <p className={`font-bold text-gray-900 ${small ? 'text-lg' : 'text-2xl'}`}>
            {value}
          </p>
          <p className={`text-xs mt-1 ${getTrendColor(trend)}`}>
            {change}
          </p>
        </div>
        <div className={`rounded-lg p-3 ${getColorClasses(color)}`}>
          <Icon className={`${small ? 'w-5 h-5' : 'w-6 h-6'}`} />
        </div>
      </div>
    </div>
  );
}