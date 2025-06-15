"use client"

import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/language-provider"
import { Languages } from "lucide-react"

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage()

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setLanguage(language === "en" ? "ru" : "en")}
      className="h-9 w-9"
    >
      <Languages className="h-4 w-4" />
      <span className="sr-only">Переключить язык</span>
    </Button>
  )
}
