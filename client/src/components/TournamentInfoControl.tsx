import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface TournamentInfoControlProps {
  round: string;
  onRoundChange: (value: string) => void;
}

export default function TournamentInfoControl({
  round,
  onRoundChange,
}: TournamentInfoControlProps) {
  return (
    <Card data-testid="card-tournament-info">
      <CardHeader>
        <CardTitle>Tournament Info</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="round">Round / Match Info</Label>
          <Input
            id="round"
            value={round}
            onChange={(e) => onRoundChange(e.target.value)}
            placeholder="e.g., Winners Finals"
            data-testid="input-round"
          />
        </div>
      </CardContent>
    </Card>
  );
}
