import React, { useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import SideMenu from './components/SideMenu'
import Dashboard from './components/Dashboard'
import Transfer from './pages/Transfer'
import Airtime from './pages/Airtime'
import Bills from './pages/Bills'
import Settings from './pages/Settings'
import AIChat from './components/AIChat'
import BottomNavigation from './components/BottomNavigation'
import DraggableAIIcon from './components/DraggableAIIcon'
import NotFound from './pages/NotFound'

function App() {
  const [sideMenuOpen, setSideMenuOpen] = useState(false)
  const [aiChatOpen, setAiChatOpen] = useState(false)
  const [aiModeEnabled, setAiModeEnabled] = useState(false)
  const location = useLocation()

  return (
    <div className="min-h-screen bg-white md:flex">
      <SideMenu 
        isOpen={sideMenuOpen} 
        onClose={() => setSideMenuOpen(false)} 
      />
      
      {aiChatOpen && (
        <AIChat onClose={() => setAiChatOpen(false)} />
      )}

      <main className="flex-1 md:overflow-y-auto">
        <header className="bg-gradient-to-br from-red-600 via-red-700 to-red-800 sticky top-0 z-30 bg-white border-b border-gray-200 md:static">
          <div className="flex items-center justify-between p-4 md:p-6">
            <button 
              onClick={() => setSideMenuOpen(true)}
              className="p-2 rounded-lg  md:hidden"
              aria-label="Open menu"
            >
              <svg className="text-white w-7 h-7 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            
            <h1 className="text-lg font-bold text-gray-900 hidden md:block">
              {location.pathname === '/' && 'Overview'}
              {location.pathname === '/transfer' && 'Transfer'}
              {location.pathname === '/airtime' && 'Airtime & Data'}
              {location.pathname === '/bills' && 'Bills Payment'}
              {location.pathname === '/settings' && 'Settings'}
            </h1>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="flex flex-col items-end">
                  <span className="text-xs font-medium text-white">
                    {aiModeEnabled ? 'AI mode Activated' : 'Activate AI mode'}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="hidden md:inline text-sm font-medium text-gray-600">
                    {aiModeEnabled ? 'AI Mode' : 'Switch to AI Mode'}
                  </span>
                  <button 
                    onClick={() => setAiModeEnabled(!aiModeEnabled)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      aiModeEnabled ? 'bg-gray-100' : 'bg-gray-400'
                    }`}
                    aria-label={aiModeEnabled ? 'Turn off AI mode' : 'Turn on AI mode'}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full  transition-transform duration-200 ${
                      aiModeEnabled ? 'translate-x-6 bg-red-700' : 'translate-x-1 bg-white'
                    }`} />
                  </button>
                </div>
              </div>
              
              <button 
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                aria-label="Notifications"
              >
                <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </button>
            </div>
          </div>
        </header>

        <div className="p-4 md:p-6 pb-20 md:pb-6 min-h-[calc(100vh-140px)]">
          <Routes>
            <Route path="/" element={
              <Dashboard 
                onAIClick={() => setAiChatOpen(true)}
                aiModeEnabled={aiModeEnabled}
              />
            } />
            <Route path="/transfer" element={<Transfer aiModeEnabled={aiModeEnabled} />} />
            <Route path="/airtime" element={<Airtime aiModeEnabled={aiModeEnabled} />} />
            <Route path="/bills" element={<Bills aiModeEnabled={aiModeEnabled} />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>

        <BottomNavigation />
      </main>

      {/* Only show DraggableAIIcon when AI mode is enabled */}
      {aiModeEnabled && (
        <DraggableAIIcon onClick={() => setAiChatOpen(true)} />
      )}
    </div>
  )
}

export default App;