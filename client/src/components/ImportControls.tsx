import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Download, Upload, FileText } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface ImportControlsProps {
  onStartGGImport?: (player1: string, player2: string) => void;
  onXMLImport?: (data: any) => void;
}

export default function ImportControls({
  onStartGGImport,
  onXMLImport,
}: ImportControlsProps) {
  const [startGGUrl, setStartGGUrl] = useState("");
  const { toast } = useToast();

  const handleStartGGImport = () => {
    if (!startGGUrl) {
      toast({
        title: "Error",
        description: "Please enter a start.gg URL",
        variant: "destructive",
      });
      return;
    }
    
    // todo: remove mock functionality
    toast({
      title: "Import Successful",
      description: "Player names imported from start.gg",
    });
    
    onStartGGImport?.("TSM | Leffen", "C9 | Mang0");
    console.log("Importing from start.gg:", startGGUrl);
  };

  const handleXMLUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // todo: remove mock functionality
    toast({
      title: "XML Loaded",
      description: `Loaded ${file.name} successfully`,
    });
    
    console.log("XML file uploaded:", file.name);
    onXMLImport?.({ players: ["Player1", "Player2"] });
  };

  return (
    <Card data-testid="card-import-controls">
      <CardHeader>
        <CardTitle>Import Data</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="startgg-url">Start.gg Match URL</Label>
          <div className="flex gap-2">
            <Input
              id="startgg-url"
              value={startGGUrl}
              onChange={(e) => setStartGGUrl(e.target.value)}
              placeholder="https://start.gg/tournament/..."
              data-testid="input-startgg-url"
            />
            <Button
              onClick={handleStartGGImport}
              data-testid="button-import-startgg"
            >
              <Download className="h-4 w-4 mr-2" />
              Import
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="xml-upload">Upload XML Player Data</Label>
          <div className="flex items-center gap-2">
            <Input
              id="xml-upload"
              type="file"
              accept=".xml"
              onChange={handleXMLUpload}
              className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium"
              data-testid="input-xml-upload"
            />
            <FileText className="h-5 w-5 text-muted-foreground" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
