import { Metadata } from 'next'
import Post from '@/components/kokonutui/post'

export const metadata: Metadata = {
  title: 'Post',
  description: 'Post page with image card and chat interface',
}

export default function PostPage() {
  return <Post />
}
