# Fighting Game Scoreboard Design Guidelines

## Design Approach: Gaming Utility System

**Framework:** Esports/Streaming utility design with Material Design principles for data management
**Justification:** Tournament management tools require high information density, real-time clarity, and gaming aesthetic appeal. Drawing inspiration from StreamElements, Nightbot dashboards, and professional esports overlays.

---

## Core Design Elements

### A. Color Palette

**Control Panel (Admin Interface):**
- Background: 220 15% 10% (Deep slate)
- Surface: 220 12% 15% (Elevated panels)
- Primary: 280 85% 60% (Vibrant purple - esports standard)
- Accent: 175 70% 50% (Cyan for active states)
- Success: 142 70% 45% (Green for confirmations)
- Text Primary: 0 0% 95%
- Text Secondary: 0 0% 70%

**OBS Overlay (Viewer-Facing):**
- Background: Transparent/Chroma-key friendly
- Scoreboard Base: 220 20% 8% with 90% opacity
- Player 1 Side: 210 100% 55% (Blue accent)
- Player 2 Side: 0 100% 55% (Red accent)
- Text: 0 0% 100% with subtle shadow for visibility

### B. Typography

**Fonts:**
- Primary: 'Inter' via Google Fonts (admin interface, body text)
- Display: 'Rajdhani' via Google Fonts (scoreboard numbers, tournament info)
- Monospace: 'JetBrains Mono' via Google Fonts (JSON/XML display)

**Scale:**
- Control Panel Headers: font-semibold text-xl (20px)
- Form Labels: font-medium text-sm (14px)
- Input Fields: text-base (16px)
- Overlay Player Names: font-bold text-4xl to text-6xl (tournament overlay)
- Overlay Scores: font-black text-7xl to text-9xl

### C. Layout System

**Spacing Primitives:** Tailwind units of 2, 4, 6, and 8 for consistent rhythm
- Micro spacing: p-2, gap-2
- Standard spacing: p-4, m-4, gap-4
- Section spacing: p-6, py-6
- Major spacing: p-8, py-8

**Grid Structure:**
- Control Panel: Two-column layout (md:grid-cols-2) - left for player 1, right for player 2
- Center column for tournament info and import controls
- Bottom section for scrolling text and actions
- OBS Overlay: Horizontal scoreboard with centered tournament info

### D. Component Library

**Control Panel Components:**

1. **Player Control Cards**
   - Dark surface background (220 12% 15%)
   - Border accent based on player (blue/red tint)
   - Input groups: Prefix + Name + Score in vertical stack
   - Quick increment/decrement buttons for scores (+ / - icons)
   - Reset individual player button

2. **Tournament Info Panel**
   - Centered card with round selector (dropdown or number input)
   - start.gg import section with URL input and fetch button
   - Status indicators (loading, success, error states)
   - Last imported match display

3. **XML/JSON Manager**
   - File upload dropzone with drag-and-drop
   - Recent files list with quick-select buttons
   - Auto-suggestion dropdown for player names from XML
   - Export current state to JSON button

4. **Scrolling Text Control**
   - Textarea with character counter
   - Speed control slider
   - Preview toggle switch
   - Enable/disable scroll toggle

5. **Action Bar**
   - Primary: Save/Update JSON (purple button)
   - Secondary: Reset All, Swap Players, Load Previous Match
   - Visual feedback on all actions

**OBS Overlay Components:**

1. **Scoreboard Display**
   - Horizontal layout with player sections flanking center
   - Player 1 (left): Blue gradient accent, name + prefix + score
   - Player 2 (right): Red gradient accent, name + prefix + score
   - Center: Tournament round info, minimal and clean
   - Geometric dividers between sections

2. **Scrolling Info Banner**
   - Bottom third placement, semi-transparent background
   - Smooth marquee animation
   - High contrast text for readability

### E. Interaction Patterns

**Control Panel:**
- Real-time input updates (debounced for performance)
- Clear hover states on all interactive elements
- Keyboard shortcuts for common actions (S for save, R for reset, Space for swap)
- Visual confirmation on successful saves/imports
- Error states with helpful messages

**OBS Overlay:**
- Smooth number transitions on score updates (count-up animation)
- Fade transitions for name changes
- Highlight flash effect on score changes (brief color pulse)
- No interactive elements (read-only display)

### F. Responsive Behavior

**Control Panel:**
- Desktop-first design (minimum 1024px wide recommended)
- Stacks to single column below md breakpoint
- Maintains functionality on tablets in landscape

**OBS Overlay:**
- Fixed dimensions matching common OBS canvas sizes
- 1920x1080 default with scalable option
- Maintains aspect ratio and readability at different scales

---

## Images

**Control Panel:** No hero image needed - utility dashboard focused on controls

**OBS Overlay:** Optional tournament logo/sponsor space in top corners or center header (placeholder for user customization)

---

## Key Design Principles

1. **Clarity First:** Every element serves tournament management - no decorative clutter
2. **Fast Operations:** Quick access to frequently used actions (score updates, player swaps)
3. **Visual Hierarchy:** Clear distinction between control (admin) and display (overlay) modes
4. **Gaming Aesthetic:** Dark theme with vibrant accents maintains esports professionalism
5. **Reliability:** Strong visual feedback ensures operators know system state during live events