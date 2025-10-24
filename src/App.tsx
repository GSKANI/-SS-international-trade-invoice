import React, { useState } from 'react';
import { Plus, Trash2, Printer } from 'lucide-react';
import logoImage from 'figma:asset/fc35de27aee6b8c8270950030b74c1e91b3965aa.png';

export default function App() {
  const [invoiceData, setInvoiceData] = useState({
    companyName: 'SS International Trading',
    companyAddress: 'Ai Nahda\nSharjah',
    clientName: 'Jacob Electronics Co. (LLC) Br',
    clientPhone: '04-2227848',
    invoiceDate: new Date().toISOString().split('T')[0],
    invoiceNumber: '21052025',
    vatRate: 5,
    applyVat: false,
    terms: 'Full Advance Payment'
  });

  const [items, setItems] = useState([
    { id: 1, description: 'L-3.3UCHD 200meter violate color.', qty: 7, price: 200 },
    { id: 2, description: 'BCP-D33UHD', qty: 6, price: 100 }
  ]);

  const addItem = () => {
    const newId = items.length > 0 ? Math.max(...items.map(i => i.id)) + 1 : 1;
    setItems([...items, { id: newId, description: '', qty: 1, price: 0 }]);
  };

  const removeItem = (id) => {
    if (items.length > 1) {
      setItems(items.filter(item => item.id !== id));
    }
  };

  const updateItem = (id, field, value) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const calculateSubtotal = () => {
    return items.reduce((sum, item) => sum + (item.qty * item.price), 0);
  };

  const calculateVat = () => {
    if (!invoiceData.applyVat) return 0;
    return (calculateSubtotal() * invoiceData.vatRate) / 100;
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateVat();
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-5xl mx-auto">
        {/* Control Panel - Hidden in Print */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6 print:hidden">
          <h2 className="mb-4">Invoice Controls</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1">Client Name</label>
              <input
                type="text"
                value={invoiceData.clientName}
                onChange={(e) => setInvoiceData({...invoiceData, clientName: e.target.value})}
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block mb-1">Client Phone</label>
              <input
                type="text"
                value={invoiceData.clientPhone}
                onChange={(e) => setInvoiceData({...invoiceData, clientPhone: e.target.value})}
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block mb-1">Invoice Date</label>
              <input
                type="date"
                value={invoiceData.invoiceDate}
                onChange={(e) => setInvoiceData({...invoiceData, invoiceDate: e.target.value})}
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block mb-1">Invoice Number</label>
              <input
                type="text"
                value={invoiceData.invoiceNumber}
                onChange={(e) => setInvoiceData({...invoiceData, invoiceNumber: e.target.value})}
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block mb-1">VAT Rate (%)</label>
              <input
                type="number"
                value={invoiceData.vatRate}
                onChange={(e) => setInvoiceData({...invoiceData, vatRate: parseFloat(e.target.value) || 0})}
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div className="flex items-center">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={invoiceData.applyVat}
                  onChange={(e) => setInvoiceData({...invoiceData, applyVat: e.target.checked})}
                  className="mr-2 w-4 h-4"
                />
                <span>Apply VAT</span>
              </label>
            </div>
          </div>
          <div className="mt-4 flex gap-2">
            <button
              onClick={addItem}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center gap-2"
            >
              <Plus size={18} /> Add Item
            </button>
            <button
              onClick={handlePrint}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 flex items-center gap-2"
            >
              <Printer size={18} /> Print Invoice
            </button>
          </div>
        </div>

        {/* Invoice Document */}
        <div className="bg-white shadow-lg print:shadow-none relative" id="invoice">
          {/* Watermark */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
            <img 
              src={logoImage} 
              alt="Watermark" 
              className="opacity-5 select-none"
              style={{ width: '500px', height: '500px', objectFit: 'contain' }}
            />
          </div>
          <div className="p-12 relative z-10">
            {/* Header */}
            <div className="flex justify-between items-start mb-8">
              <div>
                <h1 className="mb-2">{invoiceData.companyName}</h1>
                <div className="text-gray-600 whitespace-pre-line">{invoiceData.companyAddress}</div>
              </div>
              <div className="text-right">
                <div className="w-48 h-32 overflow-hidden flex items-center justify-center">
                  <img 
                    src={logoImage} 
                    alt="SS International Trading Logo" 
                    className="w-64 h-64 object-cover"
                    style={{ objectPosition: 'center' }}
                  />
                </div>
              </div>
            </div>

            {/* Invoice To & Invoice Header */}
            <div className="mb-8">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="mb-2">Invoice To:</h2>
                  <div className="text-gray-700">{invoiceData.clientName}</div>
                  <div className="text-gray-600">Phone No: {invoiceData.clientPhone}</div>
                </div>
                <div className="text-right">
                  <h1 style={{ fontSize: '3rem' }}>INVOICE</h1>
                </div>
              </div>
            </div>

            <div className="border-t border-b border-gray-300 py-4 mb-8 flex justify-between">
              <div>
                <span>Invoice Date:</span> {new Date(invoiceData.invoiceDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
              </div>
              <div>
                <span>Invoice #:</span> {invoiceData.invoiceNumber}
              </div>
            </div>

            {/* Items Table */}
            <table className="w-full mb-8">
              <thead>
                <tr className="border-b-2 border-gray-300">
                  <th className="text-left py-3 w-16">NO</th>
                  <th className="text-left py-3">ITEM</th>
                  <th className="text-center py-3 w-24">QTY</th>
                  <th className="text-right py-3 w-32">UNITY PRICE</th>
                  <th className="text-right py-3 w-32">AMOUNT</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <tr key={item.id} className="border-b border-gray-200">
                    <td className="py-4">{String(index + 1).padStart(2, '0')}</td>
                    <td className="py-4">
                      <input
                        type="text"
                        value={item.description}
                        onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                        className="w-full border-0 focus:outline-none print:border-none"
                        placeholder="Item description"
                      />
                    </td>
                    <td className="py-4 text-center">
                      <input
                        type="number"
                        value={item.qty}
                        onChange={(e) => updateItem(item.id, 'qty', parseInt(e.target.value) || 0)}
                        className="w-20 border-0 focus:outline-none text-center print:border-none"
                        min="0"
                      />
                    </td>
                    <td className="py-4 text-right">
                      <input
                        type="number"
                        value={item.price}
                        onChange={(e) => updateItem(item.id, 'price', parseFloat(e.target.value) || 0)}
                        className="w-28 border-0 focus:outline-none text-right print:border-none"
                        min="0"
                      />
                    </td>
                    <td className="py-4 text-right">
                      {item.qty * item.price}
                      <button
                        onClick={() => removeItem(item.id)}
                        className="ml-2 text-red-600 hover:text-red-800 print:hidden"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Totals */}
            <div className="border-t-2 border-gray-300 pt-4">
              <div className="flex justify-end mb-2">
                <div className="w-64 flex justify-between">
                  <span>SUBTOTAL</span>
                  <span>{calculateSubtotal()}</span>
                </div>
              </div>
              <div className="flex justify-end mb-2">
                <div className="w-64 flex justify-between">
                  <span>VAT({invoiceData.vatRate}%)</span>
                  <span>{calculateVat()}</span>
                </div>
              </div>
              <div className="flex justify-end border-t border-gray-300 pt-2">
                <div className="w-64 flex justify-between">
                  <span>TOTAL</span>
                  <span>{calculateTotal()}</span>
                </div>
              </div>
            </div>

            {/* Terms */}
            <div className="mt-16 text-center">
              <h3 className="mb-1">Terms & conditions</h3>
              <input
                type="text"
                value={invoiceData.terms}
                onChange={(e) => setInvoiceData({...invoiceData, terms: e.target.value})}
                className="text-center border-0 focus:outline-none print:border-none"
              />
            </div>

            {/* Footer */}
            <div className="mt-8 text-center border-t border-gray-300 pt-4">
              <p>This is a Computer Generated Invoice</p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media print {
          body { 
            margin: 0;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
            color-adjust: exact;
          }
          @page {
            margin: 0.5cm;
          }
          .print\\:hidden { display: none !important; }
          .print\\:shadow-none { box-shadow: none !important; }
          .print\\:border-4 { border: 4px solid #2563eb !important; }
          .print\\:border-blue-600 { border-color: #2563eb !important; }
          .print\\:text-blue-600 { color: #2563eb !important; }
          input { 
            border: none !important;
            background: transparent !important;
          }
          button { display: none !important; }
        }
      `}</style>
    </div>
  );
}