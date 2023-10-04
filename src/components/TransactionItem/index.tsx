import { tv, VariantProps } from 'tailwind-variants'

import {
  ArrowDown,
  ArrowUp,
  BookMarked,
  CircleDollarSign,
  HeartPulse,
  Joystick,
  Plane,
  Shirt,
  ShoppingBag,
  Wallet,
  X,
} from 'lucide-react'
import { UserAuth } from '@/contexts'

const card = tv({
  base: 'flex w-full justify-between border-b last:border-b-0',

  variants: {
    variant: {
      primary: 'py-6',
      secondary: 'py-4',
    },
  },

  defaultVariants: {
    variant: 'primary',
  },
})

export type TransactionItemProps = {
  id: string
  title: string
  type: string
  category: string
  value: number
  date: string
}

type ItemProps = TransactionItemProps & VariantProps<typeof card>

export function TransactionItem({
  title,
  type,
  category,
  value,
  date,
  variant,
  id,
}: ItemProps) {
  const { deleteTransaction } = UserAuth()
  function handleDeleteTransaction(id: string) {
    deleteTransaction(id)
  }

  return (
    <div className={card({ variant })}>
      <div className="flex items-center gap-4">
        <div className="relative flex h-10 w-10 items-center justify-center rounded-lg bg-appGray100">
          <button
            onClick={() => handleDeleteTransaction(id)}
            className="absolute -left-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-white"
          >
            <X className="h-3 w-3" />
          </button>
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
          <span className="font-semibold text-appBlack">{title}</span>
          <span className="text-xs text-appGray500">
            {type.charAt(0).toUpperCase() + type.substring(1)}
          </span>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <div className="flex items-center gap-0.5">
          {type === 'expense' ? (
            <ArrowDown className="h-4 w-4 text-red-600" />
          ) : (
            <ArrowUp className="h-4 w-4 text-green-600" />
          )}
          <span className="font-semibold text-appBlack">
            ${new Intl.NumberFormat('pt-BR').format(value)}
          </span>
        </div>
        <span className="text-xs text-appGray500">{String(date)}</span>
      </div>
    </div>
  )
}
