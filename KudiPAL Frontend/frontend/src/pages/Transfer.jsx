import React from 'react'
import AISuggestion from '../components/AISuggestion'

const Transfer = ({ aiModeEnabled }) => {
  return (
    <div className="p-4 pb-24">
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
            💡 AI Suggestion: Transfer during off-peak hours (9PM-6AM) for faster processing. 
            Consider using USSD (*723*...#) for fee-free transfers under ₦5,000.
          </p>
        </div>
      )}

      <h1 className="text-2xl font-bold text-gray-900 mb-6">Transfer Money</h1>
      
      <div className="space-y-6">
        <div className="bg-white rounded-2xl p-6 shadow">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Recipient Account
              </label>
              <input
                type="text"
                placeholder="Enter account number"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Amount (₦)
              </label>
              <input
                type="number"
                placeholder="0.00"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-2xl font-bold focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Narration
              </label>
              <input
                type="text"
                placeholder="Add a note (optional)"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            
            {aiModeEnabled && (
              <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                <p className="text-sm text-green-900">
                  <span className="font-bold">AI Tip:</span> This transfer will leave ₦22.50 in your account. 
                  Consider transferring ₦100 instead to maintain minimum balance benefits.
                </p>
              </div>
            )}
          </div>
        </div>
        
        <div className="bg-white rounded-2xl p-6 shadow">
          <h3 className="font-bold text-gray-900 mb-4">Recent Transfers</h3>
          <div className="space-y-3">
            {[
              { name: 'Ibrahim Lukman', bank: 'GTBank', last: '₦5,000' },
              { name: 'Samuel Oyedoyin', bank: 'Zenith', last: '₦10,000' },
              { name: 'Deborah A.', bank: 'Access', last: '₦2,500' }
            ].map((contact, index) => (
              <button
                key={index}
                className="flex items-center justify-between w-full p-3 rounded-lg hover:bg-gray-50"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                    <span className="text-red-600 font-bold">{contact.name[0]}</span>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{contact.name}</div>
                    <div className="text-sm text-gray-500">{contact.bank}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium text-gray-900">{contact.last}</div>
                  <div className="text-xs text-gray-500">Last transfer</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Transfer Button */}
        <div className="fixed bottom-20 left-4 right-4">
          <button className="w-full bg-gradient-to-r from-red-600 to-red-800 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:opacity-90 transition-all duration-200 active:scale-[0.98]">
            Make Transfer
          </button>
        </div>
      </div>
    </div>
  )
}

export default Transfer