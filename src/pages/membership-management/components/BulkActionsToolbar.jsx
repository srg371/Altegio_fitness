import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const BulkActionsToolbar = ({ selectedCount, onBulkAction, onClearSelection }) => {
  const [showRenewalModal, setShowRenewalModal] = useState(false);
  const [renewalData, setRenewalData] = useState({
    duration: '1',
    durationType: 'month',
    price: '',
    discount: '0'
  });

  if (selectedCount === 0) return null;

  const handleRenewal = () => {
    onBulkAction('renew', renewalData);
    setShowRenewalModal(false);
    setRenewalData({
      duration: '1',
      durationType: 'month',
      price: '',
      discount: '0'
    });
  };

  return (
    <>
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-surface border border-border rounded-lg shadow-lg p-4 z-40">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Icon name="CheckSquare" size={20} className="text-primary" />
            <span className="text-sm font-medium text-text-primary">
              Выбрано: {selectedCount}
            </span>
          </div>

          <div className="h-6 w-px bg-border"></div>

          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowRenewalModal(true)}
              iconName="RefreshCw"
            >
              Продлить
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => onBulkAction('notify')}
              iconName="Bell"
            >
              Уведомить
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => onBulkAction('suspend')}
              iconName="Pause"
            >
              Приостановить
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => onBulkAction('export')}
              iconName="Download"
            >
              Экспорт
            </Button>

            <div className="h-6 w-px bg-border"></div>

            <Button
              variant="ghost"
              size="sm"
              onClick={onClearSelection}
              iconName="X"
            >
              Отменить
            </Button>
          </div>
        </div>
      </div>

      {/* Renewal Modal */}
      {showRenewalModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-surface rounded-lg border border-border shadow-xl w-full max-w-md mx-4">
            <div className="p-6 border-b border-border">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-text-primary">
                  Продление членства
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowRenewalModal(false)}
                  iconName="X"
                />
              </div>
              <p className="text-sm text-text-secondary mt-2">
                Продлить членство для {selectedCount} участников
              </p>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Длительность
                  </label>
                  <Input
                    type="number"
                    value={renewalData.duration}
                    onChange={(e) => setRenewalData({...renewalData, duration: e.target.value})}
                    min="1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Период
                  </label>
                  <select
                    value={renewalData.durationType}
                    onChange={(e) => setRenewalData({...renewalData, durationType: e.target.value})}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-surface text-text-primary"
                  >
                    <option value="month">Месяц(ев)</option>
                    <option value="year">Год(лет)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Цена за период (₽)
                </label>
                <Input
                  type="number"
                  value={renewalData.price}
                  onChange={(e) => setRenewalData({...renewalData, price: e.target.value})}
                  placeholder="Введите цену"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Скидка (%)
                </label>
                <Input
                  type="number"
                  value={renewalData.discount}
                  onChange={(e) => setRenewalData({...renewalData, discount: e.target.value})}
                  min="0"
                  max="100"
                />
              </div>

              {renewalData.price && renewalData.discount && (
                <div className="bg-secondary-50 p-3 rounded-lg">
                  <div className="flex justify-between text-sm">
                    <span className="text-text-secondary">Цена:</span>
                    <span className="text-text-primary">{renewalData.price} ₽</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-text-secondary">Скидка:</span>
                    <span className="text-warning">-{(renewalData.price * renewalData.discount / 100).toFixed(2)} ₽</span>
                  </div>
                  <div className="flex justify-between text-sm font-medium border-t border-border pt-2 mt-2">
                    <span className="text-text-primary">Итого:</span>
                    <span className="text-primary">
                      {(renewalData.price - (renewalData.price * renewalData.discount / 100)).toFixed(2)} ₽
                    </span>
                  </div>
                </div>
              )}
            </div>

            <div className="p-6 border-t border-border">
              <div className="flex space-x-3">
                <Button
                  variant="primary"
                  onClick={handleRenewal}
                  disabled={!renewalData.price}
                  className="flex-1"
                >
                  Продлить членство
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowRenewalModal(false)}
                  className="flex-1"
                >
                  Отмена
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BulkActionsToolbar;