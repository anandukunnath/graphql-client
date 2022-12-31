import React from 'react'
import MovieCard from './MovieCard'
import "../styles/components/movielist.css"

export default function MovieList(props) {
    const handleEdit = (data) => {
        props.sendBack(data)
    }
  return (
    <div className='movie-list'>
        {
            props.data.map(item => {
                return(
                    <MovieCard data={item} edit={handleEdit} />
                )
            })
        }
    </div>
  )
}
