import { ComponentProps } from 'react'

type IncomeList = ComponentProps<'div'> & {
  title: string
}

export function TransactionsList({ title, ...props }: IncomeList) {
  return (
    <div
      {...props}
      className="mx-auto flex w-full max-w-[728px] flex-col xl:max-w-[665px] xlOver:mx-0  2xl:max-w-[728px]"
    >
      <div className="text-appGray500">
        <h3 className="text-2xl">{title}</h3>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-lg px-2 py-6 shadow-xl xlOver:px-6">
        {props.children}
      </div>
    </div>
  )
}
