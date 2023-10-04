import Link from 'next/link'
import { ComponentProps } from 'react'

type NavLinkProps = ComponentProps<'div'> & {
  pathName: string
  linkName: string
}

export function NavLink({ pathName, linkName, ...props }: NavLinkProps) {
  return (
    <div>
      <Link href={pathName}>
        <div
          {...props}
          className="flex w-full items-center gap-3 rounded px-4 py-3 text-base text-appSpecialBg2 hover:bg-appGreen hover:text-white"
        >
          {props.children}
          <span>{linkName}</span>
        </div>
      </Link>
    </div>
  )
}
