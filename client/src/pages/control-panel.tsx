import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Save, RefreshCw, ArrowLeftRight } from "lucide-react";
import PlayerControl from "@/components/PlayerControl";
import TournamentInfoControl from "@/components/TournamentInfoControl";
import ScrollingTextControl from "@/components/ScrollingTextControl";
import ImportControls from "@/components/ImportControls";
import { useToast } from "@/hooks/use-toast";
import type { Scoreboard } from "@shared/schema";

export default function ControlPanel() {
  // todo: remove mock functionality
  const [scoreboard, setScoreboard] = useState<Scoreboard>({
    player1: { prefix: "TSM", name: "Leffen", score: 0 },
    player2: { prefix: "C9", name: "Mang0", score: 0 },
    tournamentRound: "Winners Finals",
    scrollingText: "Welcome to Genesis 10! Follow us on Twitter @GenesisSmash for updates",
    scrollingEnabled: true,
  });

  const { toast } = useToast();

  const handleSave = async () => {
    console.log("Saving scoreboard:", scoreboard);
    // todo: remove mock functionality
    toast({
      title: "Saved",
      description: "Scoreboard data saved to JSON file",
    });
  };

  const handleReset = () => {
    setScoreboard({
      player1: { prefix: "", name: "", score: 0 },
      player2: { prefix: "", name: "", score: 0 },
      tournamentRound: "",
      scrollingText: "",
      scrollingEnabled: false,
    });
    toast({
      title: "Reset",
      description: "All fields cleared",
    });
  };

  const handleSwap = () => {
    setScoreboard({
      ...scoreboard,
      player1: scoreboard.player2,
      player2: scoreboard.player1,
    });
    toast({
      title: "Swapped",
      description: "Player positions swapped",
    });
  };

  const handleStartGGImport = (p1: string, p2: string) => {
    const [p1Prefix, p1Name] = p1.split(" | ");
    const [p2Prefix, p2Name] = p2.split(" | ");
    
    setScoreboard({
      ...scoreboard,
      player1: { ...scoreboard.player1, prefix: p1Prefix || "", name: p1Name || p1 },
      player2: { ...scoreboard.player2, prefix: p2Prefix || "", name: p2Name || p2 },
    });
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-display font-bold text-foreground">
              Scoreboard Control Panel
            </h1>
            <p className="text-muted-foreground">
              Manage tournament scoreboard for OBS overlay
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={handleSwap}
              data-testid="button-swap-players"
            >
              <ArrowLeftRight className="h-4 w-4 mr-2" />
              Swap Players
            </Button>
            <Button
              variant="outline"
              onClick={handleReset}
              data-testid="button-reset-all"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Reset All
            </Button>
            <Button onClick={handleSave} data-testid="button-save">
              <Save className="h-4 w-4 mr-2" />
              Save to JSON
            </Button>
          </div>
        </div>

        {/* Player Controls */}
        <div className="grid gap-6 md:grid-cols-2">
          <PlayerControl
            playerNumber={1}
            prefix={scoreboard.player1.prefix}
            name={scoreboard.player1.name}
            score={scoreboard.player1.score}
            onPrefixChange={(value) =>
              setScoreboard({
                ...scoreboard,
                player1: { ...scoreboard.player1, prefix: value },
              })
            }
            onNameChange={(value) =>
              setScoreboard({
                ...scoreboard,
                player1: { ...scoreboard.player1, name: value },
              })
            }
            onScoreChange={(value) =>
              setScoreboard({
                ...scoreboard,
                player1: { ...scoreboard.player1, score: value },
              })
            }
            onReset={() =>
              setScoreboard({
                ...scoreboard,
                player1: { prefix: "", name: "", score: 0 },
              })
            }
          />

          <PlayerControl
            playerNumber={2}
            prefix={scoreboard.player2.prefix}
            name={scoreboard.player2.name}
            score={scoreboard.player2.score}
            onPrefixChange={(value) =>
              setScoreboard({
                ...scoreboard,
                player2: { ...scoreboard.player2, prefix: value },
              })
            }
            onNameChange={(value) =>
              setScoreboard({
                ...scoreboard,
                player2: { ...scoreboard.player2, name: value },
              })
            }
            onScoreChange={(value) =>
              setScoreboard({
                ...scoreboard,
                player2: { ...scoreboard.player2, score: value },
              })
            }
            onReset={() =>
              setScoreboard({
                ...scoreboard,
                player2: { prefix: "", name: "", score: 0 },
              })
            }
          />
        </div>

        {/* Tournament Info and Import */}
        <div className="grid gap-6 md:grid-cols-2">
          <TournamentInfoControl
            round={scoreboard.tournamentRound}
            onRoundChange={(value) =>
              setScoreboard({ ...scoreboard, tournamentRound: value })
            }
          />

          <ImportControls
            onStartGGImport={handleStartGGImport}
            onXMLImport={(data) => console.log("XML imported:", data)}
          />
        </div>

        {/* Scrolling Text */}
        <ScrollingTextControl
          text={scoreboard.scrollingText}
          enabled={scoreboard.scrollingEnabled}
          onTextChange={(value) =>
            setScoreboard({ ...scoreboard, scrollingText: value })
          }
          onEnabledChange={(value) =>
            setScoreboard({ ...scoreboard, scrollingEnabled: value })
          }
        />

        {/* Help Text */}
        <div className="rounded-md bg-muted/50 p-4 text-sm text-muted-foreground">
          <p className="font-medium mb-2">OBS Integration Instructions:</p>
          <ol className="list-decimal list-inside space-y-1">
            <li>Add a Browser Source in OBS</li>
            <li>Set the URL to: <code className="bg-card px-1 rounded">http://localhost:5000/overlay</code></li>
            <li>Set width to 1920 and height to 1080</li>
            <li>Enable "Shutdown source when not visible" and "Refresh browser when scene becomes active"</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
