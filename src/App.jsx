
import React, { Suspense, lazy } from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter } from 'react-router'
import { RouterProvider } from 'react-router/dom'


function App() {
  const router = createBrowserRouter([
    {
      path:"/",
      Component: lazy(() => import('./pages/Layout')),
      children: [
        {index: true, Component: lazy(() => import('./components/CorperateTab'))},
        {path: "address", Component: lazy(() => import('./components/AddressTab'))},
        {path: "directors-details", Component: lazy(() => import('./components/DirectorDetailsTab'))},
        {path: "special-offers", Component: lazy(() => import('./components/SpecialOffersTab'))},
      ],
    }
  ])

  return (
    <>
      <Suspense fallback={<p>Loading...</p>}>
        <RouterProvider router={router} />
      </Suspense>
    </>
  )
}

export default App
