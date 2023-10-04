import { FormPageWrapper } from '@/components/FormPage'

import { GoalForm } from '@/components/Form'

export default function EditGoal({ params }: { params: { id: string } }) {
  const id = params.id

  return (
    <FormPageWrapper title="Edit your Goal">
      <GoalForm isExist={true} id={id} />
    </FormPageWrapper>
  )
}
