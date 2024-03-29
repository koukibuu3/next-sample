import { useState } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'

import styles from '../../styles/Home.module.css'
import useComments from '../../hooks/useComments'
import Comment from '../../models/Comment'
import type { Comment as TComment } from '../../types'

type Props = {
  defaultComments: TComment[]
}

const DatabasePage: NextPage<Props> = ({ defaultComments }) => {
  const { comments, addComment } = useComments(defaultComments)
  const [input, setInput] = useState('')

  return (
    <div className={styles.container}>
      <Head>
        <title>Database | Next.js sample</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>This is database sample.</h1>
        <label>
          テキスト：
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </label>
        <button
          onClick={() => {
            addComment(input)
          }}
        >
          送信
        </button>

        <ul>
          {comments.map((comment) => (
            <li key={comment.id}>
              {comment.text}
              <span>{comment.createdAt}</span>
            </li>
          ))}
        </ul>
      </main>
    </div>
  )
}

export const getServerSideProps = async () => {
  return { props: { defaultComments: await Comment.all() } }
}

export default DatabasePage
