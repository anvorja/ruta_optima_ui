import { GripVertical, MapPin, Clock, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface Stop {
    id: number
    address: string
    customer: string
    timeWindow: string
    priority: "urgente" | "alta" | "normal"
}

interface StopsListProps {
    stops: Stop[]
    onRemove?: (id: number) => void
}

const priorityConfig = {
    urgente: { label: "Urgente", className: "bg-destructive/20 text-destructive border-destructive/30" },
    alta: { label: "Alta", className: "bg-warning/20 text-warning border-warning/30" },
    normal: { label: "Normal", className: "bg-muted text-muted-foreground" },
}

export function StopsList({ stops, onRemove }: StopsListProps) {
    return (
        <div className="space-y-2">
            {stops.map((stop, index) => (
                <div
                    key={stop.id}
                    className="group flex items-center gap-3 rounded-lg border border-border bg-card p-3 transition-all hover:border-primary/50 hover:shadow-md"
                >
                    {/* Drag Handle */}
                    <div className="cursor-grab active:cursor-grabbing">
                        <GripVertical className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-primary" />
                    </div>

                    {/* Sequence Number */}
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/70 text-xs font-bold text-primary-foreground shadow-sm">
                        {index + 1}
                    </div>

                    {/* Stop Info */}
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
              <span className="font-medium text-foreground truncate">
                {stop.customer}
              </span>
                            <Badge
                                variant="outline"
                                className={`text-[10px] px-1.5 ${priorityConfig[stop.priority].className}`}
                            >
                                {priorityConfig[stop.priority].label}
                            </Badge>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <MapPin className="h-3 w-3 shrink-0" />
                <span className="truncate">{stop.address}</span>
              </span>
                            <span className="flex items-center gap-1">
                <Clock className="h-3 w-3 shrink-0" />
                                {stop.timeWindow}
              </span>
                        </div>
                    </div>

                    {/* Delete Button */}
                    <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive"
                        onClick={() => onRemove?.(stop.id)}
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
            ))}
        </div>
    )
}