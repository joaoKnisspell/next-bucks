interface CardHeaderProps {
  amount: number
  title: string
}

export function CardHeader({ amount, title }: CardHeaderProps) {
  return (
    <div className="flex items-center justify-between border-b pb-3 pt-4">
      <span className="text-2xl font-extrabold">
        ${new Intl.NumberFormat('pt-BR').format(amount)}
      </span>
      <span className="text-sm text-appGray800">{title}</span>
    </div>
  )
}
