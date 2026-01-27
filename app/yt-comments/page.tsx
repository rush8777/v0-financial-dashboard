import Layout from "@/components/kokonutui/layout"
import YoutubeAnalytics from "@/components/kokonutui/youtube-analytics"

export default function YoutubePage() {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">YouTube</h1>
          <h2 className="text-xl font-semibold text-zinc-700 dark:text-zinc-300">
            Channel: <span className="text-zinc-900 dark:text-white">MrBeast</span>
          </h2>
          <h3 className="text-lg text-zinc-600 dark:text-zinc-400">
            Video Name: <span className="font-medium text-zinc-900 dark:text-white">I Built 1000 Wells in Africa</span>
          </h3>
        </div>

        {/* Analytics Components */}
        <YoutubeAnalytics />
      </div>
    </Layout>
  )
}
