import React, { useState } from 'react'

const Bills = ({ aiModeEnabled }) => {
  const [selectedBill, setSelectedBill] = useState('')
  const [customerId, setCustomerId] = useState('')

  const billCategories = [
    {
      id: 'electricity',
      name: 'Electricity',
      icon: (
        <svg className="w-8 h-8 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      providers: ['IKEDC', 'Eko Electric', 'Abuja Electric', 'PHED']
    },
    {
      id: 'cable',
      name: 'Cable TV',
      icon: (
        <svg className="w-8 h-8 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      providers: ['DSTV', 'GOTV', 'Startimes', 'Showmax']
    },
    {
      id: 'internet',
      name: 'Internet',
      icon: (
        <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
        </svg>
      ),
      providers: ['Spectranet', 'Smile', 'Swift', 'MTN Fiber']
    },
    {
      id: 'water',
      name: 'Water',
      icon: (
        <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      ),
      providers: ['Lagos Water', 'Abuja Water']
    },
    {
      id: 'education',
      name: 'Education',
      icon: (
        <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
        </svg>
      ),
      providers: ['WAEC', 'JAMB', 'School Fees']
    },
    {
      id: 'tax',
      name: 'Tax',
      icon: (
        <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      providers: ['FIRS', 'LIRS', 'Taxify']
    },
  ]

  const recentBills = [
    { id: 1, name: 'IKEDC', amount: '₦8,500', date: '12 Dec', status: 'paid' },
    { id: 2, name: 'DSTV', amount: '₦12,400', date: '10 Dec', status: 'paid' },
    { id: 3, name: 'Spectranet', amount: '₦15,000', date: '5 Dec', status: 'paid' },
    { id: 4, name: 'WAEC', amount: '₦18,000', date: '1 Dec', status: 'pending' },
  ]

  const aiSuggestions = [
    "Pay bills before due date to avoid late fees",
    "Set up auto-pay for recurring bills",
    "Consider annual subscriptions for 15% savings",
    "Bundle DSTV & Internet for 20% discount"
  ]

  return (
    <div className="p-4 pb-20">
      {aiModeEnabled && (
        <div className="mb-6 bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-center space-x-2 mb-2">
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 w-6 h-6 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <span className="font-bold text-blue-800">KudiPAL AI Mode Active</span>
          </div>
          <p className="text-sm text-blue-900">
            💡 AI Analysis: You spend ₦35,900 monthly on bills. I suggest switching to IKEDC's Day & Night plan 
            to save ₦2,500 monthly, and opting for DSTV's Compact package instead of Premium to save ₦4,000 monthly.
          </p>
        </div>
      )}

      <h1 className="text-2xl font-bold text-gray-900 mb-6">Bills Payment</h1>
      
      <div className="space-y-6">
        <div className="bg-white rounded-2xl p-6 shadow">
          <h3 className="font-bold text-gray-900 mb-4">Select Bill Type</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {billCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedBill(category.id)}
                className={`flex flex-col items-center p-4 rounded-xl border-2 transition-all ${
                  selectedBill === category.id 
                    ? 'border-red-500 bg-red-50' 
                    : 'border-gray-200 hover:border-red-300'
                }`}
              >
                <div className="mb-2">{category.icon}</div>
                <span className="font-medium text-gray-900">{category.name}</span>
                <span className="text-xs text-gray-500 mt-1">
                  {category.providers.length} providers
                </span>
              </button>
            ))}
          </div>
        </div>

        {selectedBill && (
          <div className="bg-white rounded-2xl p-6 shadow">
            <h3 className="font-bold text-gray-900 mb-4">
              Select {billCategories.find(b => b.id === selectedBill)?.name} Provider
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {billCategories.find(b => b.id === selectedBill)?.providers.map((provider, index) => (
                <button
                  key={index}
                  className="p-4 border border-gray-200 rounded-lg hover:border-red-300 hover:bg-red-50 transition-colors text-left"
                >
                  <div className="font-medium text-gray-900">{provider}</div>
                  <div className="text-sm text-gray-500">Click to select</div>
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="bg-white rounded-2xl p-6 shadow">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Customer ID / Meter Number
          </label>
          <input
            type="text"
            value={customerId}
            onChange={(e) => setCustomerId(e.target.value)}
            placeholder="Enter your customer ID or meter number"
            className="w-full border border-gray-300 rounded-xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <p className="text-sm text-gray-500 mt-2">
            Find this on your bill statement
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-gray-900">Recent Bills</h3>
            <button className="text-sm text-red-600 hover:text-red-800">
              View all history
            </button>
          </div>
          <div className="space-y-3">
            {recentBills.map((bill) => (
              <div
                key={bill.id}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-xl"
              >
                <div>
                  <div className="font-medium text-gray-900">{bill.name}</div>
                  <div className="text-sm text-gray-500">{bill.date}</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-gray-900">{bill.amount}</div>
                  <div className={`text-xs px-2 py-1 rounded-full inline-block ${
                    bill.status === 'paid' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {bill.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {aiModeEnabled && (
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6 shadow">
            <h4 className="font-bold text-green-800 mb-4 flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              AI Smart Bill Optimization
            </h4>
            <div className="space-y-3">
              {aiSuggestions.map((suggestion, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-sm text-green-900">{suggestion}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-green-200">
              <div className="flex justify-between items-center">
                <span className="text-sm text-green-700">
                  Estimated monthly savings: <span className="font-bold">₦6,500</span>
                </span>
                <button className="text-sm bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700">
                  Apply Suggestions
                </button>
              </div>
            </div>
          </div>
        )}

        <button className="fixed bottom-20 left-4 right-4 bg-gradient-to-r from-red-600 to-red-800 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:opacity-90 transition">
          Proceed to Pay Bill
        </button>
      </div>
    </div>
  )
}

export default Bills