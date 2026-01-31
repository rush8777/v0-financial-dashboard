"use client"

import { useState } from "react"
import { Search, Zap, CheckCircle2, Circle, X, ExternalLink, AlertCircle, Loader2 } from "lucide-react"
import Layout from "./layout"
import { cn } from "@/lib/utils"

interface AppConnection {
  id: string
  name: string
  description: string
  icon: string
  color: string
  connected: boolean
  contactPerson?: string
}

interface PlatformCredentials {
  [key: string]: string
}

interface ApiRequirement {
  label: string
  placeholder: string
  type: string
  helpText?: string
}

const connectedApps: AppConnection[] = [
  {
    id: "youtube",
    name: "YouTube",
    description: "Connect and manage your YouTube channel",
    icon: "▶️",
    color: "bg-red-500 dark:bg-red-600",
    connected: true,
    contactPerson: "You",
  },
  {
    id: "facebook",
    name: "Facebook",
    description: "Integrate with your Facebook business page",
    icon: "f",
    color: "bg-blue-600 dark:bg-blue-700",
    connected: false,
    contactPerson: "Marketing Team",
  },
  {
    id: "instagram",
    name: "Instagram",
    description: "Connect your Instagram profile for insights",
    icon: "📷",
    color: "bg-pink-500 dark:bg-pink-600",
    connected: true,
    contactPerson: "Social Media Manager",
  },
  {
    id: "twitter",
    name: "Twitter",
    description: "Manage your Twitter account and engagement",
    icon: "𝕏",
    color: "bg-black dark:bg-zinc-700",
    connected: false,
    contactPerson: "Community Manager",
  },
  {
    id: "tiktok",
    name: "TikTok",
    description: "Connect your TikTok account for video content",
    icon: "🎵",
    color: "bg-black dark:bg-zinc-800",
    connected: false,
    contactPerson: "Content Creator",
  },
]

const apiRequirements: Record<string, {
  fields: ApiRequirement[]
  developerUrl: string
  instructions: string
}> = {
  youtube: {
    fields: [
      {
        label: "Client ID",
        placeholder: "Enter your OAuth 2.0 Client ID",
        type: "text",
        helpText: "Found in Google Cloud Console"
      },
      {
        label: "Client Secret",
        placeholder: "Enter your Client Secret",
        type: "password",
        helpText: "Keep this secret and secure"
      },
    ],
    developerUrl: "https://console.cloud.google.com/apis/credentials",
    instructions: "Create OAuth 2.0 credentials in Google Cloud Console. Enable YouTube Data API v3 for your project."
  },
  facebook: {
    fields: [
      {
        label: "App ID",
        placeholder: "Enter your Facebook App ID",
        type: "text",
      },
      {
        label: "App Secret",
        placeholder: "Enter your App Secret",
        type: "password",
        helpText: "Found in App Settings > Basic"
      },
      {
        label: "Access Token",
        placeholder: "Enter your Access Token",
        type: "password",
        helpText: "Generate from Graph API Explorer"
      },
    ],
    developerUrl: "https://developers.facebook.com/apps",
    instructions: "Create a Facebook App in Meta for Developers. Get your App ID and Secret from App Settings."
  },
  instagram: {
    fields: [
      {
        label: "App ID",
        placeholder: "Enter your Instagram App ID",
        type: "text",
      },
      {
        label: "App Secret",
        placeholder: "Enter your App Secret",
        type: "password",
      },
      {
        label: "Access Token",
        placeholder: "Enter your Access Token",
        type: "password",
        helpText: "Use Facebook's Graph API Explorer"
      },
    ],
    developerUrl: "https://developers.facebook.com/apps",
    instructions: "Instagram API uses Facebook's developer platform. Create a Facebook App and add Instagram product."
  },
  twitter: {
    fields: [
      {
        label: "API Key",
        placeholder: "Enter your API Key",
        type: "text",
      },
      {
        label: "API Secret",
        placeholder: "Enter your API Secret",
        type: "password",
      },
      {
        label: "Access Token",
        placeholder: "Enter your Access Token",
        type: "password",
      },
      {
        label: "Access Token Secret",
        placeholder: "Enter your Access Token Secret",
        type: "password",
      },
    ],
    developerUrl: "https://developer.twitter.com/en/portal/dashboard",
    instructions: "Create a Twitter Developer account and app. Generate your API keys and tokens from the Developer Portal."
  },
  tiktok: {
    fields: [
      {
        label: "Client Key",
        placeholder: "Enter your Client Key",
        type: "text",
      },
      {
        label: "Client Secret",
        placeholder: "Enter your Client Secret",
        type: "password",
        helpText: "Found in TikTok Developer Portal"
      },
    ],
    developerUrl: "https://developers.tiktok.com/apps",
    instructions: "Register as a TikTok Developer and create an app. Your Client Key and Secret will be in app settings."
  },
}

const statusConfig = {
  connected: {
    icon: CheckCircle2,
    textClass: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-100 dark:bg-emerald-900/30",
    dotColor: "bg-emerald-500",
    label: "CONNECTED",
  },
  disconnected: {
    icon: Circle,
    textClass: "text-zinc-600 dark:text-zinc-400",
    bg: "bg-zinc-100 dark:bg-zinc-900/30",
    dotColor: "bg-zinc-400",
    label: "DISCONNECTED",
  },
}

export default function Connections() {
  const [apps, setApps] = useState<AppConnection[]>(connectedApps)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedApp, setSelectedApp] = useState<string | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [currentPlatform, setCurrentPlatform] = useState<string | null>(null)
  const [credentials, setCredentials] = useState<Record<string, PlatformCredentials>>({})
  const [formData, setFormData] = useState<PlatformCredentials>({})
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const handleOpenModal = (appId: string, isConnected: boolean) => {
    if (isConnected) {
      // If already connected, disconnect
      handleDisconnect(appId)
    } else {
      // If not connected, open modal
      setCurrentPlatform(appId)
      setShowModal(true)
      setFormData({})
      setError(null)
      setSuccess(null)
    }
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setCurrentPlatform(null)
    setFormData({})
    setError(null)
    setSuccess(null)
  }

  const handleDisconnect = (appId: string) => {
    setApps(
      apps.map((app) =>
        app.id === appId ? { ...app, connected: false } : app
      )
    )
    // Clear stored credentials
    const newCredentials = { ...credentials }
    delete newCredentials[appId]
    setCredentials(newCredentials)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)
    setIsLoading(true)

    // Validate all fields are filled
    const platformConfig = currentPlatform ? apiRequirements[currentPlatform] : null
    if (!platformConfig) return

    const allFieldsFilled = platformConfig.fields.every(
      (field) => formData[field.label]?.trim()
    )

    if (!allFieldsFilled) {
      setError("Please fill in all required fields")
      setIsLoading(false)
      return
    }

    // Simulate API connection (replace with actual API calls)
    setTimeout(() => {
      try {
        // Store credentials
        setCredentials({
          ...credentials,
          [currentPlatform!]: formData,
        })

        // Update app connection status
        setApps(
          apps.map((app) =>
            app.id === currentPlatform ? { ...app, connected: true } : app
          )
        )

        setSuccess(`Successfully connected to ${apps.find(a => a.id === currentPlatform)?.name}!`)
        
        // Close modal after short delay
        setTimeout(() => {
          handleCloseModal()
        }, 1500)
      } catch (err) {
        setError("Failed to connect. Please check your credentials.")
      } finally {
        setIsLoading(false)
      }
    }, 2000)
  }

  const filteredApps = apps.filter(
    (app) =>
      app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const currentPlatformConfig = currentPlatform ? apiRequirements[currentPlatform] : null
  const currentApp = apps.find(app => app.id === currentPlatform)

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl font-semibold text-zinc-900 dark:text-white">
              Integrations
            </h1>
            <span className="inline-flex items-center justify-center px-2.5 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-xs font-medium text-zinc-700 dark:text-zinc-300">
              {apps.length}
            </span>
          </div>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Search through the comprehensive directory of Integrations
          </p>
        </div>

        {/* Search Bar and Sorting */}
        <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-3 h-4 w-4 text-zinc-400 dark:text-zinc-600" />
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={cn(
                "w-full pl-9 pr-4 py-2 text-sm",
                "rounded-lg",
                "border border-zinc-200 dark:border-zinc-800",
                "bg-white dark:bg-zinc-900/70",
                "text-zinc-900 dark:text-white",
                "placeholder-zinc-500 dark:placeholder-zinc-400",
                "focus:outline-none focus:ring-2 focus:ring-zinc-400 dark:focus:ring-zinc-600",
                "transition-all duration-200"
              )}
            />
          </div>
          <button className="px-3 py-2 text-sm font-medium text-zinc-700 dark:text-zinc-300 bg-white dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-800 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors">
            ⚙️ Sorting
          </button>
        </div>

        {/* Apps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredApps.map((app) => {
            const status = app.connected ? "connected" : "disconnected"
            const statusInfo = statusConfig[status]
            const isSelected = selectedApp === app.id

            return (
              <button
                key={app.id}
                onClick={() => setSelectedApp(isSelected ? null : app.id)}
                className={cn(
                  "flex flex-col",
                  "w-full p-4",
                  "rounded-xl",
                  "border transition-all duration-200",
                  "hover:shadow-md",
                  "text-left",
                  isSelected
                    ? "border-zinc-400 dark:border-zinc-600 bg-zinc-50 dark:bg-zinc-800/50 shadow-md"
                    : "border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900/70 hover:border-zinc-200 dark:hover:border-zinc-700"
                )}
              >
                {/* Icon and Status Badge */}
                <div className="flex items-start justify-between mb-3">
                  <div
                    className={cn(
                      "rounded-lg p-2.5 flex items-center justify-center text-2xl w-10 h-10 flex-shrink-0",
                      app.color
                    )}
                  >
                    {app.icon}
                  </div>
                  <div
                    className={cn(
                      "px-2 py-1 rounded-full flex items-center gap-1",
                      statusInfo.bg,
                      statusInfo.textClass
                    )}
                  >
                    {statusInfo.dotColor === "bg-emerald-500" ? (
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    ) : (
                      <Circle className="w-3.5 h-3.5" />
                    )}
                    <span className="text-xs font-medium">{statusInfo.label}</span>
                  </div>
                </div>

                {/* App Name */}
                <h3 className="text-sm font-semibold text-zinc-900 dark:text-white mb-1">
                  {app.name}
                </h3>

                {/* Description */}
                <p className="text-xs text-zinc-600 dark:text-zinc-400 line-clamp-2 mb-3 flex-grow">
                  {app.description}
                </p>

                {/* Contact Person */}
                {app.contactPerson && (
                  <div className="flex items-center gap-2 mb-3 pb-3 border-t border-zinc-100 dark:border-zinc-800 pt-3">
                    <div className="w-6 h-6 rounded-full bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center text-xs font-medium text-zinc-600 dark:text-zinc-400">
                      {app.contactPerson.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-zinc-600 dark:text-zinc-400">
                        {app.contactPerson}
                      </p>
                    </div>
                  </div>
                )}

                {/* Action Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    handleOpenModal(app.id, app.connected)
                  }}
                  className={cn(
                    "w-full py-2 px-3 text-xs font-medium rounded-lg",
                    "transition-all duration-200",
                    app.connected
                      ? "text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700"
                      : "text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700"
                  )}
                >
                  {app.connected ? "DISCONNECT" : "CONNECT"}
                </button>
              </button>
            )
          })}
        </div>

        {/* Empty State */}
        {filteredApps.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12">
            <Zap className="h-12 w-12 text-zinc-400 dark:text-zinc-600 mb-4" />
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              No apps found matching your search
            </p>
          </div>
        )}
      </div>

      {/* API Credentials Modal */}
      {showModal && currentPlatformConfig && currentApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div
            className={cn(
              "relative w-full max-w-2xl max-h-[90vh] overflow-y-auto",
              "bg-white dark:bg-zinc-900",
              "rounded-2xl shadow-2xl",
              "border border-zinc-200 dark:border-zinc-800"
            )}
          >
            {/* Modal Header */}
            <div className="sticky top-0 z-10 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 px-6 py-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "rounded-lg p-2 flex items-center justify-center text-2xl w-12 h-12",
                      currentApp.color
                    )}
                  >
                    {currentApp.icon}
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
                      Connect to {currentApp.name}
                    </h2>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
                      Enter your API credentials to connect
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleCloseModal}
                  className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="px-6 py-6">
              {/* Instructions */}
              <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 rounded-lg">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm text-blue-900 dark:text-blue-100 mb-2">
                      {currentPlatformConfig.instructions}
                    </p>
                    <a
                      href={currentPlatformConfig.developerUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                    >
                      Open Developer Portal
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                {currentPlatformConfig.fields.map((field) => (
                  <div key={field.label}>
                    <label className="block text-sm font-medium text-zinc-900 dark:text-white mb-2">
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      placeholder={field.placeholder}
                      value={formData[field.label] || ""}
                      onChange={(e) => handleInputChange(field.label, e.target.value)}
                      className={cn(
                        "w-full px-4 py-2.5 text-sm",
                        "rounded-lg",
                        "border border-zinc-200 dark:border-zinc-700",
                        "bg-white dark:bg-zinc-800",
                        "text-zinc-900 dark:text-white",
                        "placeholder-zinc-400 dark:placeholder-zinc-500",
                        "focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600",
                        "transition-all duration-200"
                      )}
                      required
                    />
                    {field.helpText && (
                      <p className="mt-1.5 text-xs text-zinc-500 dark:text-zinc-400">
                        {field.helpText}
                      </p>
                    )}
                  </div>
                ))}

                {/* Error Message */}
                {error && (
                  <div className="p-3 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 rounded-lg">
                    <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                  </div>
                )}

                {/* Success Message */}
                {success && (
                  <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900 rounded-lg">
                    <p className="text-sm text-emerald-600 dark:text-emerald-400">{success}</p>
                  </div>
                )}

                {/* Form Actions */}
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    disabled={isLoading}
                    className={cn(
                      "flex-1 px-4 py-2.5 text-sm font-medium",
                      "rounded-lg",
                      "bg-zinc-100 dark:bg-zinc-800",
                      "text-zinc-700 dark:text-zinc-300",
                      "hover:bg-zinc-200 dark:hover:bg-zinc-700",
                      "transition-colors",
                      "disabled:opacity-50 disabled:cursor-not-allowed"
                    )}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={cn(
                      "flex-1 px-4 py-2.5 text-sm font-medium",
                      "rounded-lg",
                      "bg-blue-600 dark:bg-blue-600",
                      "text-white",
                      "hover:bg-blue-700 dark:hover:bg-blue-700",
                      "transition-colors",
                      "disabled:opacity-50 disabled:cursor-not-allowed",
                      "flex items-center justify-center gap-2"
                    )}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Connecting...
                      </>
                    ) : (
                      "Connect"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </Layout>
  )
}
