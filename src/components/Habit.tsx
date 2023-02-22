interface Habit {
  completed: number
}

export function Habit(props: Habit) {
  return (
    <div className='bg-indigo-400 w-10 h-10 text-white rounded m-2 text-center flex items-center justify-center'>
      {props.completed}
    </div>
  )
}
