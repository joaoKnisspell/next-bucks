import { ComponentProps } from 'react'
import { tv, VariantProps } from 'tailwind-variants'

const logo = tv({
  base: ['flex text-2xl text-white items-center justify-center'],
  variants: {
    variant: {
      sidebar: 'gap-2 text-2xl',
      signIn: 'gap-3 text-5xl',
    },
  },

  defaultVariants: {
    variant: 'sidebar',
  },
})

type LogoProps = ComponentProps<'div'> & VariantProps<typeof logo>

export default function Logo({ variant, ...props }: LogoProps) {
  return (
    <div className={logo({ variant })} {...props}>
      {props.children}
      <span className="">Bucks</span>
    </div>
  )
}
