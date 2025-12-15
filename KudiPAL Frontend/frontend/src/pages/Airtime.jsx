import React, { useState } from 'react'

const Airtime = ({ aiModeEnabled }) => {
  const [amount, setAmount] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [selectedNetwork, setSelectedNetwork] = useState('')

  const networks = [
    { id: 'mtn', name: 'MTN', color: 'bg-yellow-500' },
    { id: 'airtel', name: 'Airtel', color: 'bg-red-500' },
    { id: 'glo', name: 'Glo', color: 'bg-green-500' },
    { id: '9mobile', name: '9mobile', color: 'bg-purple-500' },
  ]

  const quickAmounts = [100, 200, 500, 1000, 2000, 5000]

  const dataPlans = [
    { name: 'Daily', data: '100MB', price: '₦100', validity: '1 day' },
    { name: 'Weekly', data: '1GB', price: '₦500', validity: '7 days' },
    { name: 'Monthly', data: '5GB', price: '₦2,000', validity: '30 days' },
    { name: 'Monthly', data: '10GB', price: '₦3,500', validity: '30 days' },
  ]

  return (
    <div className="p-4 pb-20">
      {/* AI Mode Banner */}
      {aiModeEnabled && (
        <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4">
          <div className="flex items-center space-x-2 mb-2">
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 w-6 h-6 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <span className="font-bold text-red-800">KudiPAL AI Mode Active</span>
          </div>
          <p className="text-sm text-red-900">
            💡 AI Suggestion: Based on your usage, you recharge ₦500 weekly. Consider buying ₦2,000 monthly 
            airtime to get 5% bonus and save ₦200 monthly. Also check out our bundled airtime+data offers.
          </p>
        </div>
      )}

      <h1 className="text-2xl font-bold text-gray-900 mb-6">Airtime & Data</h1>
      
      <div className="space-y-6">
        {/* Phone Input */}
        <div className="bg-white rounded-2xl p-6 shadow">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Phone Number
          </label>
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="0800 000 0000"
            className="w-full border border-gray-300 rounded-xl px-4 py-4 text-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <p className="text-sm text-gray-500 mt-2">Enter phone number to recharge</p>
        </div>

        {/* Network Selection */}
        <div className="bg-white rounded-2xl p-6 shadow">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Select Network
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {networks.map((network) => (
              <button
                key={network.id}
                onClick={() => setSelectedNetwork(network.id)}
                className={`flex flex-col items-center p-4 rounded-xl border-2 transition-all ${
                  selectedNetwork === network.id 
                    ? 'border-red-500 bg-red-50' 
                    : 'border-gray-200 hover:border-red-300'
                }`}
              >
                <div className={`w-12 h-12 rounded-full ${network.color} flex items-center justify-center mb-2`}>
                  <span className="text-white font-bold">{network.name[0]}</span>
                </div>
                <span className="text-sm font-medium">{network.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Airtime Amount */}
        <div className="bg-white rounded-2xl p-6 shadow">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Airtime Amount
          </label>
          <div className="grid grid-cols-3 gap-3 mb-4">
            {quickAmounts.map((amt) => (
              <button
                key={amt}
                onClick={() => setAmount(amt.toString())}
                className={`py-3 rounded-lg border-2 transition-all ${
                  amount === amt.toString()
                    ? 'border-red-500 bg-red-50 text-red-700'
                    : 'border-gray-200 hover:border-red-300 text-gray-700'
                }`}
              >
                ₦{amt.toLocaleString()}
              </button>
            ))}
          </div>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter custom amount"
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        {/* Data Bundles */}
        <div className="bg-white rounded-2xl p-6 shadow">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-gray-900">Data Bundles</h3>
            <button className="text-sm text-red-600 hover:text-red-800">
              View all plans
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {dataPlans.map((plan, index) => (
              <button
                key={index}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:border-red-300 hover:bg-red-50 transition-colors"
              >
                <div>
                  <div className="font-bold text-gray-900">{plan.name}</div>
                  <div className="text-2xl font-bold text-red-600">{plan.data}</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-gray-900">{plan.price}</div>
                  <div className="text-sm text-gray-500">{plan.validity}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {aiModeEnabled && (
          <div className="bg-green-50 border border-green-200 rounded-xl p-4">
            <h4 className="font-bold text-green-800 mb-2 flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              AI Smart Tip
            </h4>
            <p className="text-sm text-green-900">
              Buying ₦2,000 airtime gives you 5% bonus (₦2,100 total). If you add ₦500 for 1GB data bundle, 
              you get an additional 10% discount on the bundle. Total value: ₦2,600 for ₦2,500.
            </p>
          </div>
        )}

        {/* Action Button */}
        <button className="fixed bottom-20 left-4 right-4 bg-gradient-to-r from-red-600 to-red-800 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:opacity-90 transition">
          Recharge Now
        </button>
      </div>
    </div>
  )
}

export default Airtime