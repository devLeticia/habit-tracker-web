import { Routes, Route } from 'react-router-dom'
import { SummaryTable } from './components/SummaryTable'
import { Authentication } from './views/Authentication'

export function Router() {
  return (
    <Routes>
      // we must have a route for hero page, login / register (auth), and home
      (habits summary)
      <Route path='/auth' element={<Authentication />} />
      <Route path='/home' element={<SummaryTable />} />
    </Routes>
  )
}
