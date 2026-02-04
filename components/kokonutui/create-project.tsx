import { X, Upload, FolderOpen, ChevronDown } from "lucide-react"
import { useState, DragEvent, ChangeEvent } from "react"

const toptabs = [
  { id: "import", label: "Import"},
  { id: "link", label: "Link"},
  { id: "local", label: "Local"}
] as const

interface Course {
  id: number
  label: string
  icon: React.ComponentType<{ className?: string }>
  gradient: string
}

interface CreateProjectModalProps {
  isOpen: boolean
  onClose: () => void
  course?: Course | null
}

interface FormData {
  projectName: string
  category: string
  startDate: string
  endDate: string
  description: string
  documents: File[]
}

export default function CreateProjectModal({ isOpen, onClose, course }: CreateProjectModalProps) {
  const [activeTab, setActiveTab] = useState<'import' | 'link' | 'local'>('local')
  const [formData, setFormData] = useState<FormData>({
    projectName: "",
    category: course?.label || "",
    startDate: "",
    endDate: "",
    description: "",
    documents: []
  })

  const [isDragging, setIsDragging] = useState(false)

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Project created:", formData)
    // Add your submit logic here
    onClose()
  }

  const handleSaveDraft = () => {
    console.log("Draft saved:", formData)
    // Add your draft save logic here
    onClose()
  }

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
    const files = Array.from(e.dataTransfer.files)
    setFormData({ ...formData, documents: [...formData.documents, ...files] })
  }

  const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files)
      setFormData({ ...formData, documents: [...formData.documents, ...files] })
    }
  }

  const removeFile = (index: number) => {
    const newDocuments = formData.documents.filter((_, i) => i !== index)
    setFormData({ ...formData, documents: newDocuments })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-md animate-in fade-in zoom-in-95 duration-200 max-h-[85vh] p-3 rounded-lg bg-white dark:bg-zinc-900/70 border border-zinc-100 dark:border-zinc-800 shadow-sm backdrop-blur-xl flex flex-col">
        {/* Header */}
        <div className="flex items-start gap-2.5 p-4 pb-2 flex-shrink-0">
          <div className="p-1.5 bg-[#3A3A3E] rounded-lg">
            <FolderOpen className="w-4 h-4 text-white" />
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-bold text-white mb-0.5">
              Create New {course?.label || 'Project'}
            </h2>
            <p className="text-[11px] text-gray-400">
              Create a project to structure your team's workflow.
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="px-4 pb-3 flex-shrink-0">
          <div className="flex justify-center">
            <div className="inline-flex items-center gap-1.5 p-1 rounded-lg bg-[#35353A]">
              {toptabs.map((tab) => {
                const isActive = activeTab === tab.id

                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`
                      px-4 py-1.5 rounded-md text-xs font-medium
                      transition-all whitespace-nowrap
                      ${
                        isActive
                          ? "bg-zinc-800 text-white shadow-md"
                          : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50"
                      }
                    `}
                  >
                    {tab.label}
                  </button>
                )
              })}
            </div>
          </div>
        </div>


        {/* Form */}
        <div className="flex flex-col flex-1 min-h-0">
          {/* Project Name & Category - Fixed */}
          <div className="px-4 pb-3 flex-shrink-0">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[11px] font-medium text-white mb-1">
                  Project name<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Type here"
                  value={formData.projectName}
                  onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
                  className="w-full px-2.5 py-1.5 text-xs bg-[#3A3A3E] border border-[#4A4A4E] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
                  required
                />
              </div>
              <div>
                <label className="block text-[11px] font-medium text-white mb-1">
                  Project category<span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-2.5 py-1.5 text-xs bg-[#3A3A3E] border border-[#4A4A4E] rounded-lg text-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors appearance-none cursor-pointer"
                    required
                  >
                    <option value="">Choose category</option>
                    <option value="UI/UX Design">UI/UX Design</option>
                    <option value="Branding">Branding</option>
                    <option value="Front End">Front End</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Photography">Photography</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>

          {/* Scrollable Content Area */}
          <form onSubmit={handleSubmit} className="px-4 space-y-3 flex-1 overflow-y-auto min-h-0">
          {activeTab === 'local' && (
            <>
              {/* Upload Documents */}
              <div>
                <label className="block text-[11px] font-medium text-white mb-1">
                  Upload Documents
                </label>
                <p className="text-[10px] text-gray-400 mb-1.5">
                  Drop your project documents here to continue.
                </p>
                
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`relative border-2 border-dashed rounded-lg p-4 transition-all ${
                    isDragging 
                      ? 'border-purple-500 bg-purple-500/10' 
                      : 'border-[#4A4A4E] bg-[#35353A]'
                  }`}
                >
                  <input
                    type="file"
                    multiple
                    onChange={handleFileInput}
                    accept=".jpg,.jpeg,.pdf"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  
                  <div className="flex flex-col items-center justify-center text-center">
                    <div className="w-10 h-10 bg-[#4A4A4E] rounded-full flex items-center justify-center mb-2">
                      <Upload className="w-5 h-5 text-gray-400" />
                    </div>
                    <p className="text-xs text-white font-medium mb-0.5">
                      Choose a file or drag and drop it here.
                    </p>
                    <p className="text-[10px] text-gray-400">
                      JPG, or PDF file - up to 100MB
                    </p>
                  </div>
                </div>

                {/* File List */}
                {formData.documents.length > 0 && (
                  <div className="mt-1.5 space-y-1.5">
                    {formData.documents.map((file, index) => (
                      <div 
                        key={index}
                        className="flex items-center justify-between p-1.5 bg-[#3A3A3E] rounded-lg"
                      >
                        <div className="flex items-center gap-1.5">
                          <div className="w-6 h-6 bg-purple-500/20 rounded flex items-center justify-center">
                            <Upload className="w-3 h-3 text-purple-400" />
                          </div>
                          <div>
                            <p className="text-[10px] text-white font-medium truncate max-w-[200px]">{file.name}</p>
                            <p className="text-[9px] text-gray-400">
                              {(file.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFile(index)}
                          className="p-0.5 hover:bg-[#4A4A4E] rounded transition-colors"
                        >
                          <X className="w-3 h-3 text-gray-400" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}

          {activeTab === 'import' && (
            <div className="flex flex-col h-full -mx-4">
              {/* Header - Fixed */}
              <div className="flex-shrink-0 px-4 pb-3">
                <label className="block text-[11px] font-medium text-white mb-0.5">
                  Import from Library
                </label>
                <p className="text-[10px] text-gray-400">
                  Select videos from your content library to import.
                </p>
              </div>
              
              {/* Filter Bar */}
              <div className="flex-shrink-0 px-4 pb-3">
                <div className="flex items-center gap-2">
                  <button 
                    type="button"
                    className="px-2.5 py-1.5 text-[10px] bg-[#35353A] border border-[#4A4A4E] rounded-lg text-white hover:bg-[#3A3A3E] transition-colors flex items-center gap-1.5"
                  >
                    All categories
                    <ChevronDown className="w-3 h-3" />
                  </button>
                  <button 
                    type="button"
                    className="px-2.5 py-1.5 text-[10px] bg-[#35353A] border border-[#4A4A4E] rounded-lg text-white hover:bg-[#3A3A3E] transition-colors flex items-center gap-1.5"
                  >
                    Sort by
                    <ChevronDown className="w-3 h-3" />
                  </button>
                  <button 
                    type="button"
                    className="px-2.5 py-1.5 text-[10px] bg-[#35353A] border border-[#4A4A4E] rounded-lg text-white hover:bg-[#3A3A3E] transition-colors flex items-center gap-1.5"
                  >
                    Filters
                  </button>
                </div>
              </div>
              
              {/* Video Grid - Scrollable */}
              <div className="flex-1 overflow-y-auto px-4 pb-2">
                <div className="grid grid-cols-2 gap-2.5">
                  {/* Sample videos - replace with actual video data */}
                  {[
                    { 
                      title: 'How to make the best best pancakes...', 
                      channel: 'Cooking with Sam',
                      views: '3.2M views',
                      time: '10 days ago',
                      duration: '20:32',
                      stats: '4M subs • 26K VPH • 8.2 V/S',
                      thumbnail: 'https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=400&q=80'
                    },
                    { 
                      title: "Secrets of the cat's life", 
                      channel: 'Animal Stories',
                      views: '2K views',
                      time: '2 hours ago',
                      duration: '8:15',
                      stats: '134K subs • 1.2K VPH • 1.32 V/S',
                      thumbnail: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400&q=80'
                    },
                    { 
                      title: 'Most beautiful instagram spots on Ice...', 
                      channel: 'Travellers',
                      views: '1.2M views',
                      time: '2 weeks ago',
                      duration: '15:46',
                      stats: '1.6M subs • 24K VPH • 3.12 V/S',
                      thumbnail: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=400&q=80'
                    },
                    { 
                      title: 'Northern lights in out area', 
                      channel: 'Living on the North',
                      views: '2.4M views',
                      time: '2 weeks ago',
                      duration: '5:28',
                      stats: '1.5M subs • 40K VPH • 4.15 V/S',
                      thumbnail: 'https://images.unsplash.com/photo-1579033461380-adb47c3eb938?w=400&q=80'
                    },
                    { 
                      title: 'Stunning discoveries under the micro...', 
                      channel: 'SciHub Now',
                      views: '412K views',
                      time: '3 days ago',
                      duration: '21:16',
                      stats: '318K subs • 7.5K VPH • 1.57 V/S',
                      thumbnail: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=400&q=80'
                    },
                    { 
                      title: 'Does the perfect diet exist?', 
                      channel: 'Foodies Talk',
                      views: '627K views',
                      time: '5 days ago',
                      duration: '12:37',
                      stats: '120K subs • 1.2K VPH • 2.57 V/S',
                      thumbnail: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=80'
                    },
                  ].map((video, index) => (
                    <div 
                      key={index}
                      className="group cursor-pointer animate-in fade-in zoom-in-95 duration-200"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      {/* Thumbnail */}
                      <div className="relative aspect-video rounded-lg overflow-hidden mb-1.5 bg-[#3A3A3E]">
                        <img 
                          src={video.thumbnail} 
                          alt={video.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        {/* Duration Badge */}
                        <div className="absolute bottom-1.5 right-1.5 px-1.5 py-0.5 bg-black/80 rounded text-[9px] text-white font-semibold">
                          {video.duration}
                        </div>
                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                          <button 
                            type="button"
                            className="px-3 py-1.5 bg-white text-black text-[10px] font-semibold rounded-md hover:bg-gray-100 transition-all transform translate-y-2 group-hover:translate-y-0"
                          >
                            Select
                          </button>
                        </div>
                      </div>
                      
                      {/* Video Info */}
                      <div className="space-y-0.5">
                        <h3 className="text-[11px] text-white font-medium line-clamp-2 leading-tight group-hover:text-purple-400 transition-colors">
                          {video.title}
                        </h3>
                        <p className="text-[9px] text-gray-400">
                          {video.channel} • {video.views} • {video.time}
                        </p>
                        <p className="text-[8px] text-gray-500">
                          {video.stats}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'link' && (
            <div>
              <label className="block text-[11px] font-medium text-white mb-1">
                Project URL<span className="text-red-500">*</span>
              </label>
              <input
                type="url"
                placeholder="https://example.com/project"
                className="w-full px-2.5 py-1.5 text-xs bg-[#3A3A3E] border border-[#4A4A4E] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
              />
              <p className="text-[10px] text-gray-400 mt-1.5">
                Enter a link to your project repository or documentation
              </p>
            </div>
          )}

          {/* Footer Buttons */}
          <div className="flex items-center justify-between pt-2.5 border-t border-[#3A3A3E] flex-shrink-0 sticky bottom-0 bg-zinc-900/70 backdrop-blur-xl -mx-4 px-4 pb-0">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 text-xs text-white hover:bg-[#3A3A3E] rounded-lg font-medium transition-colors"
            >
              Cancel
            </button>
            <div className="flex gap-1.5">
              
              <button
                type="submit"
                className="px-3 py-1.5 text-xs bg-white text-gray-900 hover:bg-gray-100 rounded-lg font-semibold transition-colors"
              >
                Connect
              </button>
            </div>
          </div>
        </form>
        </div>
      </div>
    </div>
  )
}
