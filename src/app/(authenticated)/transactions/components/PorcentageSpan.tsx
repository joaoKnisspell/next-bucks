'use client'

import { UserAuth } from '@/contexts'

type PorcentageSpanProps = {
  type: 'income' | 'expense'
}

export function PorcentageSpan({ type }: PorcentageSpanProps) {
  const { incPorcentage, outPorcentage } = UserAuth()

  return <span>{type === 'income' ? incPorcentage : outPorcentage}%</span>
}
