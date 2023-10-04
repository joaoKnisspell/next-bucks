'use client'

import { UserAuth } from '@/contexts'
import { useForm } from 'react-hook-form'
import { InputRoot, InputErrorMessage } from './input'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/libs/firebase'
import { useEffect, useState } from 'react'

type InputsProps = {
  title: string
  targetAmount: number
  targetAchieved: number
  finalDate: Date
}

type GoalFormProps = {
  isExist: boolean
  id?: string | undefined
}

type GoalProps = {
  title: string
  targetAmount: string
  targetAchieved: string
  finalDate: string
}

export function GoalForm({ isExist, id }: GoalFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputsProps>()

  const [currentGoal, setCurrentGoal] = useState<GoalProps | null>()
  const [loading, setLoading] = useState(true)

  const { newGoal, updateGoalById, deleteGoal } = UserAuth()

  async function getGoal() {
    setLoading(true)
    const docRef = doc(db, 'goals', String(id))
    await getDoc(docRef)
      .then((snapshot) => {
        setCurrentGoal({
          title: snapshot.data()?.title,
          targetAmount: snapshot.data()?.targetAmount,
          targetAchieved: snapshot.data()?.targetAchieved,
          finalDate: snapshot.data()?.finalDate,
        })
      })
      .then(() => {
        setLoading(false)
      })
      .catch((error) => {
        console.log(error)
        setLoading(false)
      })
  }

  useEffect(() => {
    getGoal()
    // eslint-disable-next-line
  }, [])

  function onHandleSubmit(data: InputsProps) {
    if (isExist) {
      updateGoalById(String(id), {
        title: data.title,
        targetAmount: data.targetAmount,
        targetAchieved: data.targetAchieved,
        finalDate: data.finalDate,
      })
    } else {
      newGoal({
        title: data.title,
        targetAmount: data.targetAmount,
        targetAchieved: data.targetAchieved,
        finalDate: data.finalDate,
      })
    }
  }

  function onHandleDelete() {
    if (id) {
      deleteGoal(id)
    }
  }

  if (loading) {
    return (
      <div className="flex w-full items-center justify-center">
        <svg
          className="h-14 w-14 animate-spin text-appBlack"
          fill="none"
          height="24"
          viewBox="0 0 24 24"
          width="24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            d="M12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19ZM12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
            fill="currentColor"
            fillRule="evenodd"
            opacity="0.2"
          />
          <path
            d="M2 12C2 6.47715 6.47715 2 12 2V5C8.13401 5 5 8.13401 5 12H2Z"
            fill="currentColor"
          />
        </svg>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit(onHandleSubmit)}
      className="mt-4 flex w-full flex-col justify-center gap-4 rounded-md border bg-white px-6 py-5"
    >
      <InputRoot labelName="Title">
        <input
          className="w-full border border-zinc-300 px-3.5 py-2.5 text-base font-light"
          placeholder={
            isExist ? currentGoal?.title : 'Give a name to your goal'
          }
          {...register('title', { required: true })}
        />
        {errors.title && <InputErrorMessage />}
      </InputRoot>

      <InputRoot labelName="Target Amount">
        <input
          className="w-full border border-zinc-300 px-3.5 py-2.5 text-base font-light"
          placeholder={
            isExist ? currentGoal?.targetAmount : 'What is your target amount?'
          }
          {...register('targetAmount', { required: true })}
          type="number"
        />
        {errors.title && <InputErrorMessage />}
      </InputRoot>

      <InputRoot labelName="Target Achieved">
        <input
          className="w-full border border-zinc-300 px-3.5 py-2.5 text-base font-light"
          placeholder={
            isExist
              ? currentGoal?.targetAchieved
              : 'What is your target amount achieved?'
          }
          {...register('targetAchieved', { required: true })}
          type="number"
        />
        {errors.title && <InputErrorMessage />}
      </InputRoot>

      <InputRoot labelName="Final Date">
        {
          <span className="text-sm text-appGray500">
            Current final date: {currentGoal?.finalDate}
          </span>
        }
        <input
          className="w-full border border-zinc-300 px-3.5 py-2.5 text-base font-light"
          placeholder={
            isExist
              ? currentGoal?.targetAchieved
              : 'What is your goal final date?'
          }
          {...register('finalDate', { required: true })}
          type="date"
        />
        {errors.title && <InputErrorMessage />}
      </InputRoot>

      <button
        type="submit"
        className="w-full bg-appGreen px-8 py-4 font-bold text-white"
      >
        {isExist ? 'Edit Transaction' : 'Create Transaction'}
      </button>

      {isExist && (
        <button
          type="button"
          className="w-full bg-red-600 px-8 py-4 font-bold text-white hover:bg-red-700"
          onClick={onHandleDelete}
        >
          Delete Goal
        </button>
      )}
    </form>
  )
}
