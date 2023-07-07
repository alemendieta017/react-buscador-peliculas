import { useState, useRef, useMemo, useCallback } from 'react'
import { searchMovies } from '../services/movies'

export default function useMovies({ search, sort }) {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const previousSearch = useRef(search)

  const getMovies = useCallback(async ({ search }) => {
    if (previousSearch.current === search) {
      return
    }

    try {
      setLoading(true)
      setError(null)
      const newMovies = await searchMovies({ search })
      setMovies(newMovies)
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }, [])

  const sortedMovies = useMemo(() => {
    return sort
      ? [...movies].sort((a, b) => {
          return a.title.localeCompare(b.title)
        })
      : movies
  }, [movies, sort])

  return { movies: sortedMovies, getMovies, loading }
}