# Portfolio Content Guidelines

This directory contains the portfolio content for the website, organized into three main categories.

## Directory Structure

```
content/portfolio/
├── librai/          # LibrAI-related projects and ventures
├── events/          # Speaking engagements, conferences, organized events
├── projects/        # Research projects, academic work, other projects
└── README.md        # This file
```

## Adding New Portfolio Items

### 1. Choose the Appropriate Category

- **librai/**: Projects related to LibrAI startup, AI library management, research assistance tools
- **events/**: Hackathons, conferences, speaking engagements, community leadership, organized events
- **projects/**: Research papers, PhD work, coding projects, previous professional experience

### 2. Create a JSON File

Create a new `.json` file in the appropriate category directory with a descriptive filename (use kebab-case).

### 3. JSON Schema

Each portfolio item should follow this structure:

```json
{
  "title": "Project or Event Title",
  "type": "Brief description/subtitle",
  "description": "Detailed description of the project, event, or achievement",
  "tags": ["TAG1", "TAG2", "TAG3"],
  "headerType": "startup-header|work-header|research-header|paper-header"
}
```

### 4. Field Descriptions

- **title**: The main title/name of the portfolio item
- **type**: A brief subtitle or category description
- **description**: A paragraph describing the item, its significance, and key details
- **tags**: Array of uppercase tags that highlight key aspects (3-4 tags recommended)
- **headerType**: Visual styling for the card header:
  - `startup-header`: For business ventures, entrepreneurial projects
  - `work-header`: For professional work, events, leadership roles
  - `research-header`: For academic research, papers, studies
  - `paper-header`: For publications, writings, diverse background items

### 5. Tag Guidelines

Use concise, uppercase tags that clearly categorize the work:
- Technology: `AI/ML`, `NLP`, `SOFTWARE DEV`, `RESEARCH TOOLS`
- Role: `FOUNDER`, `PRESIDENT`, `ORGANIZER`, `PhD`
- Type: `STARTUP`, `HACKATHON`, `RESEARCH`, `PAPER`, `ARXIV`
- Domain: `EDUCATION`, `FINANCE`, `PRODUCT`, `COMMUNITY`

### 6. Example Files

See existing files in each directory for examples:
- `librai/librai-platform.json`
- `events/nextgen25-hackathon.json`
- `projects/chain-of-command.json`

### 7. Automatic Updates

Once you add a new JSON file to any category directory, it will automatically appear on the portfolio page. The website will:
- Load all JSON files from each category directory
- Render them as portfolio cards with appropriate styling
- Display them in the correct tab based on the directory

No code changes are needed - just add your JSON file and it will appear on the next page load!