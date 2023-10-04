import { Header, SubHeadline } from '@/components/Header'
import { ArrowDown, ArrowUp, Plus } from 'lucide-react'
import { TotalBalanceSpan } from './components/TotalBalanceSpan'
import { PorcentageSpan } from './components/PorcentageSpan'
import { TransactionsWrapper } from './components/TransactionsWrapper'
import { PorcentageBars } from './components/PorcentageBars'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Next Bucks - Transactions',
  description:
    'Transactions Page of the Next Bucks Application, Developed by João Knisspell - October 2023',
}

export default function Transactions() {
  return (
    <div className="mt-16 lg:mt-0">
      <Header headline="Transactions">
        <SubHeadline linkPath="/transactions/new" subHeadline="New Transaction">
          <Plus className="h-5 w-5 " />
        </SubHeadline>
      </Header>

      <div className="mt-4 flex w-full flex-wrap items-center justify-between gap-x-6 gap-y-2 px-6 lg:mx-auto lg:max-w-7xl">
        <div className="flex flex-col">
          <span>Total: </span>
          <TotalBalanceSpan />
        </div>
        <div className="flex flex-wrap items-center gap-6">
          <div className="flex flex-col">
            <span>Incomes:</span>
            <div className="flex items-center gap-2">
              <PorcentageBars type="income" />
              <div className="flex items-center gap-0.5">
                <PorcentageSpan type="income" />
                <ArrowUp className="h-5 w-5 text-green-500" />
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <span>Expenses:</span>
            <div className="flex items-center gap-2">
              <PorcentageBars type="expense" />
              <div className="flex items-center gap-0.5">
                <PorcentageSpan type="expense" />
                <ArrowDown className="h-5 w-5 text-red-500" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <TransactionsWrapper />
    </div>
  )
}
