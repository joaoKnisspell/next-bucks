'use client'

import Image from 'next/image'
import { UserAuth } from '@/contexts'

export function SignInBtn() {
  const { googleSignIn } = UserAuth()
  function handleSignIn() {
    try {
      googleSignIn()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <button
      type="button"
      onClick={handleSignIn}
      className="flex w-full items-center justify-center gap-4 rounded bg-white py-3 font-normal hover:bg-appGray100"
    >
      <Image width={24} height={24} src="/google.svg" alt="" />
      Continue with Google
    </button>
  )
}
