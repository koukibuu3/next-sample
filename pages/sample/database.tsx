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
  const { comments } = useComments(defaultComments)

  return (
    <div className={styles.container}>
      <Head>
        <title>Database | Next.js sample</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>This is database sample.</h1>
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
