import { useState } from 'react'
import type { Comment as TComment } from '../types'

type Response = {
  comments: TComment[]
}

const useComments = (defaultComments: TComment[]): Response => {
  const [comments, setComments] = useState<TComment[]>(defaultComments)
  console.log('set state.', comments)

  return {
    comments,
  }
}

export default useComments
