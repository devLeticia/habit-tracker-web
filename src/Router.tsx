import { Routes, Route } from 'react-router-dom'
import { SummaryTable } from './components/SummaryTable'
import { DefaultLayout } from './layouts/DefaultLayout'
import { FullPageLayout } from './layouts/FullpageLayout'
import { Authentication } from './views/Authentication'

export function Router() {
  return (
    <Routes>
      <Route path='/login' element={<FullPageLayout />}>
        <Route path='/login' element={<Authentication />} />
      </Route>

      <Route path='/home' element={<DefaultLayout />}>
        <Route path='/home' element={<SummaryTable />} />
      </Route>
    </Routes>
  )
}
