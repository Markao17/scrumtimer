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

  // Calculate the time for each participant
  const participantTime = Math.floor(totalTime / participants.length)

  useEffect(() => {
    let timer: NodeJS.Timeout

    // Start the timer if it's running and there's still time left
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {

        // If the total time is up and there are more participants left
        setTimeLeft((prevTotalTime) => {
          if (prevTotalTime === 1) {
            clearInterval(timer)
            return 0
          }
          return prevTotalTime - 1
        })

        // If the current participant's time is up and there are more participants left
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
  }, [isRunning, timeLeft, currentParticipant, participantTime, participants.length])

  // Move to the next participant
  const handleNext = () => {
    if (currentParticipant < participants.length - 1) {
      setCurrentParticipant((prev) => prev + 1)
      setParticipantTimeLeft(participantTime)
    } else {
      setParticipantTimeLeft(0)
      setIsRunning(false)
    }
  }

  // Format the time in MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  // Get the color of the timer based on the time left
  const getTimerColor = () => {
    const percentage = (participantTimeLeft / participantTime) * 100
    if (percentage > 50) return 'text-zinc-100'
    if (percentage > 25) return 'text-yellow-500'
    if (percentage > 10) return 'text-orange-500'
    return 'text-red-500'
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-8 w-full h-full">
      {/* Total countdown at the top */}
      <div className="text-lg font-mono text-zinc-400">Total time left: {formatTime(timeLeft)}</div>

      {/* Main participant timer */}
      <div className={`text-8xl font-bold ${getTimerColor()}`}>
        {formatTime(participantTimeLeft)}
      </div>

      {/* Check for participant visibility */}
      <div className="text-3xl text-zinc-300">
        {participants.length > 0 && participants[currentParticipant]}
      </div>

      <div className="flex flex-col sm:flex-row md:flex-row gap-3 w-full justify-center px-8">
        <Button onClick={() => setIsRunning(!isRunning)} size="lg">
          {isRunning ? 'Pause' : 'Resume'}
        </Button>
        <Button
          onClick={handleNext}
          size="lg"
          disabled={participantTimeLeft === 0 && currentParticipant === participants.length - 1}>
          {currentParticipant === participants.length - 1 ? 'End' : 'Next'}
        </Button>
        <Button onClick={onReset} variant="outline" size="lg">
          Reset
        </Button>
      </div>
    </div>
  )
}
