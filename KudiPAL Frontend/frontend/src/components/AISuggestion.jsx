import React, { useState, useEffect, useRef } from 'react'

const AISuggestion = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [userProfile, setUserProfile] = useState(null)
  const intervalRef = useRef(null)
  const pauseTimeoutRef = useRef(null)

  // Load user profile from localStorage
  useEffect(() => {
    const savedProfile = localStorage.getItem('aiUserProfile')
    if (savedProfile) {
      setUserProfile(JSON.parse(savedProfile))
    }
  }, [])

  // Icon components
  const SavingsIcon = () => (
    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  )

  const InvestmentIcon = () => (
    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  )

  const IncomeIcon = () => (
    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  )

  const PlanningIcon = () => (
    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5a2 2 0 012-2h2a2 2 0 012 2v0a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  )

  const SkillIcon = () => (
    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  )

  const BusinessIcon = () => (
    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  )

  // Language-specific content
  const languageContent = {
    en: {
      welcome: (name) => `Welcome ${name}!`,
      greeting: (name) => `Hello ${name}, I'm your KudiPAL AI`,
      suggestions: (profile) => [
        {
          title: 'Personalized Savings',
          description: profile.occupation === 'student' 
            ? 'As a student, I can help you save ₦3,000 monthly from your allowance'
            : profile.occupation === 'entrepreneur' || profile.occupation === 'business_owner'
            ? 'Optimize your business cash flow to save ₦15,000 monthly'
            : 'Based on your spending patterns, you could save ₦5,000 monthly',
          icon: <SavingsIcon />
        },
        {
          title: 'Investment Strategy',
          description: profile.skills && profile.skills.length > 0
            ? `Leverage your ${profile.skills[0]} skills for smart investments`
            : 'Consider our 15% yield investment plan for steady growth',
          icon: <InvestmentIcon />
        },
        {
          title: 'Income Boost',
          description: profile.skills && profile.skills.length > 0
            ? `Monetize your ${profile.skills.join(', ')} skills as a side hustle`
            : 'Try freelance opportunities in your area for extra income',
          icon: <IncomeIcon />
        },
        {
          title: 'Financial Planning',
          description: `Smart financial planning for ${profile.city} residents`,
          icon: <PlanningIcon />
        },
        ...(profile.skills && profile.skills.length > 0 ? [{
          title: 'Skill Development',
          description: `Enhance your ${profile.skills[0]} skills for better earning potential`,
          icon: <SkillIcon />
        }] : []),
        ...(profile.occupation === 'entrepreneur' || profile.occupation === 'business_owner' ? [{
          title: 'Business Growth',
          description: 'Scale your business with smart financial strategies',
          icon: <BusinessIcon />
        }] : [])
      ],
      footer: 'Personalized financial insights',
      aiMode: 'AI Mode Active'
    },
    yo: {
      welcome: (name) => `Ẹ kú àbò ${name}!`,
      greeting: (name) => `Ẹ n lẹ ${name}, Ẹmi ni KudiPAL AI rẹ`,
      suggestions: (profile) => [
        {
          title: 'Ìfowópamọ́ Aláṣeyọrí',
          description: profile.occupation === 'student'
            ? 'Gẹ́gẹ́ bí akẹ́kọ̀ọ́, Mo lè ràn ẹ́ lọ́wọ́ láti fipamọ́ ₦3,000 lósùùkáàkiri'
            : 'Nítorí àwọn ìṣàkóso rẹ, o lè fipamọ́ ₦5,000 lósùùkáàkiri',
          icon: <SavingsIcon />
        },
        {
          title: 'Ètò Ìṣówó',
          description: 'Wò ètò ìṣówó 15% yield wa fún ìdàgbà tító',
          icon: <InvestmentIcon />
        },
        {
          title: 'Ìrọ̀wọ́ Owó',
          description: 'Ṣe àwọn iṣẹ́ aládàáṣe láti mú owó pọ̀ sí i',
          icon: <IncomeIcon />
        },
        {
          title: 'Ètò Owó',
          description: `Ètò owó dídarí fún àwọn ọmọ ìlú ${profile.city}`,
          icon: <PlanningIcon />
        }
      ],
      footer: 'Ìmọ̀ràn owó aláṣeyọrí',
      aiMode: 'AI Mode: Ṣiṣẹ́'
    },
    ig: {
      welcome: (name) => `Nnọọ ${name}!`,
      greeting: (name) => `Ndewo ${name}, Abụ m KudiPAL AI gị`,
      suggestions: (profile) => [
        {
          title: 'Ichekwa Ego',
          description: profile.occupation === 'student'
            ? 'Dị ka nwa akwụkwọ, Enwere m ike inyere gị aka ichekwa ₦3,000 kwa ọnwa'
            : 'Site na mmefu ego gị, ị nwere ike ichekwa ₦5,000 kwa ọnwa',
          icon: <SavingsIcon />
        },
        {
          title: 'Atụmatụ Itinye Ego',
          description: 'Tụlee atụmatụ itinye ego anyị nke 15% yield',
          icon: <InvestmentIcon />
        },
        {
          title: 'Ịbawanye Ego',
          description: "Nweta ohere ọrụ n'efu maka ego ọzọ",
          icon: <IncomeIcon />
        },
        {
          title: 'Atụmatụ Ego',
          description: `Atụmatụ ego ọma maka ndị bi na ${profile.city}`,
          icon: <PlanningIcon />
        }
      ],
      footer: 'Ndụmọdụ ego ahaziri',
      aiMode: 'AI Mode: Na-arụ ọrụ'
    },
    ha: {
      welcome: (name) => `Barka da zuwa ${name}!`,
      greeting: (name) => `Sannu ${name}, Ni ne KudiPAL AI naku`,
      suggestions: (profile) => [
        {
          title: 'Ajiyar Kuɗi',
          description: profile.occupation === 'student'
            ? 'A matsayinka na ɗalibi, Zan iya taimaka maka ajiye ₦3,000 kowace wata'
            : 'Dangane da kashe kuɗinka, Kana iya ajiye ₦5,000 kowace wata',
          icon: <SavingsIcon />
        },
        {
          title: 'Shirin Zuba Jari',
          description: 'Yi la\'akari da shirinmu na zuba jari na 15% yield',
          icon: <InvestmentIcon />
        },
        {
          title: 'Kara Kuɗi',
          description: 'Nemi ayyukan freelance don ƙarin kuɗi',
          icon: <IncomeIcon />
        },
        {
          title: 'Shirin Kuɗi',
          description: `Kyakkyawan shirin kuɗi ga mazaunan ${profile.city}`,
          icon: <PlanningIcon />
        }
      ],
      footer: 'Shawarwarin kuɗi na musamman',
      aiMode: 'AI Mode: Aiki'
    },
    pcm: {
      welcome: (name) => `Welcome ${name}!`,
      greeting: (name) => `Hello ${name}, Na KudiPAL AI be dis`,
      suggestions: (profile) => [
        {
          title: 'Personal Savings',
          description: profile.occupation === 'student'
            ? 'As you be student, I fit help you save ₦3,000 every month'
            : 'Based on your spending, you fit save ₦5,000 every month',
          icon: <SavingsIcon />
        },
        {
          title: 'Investment Plan',
          description: 'Try our 15% yield investment plan for better money',
          icon: <InvestmentIcon />
        },
        {
          title: 'Extra Money',
          description: 'Find freelance work for extra cash',
          icon: <IncomeIcon />
        },
        {
          title: 'Money Plan',
          description: `Better money plan for ${profile.city} people`,
          icon: <PlanningIcon />
        }
      ],
      footer: 'Personal money advice',
      aiMode: 'AI Mode: Dey work'
    },
    ibb: {
      welcome: (name) => `Mɔkɔm ${name}!`,
      greeting: (name) => `Mɔkɔm ${name}, Emi KudiPAL AI ami`,
      suggestions: (profile) => [
        {
          title: 'Nditọ Nditọ',
          description: 'Nte emi nditọ nditọ ami ndi nditọ nditọ',
          icon: <SavingsIcon />
        },
        {
          title: 'Nditọ Nditọ',
          description: 'Nte emi nditọ nditọ ami ndi nditọ nditọ',
          icon: <InvestmentIcon />
        },
        {
          title: 'Nditọ Nditọ',
          description: 'Nte emi nditọ nditọ ami ndi nditọ nditọ',
          icon: <IncomeIcon />
        },
        {
          title: 'Nditọ Nditọ',
          description: `Nte emi nditọ nditọ ami ndi ${profile.city}`,
          icon: <PlanningIcon />
        }
      ],
      footer: 'Nditọ nditọ ami ndi nditọ',
      aiMode: 'AI Mode: Nditọ'
    }
  }

  // Get current language content
  const getCurrentLanguage = () => {
    if (!userProfile) return languageContent.en
    return languageContent[userProfile.language] || languageContent.en
  }

  // Get personalized suggestions
  const getPersonalizedSuggestions = () => {
    if (!userProfile) return []
    const lang = getCurrentLanguage()
    return lang.suggestions(userProfile)
  }

  const suggestions = getPersonalizedSuggestions()

  // Function to go to next slide
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % suggestions.length)
  }

  // Function to go to previous slide
  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + suggestions.length) % suggestions.length)
  }

  // Start auto-slide
  useEffect(() => {
    if (!isPaused && suggestions.length > 0) {
      intervalRef.current = setInterval(nextSlide, 10000) // 10 seconds
    }
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
      if (pauseTimeoutRef.current) {
        clearTimeout(pauseTimeoutRef.current)
      }
    }
  }, [isPaused, suggestions.length])

  const handleMouseDown = () => {
    setIsPaused(true)
    if (pauseTimeoutRef.current) {
      clearTimeout(pauseTimeoutRef.current)
    }
  }

  const handleMouseUp = () => {
    // Resume after 2 seconds of releasing
    pauseTimeoutRef.current = setTimeout(() => {
      setIsPaused(false)
    }, 2000)
  }

  const handleDotClick = (index) => {
    setCurrentIndex(index)
    setIsPaused(true)
    
    // Resume after 5 seconds if no interaction
    if (pauseTimeoutRef.current) {
      clearTimeout(pauseTimeoutRef.current)
    }
    pauseTimeoutRef.current = setTimeout(() => {
      setIsPaused(false)
    }, 5000)
  }

  // If no user profile, don't show personalized suggestions
  if (!userProfile || suggestions.length === 0) {
    return null
  }

  const lang = getCurrentLanguage()
  const currentSuggestion = suggestions[currentIndex]

  return (
    <div className="mb-6 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-3 sm:p-4 max-w-full">
      {/* Header with personalized greeting */}
      <div className="flex items-center justify-between mb-3 sm:mb-4 gap-2">
        {/* Logo on the left */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center flex-shrink-0">
          <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        </div>
        
        {/* Personalized greeting in center */}
        <div className="flex flex-col items-center flex-1 min-w-0">
          <span className="font-bold text-green-900 text-sm sm:text-lg whitespace-nowrap text-center">
            {lang.greeting(userProfile.preferredName)}
          </span>
          <span className="text-[10px] sm:text-xs text-green-700 mt-0.5 sm:mt-1 whitespace-nowrap">
            {lang.footer}
          </span>
        </div>
        
        {/* Language indicator on the right */}
        <div className="text-green-600 w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center flex-shrink-0">
          <span className="text-xs sm:text-sm font-bold">
            {userProfile.language.toUpperCase()}
          </span>
        </div>
      </div>
      
      {/* Slide Container with Navigation Buttons Outside */}
      <div className="relative flex items-center">
        {/* Previous Button - Outside on left */}
        <button 
          onClick={prevSlide}
          className="absolute -left-2 sm:-left-3 z-10 bg-white hover:bg-gray-50 text-green-700 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shadow-lg border border-green-100 transition-all hover:scale-105"
          aria-label="Previous suggestion"
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Slide Content Box */}
        <div 
          className="flex-1 overflow-hidden rounded-xl bg-white border border-green-200 shadow-sm"
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onTouchStart={handleMouseDown}
          onTouchEnd={handleMouseUp}
        >
          {/* Slide Content with Animation */}
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {suggestions.map((suggestion, index) => (
              <div 
                key={index} 
                className="w-full min-w-full px-3 py-6 sm:px-6 sm:py-8 flex flex-col items-center justify-center"
              >
                <div className="bg-green-50 p-2.5 sm:p-3 rounded-lg border border-green-100 mb-2.5 sm:mb-3">
                  {suggestion.icon}
                </div>
                <h4 className="font-bold text-green-900 text-base sm:text-lg mb-1.5 sm:mb-2 text-center">
                  {suggestion.title}
                </h4>
                <p className="text-green-800 text-xs sm:text-sm text-center max-w-xs leading-relaxed">
                  {suggestion.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Next Button - Outside on right */}
        <button 
          onClick={nextSlide}
          className="absolute -right-2 sm:-right-3 z-10 bg-white hover:bg-gray-50 text-green-700 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shadow-lg border border-green-100 transition-all hover:scale-105"
          aria-label="Next suggestion"
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Progress Dots */}
      <div className="flex justify-center space-x-2 mt-3 sm:mt-4">
        {suggestions.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'bg-green-600 w-6' 
                : 'bg-green-300 hover:bg-green-400'
            }`}
            aria-label={`Go to suggestion ${index + 1}`}
          />
        ))}
      </div>
      
      {/* Status Bar */}
      <div className="flex justify-between items-center mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-green-200">
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs font-medium text-green-700">
              {lang.aiMode}
            </span>
          </div>
          <span className="text-xs text-green-600">•</span>
          <span className="text-xs text-green-600">
            For {userProfile.city}, {userProfile.country}
          </span>
        </div>
        <div className="text-xs text-green-600">
          {currentIndex + 1} of {suggestions.length}
        </div>
      </div>
      
      {isPaused && (
        <div className="text-xs text-green-600 text-center mt-2">
          ⏸️ Paused - Click and hold to view details
        </div>
      )}
    </div>
  )
}

export default AISuggestion