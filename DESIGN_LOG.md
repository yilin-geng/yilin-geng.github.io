# Design & Development Log
*Yilin Geng Portfolio Website*

## Current State (Initial Session - July 25, 2025)

### Visual Design Philosophy
- **Andy Warhol Pop Art Aesthetic**: Bold, high-contrast colors with electric pink (#ff1493), bright yellow (#ffff00), electric blue (#00bfff), and lime green (#00ff00)
- **Typography**: Bold Helvetica Neue with heavy font weights (800-900), uppercase text, and distinctive letter spacing
- **Layout**: Geometric, grid-based structure with intentional rotation transforms and dramatic box shadows
- **Interactive Elements**: Transform-based hover effects, animated gradients, and pop art-inspired color transitions

### Current Structure
```
├── index.html          # Hero with portrait grid, quick links
├── about.html          # Personal story and philosophy
├── portfolio.html      # Research, papers, work, startup content
├── photography.html    # Film photography showcase
├── projects.html       # Interactive games and experiments
├── contact.html        # Multi-channel contact methods
├── style.css          # Unified Warhol-inspired stylesheet
├── script.js          # Interactive functionality
└── content/           # JSON-based content management
    ├── portfolio/     # Professional work data
    ├── projects/      # Fun projects data  
    ├── albums/        # Photography collections
    └── about.md       # About page content
```

### Key Design Elements

#### Navigation
- Fixed black header with electric pink border
- Yellow brand text with pink text shadow
- Hover effects with blue background and scale transforms

#### Hero Section
- Black background with animated Warhol gradient
- Massive title with layered color shadows (pink/blue/yellow)
- Rotating subtitle badges in signature colors
- 2x2 portrait grid with "YG" initials in pop art style

#### Content Sections
- White backgrounds with thick black borders
- Alternating directional box shadows in signature colors
- Rotating card transforms (-1deg to 2deg variations)
- Bold section titles with gradient underlines

#### Color System
```css
--electric-pink: #ff1493    # Primary brand color
--bright-yellow: #ffff00    # Secondary accent
--electric-blue: #00bfff    # Cool accent
--lime-green: #00ff00       # Fresh accent
--hot-orange: #ff4500       # Energy accent
--purple-pop: #8a2be2       # Creative accent
```

### Technical Approach
- Semantic HTML5 structure
- CSS Grid and Flexbox layouts
- Transform-based animations
- Content-based architecture with JSON data
- Mobile-responsive design with collapsing navigation

### Current Pages Status
- ✅ **Home**: Complete hero and navigation
- ✅ **About**: Warhol grid philosophy sections
- ✅ **Portfolio**: Tabbed content with color-coded categories
- ✅ **Photography**: Philosophy cards and album showcases
- ✅ **Projects**: Interactive project cards with preview states
- ✅ **Contact**: Multi-method contact grid

---

## Session History

### Session 1 - July 25, 2025
- **Established**: Core Warhol pop art visual identity
- **Created**: Complete responsive website structure  
- **Implemented**: JSON-based content management system
- **Status**: Foundation complete, design system established

### Session 2 - July 25, 2025
- **Redesigned About Page**: Transformed from home page hero to comprehensive personal showcase
- **Interactive Binary Matrix**: Replaced YG portrait grid with clickable 1s/0s grid
  - 8x12 matrix with pink/yellow pop art styling
  - Click interaction with ripple effects
  - Auto-animation every 2 seconds
  - Connects to "Yilin sounds like 1-0" concept
- **Updated Personal Tags**: Changed to FOUNDER · COLLABORATOR · OPTIMIST · TINKERER
- **Current Activities Section**: LibrAI startup, Melbourne AI Club presidency, latest research
- **Fun Facts Integration**: Binary connection, photography, tinkering with preview linking
- **Contact Preview**: Quick contact methods with full page link
- **New Home Page**: Clean welcome landing with pop art grid and navigation cards
- **Status**: About page redesign complete, navigation structure updated

### Session 3 - July 25, 2025
- **Website Structure Streamlined**: Removed redundant home page, About serves as landing (index.html)
- **Warhol-Inspired Binary Matrix Enhancement**:
  - Improved to 6x10 grid (60 cells) with better proportions
  - 4 color-blocked sections mimicking Warhol's repetition technique
  - Silkscreen-style borders, monospace font, enhanced hover effects
  - Color variants: Pink/Yellow, Blue/Green, Purple/Cyan, Orange/Neon
- **Content Research & Accuracy**:
  - **LibrAI**: Updated with focus on AI-powered library management solutions
  - **NextGen25**: Real hackathon data from ainextgen.com.au (Aug 23-30, AU$9K+ prizes)
  - **Chain of Command Research**: Concrete "Control Illusion" paper details
  - Removed generic "latest research" language for specific LLM instruction hierarchy focus
- **Chinese Name Correction**: Fixed to 一麟 (Yi Lin) connecting to binary theme
- **Simplified Fun Facts**: Streamlined to single binary connection fact
- **Future-Proofing**: Added HTML comments for easy research updates
- **Navigation Clean-up**: 5-section structure (About/Landing → Portfolio → Photography → Fun Stuff → Contact)
- **Status**: Streamlined website complete with accurate, research-backed content

---

## Design Principles to Maintain

1. **Bold Visual Impact**: Every element should have strong visual presence
2. **Consistent Color Harmony**: Stick to the established pop art palette
3. **Playful Interactions**: Transform-based hover effects and rotations
4. **Typography Hierarchy**: Heavy weights, uppercase, generous letter spacing
5. **Geometric Structure**: Grid-based layouts with intentional asymmetry
6. **Content-First**: JSON-driven content for easy updates

---

## Future Considerations
- Animation refinements and micro-interactions
- Content expansion and new project additions
- Performance optimization for complex transforms
- Accessibility improvements while maintaining visual impact

---

*Keep this log updated with each co-building session to track our design evolution and maintain consistency.*