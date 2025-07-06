import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Icon from '../../../components/AppIcon';

const RevenueBreakdown = ({ data, title }) => {
  const formatTooltip = (value, name) => {
    return [`${value.toLocaleString('ru-RU')} ₽`, name];
  };

  const totalRevenue = data.reduce((sum, item) => sum + item.revenue, 0);

  const getPercentage = (value) => {
    return ((value / totalRevenue) * 100).toFixed(1);
  };

  const getServiceIcon = (service) => {
    switch (service.toLowerCase()) {
      case 'абонементы': return 'CreditCard';
      case 'персональные тренировки': return 'User';
      case 'групповые занятия': return 'Users';
      case 'дополнительные услуги': return 'Plus';
      case 'товары': return 'ShoppingBag';
      default: return 'Circle';
    }
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-6 card-shadow">
      <h3 className="text-lg font-semibold text-text-primary mb-6">{title}</h3>
      
      {/* Chart */}
      <div style={{ width: '100%', height: 300 }} className="mb-6">
        <ResponsiveContainer>
          <BarChart data={data} layout="horizontal" margin={{ top: 5, right: 30, left: 100, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              type="number"
              stroke="var(--color-text-secondary)"
              fontSize={12}
              tickFormatter={(value) => `${(value / 1000).toFixed(0)}к`}
            />
            <YAxis 
              type="category"
              dataKey="service" 
              stroke="var(--color-text-secondary)"
              fontSize={12}
              width={90}
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
            <Bar 
              dataKey="revenue" 
              fill="var(--color-primary)"
              radius={[0, 4, 4, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Detailed Breakdown */}
      <div className="space-y-4">
        {data.map((item, index) => (
          <div key={index} className="flex items-center justify-between p-4 bg-secondary-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary-50 text-primary rounded-lg flex items-center justify-center">
                <Icon name={getServiceIcon(item.service)} size={20} />
              </div>
              <div>
                <h4 className="font-medium text-text-primary">{item.service}</h4>
                <p className="text-sm text-text-secondary">
                  {getPercentage(item.revenue)}% от общей выручки
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-text-primary">
                {item.revenue.toLocaleString('ru-RU')} ₽
              </div>
              <div className="text-sm text-text-secondary">
                {item.count} {item.count === 1 ? 'продажа' : item.count < 5 ? 'продажи' : 'продаж'}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Total Summary */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="TrendingUp" size={20} className="text-success" />
            <span className="font-medium text-text-primary">Общая выручка</span>
          </div>
          <div className="text-2xl font-bold text-success">
            {totalRevenue.toLocaleString('ru-RU')} ₽
          </div>
        </div>
      </div>
    </div>
  );
};

export default RevenueBreakdown;