import { useState } from 'react'
import { Route, Routes } from 'react-router'
import AddWord from './components/AddWord'
import Dictionary from './pages/Dictionary'
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import useZustand from './components/zustand'

const queryClient = new QueryClient()

function App() {
  const addView = useZustand((state) => state.viewAdd)
  let [view, setView] = useState(false)
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        {addView && <AddWord setView={setView} />}

        {addView === false && (
          <Routes>
            <Route path="/" element={<Dictionary />} />
          </Routes>
        )}
      </div>
    </QueryClientProvider>
  )
}

export default App
