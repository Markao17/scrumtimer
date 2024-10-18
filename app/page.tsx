'use client'

import { useState } from 'react'
import ParticipantForm from './components/ParticipantForm'
import Timer from './components/Timer'

export default function Home() {
  const [participants, setParticipants] = useState<string[]>([])
  const [totalTime, setTotalTime] = useState(0)
  const [isStarted, setIsStarted] = useState(false)

  const handleStart = (names: string[], time: number) => {
    setParticipants(names)
    setTotalTime(time)
    setIsStarted(true)
  }

  const handleReset = () => {
    setParticipants([])
    setTotalTime(0)
    setIsStarted(false)
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      
      {!isStarted ? (
        <ParticipantForm onStart={handleStart} />
      ) : (
        <Timer
          participants={participants}
          totalTime={totalTime}
          onReset={handleReset}
        />
      )}
    </main>
  )
}