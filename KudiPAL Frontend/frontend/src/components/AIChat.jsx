import React, { useState, useRef, useEffect } from 'react'

const AIChat = ({ onClose }) => {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [selectedLanguage, setSelectedLanguage] = useState('')
  const [showLanguageModal, setShowLanguageModal] = useState(true)
  const [isRecording, setIsRecording] = useState(false)
  const messagesEndRef = useRef(null)
  const mediaRecorderRef = useRef(null)
  const audioChunksRef = useRef([])

  const languages = [
    { code: 'en', name: 'English', greeting: "Hello! I'm KudiPAL AI. How can I assist you with your banking today?" },
    { code: 'yo', name: 'Yoruba', greeting: "Ẹ n lẹ! Emi ni KudiPAL AI. Bawo ni mo se le ran yẹ lọwọ lori isuna banki yin loni?" },
    { code: 'ig', name: 'Igbo', greeting: "Ndewo! Abụ m KudiPAL AI. Kedu ka m ga-esi nyere gị aka na ụlọ akụ gị taa?" },
    { code: 'ha', name: 'Hausa', greeting: "Sannu! Ni ne KudiPAL AI. Ta yaya zan iya taimaka muku da bankin ku yau?" },
    { code: 'pcm', name: 'Pidgin', greeting: "Hello! Na KudiPAL AI be dis. How I fit help you with your banking matter today?" },
    // { code: 'ibb', name: 'Ibibio', greeting: "Mɔkɔm! Emi KudiPAL AI. Nte emi nditọ nditọ ami ndi bank ami akpakpa idem?" }
  ]

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language)
    setShowLanguageModal(false)
    
    // Add greeting message in selected language
    const greeting = languages.find(lang => lang.code === language)?.greeting || languages[0].greeting
    setMessages([{ id: 1, text: greeting, sender: 'ai' }])
  }

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage = { id: messages.length + 1, text: input, sender: 'user' }
    setMessages([...messages, userMessage])
    setInput('')
    
    // Show typing indicator
    const typingIndicator = { id: 'typing', text: 'Typing...', sender: 'ai', isTyping: true }
    setMessages(prev => [...prev, typingIndicator])
    
    try {
      // Call Awarri AI API
      const response = await fetch('https://api.awarri.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer YOUR_AWARRI_API_KEY`, // Replace with actual API key
        },
        body: JSON.stringify({
          model: 'awarri-llm',
          messages: [
            {
              role: 'system',
              content: `You are KudiPAL AI, a banking assistant. Respond in the user's selected language: ${selectedLanguage}. Provide helpful banking advice.`
            },
            ...messages.map(msg => ({
              role: msg.sender === 'user' ? 'user' : 'assistant',
              content: msg.text
            })),
            {
              role: 'user',
              content: input
            }
          ],
          language: selectedLanguage
        })
      })

      // Remove typing indicator
      setMessages(prev => prev.filter(msg => msg.id !== 'typing'))

      if (response.ok) {
        const data = await response.json()
        const aiResponse = { 
          id: messages.length + 2, 
          text: data.choices[0].message.content,
          sender: 'ai' 
        }
        setMessages(prev => [...prev, aiResponse])
      } else {
        throw new Error('API call failed')
      }
    } catch (error) {
      console.error('Error calling Awarri AI:', error)
      // Fallback response
      const fallbackResponses = {
        en: "I understand you're asking about banking services. Based on your transaction history, I suggest considering our high-yield savings account for better returns.",
        yo: "Mo gbọ́ pé o ń bèèrè nípa àwọn iṣẹ́ ìfowópamọ́. Gẹ́gẹ́ bí ìtàn iṣẹ́ rẹ, mo gba àṣẹ láti wo àkójọ ìfowópamọ́ giga-èrè wa.",
        ig: "Aghọtara m na ị na-ajụ maka ọrụ ụlọ akụ. Dabere na akụkọ azụmahịa gị, m na-atụ aro ịtụle akaụntụ nchekwa ego dị elu anyị.",
        ha: "Na gane cewa kuna tambayar game da ayyukan banki. Dangane da tarihin cinikin ku, Ina ba da shawarar yin la'akari da babban asusun ajiyar kuɗinmu.",
        pcm: "I don understand say you dey ask about banking matter. Based on your transaction history, I suggest say make you consider our high-yield savings account.",
        ibb: "Mmọ ọnọ etiene ke ọnọ ediwọn ediwọn ọnọ ami bank. Nte ediwọn ọnọ ami ọnọ ami ọnọ, mmọ ọnọ ediwọn ọnọ ami ọnọ ami ọnọ."
      }
      
      const aiResponse = { 
        id: messages.length + 2, 
        text: fallbackResponses[selectedLanguage] || fallbackResponses.en,
        sender: 'ai' 
      }
      setMessages(prev => [...prev, aiResponse])
    }
  }

  const startVoiceRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      mediaRecorderRef.current = new MediaRecorder(stream)
      audioChunksRef.current = []

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data)
      }

      mediaRecorderRef.current.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' })
        
        // Convert speech to text (you would integrate with a speech-to-text API here)
        // For demo purposes, we'll just add a placeholder
        setInput("Voice message recorded... (Speech-to-text would process this)")
      }

      mediaRecorderRef.current.start()
      setIsRecording(true)
    } catch (error) {
      console.error('Error accessing microphone:', error)
      alert('Microphone access is required for voice chat. Please enable it in your browser settings.')
    }
  }

  const stopVoiceRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop())
      setIsRecording(false)
    }
  }

  const aiSuggestions = {
    en: ["How can I save more money?", "Best investment options", "Explain transaction fees", "Loan eligibility criteria"],
    yo: ["Báwo ni mo se lè pọ̀wọ́ sí i dẹ̀bẹ̀ sí i?", "Àwọn ìṣọra tó dára jùlọ", "Ṣàlàyé owó iṣẹ́", "Àwọn ìdílé tó wulo fún gbèsè"],
    ig: ["Kedu ka m ga-esi chekwa ego karịa?", "Nhọrọ itinye ego kachasị mma", "Kọwaa ụgwọ azụmahịa", "Njirimara tozuru oke maka mgbazinye ego"],
    ha: ["Ta yaya zan iya ajiye kudi fiye?", "Mafi kyawun zaɓuɓɓukan saka hannun jari", "Bayyana kuɗin ciniki", "Ka'idojin cancantar lamuni"],
    pcm: ["How I fit save more money?", "Better investment wey dey available", "Explain transaction fees", "Wetin dey make person qualify for loan"],
    ibb: ["Nte emi nditọ nditọ ami ndi nditọ nditọ?", "Nte emi nditọ nditọ ami ndi nditọ nditọ", "Nte emi nditọ nditọ ami ndi nditọ nditọ", "Nte emi nditọ nditọ ami ndi nditọ nditọ"]
  }

  const getCurrentSuggestions = () => {
    return aiSuggestions[selectedLanguage] || aiSuggestions.en
  }

  // Language Selection Modal
  if (showLanguageModal) {
    return (
      <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl max-w-md w-full p-6">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 w-12 h-12 rounded-full flex items-center justify-center">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
          </div>
          
          <h2 className="text-xl font-bold text-center text-gray-900 mb-2">Select Your Language</h2>
          <p className="text-gray-600 text-center mb-6">Choose your preferred language for KudiPAL AI</p>
          
          <div className="grid grid-cols-2 gap-3">
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => handleLanguageSelect(language.code)}
                className="p-4 border border-gray-200 rounded-xl hover:border-green-500 hover:bg-green-50 transition-all duration-200 text-center"
              >
                <span className="font-medium text-gray-900">{language.name}</span>
              </button>
            ))}
          </div>
          
          <p className="text-xs text-gray-500 text-center mt-6">
            You can change this later in settings
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 w-10 h-10 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <div>
            <h2 className="font-bold text-gray-900">KudiPAL AI Assistant</h2>
            <div className="flex items-center space-x-2">
              <p className="text-sm text-gray-500">Your personal banking assistant</p>
              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                {languages.find(lang => lang.code === selectedLanguage)?.name || 'English'}
              </span>
            </div>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-100 rounded-lg"
          aria-label="Close chat"
        >
          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl p-4 ${
                message.sender === 'user'
                  ? 'bg-blue-600 text-white rounded-br-none'
                  : message.isTyping
                  ? 'bg-gray-100 text-gray-500 italic'
                  : 'bg-gray-100 text-gray-900 rounded-bl-none'
              }`}
            >
              {message.isTyping ? (
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                </div>
              ) : (
                message.text
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* AI Suggestions */}
      {getCurrentSuggestions().length > 0 && (
        <div className="px-4 pb-4 border-t border-gray-200 pt-4">
          <p className="text-sm text-gray-600 mb-2">Quick suggestions:</p>
          <div className="flex flex-wrap gap-2">
            {getCurrentSuggestions().map((suggestion, index) => (
              <button
                key={index}
                onClick={() => setInput(suggestion)}
                className="px-3 py-2 bg-green-50 text-green-700 text-sm rounded-full hover:bg-green-100 transition"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="border-t border-gray-200 p-4 bg-gray-50">
        <div className="flex items-center space-x-2">
          {/* Voice Recording Button */}
          <button
            onClick={isRecording ? stopVoiceRecording : startVoiceRecording}
            className={`p-3 rounded-full ${
              isRecording 
                ? 'bg-red-500 text-white animate-pulse' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            aria-label={isRecording ? "Stop recording" : "Start voice recording"}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isRecording ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              )}
            </svg>
          </button>
          
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your message..."
            className="flex-1 border border-gray-300 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-3 rounded-full hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
        
        <div className="flex justify-between items-center mt-2">
          <p className="text-xs text-gray-500">
            Powered by <span className="font-semibold">Awarri AI</span>
          </p>
          <button
            onClick={() => setShowLanguageModal(true)}
            className="text-xs text-green-600 hover:text-green-800"
          >
            Change language
          </button>
        </div>
      </div>
    </div>
  )
}

export default AIChat;