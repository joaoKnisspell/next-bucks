'use client'

import { UserAuth } from '@/contexts'

export function TotalBalanceSpan() {
  const { transactionsTotal } = UserAuth()

  const formattedTotal = new Intl.NumberFormat('pt-BR').format(
    transactionsTotal,
  )

  return <span className="text-2xl font-black">${formattedTotal}</span>
}
