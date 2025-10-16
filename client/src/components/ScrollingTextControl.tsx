import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface ScrollingTextControlProps {
  text: string;
  enabled: boolean;
  onTextChange: (value: string) => void;
  onEnabledChange: (value: boolean) => void;
}

export default function ScrollingTextControl({
  text,
  enabled,
  onTextChange,
  onEnabledChange,
}: ScrollingTextControlProps) {
  return (
    <Card data-testid="card-scrolling-text">
      <CardHeader>
        <CardTitle>Scrolling Information Banner</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="scroll-enabled">Enable Scrolling Text</Label>
          <Switch
            id="scroll-enabled"
            checked={enabled}
            onCheckedChange={onEnabledChange}
            data-testid="switch-scroll-enabled"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="scroll-text">Banner Text</Label>
          <Textarea
            id="scroll-text"
            value={text}
            onChange={(e) => onTextChange(e.target.value)}
            placeholder="Enter information to scroll across the bottom of the overlay..."
            rows={3}
            disabled={!enabled}
            data-testid="textarea-scroll-text"
          />
          <p className="text-sm text-muted-foreground">
            {text.length} characters
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
