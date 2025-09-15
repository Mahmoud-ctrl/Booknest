import { useState } from 'react';
import { Download } from 'lucide-react';

function ExportPage() {
  const [dateRange, setDateRange] = useState({
    start: '2025-04-01',
    end: '2025-04-30',
  });
  const [exportFormat, setExportFormat] = useState('csv');
  const [isExporting, setIsExporting] = useState(false);
  const [exportSuccess, setExportSuccess] = useState(false);

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      setExportSuccess(true);
      setTimeout(() => setExportSuccess(false), 3000);
    }, 1500);
  };

  return (
    <div>
       {/* Header */}
       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <div className="p-2 bg-blue-100 rounded-full text-blue-600">
                <Download size={24} />
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Export Data</h1>
            </div>
            <div className="h-1 w-20 bg-blue-600 rounded-full mb-3"></div>
            <p className="text-sm sm:text-base text-gray-600">Export appointment data in various formats</p>
          </div>
        </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="max-w-xl space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="date"
                value={dateRange.start}
                onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
              />
              <input
                type="date"
                value={dateRange.end}
                onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Export Format</label>
            <select
              value={exportFormat}
              onChange={(e) => setExportFormat(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
            >
              <option value="csv">CSV</option>
              <option value="excel">Excel</option>
              <option value="pdf">PDF</option>
            </select>
          </div>

          <button
            onClick={handleExport}
            disabled={isExporting}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 flex items-center justify-center"
          >
            {isExporting ? 'Exporting...' : 'Export Data'}
          </button>

          {exportSuccess && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg">
              Export completed successfully! Your download should start shortly.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ExportPage;