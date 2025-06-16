'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

export function RentalFormDialog({ open, onOpenChange, date }: RentalFormDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>New Event</DialogTitle>
                </DialogHeader>
                <div className="text-sm text-muted-foreground">
                    You clicked on: <strong>{date ?? "No date selected"}</strong>
                </div>

                {/* Your form or other inputs go here */}
            </DialogContent>
        </Dialog>
    )
}
