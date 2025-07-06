import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

const BranchComparison = ({ data, title, target }) => {
  const formatTooltip = (value, name) => {
    if (name === 'actual') {
      return [`${value.toLocaleString('ru-RU')} ₽`, 'Фактические продажи'];
    }
    if (name === 'target') {
      return [`${value.toLocaleString('ru-RU')} ₽`, 'Целевые продажи'];
    }
    return [value, name];
  };

  const getBarColor = (actual, target) => {
    const percentage = (actual / target) * 100;
    if (percentage >= 100) return 'var(--color-success)';
    if (percentage >= 80) return 'var(--color-warning)';
    return 'var(--color-error)';
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-6 card-shadow">
      <h3 className="text-lg font-semibold text-text-primary mb-4">{title}</h3>
      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              dataKey="branch" 
              stroke="var(--color-text-secondary)"
              fontSize={12}
            />
            <YAxis 
              stroke="var(--color-text-secondary)"
              fontSize={12}
              tickFormatter={(value) => `${(value / 1000).toFixed(0)}к`}
            />
            <Tooltip 
              formatter={formatTooltip}
              labelStyle={{ color: 'var(--color-text-primary)' }}
              contentStyle={{
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                borderRadius: '8px'
              }}
            />
            <ReferenceLine 
              y={target} 
              stroke="var(--color-primary)" 
              strokeDasharray="5 5"
              label={{ value: "Цель", position: "topRight" }}
            />
            <Bar 
              dataKey="actual" 
              fill="var(--color-primary)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
        {data.map((branch, index) => {
          const percentage = ((branch.actual / branch.target) * 100).toFixed(1);
          const isAboveTarget = branch.actual >= branch.target;
          return (
            <div key={index} className="text-center">
              <p className="text-sm font-medium text-text-primary">{branch.branch}</p>
              <p className={`text-xs ${isAboveTarget ? 'text-success' : 'text-error'}`}>
                {percentage}% от цели
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BranchComparison;