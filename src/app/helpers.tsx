import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

import Typography from '@mui/material/Typography'

import { setScrollPosition } from './store/localStorageSlice'
import { RootStoreStateType } from './store/store'
import { MovieDetails } from './types'


/**
 * Simple plural text for internal use, ignore localization possibilities in this example
 * 
 * @param text array of singular and plural form
 * @param count number of items
 * @returns string
 */
export const __pl: (text: string[], count: number) => string = (text, count) => {
  return count === 1 ? text[0] : text[1]
}


/**
 * Displays notification message
 * 
 * @param message notification message text
 * @param title notification title text
 */
export const notify = (message: string, title?: string) => {
  toast.error(
    <>
      {title && <Typography variant="body1" fontWeight={600} display="block">{title}</Typography>}
      <Typography variant="body2" display="block">{message}</Typography>
    </>
  )
}


/**
 * Check if movie is selected as favourite
 * 
 * @param movieId movie ID
 * @returns boolean
 */
export const useIsFavouriteMovie = (movieId: number) => {
  const favouriteMovies = useSelector<RootStoreStateType, MovieDetails[]>((state) => state.local.favouriteMovies)
  return favouriteMovies.filter(item => item.id === movieId).length > 0
}


/**
 * Scroll to last position on homepage
 */
export const useOnLoadScroll = () => {
  const dispatch = useDispatch()
  const scrollPosition = useSelector<RootStoreStateType, number>((state) => state.local.scrollPosition)

  useEffect(() => {
    const setPosition = (e: BeforeUnloadEvent) => {
      e.preventDefault()
      dispatch(setScrollPosition(window.scrollY))
    }
    window.addEventListener('beforeunload', setPosition)
    if (scrollPosition) window.scroll(0, scrollPosition)

    return () => window.removeEventListener("beforeunload", setPosition)
  }, [dispatch, scrollPosition])

}