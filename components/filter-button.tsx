import { Button } from "@/components/ui/button"
import { Filter } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function FilterButton() {
  const { toast } = useToast()

  return (
    <Button 
      variant="outline" 
      onClick={() => toast({ title: "Фильтры", description: "Открытие панели фильтров" })}
      className="flex items-center"
    >
      <Filter className="h-4 w-4 md:mr-2" />
      <span className="hidden md:inline">Фильтры</span>
    </Button>
  )
} 