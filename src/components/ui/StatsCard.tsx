import { TrendingUp, TrendingDown } from 'lucide-react';
import { Card } from './Card';
import type { ElementType } from 'react';

interface StatsCardProps {
  icon: ElementType;
  iconBg?: string;
  iconColor?: string;
  title: string;
  value: string | number;
  change?: number | { value: string; positive?: boolean }; // percentage or custom string
  changeLabel?: string;
  sparklineData?: number[];
  className?: string;
}

export default function StatsCard({
  icon: Icon,
  iconBg = 'bg-[#16C7B0]/10',
  iconColor = 'text-[#16C7B0]',
  title,
  value,
  change,
  changeLabel,
  sparklineData,
  className = '',
}: StatsCardProps) {
  const isPositive =
    typeof change === 'object' && change !== null
      ? change.positive !== false
      : change !== undefined && typeof change === 'number' && change >= 0;

  const changeText =
    typeof change === 'object' && change !== null
      ? change.value
      : typeof change === 'number'
      ? `${change >= 0 ? '+' : ''}${change.toFixed(1)}%`
      : '';

  return (
    <Card padding="md" className={className}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          {/* Icon */}
          <div
            className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${iconBg}`}
          >
            <Icon className={`w-5 h-5 ${iconColor}`} />
          </div>

          {/* Title */}
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
            {title}
          </p>

          {/* Value */}
          <p className="text-2xl font-bold text-[#101B2D] leading-none">
            {value}
          </p>

          {/* Change */}
          {change !== undefined && (
            <div className="flex items-center gap-1 mt-2">
              {isPositive ? (
                <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
              ) : (
                <TrendingDown className="w-3.5 h-3.5 text-red-500" />
              )}
              <span
                className={`text-xs font-medium ${
                  isPositive ? 'text-emerald-600' : 'text-red-600'
                }`}
              >
                {changeText}
              </span>
              {changeLabel && (
                <span className="text-xs text-gray-400">{changeLabel}</span>
              )}
            </div>
          )}
        </div>

        {/* Sparkline */}
        {sparklineData && sparklineData.length > 1 && (
          <div className="shrink-0 w-20 h-12 self-end">
            <MiniSparkline data={sparklineData} positive={isPositive} />
          </div>
        )}
      </div>
    </Card>
  );
}

/* ---------- Mini SVG Sparkline ---------- */

function MiniSparkline({ data, positive }: { data: number[]; positive: boolean }) {
  const width = 80;
  const height = 48;
  const padding = 2;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  const points = data.map((v, i) => {
    const x = padding + (i / (data.length - 1)) * (width - padding * 2);
    const y = height - padding - ((v - min) / range) * (height - padding * 2);
    return `${x},${y}`;
  });

  const lineStr = points.join(' ');
  const areaStr = `${padding},${height - padding} ${lineStr} ${width - padding},${height - padding}`;

  const color = positive ? '#10b981' : '#ef4444';
  const fillColor = positive ? 'rgba(16,185,129,0.15)' : 'rgba(239,68,68,0.15)';

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full">
      <polygon points={areaStr} fill={fillColor} />
      <polyline
        points={lineStr}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
