'use client'

import {
  CardRoot,
  BalanceCard,
  GoalCard,
  TransactionsRoot,
  ListCard,
} from '@/components/Card'
import { Header, SubHeadline } from '@/components/Header'
import { TransactionsList } from '@/components/Lists'
import {
  TransactionItem,
  TransactionItemProps,
} from '@/components/TransactionItem'
import { ArrowRight, Calendar, Plus, Wallet } from 'lucide-react'

import { format } from 'date-fns'
import { UserAuth } from '@/contexts'
import Link from 'next/link'

import type { GoalCardProps, ListCardProps } from '@/components/Card'

export default function Home() {
  const {
    transactions,
    transactionsTotal,
    incPorcentage,
    outPorcentage,
    incomes,
    expenses,
    user,
    goals,
  } = UserAuth()

  return (
    <div className="mt-16 flex flex-col items-start lg:mt-0 lg:grid lg:h-full lg:grid-rows-home">
      <Header headline={`Hello, ${user?.name}`}>
        <SubHeadline
          linkPath="/transactions"
          subHeadline={format(new Date(), 'MMM d, yyyy')}
        >
          <Calendar className="h-5 w-5 " />
        </SubHeadline>
      </Header>
      <div className="flex w-full justify-center gap-6 px-6 lg:mx-auto lg:max-w-7xl lg:flex-wrap xl:mb-8 xlOver:grid xlOver:grid-cols-overview 2xl:gap-20 ">
        <div className="flex flex-col gap-5 py-4 lg:h-full lg:w-full lg:py-0 xlOver:grid xlOver:grid-rows-leftSideHome">
          <div className="mt-2 flex w-full flex-row flex-wrap justify-evenly gap-6 lg:justify-evenly xlOver:my-4 xlOver:flex-row xlOver:justify-start">
            <CardRoot title="Total Balance">
              <BalanceCard
                title="Summary"
                incomeAmount={incPorcentage}
                outcomeAmount={outPorcentage}
                totalBalanceAmount={transactionsTotal}
              />
            </CardRoot>

            {goals.length > 0 ? (
              <CardRoot title="Your Goal">
                {goals.slice(0, 1).map((ele: GoalCardProps) => {
                  return (
                    <GoalCard
                      id={ele.id}
                      key={ele.title}
                      targetAmount={ele.targetAmount}
                      title="Ireland Trip"
                      targetAchieved={ele.targetAchieved}
                      finalDate={format(new Date(ele.finalDate), 'MMM d, yyyy')}
                      porcentageAchieved={ele.porcentageAchieved}
                    />
                  )
                })}
              </CardRoot>
            ) : (
              <CardRoot title="Your Goal">
                <div className="flex h-[232px] w-full items-center justify-center">
                  <Link
                    href="/goals/new"
                    className="flex flex-col items-center justify-center gap-2 text-appGray500 hover:text-appGray700"
                  >
                    <div>
                      <Plus className="h-20 w-20" />
                    </div>
                    <span>Click to add your first goal!</span>
                  </Link>
                </div>
              </CardRoot>
            )}
          </div>
          <div className="mx-auto flex flex-wrap items-center justify-center gap-8 lg:w-full lg:flex-col xl:items-start xl:justify-start xlOver:mt-0 xlOver:h-full xlOver:max-w-none">
            {incomes.length > 0 ? (
              <TransactionsList title="Last Incomes">
                {incomes.slice(0, 6).map((ele: ListCardProps) => {
                  return (
                    <ListCard
                      key={ele.id}
                      category={ele.category}
                      value={ele.value}
                      type="income"
                    />
                  )
                })}
              </TransactionsList>
            ) : (
              <div className="flex h-[208px] w-full max-w-[728px]  items-center justify-center rounded-lg px-4 text-appGray500 shadow-xl">
                <span className="">
                  Your most recent incomes will be displayed here like this
                </span>
                <ArrowRight className="ml-3 hidden h-5 w-5 lg:flex" />
                <ListCard type="income" category="general" value={100} />
              </div>
            )}
            {expenses.length > 0 ? (
              <TransactionsList title="Last Expenses">
                {expenses.slice(0, 6).map((ele: ListCardProps) => {
                  return (
                    <ListCard
                      key={ele.id}
                      value={ele.value}
                      category={ele.category}
                      type={ele.type}
                    />
                  )
                })}
              </TransactionsList>
            ) : (
              <div className="flex h-[208px] w-full max-w-[728px]  items-center justify-center rounded-lg px-4 text-appGray500 shadow-xl">
                <span>
                  Your most recent expenses will be displayed here like this
                </span>
                <ArrowRight className="ml-3 hidden h-5 w-5 lg:flex" />
                <ListCard type="expense" category="general" value={100} />
              </div>
            )}
          </div>
        </div>
        <div className="mx-auto hidden w-full items-start pt-4 lg:max-w-[352px] xl:max-w-[728px] xlOver:flex xlOver:h-full">
          {transactions.length > 0 ? (
            <TransactionsRoot>
              {transactions.slice(0, 8).map((ele: TransactionItemProps) => {
                return (
                  <TransactionItem
                    id={ele.id}
                    title={ele.title}
                    category={ele.category}
                    date={ele.date}
                    type={ele.type}
                    value={ele.value}
                    key={ele.id}
                  />
                )
              })}
            </TransactionsRoot>
          ) : (
            <div className="relative flex h-full w-full text-appGray500">
              <h3 className="self-start text-2xl ">Transaction History</h3>
              <Link
                href="/transactions/new"
                className="absolute left-1/2 top-1/2 flex w-full -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1 hover:text-appGray700"
              >
                <Wallet className="h-32 w-32" />
                <span>Start adding your transactions now!</span>
                <span className="flex items-center gap-2">
                  <Plus className="h-5 w-5" />
                  <span>New Trasaction</span>
                </span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
