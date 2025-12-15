import React, { useState, useRef, useEffect } from 'react'

const DraggableAIIcon = ({ onClick }) => {
  const [position, setPosition] = useState({ x: window.innerWidth - 100, y: window.innerHeight - 150 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [isClick, setIsClick] = useState(true)
  const iconRef = useRef(null)
  const dragStartTime = useRef(0)

  const handleMouseDown = (e) => {
    e.preventDefault()
    const rect = iconRef.current.getBoundingClientRect()
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    })
    setIsDragging(true)
    setIsClick(true)
    dragStartTime.current = Date.now()
  }

  const handleMouseMove = (e) => {
    if (!isDragging) return
    
    const newX = e.clientX - dragOffset.x
    const newY = e.clientY - dragOffset.y
    
    const maxX = window.innerWidth - 70
    const maxY = window.innerHeight - 120
    const minX = 10
    const minY = 10
    
    setPosition({
      x: Math.min(Math.max(newX, minX), maxX),
      y: Math.min(Math.max(newY, minY), maxY)
    })
    
    // If mouse moved more than 5px, it's a drag not a click
    if (Math.abs(e.movementX) > 5 || Math.abs(e.movementY) > 5) {
      setIsClick(false)
    }
  }

  const handleMouseUp = () => {
    const dragDuration = Date.now() - dragStartTime.current
    
    // Only consider it a click if:
    // 1. Mouse didn't move much (isClick is still true)
    // 2. Drag duration was short (less than 200ms)
    if (isClick && dragDuration < 200) {
      onClick()
    }
    
    setIsDragging(false)
    setIsClick(true)
  }

  const handleTouchStart = (e) => {
    e.preventDefault()
    const touch = e.touches[0]
    const rect = iconRef.current.getBoundingClientRect()
    setDragOffset({
      x: touch.clientX - rect.left,
      y: touch.clientY - rect.top
    })
    setIsDragging(true)
    setIsClick(true)
    dragStartTime.current = Date.now()
  }

  const handleTouchMove = (e) => {
    if (!isDragging) return
    
    const touch = e.touches[0]
    const newX = touch.clientX - dragOffset.x
    const newY = touch.clientY - dragOffset.y
    
    const maxX = window.innerWidth - 70
    const maxY = window.innerHeight - 120
    const minX = 10
    const minY = 10
    
    setPosition({
      x: Math.min(Math.max(newX, minX), maxX),
      y: Math.min(Math.max(newY, minY), maxY)
    })
    
    setIsClick(false)
  }

  const handleTouchEnd = () => {
    const dragDuration = Date.now() - dragStartTime.current
    
    if (isClick && dragDuration < 200) {
      onClick()
    }
    
    setIsDragging(false)
    setIsClick(true)
  }

  const handleClick = (e) => {
    // Only handle click if not dragging
    if (!isDragging && isClick) {
      onClick()
    }
  }

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      document.addEventListener('touchmove', handleTouchMove)
      document.addEventListener('touchend', handleTouchEnd)
      document.body.style.cursor = 'grabbing'
      document.body.style.userSelect = 'none'
    } else {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('touchmove', handleTouchMove)
      document.removeEventListener('touchend', handleTouchEnd)
      document.body.style.cursor = ''
      document.body.style.userSelect = ''
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('touchmove', handleTouchMove)
      document.removeEventListener('touchend', handleTouchEnd)
      document.body.style.cursor = ''
      document.body.style.userSelect = ''
    }
  }, [isDragging])

  return (
    <div
      ref={iconRef}
      className="fixed z-50 flex flex-col items-center cursor-grab active:cursor-grabbing select-none"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        touchAction: 'none'
      }}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      onClick={handleClick}
    >
      <div className="ai-pulse bg-gradient-to-r from-green-500 to-emerald-600 text-white p-3 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      </div>
      <span className="mt-1 text-xs font-medium text-gray-700 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full shadow-lg">
        KudiPAL AI
      </span>
    </div>
  )
}

export default DraggableAIIcon