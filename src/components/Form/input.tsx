import React, { ComponentProps } from 'react'

type InputRootProps = ComponentProps<'div'> & {
  labelName: string
}

export function InputRoot({ labelName, ...props }: InputRootProps) {
  return (
    <div {...props} className="flex w-full flex-col justify-between gap-2">
      <label className="font-bold">{labelName}:</label>
      {props.children}
    </div>
  )
}

export function InputErrorMessage() {
  return <span className="text-sm text-red-600">This field is required*</span>
}
