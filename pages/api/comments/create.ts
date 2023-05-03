import type { NextApiRequest, NextApiResponse } from 'next'

import type { Comment as DComment } from '../../../types/database'
import Comment from '../../../models/Comment'

export default async function handler(
  req: NextApiRequest & { body: { text: string } },
  res: NextApiResponse<DComment>
) {
  if (req.method === 'POST') {
    const comment = await Comment.create(req.body.text)
    res.status(201).json(comment)
  }
}
