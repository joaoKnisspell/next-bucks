import { ComponentProps } from 'react'

type FormPageProps = ComponentProps<'div'> & {
  title: string
}

export function FormPageWrapper({ title, ...props }: FormPageProps) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <div className="flex w-96 flex-col">
        <h3 className="text-2xl text-appGray500">{title}</h3>
        {props.children}
      </div>
    </div>
  )
}
