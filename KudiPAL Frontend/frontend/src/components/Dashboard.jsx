import React, { useState, useEffect } from 'react'
import AISuggestion from './AISuggestion'
import AIActivationWizard from './AIActivationWizard'

const Dashboard = ({ onAIClick, aiModeEnabled }) => {
  const [hideBalance, setHideBalance] = useState(false)
  const [showAIWizard, setShowAIWizard] = useState(false)
  const [userProfile, setUserProfile] = useState(null)
  const [hasOnboarded, setHasOnboarded] = useState(false)

  // Check if user has already been onboarded
  useEffect(() => {
    const savedOnboarded = localStorage.getItem('aiOnboarded') === 'true'
    const savedProfile = localStorage.getItem('aiUserProfile')
    
    setHasOnboarded(savedOnboarded)
    
    if (savedProfile) {
      setUserProfile(JSON.parse(savedProfile))
    }
    
    if (aiModeEnabled && !savedOnboarded) {
      // Show wizard after a short delay
      const timer = setTimeout(() => {
        setShowAIWizard(true)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [aiModeEnabled])

  const handleWizardComplete = (profile) => {
    setUserProfile(profile)
    setHasOnboarded(true)
    setShowAIWizard(false)
  }

  const handleCloseWizard = () => {
    setShowAIWizard(false)
  }

  const easyLinks = [
    { name: 'QR Payments', icon: 'qr' },
    { name: 'Travel & Leisure', icon: 'travel' },
    { name: 'Cable TV', icon: 'tv' },
    { name: 'Cards', icon: 'card' },
    { name: 'MyBVN', icon: 'shield' },
    { name: 'Scheduled Payments', icon: 'calendar' },
    { name: 'Customize eaZylinks', icon: 'customize' },
    { name: 'Settings', icon: 'settings' }
  ]

  const getLinkIcon = (iconName) => {
    switch (iconName) {
      case 'qr':
        return (
          <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
          </svg>
        )
      case 'travel':
        return (
          <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        )
      case 'tv':
        return (
          <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        )
      case 'card':
        return (
          <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
          </svg>
        )
      case 'shield':
        return (
          <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        )
      case 'calendar':
        return (
          <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        )
      case 'customize':
        return (
          <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        )
      case 'settings':
        return (
          <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        )
      default:
        return (
          <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        )
    }
  }

  const toggleBalance = () => {
    setHideBalance(!hideBalance)
  }

  return (
    <div className="p-1 pb-6">
      {/* AI Activation Wizard */}
      {showAIWizard && (
        <AIActivationWizard 
          onComplete={handleWizardComplete}
          onClose={handleCloseWizard}
        />
      )}

      {/* AI Suggestion Component - Show when AI mode is enabled AND user has onboarded */}
      {aiModeEnabled && hasOnboarded && <AISuggestion />}

      <div className="bg-gradient-to-br from-red-600 via-red-700 to-red-800 text-white rounded-2xl p-6 mb-6 shadow-xl">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium opacity-95">TOTAL BALANCE</span>
          <button 
            onClick={toggleBalance}
            className="text-sm font-medium opacity-95 hover:opacity-100 flex items-center gap-1 transition-opacity"
          >
            {hideBalance ? (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                View balance
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L6.59 6.59m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
                Hide balance
              </>
            )}
          </button>
        </div>
        
        <div className="text-3xl font-bold mb-2">
          {hideBalance ? (
            <div className="flex items-center">
              <div className="w-32 h-10 bg-white/20 rounded-lg animate-pulse"></div>
              <span className="ml-2 text-xl">••••••</span>
            </div>
          ) : (
            '₦ 1,222,300.50'
          )}
        </div>
        
        <div className="mt-6 bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm font-medium opacity-95">2261624869 - ACTIVE</div>
            <div className="bg-green-500/20 text-green-300 text-xs px-2 py-1 rounded-full">
              ● ACTIVE
            </div>
          </div>
          <div className="font-medium">MICHAEL DAMILOLA OSISAMI</div>
          <div className="flex justify-between mt-3 text-sm">
            <div className="flex items-center gap-2">
              <span className="opacity-90">Ledger Balance:</span>
              <span className="font-bold">
                {hideBalance ? '••••••' : '₦ 1,222,300.50'}
              </span>
            </div>
            <button className="underline opacity-90 hover:opacity-100 font-medium">
              History
            </button>
          </div>
        </div>
      </div>

      {/* eaZyLinks with personalized AI badges */}
      <div className="bg-white rounded-2xl p-5 shadow-lg mb-6 border border-gray-100">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-gray-900">eaZyLinks</h2>
          {aiModeEnabled && hasOnboarded && userProfile && (
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs font-medium text-green-600">
                Personalized for {userProfile.preferredName}
              </span>
            </div>
          )}
          {aiModeEnabled && !hasOnboarded && (
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs font-medium text-green-600">AI Mode Active</span>
            </div>
          )}
        </div>
        <div className="grid grid-cols-3 gap-3">
          {easyLinks.map((link) => (
            <div key={link.name} className="relative">
              <button
                className="flex flex-col items-center justify-center p-3 rounded-lg hover:bg-gray-50 transition-all duration-200 border border-gray-100 hover:border-gray-200 hover:shadow-sm w-full"
              >
                <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center mb-2 hover:bg-gray-100 transition-colors">
                  {getLinkIcon(link.icon)}
                </div>
                <span className="text-[11px] text-center text-gray-700 font-medium leading-tight">{link.name}</span>
              </button>
              {aiModeEnabled && hasOnboarded && (
                <div className="absolute -top-1 -right-1">
                  <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white text-[9px] px-1 py-0.5 rounded-full shadow">
                    AI
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white rounded-2xl p-6 shadow-lg relative">
        {aiModeEnabled && hasOnboarded && (
          <div className="absolute -top-2 -right-2">
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs px-2 py-1 rounded-full shadow">
              AI Mode
            </div>
          </div>
        )}
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-4 md:mb-0">
            <h3 className="font-bold text-lg">UPDATE YOUR Information</h3>
            <p className="text-sm opacity-95 mt-1">Keep your profile up to date for better security</p>
          </div>
          <button className="bg-white text-orange-600 px-6 py-3 rounded-full font-semibold hover:bg-orange-50 transition-all duration-200 shadow hover:shadow-md">
            Update Now
          </button>
        </div>
      </div>

      <div className="mt-6 bg-white rounded-2xl p-6 shadow-lg border border-gray-100 relative">
        {aiModeEnabled && hasOnboarded && (
          <div className="absolute -top-2 -right-2">
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs px-2 py-1 rounded-full shadow">
              AI Mode
            </div>
          </div>
        )}
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-gray-900">Recent Transactions</h3>
          <button className="text-sm text-red-600 font-medium hover:text-red-800">
            View All
          </button>
        </div>
        <div className="space-y-4">
          {[
            { name: 'Airtime Recharge', amount: '-₦500', date: 'Today, 10:30 AM', type: 'debit' },
            { name: 'Electricity Bill', amount: '-₦8,500', date: 'Yesterday, 3:45 PM', type: 'debit' },
            { name: 'Salary Credit', amount: '+₦150,000', date: 'Dec 25, 9:00 AM', type: 'credit' },
            { name: 'Transfer to John', amount: '-₦5,000', date: 'Dec 24, 2:15 PM', type: 'debit' },
          ].map((transaction, index) => (
            <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
              <div className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
                  transaction.type === 'credit' ? 'bg-green-100' : 'bg-red-100'
                }`}>
                  {transaction.type === 'credit' ? (
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                    </svg>
                  )}
                </div>
                <div>
                  <div className="font-medium text-gray-900">{transaction.name}</div>
                  <div className="text-sm text-gray-500">{transaction.date}</div>
                </div>
              </div>
              <div className={`font-bold ${transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'}`}>
                {transaction.amount}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard;