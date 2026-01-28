import Layout from "@/components/kokonutui/layout"
import YoutubeAnalytics from "@/components/kokonutui/video-analytics"

export default function YoutubePage() {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Analytics Components */}
        <YoutubeAnalytics />
      </div>
    </Layout>
  )
}
