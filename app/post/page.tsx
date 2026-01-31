import { Metadata } from 'next'
import Layout from '@/components/kokonutui/layout'
import Post from '@/components/kokonutui/feedsense'

export const metadata: Metadata = {
  title: 'Post',
  description: 'Post page with image card and chat interface',
}

export default function PostPage() {
  return (
    <Layout>
      <Post />
    </Layout>
  )
}
