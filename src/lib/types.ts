type NavItem = {
  title: string
  icon: React.ElementType
  url: string
  currentlyActive: boolean
}

type RentalFormDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  date: string | null
}