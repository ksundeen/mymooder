import React, { useState } from 'react'
import DatePicker from 'react-native-date-picker'
import ButtonComponent from './ButtonComponent'

const DatePickerButton = (props: {onDataReceivedCaller: any}) => {
    const { onDataReceivedCaller } = props; 
    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)
    const [newDate, setNewDate] = useState(date);
    return (
        <>
            <ButtonComponent buttonWidth={200} onPress={() => setOpen(true)} text='Open Date Picker'/>
            <DatePicker
                modal
                open={open}
                date={date}
                onConfirm={(date) => {
                    // Send date value to parent component
                    setNewDate(date)
                    onDataReceivedCaller({dateVal: newDate});
                    setDate(date);
                    setOpen(false);
                }}
                onCancel={() => setOpen(false)}
            />
        </>
    )
}

export default DatePickerButton;
