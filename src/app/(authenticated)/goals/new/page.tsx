import { FormPageWrapper } from '@/components/FormPage'
import { GoalForm } from '@/components/Form'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Next Bucks - New Goal',
  description:
    'New Goal Page of the Next Bucks Application, Developed by João Knisspell - October 2023',
}

export default function NewGoal() {
  return (
    <FormPageWrapper title="New Goal">
      <GoalForm isExist={false} />
    </FormPageWrapper>
  )
}
