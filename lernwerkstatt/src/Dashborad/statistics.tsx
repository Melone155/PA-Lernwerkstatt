import React, { useState } from 'react';
import {
    Users,
    MousePointer,
    Calendar,
    Clock,
    ShoppingCart,
    ArrowLeft
} from 'lucide-react';

interface VisitorData {
    time: string;
    visitors: number;
    productClicks: number;
}

const Statistics: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    const timeRange = 'day'
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

    // Mock data für Stunden (0:00 - 23:59)
    const hourlyData: VisitorData[] = [
        { time: '00:00', visitors: 12, productClicks: 3 },
        { time: '01:00', visitors: 8, productClicks: 1 },
        { time: '02:00', visitors: 5, productClicks: 0 },
        { time: '03:00', visitors: 3, productClicks: 0 },
        { time: '04:00', visitors: 7, productClicks: 1 },
        { time: '05:00', visitors: 15, productClicks: 4 },
        { time: '06:00', visitors: 28, productClicks: 12 },
        { time: '07:00', visitors: 45, productClicks: 23 },
        { time: '08:00', visitors: 67, productClicks: 34 },
        { time: '09:00', visitors: 89, productClicks: 45 },
        { time: '10:00', visitors: 112, productClicks: 67 },
        { time: '11:00', visitors: 134, productClicks: 78 },
        { time: '12:00', visitors: 156, productClicks: 89 },
        { time: '13:00', visitors: 145, productClicks: 82 },
        { time: '14:00', visitors: 167, productClicks: 95 },
        { time: '15:00', visitors: 189, productClicks: 108 },
        { time: '16:00', visitors: 201, productClicks: 115 },
        { time: '17:00', visitors: 178, productClicks: 98 },
        { time: '18:00', visitors: 156, productClicks: 87 },
        { time: '19:00', visitors: 134, productClicks: 76 },
        { time: '20:00', visitors: 112, productClicks: 65 },
        { time: '21:00', visitors: 89, productClicks: 54 },
        { time: '22:00', visitors: 67, productClicks: 43 },
        { time: '23:00', visitors: 45, productClicks: 32 },
    ];

    // Mock data für 30min Intervalle
    const thirtyMinData: VisitorData[] = [
        { time: '14:00', visitors: 45, productClicks: 23 },
        { time: '14:30', visitors: 52, productClicks: 31 },
        { time: '15:00', visitors: 38, productClicks: 19 },
        { time: '15:30', visitors: 67, productClicks: 42 },
        { time: '16:00', visitors: 73, productClicks: 38 },
        { time: '16:30', visitors: 59, productClicks: 29 },
    ];

    const getCurrentData = () => {
        if (timeRange === 'day') return hourlyData;
        return thirtyMinData;
    };

    const getTotalStats = () => {
        const data = getCurrentData();
        const totalVisitors = data.reduce((sum, item) => sum + item.visitors, 0);
        const totalClicks = data.reduce((sum, item) => sum + item.productClicks, 0);
        const conversionRate = totalClicks > 0 ? (totalClicks / totalVisitors) * 100 : 0;

        return { totalVisitors, totalClicks, conversionRate };
    };

    const stats = getTotalStats();

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
                                <h1 className="text-3xl font-bold text-gray-900">Statistiken</h1>
                                <p className="text-gray-600 mt-1">Besucher- und Klickanalyse</p>
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
                {/* Time Range Selector */}
                <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 mb-6">
                    <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                        <div className="flex items-center gap-4">
                            <Calendar className="w-5 h-5 text-gray-600" />
                            <span className="font-medium text-gray-700">Datum:</span>
                            <input
                                type="date"
                                value={selectedDate}
                                onChange={(e) => setSelectedDate(e.target.value)}
                                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm font-medium">
                                    {timeRange === 'day' ? 'Tagesbesucher' : 'Gesamtbesucher'}
                                </p>
                                <p className="text-3xl font-bold text-gray-900">
                                    {stats.totalVisitors.toLocaleString('de-DE')}
                                </p>
                            </div>
                            <div className="bg-blue-100 p-3 rounded-full">
                                <Users className="w-6 h-6 text-blue-600" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm font-medium">Produkt-Klicks</p>
                                <p className="text-3xl font-bold text-gray-900">
                                    {stats.totalClicks.toLocaleString('de-DE')}
                                </p>
                            </div>
                            <div className="bg-green-100 p-3 rounded-full">
                                <MousePointer className="w-6 h-6 text-green-600" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm font-medium">Conversion Rate</p>
                                <p className="text-3xl font-bold text-gray-900">{stats.conversionRate.toFixed(1)}%</p>
                            </div>
                            <div className="bg-purple-100 p-3 rounded-full">
                                <ShoppingCart className="w-6 h-6 text-purple-600" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Chart */}
                <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 mb-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        {timeRange === 'day'
                            ? `Besucher & Klicks am ${new Date(selectedDate).toLocaleDateString('de-DE')} (0:00 - 23:59)`
                            : 'Besucher & Klicks im Zeitverlauf'
                        }
                    </h3>
                    <div className="h-80 flex items-end justify-between gap-1 overflow-x-auto">
                        {getCurrentData().map((data, index) => {
                            const maxVisitors = Math.max(...getCurrentData().map(d => d.visitors));
                            const maxClicks = Math.max(...getCurrentData().map(d => d.productClicks));

                            return (
                                <div key={index} className="flex-1 min-w-[30px] flex flex-col items-center gap-2">
                                    <div className="w-full flex flex-col gap-1">
                                        <div
                                            className="bg-blue-500 rounded-t-lg transition-all duration-500 hover:bg-blue-600 cursor-pointer"
                                            style={{ height: `${(data.visitors / maxVisitors) * 200}px` }}
                                            title={`Besucher: ${data.visitors}`}
                                        ></div>
                                        <div
                                            className="bg-green-500 rounded-b-lg transition-all duration-500 hover:bg-green-600 cursor-pointer"
                                            style={{ height: `${(data.productClicks / maxClicks) * 100}px` }}
                                            title={`Klicks: ${data.productClicks}`}
                                        ></div>
                                    </div>
                                    <span className="text-xs text-gray-600 font-medium transform -rotate-45 origin-center whitespace-nowrap">
                    {data.time}
                  </span>
                                </div>
                            );
                        })}
                    </div>
                    <div className="flex justify-center gap-6 mt-6">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-blue-500 rounded"></div>
                            <span className="text-sm text-gray-600">Besucher</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-green-500 rounded"></div>
                            <span className="text-sm text-gray-600">Produkt-Klicks</span>
                        </div>
                    </div>
                </div>

                {/* Top Products */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Meistbesuchte Produkte</h3>
                        <div className="space-y-4">
                            {[
                                { name: 'PlayStation 5', clicks: 1234, percentage: 45 },
                                { name: 'Xbox Series X', clicks: 987, percentage: 36 },
                                { name: 'Nintendo Switch', clicks: 654, percentage: 24 },
                                { name: 'Steam Deck', clicks: 432, percentage: 16 },
                            ].map((product, index) => (
                                <div key={index} className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                            <span className="text-blue-600 font-bold text-sm">{index + 1}</span>
                                        </div>
                                        <span className="font-medium text-gray-900">{product.name}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="text-gray-600">{product.clicks} Klicks</span>
                                        <div className="w-20 bg-gray-200 rounded-full h-2">
                                            <div
                                                className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                                                style={{ width: `${product.percentage}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Statistics;