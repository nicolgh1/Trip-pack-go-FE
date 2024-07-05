const { format, addDays, parse } = require('date-fns')

export const addDaysToDate = (dateStr, daysToAdd) => {

  const date = parse(dateStr, 'dd/MM/yyyy', new Date())

  const newDate = addDays(date, daysToAdd)

  return format(newDate, 'dd/MM/yyyy')
}