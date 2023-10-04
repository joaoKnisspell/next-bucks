import { LogOut } from 'lucide-react'
import Image from 'next/image'

import { UserAuth } from '@/contexts'

export function ProfileSection() {
  const { user, logOut } = UserAuth()

  function handleSignOut() {
    logOut()
  }

  if (!user) {
    return (
      <div className="flex w-full items-center justify-center">
        <svg
          className="h-14 w-14 animate-spin text-white"
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
    <div className="space-y-8">
      <button
        onClick={handleSignOut}
        type="button"
        className="flex w-full items-center gap-3 rounded bg-appSpecialBg3 px-4 py-3 text-base text-white hover:bg-red-700"
      >
        <LogOut className="h-5 w-5" />
        <span className="font-semibold">Logout</span>
      </button>
      <div className="flex w-full items-center gap-4 border-t border-appSpecialBg3 pt-8">
        <Image
          width={40}
          height={40}
          src={user.imgPath}
          alt=""
          className="h-9 w-9 rounded-full"
        />
        <div className="flex flex-col">
          <span className="font-semibold text-white">{user.name}</span>
          <span className="text-xs font-light text-appSpecialBg2">
            {user.email}
          </span>
        </div>
      </div>
    </div>
  )
}
