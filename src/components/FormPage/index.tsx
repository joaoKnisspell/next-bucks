import { ComponentProps } from 'react'

type FormPageProps = ComponentProps<'div'> & {
  title: string
}

export function FormPageWrapper({ title, ...props }: FormPageProps) {
  return (
    <div className="flex h-full min-h-screen w-full flex-col items-center justify-center lg:min-h-0">
      <div className="flex w-[300px] flex-col py-20 md:w-96 md:py-0">
        <h3 className="text-2xl text-appGray500">{title}</h3>
        {props.children}
      </div>
    </div>
  )
}
