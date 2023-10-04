'use client'

import { CardRoot, GoalCard } from '@/components/Card'
import { UserAuth } from '@/contexts'

interface GoalProps {
  id: string
  title: string
  targetAmount: number
  targetAchieved: number
  finalDate: string
  porcentageAchieved: number
}

export function GoalsWrapper() {
  const { goals } = UserAuth()
  return (
    <div className="mx-auto mt-4 flex h-full w-full max-w-7xl flex-wrap items-start justify-center gap-8 px-6 pb-4 2xl:justify-start">
      {goals?.map((ele: GoalProps) => {
        return (
          <CardRoot key={ele.id}>
            <GoalCard
              id={ele.id}
              title={ele.title}
              targetAmount={ele.targetAmount}
              targetAchieved={ele.targetAchieved}
              finalDate={ele.finalDate}
              porcentageAchieved={ele.porcentageAchieved}
            />
          </CardRoot>
        )
      })}
    </div>
  )
}
