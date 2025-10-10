import React, { useEffect, useMemo, useState } from 'react';
import {
    Users,
    MousePointer,
    Calendar,
    ShoppingCart,
    ArrowLeft,
    Clock,
    TrendingUp
} from 'lucide-react';

const BackendIP = import.meta.env.VITE_BACKEND_IP || 'localhost';

interface TimeRangeData {
    time: string;
    visitors: number;
    productClicks: number;
}

interface StatsResponse {
    day: string;
    timeRange: number;
    data: TimeRangeData[];
}

const Statistics: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const [selectedTimeRange, setSelectedTimeRange] = useState(24); // Standard: 24 Stunden
    const [data, setData] = useState<StatsResponse | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const timeRangeOptions = [
        { value: 1, label: '1 Stunde', description: 'Daten in 1-Stunden-Intervallen' },
        { value: 2, label: '2 Stunden', description: 'Daten in 2-Stunden-Intervallen' },
        { value: 4, label: '4 Stunden', description: 'Daten in 4-Stunden-Intervallen' },
        { value: 8, label: '8 Stunden', description: 'Daten in 8-Stunden-Intervallen' },
        { value: 24, label: '24 Stunden', description: 'Daten in 1-Stunden-Intervallen' }
    ];

    const formattedDay = useMemo(() => {
        const d = new Date(selectedDate);
        const pad2 = (n: number) => n.toString().padStart(2, '0');
        return `${pad2(d.getDate())}.${pad2(d.getMonth()+1)}.${d.getFullYear()}`;
    }, [selectedDate]);

    const loadStats = async () => {
        try {
            setLoading(true);
            setError(null);
            
            const res = await fetch(`http://${BackendIP}:5000/stats/timerange`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    date: selectedDate,
                    hours: selectedTimeRange 
                })
            });
            
            if (!res.ok) throw new Error('Fehler beim Laden der Statistik');
            
            const stats: StatsResponse = await res.json();
            setData(stats);
        } catch (e: any) {
            setError(e.message);
            setData(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadStats();
    }, [selectedDate, selectedTimeRange]);

    const timeRangeData: TimeRangeData[] = data?.data ?? [];

    const getTotalStats = () => {
        const totalVisitors = timeRangeData.reduce((sum, item) => sum + item.visitors, 0);
        const totalClicks = timeRangeData.reduce((sum, item) => sum + item.productClicks, 0);
        const conversionRate = totalClicks > 0 && totalVisitors > 0 ? (totalClicks / totalVisitors) * 100 : 0;
        return { totalVisitors, totalClicks, conversionRate };
    };

    const stats = getTotalStats();

    const getTimeRangeDescription = () => {
        if (selectedTimeRange === 24) return 'Stündliche Daten';
        if (selectedTimeRange === 1) return 'Minuten-basierte Daten (letzte Stunde)';
        return `${selectedTimeRange}-Stunden-Intervalle`;
    };

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
                                <p className="text-gray-600 mt-1">Minuten-basierte Besucher- und Klickanalyse</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Time Range Selector */}
                <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 mb-6">
                    <div className="flex flex-col lg:flex-row lg:items-center gap-6">
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
                        
                        <div className="flex items-center gap-4">
                            <Clock className="w-5 h-5 text-gray-600" />
                            <span className="font-medium text-gray-700">Zeitraum:</span>
                            <select
                                value={selectedTimeRange}
                                onChange={(e) => setSelectedTimeRange(Number(e.target.value))}
                                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                {timeRangeOptions.map(option => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    
                    <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                        <div className="flex items-center gap-2 text-blue-700">
                            <TrendingUp className="w-4 h-4" />
                            <span className="text-sm font-medium">
                                {getTimeRangeDescription()} für {new Date(selectedDate).toLocaleDateString('de-DE')}
                            </span>
                        </div>
                    </div>
                </div>

                {loading && (
                    <div className="text-center py-12">
                        <div className="inline-flex items-center gap-2 text-gray-600">
                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                            Lade Statistik...
                        </div>
                    </div>
                )}
                
                {error && (
                    <div className="text-center py-12">
                        <div className="text-red-600 mb-4">Fehler beim Laden der Statistik: {error}</div>
                        <button 
                            onClick={loadStats}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
                        >
                            Erneut versuchen
                        </button>
                    </div>
                )}

                {/* Stats Cards */}
                {!loading && !error && data && (
                <>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm font-medium">
                                    Gesamtbesucher ({selectedTimeRange === 24 ? '24h' : `${selectedTimeRange}h`})
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
                        Besucher & Klicks am {new Date(selectedDate).toLocaleDateString('de-DE')} 
                        <span className="text-gray-600 font-normal ml-2">
                            ({getTimeRangeDescription()})
                        </span>
                    </h3>
                    
                    {timeRangeData.length > 0 ? (
                        <div className="h-80 flex items-end justify-between gap-1 overflow-x-auto">
                            {timeRangeData.map((entry, index) => {
                                const maxVisitors = Math.max(1, ...timeRangeData.map(d => d.visitors));
                                const maxClicks = Math.max(1, ...timeRangeData.map(d => d.productClicks));
                                return (
                                    <div key={index} className="flex-1 min-w-[40px] flex flex-col items-center gap-2">
                                        <div className="w-full flex flex-col gap-1">
                                            <div
                                                className="bg-blue-500 rounded-t-lg transition-all duration-500 hover:bg-blue-600 cursor-pointer"
                                                style={{ height: `${(entry.visitors / maxVisitors) * 200}px` }}
                                                title={`Besucher: ${entry.visitors}`}
                                            ></div>
                                            <div
                                                className="bg-green-500 rounded-b-lg transition-all duration-500 hover:bg-green-600 cursor-pointer"
                                                style={{ height: `${(entry.productClicks / maxClicks) * 100}px` }}
                                                title={`Klicks: ${entry.productClicks}`}
                                            ></div>
                                        </div>
                                        <span className="text-xs text-gray-600 font-medium transform -rotate-45 origin-center whitespace-nowrap">
                                            {entry.time}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="h-80 flex items-center justify-center text-gray-500">
                            Keine Daten für den ausgewählten Zeitraum verfügbar
                        </div>
                    )}
                    
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
                </>) }

                {/* Top Products - Mock-Daten */}
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
                    
                    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Zeitraum-Übersicht</h3>
                        <div className="space-y-3">
                            <div className="p-3 bg-blue-50 rounded-lg">
                                <div className="text-sm font-medium text-blue-900">Aktueller Zeitraum</div>
                                <div className="text-2xl font-bold text-blue-700">
                                    {selectedTimeRange === 1 ? '1 Stunde' : 
                                     selectedTimeRange === 24 ? '24 Stunden' : 
                                     `${selectedTimeRange} Stunden`}
                                </div>
                            </div>
                            <div className="p-3 bg-green-50 rounded-lg">
                                <div className="text-sm font-medium text-green-900">Datenauflösung</div>
                                <div className="text-lg font-medium text-green-700">
                                    {selectedTimeRange === 1 ? 'Minuten-basiert' : 
                                     selectedTimeRange === 24 ? 'Stündlich' : 
                                     `${selectedTimeRange}-Stunden-Intervalle`}
                                </div>
                            </div>
                            <div className="p-3 bg-purple-50 rounded-lg">
                                <div className="text-sm font-medium text-purple-900">Datensammlung</div>
                                <div className="text-lg font-medium text-purple-700">Minuten-basiert</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Statistics;