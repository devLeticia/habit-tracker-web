import { Routes, Route, Navigate } from 'react-router-dom'
import { NotFound } from './components/404/NotFound'
import { SummaryTable } from './components/SummaryTable'
import { DefaultLayout } from './layouts/DefaultLayout'
import { FullPageLayout } from './layouts/FullPageLayout'
import { Authentication } from './views/Authentication'

interface ProtectedRouteProp {
  userIsAuthenticated: boolean
  children: React.ReactElement
}

function ProtectedRoute({ userIsAuthenticated, children }: ProtectedRouteProp) {
  if (!userIsAuthenticated) {
    return <Navigate to='/login' replace />
  }
  return children
}

export function Router() {
  return (
    <Routes>
      <Route path='/login' element={<FullPageLayout />}>
        <Route path='/login' element={<Authentication />} />
      </Route>

      <Route path='/' element={<DefaultLayout />}>
        <Route
          path='/'
          element={
            <ProtectedRoute userIsAuthenticated={false}>
              <SummaryTable />
            </ProtectedRoute>
          }
        />
      </Route>
      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}
