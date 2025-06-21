"use client"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useRef } from "react"
import * as React from "react"

import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { setTheme, theme } = useTheme()
  const [animating, setAnimating] = React.useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleClick = () => {
    setAnimating(true)
    setTheme(theme === "light" ? "dark" : "light")
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => setAnimating(false), 700)
  }

  return (
    <Button variant="ghost" size="icon" onClick={handleClick} className="relative">
      <Sun
        className={
          "h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" +
          (animating && theme === "light" ? " animate-theme-sun-spin" : "")
        }
      />
      <Moon
        className={
          "absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" +
          (animating && theme === "dark" ? " animate-theme-moon-swing" : "")
        }
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
