'use client'

import { useRouter } from 'next/navigation'
import { ComponentProps } from 'react'

type HeaderProps = ComponentProps<'div'> & {
  headline: string
}

export function Header({ headline, ...props }: HeaderProps) {
  return (
    <div {...props} className="w-full border-b py-5">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2 px-6">
        <div className="flex items-center gap-6">
          <span className="text-2xl font-semibold">{headline}</span>
        </div>
        {props.children}
      </div>
    </div>
  )
}

type SubHeadlineProps = ComponentProps<'button'> & {
  subHeadline: string
  linkPath: string
}

export function SubHeadline({
  subHeadline,
  linkPath,
  ...props
}: SubHeadlineProps) {
  const router = useRouter()

  return (
    <button
      {...props}
      type="button"
      className="flex items-center gap-1 text-appGray400"
      onClick={() => router.push(linkPath)}
    >
      {props.children}
      <span className="text-medium">{subHeadline}</span>
    </button>
  )
}
