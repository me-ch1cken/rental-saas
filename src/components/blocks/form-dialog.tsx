'use client'

import { useState } from "react"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"

interface RentalFormDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    date: string | null
}

export function RentalFormDialog({ open, onOpenChange, date }: RentalFormDialogProps) {
    const [endDate, setEndDate] = useState<Date | undefined>()
    const [agreed, setAgreed] = useState(false)
    const [selectedItems, setSelectedItems] = useState<string[]>([])

    const rentalOptions = [
        { value: "station-1", label: "Station 1" },
        { value: "station-2", label: "Station 2" },
        { value: "station-3", label: "Station 3" },
    ]

    function toggleItem(value: string) {
        setSelectedItems((prev) =>
            prev.includes(value)
                ? prev.filter((i) => i !== value)
                : [...prev, value]
        )
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>New Event</DialogTitle>
                </DialogHeader>

                <form
                    onSubmit={(e) => {
                        e.preventDefault()
                        // handle submission, e.g. collect form data here
                        console.log({
                            selectedItems,
                            agreed,
                            endDate,
                            // ...other fields
                        })
                    }}
                    className="space-y-4"
                >
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="firstName">First Name</Label>
                            <Input id="firstName" name="firstName" required />
                        </div>
                        <div>
                            <Label htmlFor="lastName">Last Name</Label>
                            <Input id="lastName" name="lastName" required />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input id="phone" name="phone" type="tel" required />
                        </div>
                        <div>
                            <Label htmlFor="email">Email Address</Label>
                            <Input id="email" name="email" type="email" required />
                        </div>
                    </div>

                    <div>
                        <Label htmlFor="startDate">Start Date</Label>
                        <Input id="startDate" value={date ?? ""} disabled />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label>End Date</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className={cn(
                                            "w-full justify-start text-left font-normal",
                                            !endDate && "text-muted-foreground"
                                        )}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {endDate ? format(endDate, "PPP") : <span>Select date</span>}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={endDate}
                                        onSelect={setEndDate}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>

                        <div>
                            <Label htmlFor="endTime">End Time (if no duration)</Label>
                            <Input id="endTime" name="endTime" type="time" />
                        </div>
                    </div>

                    <div>
                        <Label htmlFor="duration">Duration (if no end time)</Label>
                        <Input id="duration" name="duration" placeholder="e.g. 2 hours" />
                    </div>

                    <div>
                        <Label>Rental Items</Label>
                        <div className="space-y-1 mt-1">
                            {rentalOptions.map(({ value, label }) => (
                                <div key={value} className="flex items-center space-x-2">
                                    <Checkbox
                                        id={value}
                                        checked={selectedItems.includes(value)}
                                        onCheckedChange={() => toggleItem(value)}
                                    />
                                    <Label htmlFor={value}>{label}</Label>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="eula"
                            checked={agreed}
                            onCheckedChange={(val) => setAgreed(Boolean(val))}
                        />
                        <Label htmlFor="eula">Customer agrees to the EULA</Label>
                    </div>

                    <DialogFooter className="pt-4">
                        <Button type="submit" disabled={!agreed}>
                            Submit
                        </Button>
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                            Cancel
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
