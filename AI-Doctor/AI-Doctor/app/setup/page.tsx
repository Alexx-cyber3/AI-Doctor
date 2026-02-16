"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Stethoscope, Key, ShieldCheck, AlertCircle } from "lucide-react"

export default function SetupPage() {
  const [apiKey, setApiKey] = useState("")
  const [isSaved, setIsSaved] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const savedKey = localStorage.getItem("OPENAI_API_KEY")
    if (savedKey) {
      setApiKey(savedKey)
    }
  }, [])

  const handleSave = () => {
    if (apiKey.trim()) {
      localStorage.setItem("OPENAI_API_KEY", apiKey.trim())
      setIsSaved(true)
      setTimeout(() => {
        router.push("/")
      }, 1000)
    }
  }

  const handleSkip = () => {
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl border-t-4 border-t-blue-600">
        <CardHeader className="text-center">
          <div className="mx-auto bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
            <Stethoscope className="h-8 w-8 text-blue-600" />
          </div>
          <CardTitle className="text-2xl font-bold">AI Doctor Setup</CardTitle>
          <CardDescription>
            Configure your AI assistant to get started
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-2">
              <Key className="h-4 w-4" />
              OpenAI API Key
            </label>
            <Input
              type="password"
              placeholder="sk-..."
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="font-mono"
            />
            <p className="text-xs text-gray-500 flex items-center gap-1">
              <ShieldCheck className="h-3 w-3" />
              Your key is stored locally in your browser.
            </p>
          </div>

          <div className="bg-blue-50 p-3 rounded-md border border-blue-100">
            <p className="text-xs text-blue-700 leading-relaxed">
              <strong>Tip:</strong> You can get an API key from the OpenAI Dashboard. 
              The app will use local analysis if you skip this, but AI features will be limited.
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <Button 
            className="w-full bg-blue-600 hover:bg-blue-700" 
            onClick={handleSave}
            disabled={!apiKey.trim() || isSaved}
          >
            {isSaved ? "Saved! Redirecting..." : "Save and Continue"}
          </Button>
          <Button 
            variant="ghost" 
            className="w-full text-gray-500"
            onClick={handleSkip}
          >
            Skip for now
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
