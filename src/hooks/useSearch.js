import { useState, useEffect, useRef } from 'react'

export default function useSearch() {
  const [search, setSearch] = useState('')
  const [error, setError] = useState(null)
  const isFirstInput = useRef(true)

  useEffect(() => {
    if (search.startsWith(' ')) {
      return
    }

    if (search === '') {
      if (isFirstInput.current) {
        isFirstInput.current = search === ''
        return
      }
      setError('No se puede buscar una pelicula vacía')
      return
    }
    if (search.match(/^[0-9]+$/)) {
      setError('No se puede buscar solo números')
      return
    }
    if (search.length < 3) {
      setError('No se puede buscar menos de 3 caracteres')
      return
    }

    setError(null)
  }, [search])

  return { search, setSearch, error }
}
