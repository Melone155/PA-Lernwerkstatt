import React, { useState } from 'react';
import {
    Euro,
    TrendingUp,
    Calendar,
    CreditCard,
    ArrowLeft,
    DollarSign,
    PieChart,
    BarChart3,
    ArrowUpRight,
    ArrowDownRight
} from 'lucide-react';

interface Transaction {
    id: number;
    type: 'income' | 'expense';
    amount: number;
    description: string;
    category: string;
    date: string;
    time: string;
}

interface FinanceData {
    currentBalance: number;
    todayIncome: number;
    todayExpenses: number;
    weeklyIncome: number;
    weeklyExpenses: number;
    monthlyIncome: number;
    monthlyExpenses: number;
}

const Finance: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    const [timeRange, setTimeRange] = useState<'today' | 'week' | 'month'>('today');

    const [financeData] = useState<FinanceData>({
        currentBalance: 45780.50,
        todayIncome: 2340.00,
        todayExpenses: 890.50,
        weeklyIncome: 16450.00,
        weeklyExpenses: 6230.80,
        monthlyIncome: 67890.00,
        monthlyExpenses: 23450.80,
    });

    const [transactions] = useState<Transaction[]>([
        { id: 1, type: 'income', amount: 499.99, description: 'PlayStation 5 Verkauf', category: 'Verkauf', date: '2024-01-21', time: '14:30' },
        { id: 2, type: 'income', amount: 299.99, description: 'Nintendo Switch Verkauf', category: 'Verkauf', date: '2024-01-21', time: '13:15' },
        { id: 3, type: 'expense', amount: 150.00, description: 'Büromaterial', category: 'Betrieb', date: '2024-01-21', time: '11:45' },
        { id: 4, type: 'income', amount: 449.99, description: 'Xbox Series X Verkauf', category: 'Verkauf', date: '2024-01-21', time: '10:20' },
        { id: 5, type: 'expense', amount: 89.50, description: 'Versandkosten', category: 'Logistik', date: '2024-01-21', time: '09:30' },
        { id: 6, type: 'income', amount: 69.99, description: 'Controller Verkauf', category: 'Verkauf', date: '2024-01-20', time: '16:45' },
        { id: 7, type: 'expense', amount: 250.00, description: 'Marketing Kampagne', category: 'Marketing', date: '2024-01-20', time: '14:20' },
        { id: 8, type: 'income', amount: 399.99, description: 'Steam Deck Verkauf', category: 'Verkauf', date: '2024-01-20', time: '12:10' },
    ]);

    const getCurrentData = () => {
        switch (timeRange) {
            case 'today':
                return {
                    income: financeData.todayIncome,
                    expenses: financeData.todayExpenses,
                    profit: financeData.todayIncome - financeData.todayExpenses,
                };
            case 'week':
                return {
                    income: financeData.weeklyIncome,
                    expenses: financeData.weeklyExpenses,
                    profit: financeData.weeklyIncome - financeData.weeklyExpenses,
                };
            case 'month':
                return {
                    income: financeData.monthlyIncome,
                    expenses: financeData.monthlyExpenses,
                    profit: financeData.monthlyIncome - financeData.monthlyExpenses,
                };
        }
    };

    const currentData = getCurrentData();
    const profitMargin = currentData.income > 0 ? (currentData.profit / currentData.income) * 100 : 0;

    const expenseCategories = [
        { name: 'Betrieb', amount: 1250.00, percentage: 45, color: 'bg-blue-500' },
        { name: 'Marketing', amount: 850.00, percentage: 30, color: 'bg-green-500' },
        { name: 'Logistik', amount: 450.00, percentage: 16, color: 'bg-yellow-500' },
        { name: 'Sonstiges', amount: 250.00, percentage: 9, color: 'bg-purple-500' },
    ];

    const filteredTransactions = transactions.filter(transaction => {
        const transactionDate = new Date(transaction.date);
        const today = new Date();

        switch (timeRange) {
            case 'today':
                return transaction.date === today.toISOString().split('T')[0];
            case 'week':
                const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
                return transactionDate >= weekAgo;
            case 'month':
                const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
                return transactionDate >= monthAgo;
            default:
                return true;
        }
    });

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-6">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={onBack}
                                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors duration-200"
                            >
                                <ArrowLeft className="w-5 h-5" />
                                Zurück zum Shop
                            </button>
                            <div className="h-6 w-px bg-gray-300"></div>
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">Finanzen</h1>
                                <p className="text-gray-600 mt-1">Einnahmen, Ausgaben und Gewinnanalyse</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="text-right">
                                <p className="text-sm text-gray-600">Letztes Update</p>
                                <p className="font-medium text-gray-900">{new Date().toLocaleTimeString('de-DE')}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Balance Card */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-8 text-white shadow-xl mb-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-blue-100 text-sm font-medium">Aktueller Kontostand</p>
                            <p className="text-5xl font-bold mb-2">€{financeData.currentBalance.toLocaleString('de-DE', { minimumFractionDigits: 2 })}</p>
                            <div className="flex items-center text-green-200">
                                <TrendingUp className="w-5 h-5 mr-2" />
                                <span className="font-medium">+15.3% vs. letzter Monat</span>
                            </div>
                        </div>
                        <div className="bg-white/20 p-4 rounded-full">
                            <Euro className="w-12 h-12" />
                        </div>
                    </div>
                </div>

                {/* Time Range Selector */}
                <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 mb-6">
                    <div className="flex items-center gap-4">
                        <Calendar className="w-5 h-5 text-gray-600" />
                        <span className="font-medium text-gray-700">Zeitraum:</span>
                        <div className="flex gap-2">
                            {([
                                { key: 'today', label: 'Heute' },
                                { key: 'week', label: 'Diese Woche' },
                                { key: 'month', label: 'Dieser Monat' }
                            ] as const).map((range) => (
                                <button
                                    key={range.key}
                                    onClick={() => setTimeRange(range.key)}
                                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                                        timeRange === range.key
                                            ? 'bg-blue-600 text-white shadow-lg'
                                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                                >
                                    {range.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Financial Overview */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm font-medium">Einnahmen</p>
                                <p className="text-3xl font-bold text-green-600">
                                    €{currentData.income.toLocaleString('de-DE', { minimumFractionDigits: 2 })}
                                </p>
                            </div>
                            <div className="bg-green-100 p-3 rounded-full">
                                <ArrowUpRight className="w-6 h-6 text-green-600" />
                            </div>
                        </div>
                        <div className="mt-4">
                            <div className="flex justify-between text-sm text-gray-600 mb-2">
                                <span>Ziel: €{timeRange === 'today' ? '3,000' : timeRange === 'week' ? '20,000' : '80,000'}</span>
                                <span>{Math.round((currentData.income / (timeRange === 'today' ? 3000 : timeRange === 'week' ? 20000 : 80000)) * 100)}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                    className="bg-green-500 h-2 rounded-full transition-all duration-500"
                                    style={{ width: `${Math.min((currentData.income / (timeRange === 'today' ? 3000 : timeRange === 'week' ? 20000 : 80000)) * 100, 100)}%` }}
                                ></div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm font-medium">Ausgaben</p>
                                <p className="text-3xl font-bold text-red-600">
                                    €{currentData.expenses.toLocaleString('de-DE', { minimumFractionDigits: 2 })}
                                </p>
                            </div>
                            <div className="bg-red-100 p-3 rounded-full">
                                <ArrowDownRight className="w-6 h-6 text-red-600" />
                            </div>
                        </div>
                        <div className="mt-4">
                            <div className="flex justify-between text-sm text-gray-600 mb-2">
                                <span>Budget: €{timeRange === 'today' ? '1,500' : timeRange === 'week' ? '8,000' : '30,000'}</span>
                                <span>{Math.round((currentData.expenses / (timeRange === 'today' ? 1500 : timeRange === 'week' ? 8000 : 30000)) * 100)}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                    className="bg-red-500 h-2 rounded-full transition-all duration-500"
                                    style={{ width: `${Math.min((currentData.expenses / (timeRange === 'today' ? 1500 : timeRange === 'week' ? 8000 : 30000)) * 100, 100)}%` }}
                                ></div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm font-medium">Gewinn</p>
                                <p className={`text-3xl font-bold ${currentData.profit >= 0 ? 'text-blue-600' : 'text-red-600'}`}>
                                    €{currentData.profit.toLocaleString('de-DE', { minimumFractionDigits: 2 })}
                                </p>
                            </div>
                            <div className={`${currentData.profit >= 0 ? 'bg-blue-100' : 'bg-red-100'} p-3 rounded-full`}>
                                <DollarSign className={`w-6 h-6 ${currentData.profit >= 0 ? 'text-blue-600' : 'text-red-600'}`} />
                            </div>
                        </div>
                        <div className="mt-4">
                            <div className="flex justify-between text-sm text-gray-600 mb-2">
                                <span>Gewinnmarge</span>
                                <span className={profitMargin >= 0 ? 'text-green-600' : 'text-red-600'}>
                  {profitMargin.toFixed(1)}%
                </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                    className={`h-2 rounded-full transition-all duration-500 ${profitMargin >= 0 ? 'bg-blue-500' : 'bg-red-500'}`}
                                    style={{ width: `${Math.min(Math.abs(profitMargin), 100)}%` }}
                                ></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    {/* Expense Categories */}
                    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                            <PieChart className="w-5 h-5" />
                            Ausgaben nach Kategorien
                        </h3>
                        <div className="space-y-4">
                            {expenseCategories.map((category, index) => (
                                <div key={index} className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-4 h-4 ${category.color} rounded-full`}></div>
                                        <span className="font-medium text-gray-900">{category.name}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="text-gray-600">€{category.amount.toLocaleString('de-DE')}</span>
                                        <div className="w-20 bg-gray-200 rounded-full h-2">
                                            <div
                                                className={`${category.color} h-2 rounded-full transition-all duration-500`}
                                                style={{ width: `${category.percentage}%` }}
                                            ></div>
                                        </div>
                                        <span className="text-sm text-gray-500 w-10 text-right">{category.percentage}%</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                            <BarChart3 className="w-5 h-5" />
                            Schnellübersicht
                        </h3>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                                <span className="text-green-800 font-medium">Durchschnitt Verkauf/Tag</span>
                                <span className="text-green-600 font-bold">€{(financeData.monthlyIncome / 30).toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                                <span className="text-blue-800 font-medium">Beste Verkaufsstunde</span>
                                <span className="text-blue-600 font-bold">14:00 - 15:00</span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                                <span className="text-purple-800 font-medium">Transaktionen heute</span>
                                <span className="text-purple-600 font-bold">{filteredTransactions.length}</span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                                <span className="text-yellow-800 font-medium">Ø Bestellwert</span>
                                <span className="text-yellow-600 font-bold">€{(currentData.income / Math.max(filteredTransactions.filter(t => t.type === 'income').length, 1)).toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Transaction History */}
                <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                        <CreditCard className="w-5 h-5" />
                        Transaktionshistorie ({timeRange === 'today' ? 'Heute' : timeRange === 'week' ? 'Diese Woche' : 'Dieser Monat'})
                    </h3>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                            <tr className="border-b border-gray-200">
                                <th className="text-left py-3 px-4 font-medium text-gray-700">Datum/Zeit</th>
                                <th className="text-left py-3 px-4 font-medium text-gray-700">Beschreibung</th>
                                <th className="text-left py-3 px-4 font-medium text-gray-700">Kategorie</th>
                                <th className="text-right py-3 px-4 font-medium text-gray-700">Betrag</th>
                            </tr>
                            </thead>
                            <tbody>
                            {filteredTransactions.map((transaction) => (
                                <tr key={transaction.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200">
                                    <td className="py-3 px-4">
                                        <div className="text-sm">
                                            <div className="font-medium text-gray-900">
                                                {new Date(transaction.date).toLocaleDateString('de-DE')}
                                            </div>
                                            <div className="text-gray-500">{transaction.time}</div>
                                        </div>
                                    </td>
                                    <td className="py-3 px-4">
                                        <div className="font-medium text-gray-900">{transaction.description}</div>
                                    </td>
                                    <td className="py-3 px-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          transaction.category === 'Verkauf' ? 'bg-green-100 text-green-800' :
                              transaction.category === 'Betrieb' ? 'bg-blue-100 text-blue-800' :
                                  transaction.category === 'Marketing' ? 'bg-purple-100 text-purple-800' :
                                      'bg-gray-100 text-gray-800'
                      }`}>
                        {transaction.category}
                      </span>
                                    </td>
                                    <td className="py-3 px-4 text-right">
                      <span className={`font-bold ${
                          transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {transaction.type === 'income' ? '+' : '-'}€{transaction.amount.toFixed(2)}
                      </span>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>

                    {filteredTransactions.length === 0 && (
                        <div className="text-center py-8">
                            <CreditCard className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                            <p className="text-gray-600">Keine Transaktionen für den gewählten Zeitraum gefunden.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Finance;