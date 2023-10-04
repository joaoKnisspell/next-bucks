import { Header, SubHeadline } from '@/components/Header'
import { Plus } from 'lucide-react'
import { GoalsWrapper } from './components/GoalsWrapper'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Next Bucks - Goals',
  description:
    'Goals Page of the Next Bucks Application, Developed by João Knisspell - October 2023',
}

export default function Goals() {
  return (
    <div className="mt-16 lg:mt-0">
      <Header headline="Goals">
        <SubHeadline linkPath="/goals/new" subHeadline="New Goal">
          <Plus className="h-5 w-5 " />
        </SubHeadline>
      </Header>
      <GoalsWrapper />
    </div>
  )
}
