'use client'

import { UserAuth } from '@/contexts'
import { ArrowDown, ArrowUp } from 'lucide-react'

import { useForm } from 'react-hook-form'

type InputsProps = {
  title: string
  type: string
  category: string
  value: number
}

export function TransactionForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputsProps>()

  const { newTransaction } = UserAuth()

  function onHandleSubmit(data: InputsProps) {
    newTransaction({
      title: data.title,
      category: data.category,
      type: data.type,
      value: Number(data.value),
    })
  }
  return (
    <form
      onSubmit={handleSubmit(onHandleSubmit)}
      className="mt-4 flex w-full flex-col justify-center gap-4 rounded-md border bg-white px-6 py-5"
    >
      <div className="flex w-full flex-col justify-between gap-2">
        <label className="font-bold">Title:</label>
        <input
          placeholder="Give a name to your transaction"
          className="w-full border border-zinc-300 px-3.5 py-2.5 text-base font-light"
          {...register('title', { required: true })}
        />
        {errors.title && (
          <span className="text-sm text-red-600">This field is required*</span>
        )}
      </div>

      <div className="flex w-full flex-col  gap-2">
        <span className="font-bold">Type:</span>
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 text-appGray800">
            <div className="flex items-center gap-1">
              <ArrowUp className="h-4 w-4 text-green-500" />
              Income
            </div>
            <input
              type="radio"
              value="income"
              {...register('type', { required: true })}
            />
          </label>

          <label className="flex items-center gap-2 text-appGray800">
            <div className="flex items-center gap-1">
              <ArrowDown className="h-4 w-4 text-red-600" />
              Expense
            </div>
            <input
              type="radio"
              value="expense"
              {...register('type', { required: true })}
            />
          </label>
        </div>
        {errors.type && (
          <span className="text-sm text-red-600">This field is required*</span>
        )}
      </div>

      <div className="flex w-full flex-col justify-between gap-2">
        <label className="font-bold">Category:</label>
        <select
          className="w-full border border-zinc-300 px-3.5 py-2.5 text-base font-light"
          {...register('category', { required: true })}
        >
          <option value="general">General</option>
          <option value="education">Education</option>
          <option value="health">Health</option>
          <option value="hobby">Hobby</option>
          <option value="transportation">Transportation</option>
          <option value="clothing">Clothing</option>
          <option value="salary">Salary</option>
          <option value="sales">Sales</option>
        </select>
        {errors.category && (
          <span className="text-sm text-red-600">This field is required*</span>
        )}
      </div>

      <div className="flex w-full flex-col justify-between gap-2">
        <label className="font-bold">Value:</label>
        <input
          type="number"
          placeholder="Transaction value"
          className="w-full border border-zinc-300 px-3.5 py-2.5 text-base font-light"
          {...register('value', { required: true })}
        />
        {errors.value && (
          <span className="text-sm text-red-600">This field is required*</span>
        )}
      </div>
      <button
        type="submit"
        className="w-full bg-appGreen px-8 py-4 font-bold text-white"
      >
        Create Transaction
      </button>
    </form>
  )
}
