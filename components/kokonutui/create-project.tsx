import { X, Upload, FolderOpen, ChevronDown } from "lucide-react"
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
  const [activeTab, setActiveTab] = useState<'import' | 'link' | 'local'>('local')
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
              Create New Project
            </h2>
            <p className="text-[11px] text-gray-400">
              Create a project to structure your team's workflow.
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="px-4 pb-3 flex-shrink-0">
          <div className="flex gap-1 bg-[#35353A] rounded-lg p-1">
            <button
              type="button"
              onClick={() => setActiveTab('import')}
              className={`flex-1 px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                activeTab === 'import'
                  ? 'bg-purple-600 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Import
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('link')}
              className={`flex-1 px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                activeTab === 'link'
                  ? 'bg-purple-600 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Link
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('local')}
              className={`flex-1 px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                activeTab === 'local'
                  ? 'bg-purple-600 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Local
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-4 pb-4 space-y-3 flex-1 overflow-y-auto min-h-0">
          {/* Project Name & Category */}
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

          {/* Tab Content */}
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
            <div>
              <label className="block text-[11px] font-medium text-white mb-0.5">
                Import Documents
              </label>
              <p className="text-[10px] text-gray-400 mb-2">
                Select files from your recent documents to import.
              </p>
              
              {/* File List - Scrollable */}
              <div className="max-h-[240px] overflow-y-auto space-y-1 pr-1 scrollbar-thin scrollbar-thumb-[#4A4A4E] scrollbar-track-transparent">
                {/* Sample files - replace with actual file data */}
                {[
                  { name: 'WorldFoodsDealSheet.pdf', size: '8.8 mb', owner: 'Kristin Watson', color: 'bg-emerald-500' },
                  { name: 'promo432432.pdf', size: '3.6 mb', owner: 'Devon Lane', color: 'bg-pink-500' },
                  { name: 'pop0315021.xlsx', size: '4.1 mb', owner: 'Ronald Richards', color: 'bg-red-500' },
                  { name: 'DealSheet032021.xlsx', size: '3.9 mb', owner: 'Bessie Cooper', color: 'bg-purple-500' },
                  { name: 'Verkoopfactuur 5L200472.pdf', size: '8.4 mb', owner: 'Jenny Wilson', color: 'bg-cyan-500' },
                  { name: 'Invoice for YAAAS Queen.pdf', size: '337 kb', owner: 'Cameron Williamson', color: 'bg-emerald-500' },
                ].map((file, index) => (
                  <div 
                    key={index}
                    className="flex items-center justify-between p-2 hover:bg-[#35353A] rounded-lg transition-colors group"
                  >
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-blue-400 font-medium truncate">{file.name}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <span className="text-[10px] text-gray-400">{file.size}</span>
                      <div className="flex items-center gap-1.5">
                        <div className={`w-5 h-5 rounded-full ${file.color} flex items-center justify-center`}>
                          <span className="text-[9px] text-white font-semibold">
                            {file.owner.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <span className="text-[10px] text-gray-400 hidden sm:block">{file.owner}</span>
                      </div>
                      <button
                        type="button"
                        className="text-xs text-blue-500 hover:text-blue-400 font-medium"
                      >
                        Select
                      </button>
                    </div>
                  </div>
                ))}
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
                type="button"
                onClick={handleSaveDraft}
                className="px-3 py-1.5 text-xs text-white hover:bg-[#3A3A3E] rounded-lg font-medium transition-colors"
              >
                Save as Draft
              </button>
              <button
                type="submit"
                className="px-3 py-1.5 text-xs bg-white text-gray-900 hover:bg-gray-100 rounded-lg font-semibold transition-colors"
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
