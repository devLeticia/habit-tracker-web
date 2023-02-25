import { HabitDay } from './HabitDay'
import { generateDatesFromYearBeginning } from './../utils/generate-dates-from-year-beginning'
import { useEffect, useState } from 'react'
import { api } from './../lib/axios'
import dayjs from 'dayjs'

const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']

const summaryDates = generateDatesFromYearBeginning()

const minimumSummaryDatesSize = 18 * 7 // 18 weeks
const amountOfDaysToFill = minimumSummaryDatesSize - summaryDates.length

// will be an array of summaries
type Summary = {
  id: string
  date: string
  amount: number
  completed: number
}[]

export function SummaryTable() {
  const [summary, setSummary] = useState<Summary>([])
  // useEffect() -> lidar com efeitos colaterais
  // parametros: o que vai acontece, e quando vai acontecer. Exenmplo, toda vez que uma variavel mudar, vai executar o codigo
  // isso é tipo um watch né?
  // Se deixa o [] vazio, vai exexutar apenas unma vezes quando o o componente foi exibido em tela a primeira vez

  useEffect(() => {
    api.get('summary').then((response) => {
      setSummary(response.data)
    })
  }, [])

  return (
    <div className='w-full flex'>
      <div className='grid grid-rows-7 grid-flow-row gap-3'>
        {weekDays.map((weekday, i) => {
          return (
            <div
              key={`${weekday}-${i}`}
              className='text-zinc-400 font-bold text-xl h-10 w-10 flex items-center justify-center'
            >
              {weekday}
            </div>
          )
        })}
      </div>
      <div className='grid grid-rows-7 grid-flow-col gap-3'>
        {summary.length > 0 &&
          summaryDates.map((date) => {
            const dayInSummary = summary.find((day) => {
              return dayjs(date).isSame(day.date, 'day')
            })

            return (
              <HabitDay
                key={date.toString()}
                date={date}
                amount={dayInSummary?.amount}
                defaultCompleted={dayInSummary?.completed}
              />
            )
          })}

        {amountOfDaysToFill > 0 &&
          Array.from({ length: amountOfDaysToFill }).map((_, i) => {
            return (
              <div
                key={i}
                className='w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg opacity-40 cursor-not-allowed'
              />
            )
          })}
      </div>
    </div>
  )
}
