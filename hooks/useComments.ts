import { useState } from 'react'
import type { Comment as TComment } from '../types'

type Response = {
  comments: TComment[]
  addComment: (text: string) => void
}

const useComments = (defaultComments: TComment[]): Response => {
  const [comments, setComments] = useState<TComment[]>(defaultComments)
  console.log('set state.', comments)

  const addComment = async (text: string) => {
    const response = await fetch('/api/comments/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    })
    const createdComment = (await response.json()) as TComment

    setComments([...comments, createdComment])
  }

  return {
    comments,
    addComment,
  }
}

export default useComments
