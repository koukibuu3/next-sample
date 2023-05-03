import { sql } from '@vercel/postgres'
import type { Comment as TComment } from '../types'
import type { Comment as DComment } from '../types/database'

class Comment {
  constructor(
    private readonly id: number,
    private readonly text: string,
    private readonly createdAt?: Date,
    private readonly updatedAt?: Date
  ) {}

  static async all(): Promise<TComment[]> {
    const { rows } = await sql<DComment>`SELECT * FROM comments`
    console.log('fetching...', rows)

    return rows.map((row) =>
      new Comment(
        row.id,
        row.text,
        row.created_at,
        row.updated_at
      ).serializeAsJSON()
    )
  }

  private serializeAsJSON() {
    return {
      id: this.id,
      text: this.text,
      createdAt: this.createdAt?.toDateString() ?? '',
      updatedAt: this.updatedAt?.toDateString() ?? '',
    }
  }
}

export default Comment
