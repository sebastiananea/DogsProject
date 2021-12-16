import React from 'react'
import { useState } from 'react'
import { filterBySearch } from '../../actions'
import { useDispatch } from 'react-redux'

export function SearchBar() {
  const [name, setName] = useState('')
  const dispatch = useDispatch()

  function handleChange(e) {
    e.preventDefault()
    setName(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault()
    dispatch(filterBySearch(name))
    document.getElementById('form').reset()
  }
  return (
    <form id='form'>
      <input
        onChange={(e) => handleChange(e)}
        placeholder='Dog name...'
        type='text'
      />
      <button className='btn' onClick={(e) => handleSubmit(e)}>
        Buscar
      </button>
    </form>
  )
}
