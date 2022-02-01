import { startOfMonth, startOfWeek, endOfMonth, endOfWeek, startOfDay, addDays } from 'date-fns';

export function takeWeek(start = new Date()) {
    let date = startOfWeek(startOfDay(start))

    return function() {
        const week = [...Array(7)].map( (_, i) => addDays(date, i))
        date = addDays(week[6], 1)
        return week
    }
}

export function takeMonth(start: Date) {

    let month: any[] = []
    // let date = startOfWeek(startOfDay(start))
    
    function lastDayOfRange(range: any) {
        return range[range.length - 1][6]
    }

    return function() {
        const weekGen = takeWeek(startOfMonth(start))
        const endDate = startOfDay(endOfWeek(endOfMonth(start)))
        month.push(weekGen())

        while(lastDayOfRange(month) < endDate) {
            month.push(weekGen())
        }

        // const range = month
        // month = []
        // date = addDays(lastDayOfRange(range), 1)
        
        return month
    }
}

