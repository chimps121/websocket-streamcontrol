# Tournament Scoreboard Control Panel

A barebones web-based control panel for managing fighting game tournament scoreboards. Updates a `scoreboard.json` file that your overlay reads.

## Features

- Manage Player 1 and Player 2 information (name, pronoun, team, region, score, loser bracket status)
- Track match information (round, bracket, game, schedule)
- Manage commentator information (names and pronouns)
- Timer controls (show/hide, length, start/stop)
- Downtime text field
- Quick actions: Save, Swap Players, Reset All
- Score increment/decrement buttons
- XML upload for player databases
- Start.gg import (requires API key - see below)

## Setup (check this!)

1. Clone or download this project
2. Install dependencies: `npm install`
3. Run the server: `npm run dev`
4. Open http://localhost:5000 in your browser
5. Your overlay should read from `scoreboard.json` in the project root

## JSON Format

The control panel writes to `scoreboard.json` with this structure:

```json
{
  "Bracket": "string",
  "Schedule": "string",
  "comm1": "string",
  "comm1Pronoun": "string",
  "comm2": "string",
  "comm2Pronoun": "string",
  "dTimeText": "string",
  "game": "string",
  "p1Loser": "0 or 1",
  "p1Name": "string",
  "p1Pronoun": "string",
  "p1Region": "string",
  "p1Score": "string (number)",
  "p1Team": "string",
  "p2Loser": "0 or 1",
  "p2Name": "string",
  "p2Pronoun": "string",
  "p2Region": "string",
  "p2Score": "string (number)",
  "p2Team": "string",
  "round": "string",
  "showTimer": "0 or 1",
  "timerLength": "string (MM:SS format)",
  "timerStart": "0 or 1",
  "timestamp": "string (unix timestamp)"
}
```

## Start.gg Integration

To enable start.gg imports, you need an API key:

1. Get an API key from https://developer.start.gg/
2. Add `STARTGG_API_KEY` to your environment variables or `.env` file
3. Update `server/routes.ts` to implement the start.gg GraphQL queries

The current implementation is a placeholder. You'll need to:
- Make GraphQL requests to start.gg API
- Parse the match/player data
- Map it to the scoreboard fields

## Customization

The control panel uses inline styles with a dark background (#1a1a1a). You can easily customize colors by:

1. Editing the inline `style` attributes in `client/src/pages/control-panel.tsx`
2. Or creating a separate CSS file and importing it

Colors to customize:
- Background: `#1a1a1a`
- Sections: `#2a2a2a`
- Inputs: `#333`
- Borders: `#555`
- Player 1 accent: `#4a90e2` (blue)
- Player 2 accent: `#e24a4a` (red)

## Notes

- The timestamp is automatically updated when you save
- Loser bracket checkboxes toggle between "0" and "1"
- Timer controls toggle between "0" and "1"
- All scores are stored as strings to match your existing JSON format
- The JSON file is created automatically if it doesn't exist
