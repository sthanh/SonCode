import { Badge } from "@/components/ui/badge"

interface TrialPhaseIndicatorProps {
  currentPhase: number
  status: string
}

export default function TrialPhaseIndicator({ currentPhase, status }: TrialPhaseIndicatorProps) {
  // Determine which phases are complete, current, or future
  const phases = [
    { number: 0, name: "Pre-Clinical" },
    { number: 1, name: "Phase 1" },
    { number: 2, name: "Phase 2" },
    { number: 3, name: "Phase 3" },
    { number: 4, name: "Phase 4" },
  ]

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-medium">Trial Progress</h3>
        <Badge variant={status === "Recruiting" ? "default" : "secondary"}>{status}</Badge>
      </div>

      <div className="relative">
        {/* Progress bar */}
        <div className="h-2 bg-muted rounded-full mb-6">
          <div
            className="h-2 bg-primary rounded-full"
            style={{ width: `${Math.min(100, (currentPhase / 4) * 100)}%` }}
          />
        </div>

        {/* Phase markers */}
        <div className="flex justify-between">
          {phases.map((phase) => (
            <div key={phase.number} className="relative flex flex-col items-center">
              {/* Marker dot */}
              <div
                className={`w-4 h-4 rounded-full absolute -top-[22px] -ml-2 ${
                  phase.number < currentPhase
                    ? "bg-primary"
                    : phase.number === currentPhase
                      ? "bg-primary border-4 border-primary/20"
                      : "bg-muted-foreground/30"
                }`}
              />

              {/* Phase label */}
              <span
                className={`text-xs mt-1 ${
                  phase.number === currentPhase ? "font-bold text-primary" : "text-muted-foreground"
                }`}
              >
                {phase.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

