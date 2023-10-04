import { FormPageWrapper } from '@/components/FormPage'
import { TransactionForm } from './components/TransactionForm'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Next Bucks - New Transaction',
  description:
    'New Transaction Page of the Next Bucks Application, Developed by João Knisspell - October 2023',
}

export default function NewTransaction() {
  return (
    <FormPageWrapper title="New Transaction">
      <TransactionForm />
    </FormPageWrapper>
  )
}
