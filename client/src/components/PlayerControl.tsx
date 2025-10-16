import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, Minus, RotateCcw } from "lucide-react";

interface PlayerControlProps {
  playerNumber: 1 | 2;
  prefix: string;
  name: string;
  score: number;
  onPrefixChange: (value: string) => void;
  onNameChange: (value: string) => void;
  onScoreChange: (value: number) => void;
  onReset: () => void;
}

export default function PlayerControl({
  playerNumber,
  prefix,
  name,
  score,
  onPrefixChange,
  onNameChange,
  onScoreChange,
  onReset,
}: PlayerControlProps) {
  const accentColor = playerNumber === 1 ? "border-l-chart-1" : "border-l-chart-2";
  
  return (
    <Card className={`border-l-4 ${accentColor}`} data-testid={`card-player-${playerNumber}`}>
      <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
        <CardTitle className="text-xl">Player {playerNumber}</CardTitle>
        <Button
          variant="ghost"
          size="icon"
          onClick={onReset}
          data-testid={`button-reset-player-${playerNumber}`}
        >
          <RotateCcw className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor={`prefix-${playerNumber}`}>Prefix/Team</Label>
          <Input
            id={`prefix-${playerNumber}`}
            value={prefix}
            onChange={(e) => onPrefixChange(e.target.value)}
            placeholder="e.g., TSM"
            data-testid={`input-prefix-${playerNumber}`}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor={`name-${playerNumber}`}>Player Name</Label>
          <Input
            id={`name-${playerNumber}`}
            value={name}
            onChange={(e) => onNameChange(e.target.value)}
            placeholder="e.g., Hungrybox"
            data-testid={`input-name-${playerNumber}`}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor={`score-${playerNumber}`}>Score</Label>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => onScoreChange(Math.max(0, score - 1))}
              data-testid={`button-decrease-score-${playerNumber}`}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <Input
              id={`score-${playerNumber}`}
              type="number"
              min="0"
              value={score}
              onChange={(e) => onScoreChange(Math.max(0, parseInt(e.target.value) || 0))}
              className="text-center text-2xl font-display font-bold"
              data-testid={`input-score-${playerNumber}`}
            />
            <Button
              variant="outline"
              size="icon"
              onClick={() => onScoreChange(score + 1)}
              data-testid={`button-increase-score-${playerNumber}`}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
