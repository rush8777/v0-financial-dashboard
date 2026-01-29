import Layout from "@/components/kokonutui/layout"
import Project from "@/components/kokonutui/project"

export const metadata = {
  title: "My Tasks - Project Management",
  description: "Manage your tasks and projects efficiently",
}

export default function ProjectPage() {
  return (
    <Layout>
      <Project />
    </Layout>
  )
}
