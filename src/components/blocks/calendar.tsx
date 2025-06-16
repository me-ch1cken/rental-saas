'use client'

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'

import { formatISO } from 'date-fns'
import { useState } from 'react'
import { RentalFormDialog } from './form-dialog'

export default function Calendar() {

    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [selectedDate, setSelectedDate] = useState<string | null>(null)

    const today = new Date()

    // Add 4 days to the start to get the **exclusive end date**
    const endDate = new Date(today)
    endDate.setDate(endDate.getDate() + 4)

    return (
        <>
            <div className='w-3xl'>
                <FullCalendar
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]} // 👈 add timeGridPlugin
                    initialView='dayGridMonth'
                    height={'auto'}
                    headerToolbar={{
                        left: 'prev,next today',
                        center: 'title',
                        right: 'dayGridMonth,timeGridWeek,timeGridDay' // 👈 enable views
                    }}
                    dateClick={(info) => {
                        setSelectedDate(info.dateStr)
                        setIsDialogOpen(true)
                    }}
                    events={[
                        {
                            title: '4-Day Event',
                            start: formatISO(today, { representation: 'date' }),
                            end: formatISO(endDate, { representation: 'date' }),
                            allDay: true
                        },
                        {
                            title: '3-Day Event',
                            start: formatISO(today, { representation: 'date' }),
                            end: formatISO(new Date(today).setDate(today.getDate() + 3), { representation: 'date' }),
                            allDay: true
                        },
                        {
                            title: 'Late 3-Day Event',
                            start: formatISO(today.setDate(today.getDate() + 1), { representation: 'date' }),
                            end: formatISO(new Date(today).setDate(today.getDate() + 3), { representation: 'date' }),
                            allDay: true
                        },
                    ]}
                />
            </div>

            <RentalFormDialog
                open={isDialogOpen}
                onOpenChange={setIsDialogOpen}
                date={selectedDate}
            />
        </>
    )
}
