import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { Scoreboard } from "@shared/schema";

export default function ControlPanel() {
  const { toast } = useToast();
  const [formData, setFormData] = useState<Scoreboard>({
    Bracket: "",
    Schedule: "",
    comm1: "",
    comm1Pronoun: "",
    comm2: "",
    comm2Pronoun: "",
    dTimeText: "",
    game: "",
    p1Loser: "0",
    p1Name: "",
    p1Pronoun: "",
    p1Region: "",
    p1Score: "0",
    p1Team: "",
    p2Loser: "0",
    p2Name: "",
    p2Pronoun: "",
    p2Region: "",
    p2Score: "0",
    p2Team: "",
    round: "",
    showTimer: "0",
    timerLength: "3:00",
    timerStart: "0",
    timestamp: "",
  });

  const { data: scoreboard } = useQuery<Scoreboard>({
    queryKey: ["/api/scoreboard"],
  });

  useEffect(() => {
    if (scoreboard) {
      setFormData(scoreboard);
    }
  }, [scoreboard]);

  const saveMutation = useMutation({
    mutationFn: async (data: Scoreboard) => {
      const response = await fetch("/api/scoreboard", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) throw new Error("Failed to save");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/scoreboard"] });
      toast({ title: "Saved", description: "Scoreboard updated successfully" });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to save scoreboard", variant: "destructive" });
    },
  });

  const handleInputChange = (field: keyof Scoreboard, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleScoreChange = (player: "p1" | "p2", delta: number) => {
    const scoreField = player === "p1" ? "p1Score" : "p2Score";
    const currentScore = parseInt(formData[scoreField]) || 0;
    const newScore = Math.max(0, currentScore + delta);
    setFormData({ ...formData, [scoreField]: newScore.toString() });
  };

  const handleSave = () => {
    saveMutation.mutate(formData);
  };

  const handleSwap = () => {
    setFormData({
      ...formData,
      p1Name: formData.p2Name,
      p1Pronoun: formData.p2Pronoun,
      p1Region: formData.p2Region,
      p1Score: formData.p2Score,
      p1Team: formData.p2Team,
      p1Loser: formData.p2Loser,
      p2Name: formData.p1Name,
      p2Pronoun: formData.p1Pronoun,
      p2Region: formData.p1Region,
      p2Score: formData.p1Score,
      p2Team: formData.p1Team,
      p2Loser: formData.p1Loser,
    });
  };

  const handleReset = () => {
    setFormData({
      Bracket: "",
      Schedule: "",
      comm1: "",
      comm1Pronoun: "",
      comm2: "",
      comm2Pronoun: "",
      dTimeText: "",
      game: "",
      p1Loser: "0",
      p1Name: "",
      p1Pronoun: "",
      p1Region: "",
      p1Score: "0",
      p1Team: "",
      p2Loser: "0",
      p2Name: "",
      p2Pronoun: "",
      p2Region: "",
      p2Score: "0",
      p2Team: "",
      round: "",
      showTimer: "0",
      timerLength: "3:00",
      timerStart: "0",
      timestamp: Date.now().toString(),
    });
  };

  return (
    <div style={{ backgroundColor: "#1a1a1a", color: "#fff", minHeight: "100vh", padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <h1 style={{ marginBottom: "20px" }}>Tournament Scoreboard Control Panel</h1>
        
        <div style={{ marginBottom: "20px" }}>
          <button onClick={handleSave} style={{ padding: "10px 20px", marginRight: "10px", cursor: "pointer" }}>
            Save
          </button>
          <button onClick={handleSwap} style={{ padding: "10px 20px", marginRight: "10px", cursor: "pointer" }}>
            Swap Players
          </button>
          <button onClick={handleReset} style={{ padding: "10px 20px", cursor: "pointer" }}>
            Reset Players
          </button>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "30px" }}>
          {/* Player 1 */}
          <div style={{ backgroundColor: "#2a2a2a", padding: "20px", borderRadius: "5px" }}>
            <h2 style={{ marginBottom: "15px", borderBottom: "2px solid #4a90e2", paddingBottom: "10px" }}>Player 1</h2>
            <div style={{ marginBottom: "10px" }}>
              <label style={{ display: "block", marginBottom: "5px" }}>Name</label>
              <input 
                type="text" 
                value={formData.p1Name} 
                onChange={(e) => handleInputChange("p1Name", e.target.value)}
                style={{ width: "100%", padding: "8px", backgroundColor: "#333", color: "#fff", border: "1px solid #555", borderRadius: "3px" }}
              />
            </div>
            <div style={{ marginBottom: "10px" }}>
              <label style={{ display: "block", marginBottom: "5px" }}>Pronoun</label>
              <input 
                type="text" 
                value={formData.p1Pronoun} 
                onChange={(e) => handleInputChange("p1Pronoun", e.target.value)}
                style={{ width: "100%", padding: "8px", backgroundColor: "#333", color: "#fff", border: "1px solid #555", borderRadius: "3px" }}
              />
            </div>
            <div style={{ marginBottom: "10px" }}>
              <label style={{ display: "block", marginBottom: "5px" }}>Team</label>
              <input 
                type="text" 
                value={formData.p1Team} 
                onChange={(e) => handleInputChange("p1Team", e.target.value)}
                style={{ width: "100%", padding: "8px", backgroundColor: "#333", color: "#fff", border: "1px solid #555", borderRadius: "3px" }}
              />
            </div>
            <div style={{ marginBottom: "10px" }}>
              <label style={{ display: "block", marginBottom: "5px" }}>Region</label>
              <input 
                type="text" 
                value={formData.p1Region} 
                onChange={(e) => handleInputChange("p1Region", e.target.value)}
                style={{ width: "100%", padding: "8px", backgroundColor: "#333", color: "#fff", border: "1px solid #555", borderRadius: "3px" }}
              />
            </div>
            <div style={{ marginBottom: "10px" }}>
              <label style={{ display: "block", marginBottom: "5px" }}>Score</label>
              <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                <button onClick={() => handleScoreChange("p1", -1)} style={{ padding: "8px 15px", cursor: "pointer" }}>-</button>
                <input 
                  type="number" 
                  value={formData.p1Score} 
                  onChange={(e) => handleInputChange("p1Score", e.target.value)}
                  style={{ width: "80px", padding: "8px", backgroundColor: "#333", color: "#fff", border: "1px solid #555", borderRadius: "3px", textAlign: "center" }}
                />
                <button onClick={() => handleScoreChange("p1", 1)} style={{ padding: "8px 15px", cursor: "pointer" }}>+</button>
              </div>
            </div>
            <div>
              <label style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
                <input 
                  type="checkbox" 
                  checked={formData.p1Loser === "1"} 
                  onChange={(e) => handleInputChange("p1Loser", e.target.checked ? "1" : "0")}
                  style={{ marginRight: "8px" }}
                />
                Loser's Bracket
              </label>
            </div>
          </div>

          {/* Player 2 */}
          <div style={{ backgroundColor: "#2a2a2a", padding: "20px", borderRadius: "5px" }}>
            <h2 style={{ marginBottom: "15px", borderBottom: "2px solid #e24a4a", paddingBottom: "10px" }}>Player 2</h2>
            <div style={{ marginBottom: "10px" }}>
              <label style={{ display: "block", marginBottom: "5px" }}>Name</label>
              <input 
                type="text" 
                value={formData.p2Name} 
                onChange={(e) => handleInputChange("p2Name", e.target.value)}
                style={{ width: "100%", padding: "8px", backgroundColor: "#333", color: "#fff", border: "1px solid #555", borderRadius: "3px" }}
              />
            </div>
            <div style={{ marginBottom: "10px" }}>
              <label style={{ display: "block", marginBottom: "5px" }}>Pronoun</label>
              <input 
                type="text" 
                value={formData.p2Pronoun} 
                onChange={(e) => handleInputChange("p2Pronoun", e.target.value)}
                style={{ width: "100%", padding: "8px", backgroundColor: "#333", color: "#fff", border: "1px solid #555", borderRadius: "3px" }}
              />
            </div>
            <div style={{ marginBottom: "10px" }}>
              <label style={{ display: "block", marginBottom: "5px" }}>Team</label>
              <input 
                type="text" 
                value={formData.p2Team} 
                onChange={(e) => handleInputChange("p2Team", e.target.value)}
                style={{ width: "100%", padding: "8px", backgroundColor: "#333", color: "#fff", border: "1px solid #555", borderRadius: "3px" }}
              />
            </div>
            <div style={{ marginBottom: "10px" }}>
              <label style={{ display: "block", marginBottom: "5px" }}>Region</label>
              <input 
                type="text" 
                value={formData.p2Region} 
                onChange={(e) => handleInputChange("p2Region", e.target.value)}
                style={{ width: "100%", padding: "8px", backgroundColor: "#333", color: "#fff", border: "1px solid #555", borderRadius: "3px" }}
              />
            </div>
            <div style={{ marginBottom: "10px" }}>
              <label style={{ display: "block", marginBottom: "5px" }}>Score</label>
              <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                <button onClick={() => handleScoreChange("p2", -1)} style={{ padding: "8px 15px", cursor: "pointer" }}>-</button>
                <input 
                  type="number" 
                  value={formData.p2Score} 
                  onChange={(e) => handleInputChange("p2Score", e.target.value)}
                  style={{ width: "80px", padding: "8px", backgroundColor: "#333", color: "#fff", border: "1px solid #555", borderRadius: "3px", textAlign: "center" }}
                />
                <button onClick={() => handleScoreChange("p2", 1)} style={{ padding: "8px 15px", cursor: "pointer" }}>+</button>
              </div>
            </div>
            <div>
              <label style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
                <input 
                  type="checkbox" 
                  checked={formData.p2Loser === "1"} 
                  onChange={(e) => handleInputChange("p2Loser", e.target.checked ? "1" : "0")}
                  style={{ marginRight: "8px" }}
                />
                Loser's Bracket
              </label>
            </div>
          </div>
        </div>

        {/* Match Info */}
        <div style={{ backgroundColor: "#2a2a2a", padding: "20px", borderRadius: "5px", marginBottom: "20px" }}>
          <h2 style={{ marginBottom: "15px" }}>Match Information</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "15px" }}>
            <div>
              <label style={{ display: "block", marginBottom: "5px" }}>Round</label>
              <input 
                type="text" 
                value={formData.round} 
                onChange={(e) => handleInputChange("round", e.target.value)}
                style={{ width: "100%", padding: "8px", backgroundColor: "#333", color: "#fff", border: "1px solid #555", borderRadius: "3px" }}
              />
            </div>
            <div>
              <label style={{ display: "block", marginBottom: "5px" }}>Bracket</label>
              <input 
                type="text" 
                value={formData.Bracket} 
                onChange={(e) => handleInputChange("Bracket", e.target.value)}
                style={{ width: "100%", padding: "8px", backgroundColor: "#333", color: "#fff", border: "1px solid #555", borderRadius: "3px" }}
              />
            </div>
            <div>
              <label style={{ display: "block", marginBottom: "5px" }}>Game</label>
              <input 
                type="text" 
                value={formData.game} 
                onChange={(e) => handleInputChange("game", e.target.value)}
                style={{ width: "100%", padding: "8px", backgroundColor: "#333", color: "#fff", border: "1px solid #555", borderRadius: "3px" }}
              />
            </div>
          </div>
          <div style={{ marginTop: "15px" }}>
            <label style={{ display: "block", marginBottom: "5px" }}>Schedule</label>
            <input 
              type="text" 
              value={formData.Schedule} 
              onChange={(e) => handleInputChange("Schedule", e.target.value)}
              style={{ width: "100%", padding: "8px", backgroundColor: "#333", color: "#fff", border: "1px solid #555", borderRadius: "3px" }}
            />
          </div>
        </div>

        {/* Commentators */}
        <div style={{ backgroundColor: "#2a2a2a", padding: "20px", borderRadius: "5px", marginBottom: "20px" }}>
          <h2 style={{ marginBottom: "15px" }}>Commentators</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
            <div>
              <label style={{ display: "block", marginBottom: "5px" }}>Commentator 1</label>
              <input 
                type="text" 
                value={formData.comm1} 
                onChange={(e) => handleInputChange("comm1", e.target.value)}
                style={{ width: "100%", padding: "8px", backgroundColor: "#333", color: "#fff", border: "1px solid #555", borderRadius: "3px" }}
              />
              <label style={{ display: "block", marginTop: "10px", marginBottom: "5px" }}>Pronoun</label>
              <input 
                type="text" 
                value={formData.comm1Pronoun} 
                onChange={(e) => handleInputChange("comm1Pronoun", e.target.value)}
                style={{ width: "100%", padding: "8px", backgroundColor: "#333", color: "#fff", border: "1px solid #555", borderRadius: "3px" }}
              />
            </div>
            <div>
              <label style={{ display: "block", marginBottom: "5px" }}>Commentator 2</label>
              <input 
                type="text" 
                value={formData.comm2} 
                onChange={(e) => handleInputChange("comm2", e.target.value)}
                style={{ width: "100%", padding: "8px", backgroundColor: "#333", color: "#fff", border: "1px solid #555", borderRadius: "3px" }}
              />
              <label style={{ display: "block", marginTop: "10px", marginBottom: "5px" }}>Pronoun</label>
              <input 
                type="text" 
                value={formData.comm2Pronoun} 
                onChange={(e) => handleInputChange("comm2Pronoun", e.target.value)}
                style={{ width: "100%", padding: "8px", backgroundColor: "#333", color: "#fff", border: "1px solid #555", borderRadius: "3px" }}
              />
            </div>
          </div>
        </div>

        {/* Timer & Downtime */}
        <div style={{ backgroundColor: "#2a2a2a", padding: "20px", borderRadius: "5px", marginBottom: "20px" }}>
          <h2 style={{ marginBottom: "15px" }}>Timer & Downtime</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "15px", marginBottom: "15px" }}>
            <div>
              <label style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
                <input 
                  type="checkbox" 
                  checked={formData.showTimer === "1"} 
                  onChange={(e) => handleInputChange("showTimer", e.target.checked ? "1" : "0")}
                  style={{ marginRight: "8px" }}
                />
                Show Timer
              </label>
            </div>
            <div>
              <label style={{ display: "block", marginBottom: "5px" }}>Timer Length</label>
              <input 
                type="text" 
                value={formData.timerLength} 
                onChange={(e) => handleInputChange("timerLength", e.target.value)}
                style={{ width: "100%", padding: "8px", backgroundColor: "#333", color: "#fff", border: "1px solid #555", borderRadius: "3px" }}
              />
            </div>
            <div>
              <label style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
                <input 
                  type="checkbox" 
                  checked={formData.timerStart === "1"} 
                  onChange={(e) => handleInputChange("timerStart", e.target.checked ? "1" : "0")}
                  style={{ marginRight: "8px" }}
                />
                Timer Started
              </label>
            </div>
          </div>
          <div>
            <label style={{ display: "block", marginBottom: "5px" }}>Downtime Text</label>
            <input 
              type="text" 
              value={formData.dTimeText} 
              onChange={(e) => handleInputChange("dTimeText", e.target.value)}
              style={{ width: "100%", padding: "8px", backgroundColor: "#333", color: "#fff", border: "1px solid #555", borderRadius: "3px" }}
            />
          </div>
        </div>

        {/* Import Section */}
        <div style={{ backgroundColor: "#2a2a2a", padding: "20px", borderRadius: "5px" }}>
          <h2 style={{ marginBottom: "15px" }}>Import Data</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
            <div>
              <label style={{ display: "block", marginBottom: "5px" }}>Upload XML Player Database</label>
              <input 
                type="file" 
                accept=".xml"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const formData = new FormData();
                    formData.append("file", file);
                    fetch("/api/import-xml", {
                      method: "POST",
                      body: formData,
                    })
                      .then(res => res.json())
                      .then(data => {
                        toast({ title: "XML Uploaded", description: `Parsed ${file.name}` });
                        console.log("XML data:", data);
                      })
                      .catch(() => {
                        toast({ title: "Error", description: "Failed to parse XML", variant: "destructive" });
                      });
                  }
                }}
                style={{ width: "100%", padding: "8px", backgroundColor: "#333", color: "#fff", border: "1px solid #555", borderRadius: "3px" }}
              />
            </div>
            <div>
              <label style={{ display: "block", marginBottom: "5px" }}>Import from Start.gg URL</label>
              <div style={{ display: "flex", gap: "10px" }}>
                <input 
                  type="text" 
                  placeholder="https://start.gg/..."
                  id="startgg-url"
                  style={{ flex: 1, padding: "8px", backgroundColor: "#333", color: "#fff", border: "1px solid #555", borderRadius: "3px" }}
                />
                <button 
                  onClick={() => {
                    const input = document.getElementById("startgg-url") as HTMLInputElement;
                    const url = input?.value;
                    if (url) {
                      fetch("/api/import-startgg", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ url }),
                      })
                        .then(res => res.json())
                        .then(data => {
                          toast({ title: "Start.gg", description: data.message || "Import successful" });
                        })
                        .catch(() => {
                          toast({ title: "Error", description: "Failed to import from start.gg", variant: "destructive" });
                        });
                    }
                  }}
                  style={{ padding: "8px 20px", cursor: "pointer" }}
                >
                  Import
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
