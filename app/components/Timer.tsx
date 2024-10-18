'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'

interface TimerProps {
  participants: string[]
  totalTime: number
  onReset: () => void
}

export default function Timer({ participants, totalTime, onReset }: TimerProps) {
  const [currentParticipant, setCurrentParticipant] = useState(0)
  const [timeLeft, setTimeLeft] = useState(totalTime)
  const [participantTimeLeft, setParticipantTimeLeft] = useState(Math.floor(totalTime / participants.length))
  const [isRunning, setIsRunning] = useState(true)

  const participantTime = Math.floor(totalTime / participants.length)

  useEffect(() => {
    let timer: NodeJS.Timeout

    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTotalTime) => {
          if (prevTotalTime === 1) {
            clearInterval(timer)
            return 0
          }
          return prevTotalTime - 1
        })

        setParticipantTimeLeft((prevParticipantTime) => {
          if (prevParticipantTime === 1 && currentParticipant < participants.length - 1) {
            setCurrentParticipant((prev) => prev + 1)
            return participantTime
          } else if (prevParticipantTime === 1 && currentParticipant === participants.length - 1) {
            clearInterval(timer)
            return 0
          }
          return prevParticipantTime - 1
        })
      }, 1000)
    }

    return () => clearInterval(timer)
  }, [isRunning, timeLeft, currentParticipant, participantTime])

  const handleNext = () => {
    if (currentParticipant < participants.length - 1) {
      setCurrentParticipant((prev) => prev + 1)
      setParticipantTimeLeft(participantTime)
    } else {
      setParticipantTimeLeft(0)
      setIsRunning(false)
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const getTimerColor = () => {
    const percentage = (participantTimeLeft / participantTime) * 100
    if (percentage > 50) return 'text-white'
    if (percentage > 25) return 'text-yellow-500'
    if (percentage > 10) return 'text-orange-500'
    return 'text-red-500'
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-8 w-full h-full">
      {/* Total countdown at the top */}
      <div className="text-lg font-mono">Total time left: {formatTime(timeLeft)}</div>

      {/* Main participant timer */}
      <div className={`text-8xl font-bold ${getTimerColor()}`}>
        {formatTime(participantTimeLeft)}
      </div>

      {/* Check for participant visibility */}
      <div className="text-3xl text-white dark:text-white">
        {participants.length > 0 && participants[currentParticipant]}
      </div>

      <div className="space-x-4">
        <Button onClick={() => setIsRunning(!isRunning)} size="lg">
          {isRunning ? 'Pause' : 'Resume'}
        </Button>
        <Button
          onClick={handleNext}
          size="lg"
          disabled={participantTimeLeft === 0 && currentParticipant === participants.length - 1}
        >
          {currentParticipant === participants.length - 1 ? 'End' : 'Next'}
        </Button>
        <Button onClick={onReset} variant="outline" size="lg">
          Reset
        </Button>
      </div>
    </div>
  )
}
