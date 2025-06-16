'use client'

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import { formatISO } from 'date-fns'

export default function Calendar() {
    const today = new Date()

    // Add 4 days to the start to get the **exclusive end date**
    const endDate = new Date(today)
    endDate.setDate(endDate.getDate() + 4)

    return (
        <div className='w-3xl'>
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin]} // 👈 add timeGridPlugin
                initialView='dayGridMonth'
                height={'auto'}
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay' // 👈 enable views
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
    )
}
