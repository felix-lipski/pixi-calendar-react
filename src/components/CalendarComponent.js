import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { addRes, deleteRes } from "../redux/calendarReducer";

const CalendarComponent = () => {
    const dispatch = useDispatch()

    const onAdd = () => {
        dispatch(addRes({from: new Date(2021, 1, 20), to: new Date(2021, 1, 25), room: 0, id:128, roomId:128, color: 0x008080}))
    }

    const onDel = () => {
        dispatch(deleteRes(128))
    }

    const onCount = () => console.log(reservations)
  
    const divRef = React.useRef()
    const view = useSelector((state) => state.calendar.view);
    const reservations = useSelector((state) => state.calendar.reservations);
    React.useEffect(() => {
        divRef.current.appendChild(view);

        return () => {
            divRef.current.removeChild(view);
        }
    }, [])

    return (
        <>
        {/* <button onClick={onAdd}>Add Reservation</button>
        <button onClick={onDel}>Delete Reservation</button>
        <button onClick={onCount}>How Many?</button> */}
        <div ref={divRef}>
        </div>
        </>
    )
}

export default CalendarComponent
