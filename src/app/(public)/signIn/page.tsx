import Logo from '@/components/Sidebar/Logo'
import { SignInBtn } from './components/SignInBtn'

export default function Login() {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-appBlack">
      <div className="absolute right-0 top-1/2 z-0 h-[100%] w-0 -translate-y-1/2 bg-black opacity-50 md:w-1/2">
        <div
          className="z-0 h-full w-full"
          style={{
            backgroundImage: 'url(/bg-2.png)',
            backgroundPosition: '0% 0%',
            backgroundSize: 'cover',
          }}
        ></div>
      </div>

      <div className="z-20 box-content flex h-auto max-w-md flex-col items-center gap-8 rounded-lg bg-appBlack p-3 text-center text-sm lg:p-8 lg:text-base">
        <Logo variant="signIn">
          <span className="font-bold text-emerald-400">NEXT</span>
        </Logo>
        <p className="border-b border-appGray500 pb-8 text-appGray500">
          What is Next Bucks? Next Bucks is a financial application that will
          assist you in managing your financial life in a simple and efficient
          manner. Within the application, you can also set financial goals and
          track them in real-time.
        </p>
        <div className="flex w-full flex-col gap-3">
          <SignInBtn />
          <span className="text-appGray500">
            Log in with your Google account and start using it right away.
          </span>
        </div>
      </div>
    </div>
  )
}
