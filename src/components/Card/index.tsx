import { ComponentProps } from 'react'
import { CardHeader } from './CardHeader'
import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  BookMarked,
  CalendarClock,
  CircleDollarSign,
  HeartPulse,
  Joystick,
  Plane,
  Shirt,
  ShoppingBag,
  Trophy,
  Wallet,
} from 'lucide-react'
import Link from 'next/link'

type CardRootProps = ComponentProps<'div'> & {
  title?: string
}

export function CardRoot({ title, ...props }: CardRootProps) {
  return (
    <div {...props} className="flex flex-col gap-2">
      <h3 className="text-2xl text-appGray500">{title}</h3>
      <div className="grid h-[232px] w-cardSm grid-rows-card rounded-lg bg-white px-6 pb-5 shadow-xl lg:w-cardLg 2xl:w-cardXl">
        {props.children}
      </div>
    </div>
  )
}

interface BalanceCardProps {
  incomeAmount: number
  outcomeAmount: number
  totalBalanceAmount: number
  title: string
}

export function BalanceCard({
  incomeAmount,
  outcomeAmount,
  totalBalanceAmount,
  title,
}: BalanceCardProps) {
  return (
    <>
      <CardHeader amount={totalBalanceAmount} title={title} />
      <div className="flex h-full w-full flex-col justify-center gap-4">
        <div className="flex flex-col">
          <div className="flex items-center gap-1 text-appGray700">
            <ArrowUp className="h-4 w-4 text-green-500" />
            <span>Incomes</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-2 w-full rounded-full bg-zinc-100">
              <div
                className="h-full rounded-full bg-green-600"
                style={{ width: `${incomeAmount}%` }}
              ></div>
            </div>
            <span>{incomeAmount}%</span>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="flex items-center gap-1 text-appGray700">
            <ArrowDown className="h-4 w-4 text-red-500" />
            <span>Outcomes</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-2 w-full rounded-full bg-zinc-100">
              <div
                data-outcome={outcomeAmount}
                className="h-full rounded-full bg-red-600"
                style={{ width: `${outcomeAmount}%` }}
              ></div>
            </div>
            <span>{outcomeAmount}%</span>
          </div>
        </div>
      </div>
    </>
  )
}

export type GoalCardProps = {
  targetAmount: number
  title: string
  targetAchieved: number
  finalDate: string
  porcentageAchieved: number
  id: string
}

export function GoalCard({
  targetAmount,
  title,
  targetAchieved,
  finalDate,
  porcentageAchieved,
  id,
}: GoalCardProps) {
  return (
    <Link href={`/goals/${id}`} className="grid grid-rows-card ">
      <CardHeader amount={targetAmount} title={title} />
      <div className="flex items-center justify-between px-1 py-6 lg:px-2">
        <div className="relative flex h-[100px] w-[100px] items-end overflow-hidden rounded-full bg-zinc-100 lg:h-[120px] lg:w-[120px]">
          <div
            className="w-full bg-appGreen"
            style={{ height: `${porcentageAchieved}%` }}
          >
            <span className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center text-2xl font-bold text-appBlack">
              {porcentageAchieved.toFixed(1)}
              <span className="mt-1 text-xs">%</span>
            </span>
          </div>
        </div>
        <div className="flex h-full flex-col justify-evenly">
          <div className="flex items-start gap-1 text-appGray500">
            <Trophy className="h-4 w-4" />
            <div className="flex flex-col">
              <span className="text-xs">Target Achieved</span>
              <span className="text-base font-bold text-appBlack">
                ${new Intl.NumberFormat('pt-BR').format(targetAchieved)}
              </span>
            </div>
          </div>

          <div className="flex items-start gap-1 text-appGray500">
            <CalendarClock className="h-4 w-4" />
            <div className="flex flex-col">
              <span className="text-xs">Goal Final Date:</span>
              <span className="text-base font-bold text-appBlack">
                {finalDate}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

type TransactionsRootProps = ComponentProps<'div'>

export function TransactionsRoot(props: TransactionsRootProps) {
  return (
    <div {...props} className="h-auto w-full">
      <div className="flex items-center justify-between text-appGray500">
        <h3 className="text-2xl">Transaction History</h3>
        <Link href="/transactions" className="flex items-center gap-2">
          <span className="text-xs">View All</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      <div className="h-auto min-w-[352px] rounded-lg px-6 pb-4 shadow-xl">
        {props.children}
      </div>
    </div>
  )
}

export type ListCardProps = {
  id?: string
  type: string
  category: string
  value: number
}

export function ListCard({ type, category, value }: ListCardProps) {
  return (
    <div className="flex items-center gap-4 px-4 py-2">
      <div className="flex h-14 w-10 items-center justify-center rounded-lg bg-appGray100">
        {category === 'hobby' && (
          <Joystick className="h-6 w-6 text-appGray700" />
        )}

        {category === 'health' && (
          <HeartPulse className="h-6 w-6 text-appGray700" />
        )}

        {category === 'general' && (
          <CircleDollarSign className="h-6 w-6 text-appGray700" />
        )}

        {category === 'education' && (
          <BookMarked className="h-6 w-6 text-appGray700" />
        )}

        {category === 'transportation' && (
          <Plane className="h-6 w-6 text-appGray700" />
        )}

        {category === 'clothing' && (
          <Shirt className="h-6 w-6 text-appGray700" />
        )}

        {category === 'salary' && (
          <Wallet className="h-6 w-6 text-appGray700" />
        )}

        {category === 'sales' && (
          <ShoppingBag className="h-6 w-6 text-appGray700" />
        )}
      </div>
      <div className="flex flex-col">
        <span className="text-xs text-appGray500">
          {category.charAt(0).toUpperCase() + category.substring(1)}
        </span>
        <span className="font-bold text-appBlack">
          ${new Intl.NumberFormat('pt-BR').format(value)}
        </span>
      </div>
      <div className="flex items-center gap-1">
        {type === 'income' ? (
          <ArrowUp className="h-4 w-4 text-green-500" />
        ) : (
          <ArrowDown className="h-4 w-4 text-red-500" />
        )}
      </div>
    </div>
  )
}
