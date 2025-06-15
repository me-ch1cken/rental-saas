'use client'

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'

export default function Calendar() {
    return (
        <div className='w-3xl'>
            <FullCalendar
                plugins={[ dayGridPlugin ]}
                initialView='dayGridMonth'
                height={'auto'}
            />
        </div>
    )
}