'use client'

import { UserAuth } from '@/contexts'

type PorcentageBarProps = {
  type: 'income' | 'expense'
}

export function PorcentageBars({ type }: PorcentageBarProps) {
  const { incPorcentage, outPorcentage } = UserAuth()

  return (
    <div className="h-3 w-52 rounded-full bg-zinc-100 md:w-72">
      <div
        className="h-full w-[50%] rounded-full bg-green-600"
        style={{
          width: type === 'income' ? `${incPorcentage}%` : `${outPorcentage}%`,
          backgroundColor:
            type === 'income' ? 'rgb(22 163 74)' : 'rgb(220 38 38)',
        }}
      ></div>
    </div>
  )
}
