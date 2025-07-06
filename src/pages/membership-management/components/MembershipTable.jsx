import React, { useState, useMemo } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const MembershipTable = ({ members, onMemberSelect, selectedMember, onBulkAction }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-success text-success-foreground';
      case 'expired': return 'bg-error text-error-foreground';
      case 'expiring': return 'bg-warning text-warning-foreground';
      case 'suspended': return 'bg-secondary text-secondary-foreground';
      default: return 'bg-secondary text-secondary-foreground';
    }
  };

  const getPaymentStatusColor = (status) => {
    switch (status) {
      case 'paid': return 'text-success';
      case 'overdue': return 'text-error';
      case 'pending': return 'text-warning';
      default: return 'text-secondary';
    }
  };

  const filteredAndSortedMembers = useMemo(() => {
    let filtered = members.filter(member =>
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.membershipType.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (sortConfig.key) {
      filtered.sort((a, b) => {
        let aValue = a[sortConfig.key];
        let bValue = b[sortConfig.key];

        if (sortConfig.key === 'expirationDate') {
          aValue = new Date(aValue);
          bValue = new Date(bValue);
        }

        if (aValue < bValue) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }

    return filtered;
  }, [members, searchTerm, sortConfig]);

  const paginatedMembers = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedMembers.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredAndSortedMembers, currentPage]);

  const totalPages = Math.ceil(filteredAndSortedMembers.length / itemsPerPage);

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleSelectMember = (memberId) => {
    setSelectedMembers(prev => 
      prev.includes(memberId) 
        ? prev.filter(id => id !== memberId)
        : [...prev, memberId]
    );
  };

  const handleSelectAll = () => {
    if (selectedMembers.length === paginatedMembers.length) {
      setSelectedMembers([]);
    } else {
      setSelectedMembers(paginatedMembers.map(member => member.id));
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('ru-RU');
  };

  const getDaysUntilExpiration = (expirationDate) => {
    const today = new Date();
    const expDate = new Date(expirationDate);
    const diffTime = expDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="bg-surface rounded-lg border border-border card-shadow">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div>
            <h2 className="text-xl font-semibold text-text-primary">Управление членством</h2>
            <p className="text-text-secondary mt-1">
              Всего участников: {filteredAndSortedMembers.length}
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
            <div className="relative">
              <Icon 
                name="Search" 
                size={20} 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" 
              />
              <Input
                type="text"
                placeholder="Поиск участников..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full sm:w-64"
              />
            </div>
            
            {selectedMembers.length > 0 && (
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  onClick={() => onBulkAction('renew', selectedMembers)}
                  iconName="RefreshCw"
                  size="sm"
                >
                  Продлить ({selectedMembers.length})
                </Button>
                <Button
                  variant="outline"
                  onClick={() => onBulkAction('notify', selectedMembers)}
                  iconName="Bell"
                  size="sm"
                >
                  Уведомить
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-secondary-50">
            <tr>
              <th className="px-6 py-3 text-left">
                <input
                  type="checkbox"
                  checked={selectedMembers.length === paginatedMembers.length && paginatedMembers.length > 0}
                  onChange={handleSelectAll}
                  className="rounded border-border"
                />
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider cursor-pointer hover:bg-secondary-100"
                onClick={() => handleSort('name')}
              >
                <div className="flex items-center space-x-1">
                  <span>Участник</span>
                  <Icon name="ArrowUpDown" size={14} />
                </div>
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider cursor-pointer hover:bg-secondary-100"
                onClick={() => handleSort('membershipType')}
              >
                <div className="flex items-center space-x-1">
                  <span>Тип членства</span>
                  <Icon name="ArrowUpDown" size={14} />
                </div>
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider cursor-pointer hover:bg-secondary-100"
                onClick={() => handleSort('expirationDate')}
              >
                <div className="flex items-center space-x-1">
                  <span>Истекает</span>
                  <Icon name="ArrowUpDown" size={14} />
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                Статус оплаты
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                Статус
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                Действия
              </th>
            </tr>
          </thead>
          <tbody className="bg-surface divide-y divide-border">
            {paginatedMembers.map((member) => {
              const daysUntilExpiration = getDaysUntilExpiration(member.expirationDate);
              return (
                <tr 
                  key={member.id}
                  className={`hover:bg-secondary-50 cursor-pointer transition-smooth ${
                    selectedMember?.id === member.id ? 'bg-primary-50' : ''
                  }`}
                  onClick={() => onMemberSelect(member)}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={selectedMembers.includes(member.id)}
                      onChange={() => handleSelectMember(member.id)}
                      onClick={(e) => e.stopPropagation()}
                      className="rounded border-border"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                          <span className="text-sm font-medium text-primary">
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-text-primary">{member.name}</div>
                        <div className="text-sm text-text-secondary">{member.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-text-primary">{member.membershipType}</div>
                    <div className="text-sm text-text-secondary">{member.branch}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-text-primary">{formatDate(member.expirationDate)}</div>
                    <div className={`text-sm ${
                      daysUntilExpiration < 0 ? 'text-error' : 
                      daysUntilExpiration <= 7 ? 'text-warning' : 'text-success'
                    }`}>
                      {daysUntilExpiration < 0 ? 
                        `Просрочено на ${Math.abs(daysUntilExpiration)} дн.` :
                        `Осталось ${daysUntilExpiration} дн.`
                      }
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`text-sm font-medium ${getPaymentStatusColor(member.paymentStatus)}`}>
                      {member.paymentStatus === 'paid' ? 'Оплачено' :
                       member.paymentStatus === 'overdue' ? 'Просрочено' :
                       member.paymentStatus === 'pending' ? 'Ожидает' : 'Неизвестно'}
                    </div>
                    {member.paymentStatus === 'overdue' && (
                      <div className="text-sm text-text-secondary">
                        {member.overdueAmount} ₽
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(member.status)}`}>
                      {member.status === 'active' ? 'Активно' :
                       member.status === 'expired' ? 'Истекло' :
                       member.status === 'expiring' ? 'Истекает' :
                       member.status === 'suspended' ? 'Приостановлено' : 'Неизвестно'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          onBulkAction('renew', [member.id]);
                        }}
                        iconName="RefreshCw"
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          onBulkAction('notify', [member.id]);
                        }}
                        iconName="Bell"
                      />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="px-6 py-3 border-t border-border">
          <div className="flex items-center justify-between">
            <div className="text-sm text-text-secondary">
              Показано {((currentPage - 1) * itemsPerPage) + 1} - {Math.min(currentPage * itemsPerPage, filteredAndSortedMembers.length)} из {filteredAndSortedMembers.length}
            </div>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                iconName="ChevronLeft"
              />
              <span className="px-3 py-1 text-sm text-text-primary">
                {currentPage} из {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                iconName="ChevronRight"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MembershipTable;