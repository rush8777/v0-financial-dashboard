import { X, Upload, Calendar, FolderOpen, ChevronDown } from "lucide-react"
import { useState, DragEvent, ChangeEvent } from "react"

interface Course {
  id: number
  title: string
  watched: number
  total: number
  icon: string
  percentage: number
  trend: string
  trendUp: boolean
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
  const [formData, setFormData] = useState<FormData>({
    projectName: "",
    category: course?.title || "",
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
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-2xl bg-[#2A2A2E] rounded-3xl shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-start gap-4 p-8 pb-6">
          <div className="p-3 bg-[#3A3A3E] rounded-xl">
            <FolderOpen className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-white mb-1">
              Create New Project
            </h2>
            <p className="text-sm text-gray-400">
              Create a project to structure your team's workflow.
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-8 pb-8 space-y-6">
          {/* Project Name & Category */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Project name<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Type here"
                value={formData.projectName}
                onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
                className="w-full px-4 py-3 bg-[#3A3A3E] border border-[#4A4A4E] rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Project category<span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-3 bg-[#3A3A3E] border border-[#4A4A4E] rounded-xl text-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors appearance-none cursor-pointer"
                  required
                >
                  <option value="">Choose category</option>
                  <option value="UI/UX Design">UI/UX Design</option>
                  <option value="Branding">Branding</option>
                  <option value="Front End">Front End</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Photography">Photography</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Start & End Date */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Start Date<span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  placeholder="Select"
                  className="w-full px-4 py-3 bg-[#3A3A3E] border border-[#4A4A4E] rounded-xl text-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors appearance-none cursor-pointer"
                  required
                />
                <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                End Date<span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  placeholder="Select"
                  className="w-full px-4 py-3 bg-[#3A3A3E] border border-[#4A4A4E] rounded-xl text-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors appearance-none cursor-pointer"
                  required
                />
                <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Description
            </label>
            <textarea
              placeholder="Enter the goals and scope for your project here"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
              className="w-full px-4 py-3 bg-[#3A3A3E] border border-[#4A4A4E] rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors resize-none"
            />
          </div>

          {/* Upload Documents */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Upload Documents
            </label>
            <p className="text-sm text-gray-400 mb-3">
              Drop your project documents here to continue.
            </p>
            
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`relative border-2 border-dashed rounded-xl p-8 transition-all ${
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
                <div className="w-16 h-16 bg-[#4A4A4E] rounded-full flex items-center justify-center mb-4">
                  <Upload className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-white font-medium mb-1">
                  Choose a file or drag and drop it here.
                </p>
                <p className="text-sm text-gray-400">
                  JGP, or PDF file - up to 100MB
                </p>
              </div>
            </div>

            {/* File List */}
            {formData.documents.length > 0 && (
              <div className="mt-3 space-y-2">
                {formData.documents.map((file, index) => (
                  <div 
                    key={index}
                    className="flex items-center justify-between p-3 bg-[#3A3A3E] rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-purple-500/20 rounded flex items-center justify-center">
                        <Upload className="w-4 h-4 text-purple-400" />
                      </div>
                      <div>
                        <p className="text-sm text-white font-medium">{file.name}</p>
                        <p className="text-xs text-gray-400">
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFile(index)}
                      className="p-1 hover:bg-[#4A4A4E] rounded transition-colors"
                    >
                      <X className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer Buttons */}
          <div className="flex items-center justify-between pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 text-white hover:bg-[#3A3A3E] rounded-xl font-medium transition-colors"
            >
              Cancel
            </button>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleSaveDraft}
                className="px-6 py-3 text-white hover:bg-[#3A3A3E] rounded-xl font-medium transition-colors"
              >
                Save as Draft
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-white text-gray-900 hover:bg-gray-100 rounded-xl font-semibold transition-colors"
              >
                Save Project
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
