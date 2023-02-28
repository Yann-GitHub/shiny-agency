import { useState, useEffect, useContext } from 'react'
import { ThemeContext } from '../context'

// export function useFetch(url) {
//   const [data, setData] = useState({})
//   const [isDataLoading, setisDataLoading] = useState(true)
//   const [error, setError] = useState(false)

//   useEffect(() => {
//     if (!url) return

//     setisDataLoading(true)

//     async function fetchData() {
//       try {
//         const response = await fetch(url)
//         const data = await response.json()
//         setData(data)
//       } catch (err) {
//         console.log(err)
//         setError(true)
//       } finally {
//         setisDataLoading(false)
//       }
//     }

//     fetchData()
//   }, [url])

//   return { isDataLoading, data, error }
// }

export function useFetch(url) {
  const [data, setData] = useState({})
  const [isDataLoading, setisDataLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (!url) return
    setisDataLoading(true)
    async function fetchData() {
      try {
        const response = await fetch(url)
        if (!response.ok) {
          const { errorMessage } = await response.json()
          throw new Error(errorMessage)
        } else {
          const data = await response.json()
          setData(data)
        }
      } catch (err) {
        console.log(err.message)
        setError(err.message)
      } finally {
      }
      setisDataLoading(false)
    }
    fetchData()
  }, [url])
  return { isDataLoading, data, error }
}

export function useTheme() {
  const { theme, toggleTheme } = useContext(ThemeContext)
  return { theme, toggleTheme }
}
