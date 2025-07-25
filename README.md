# Personal Website Content Management

This website uses a content-driven structure that makes it easy to add new content without editing HTML.

## Adding Content

### Personal Introduction
Edit `content/about.md` with your personal introduction using Markdown formatting.

### Work Items
All your work (papers, events, ventures) are unified in one section. Add JSON files to the appropriate subfolder:

#### Papers (`content/portfolio/papers/`)
```json
{
  "title": "Your Paper Title",
  "date": "2024",
  "venue": "Conference/Journal Name",
  "description": "Brief description of your paper",
  "link": "https://link-to-paper.com"
}
```

#### Events (`content/portfolio/events/`)
```json
{
  "title": "Event Name",
  "date": "2024",
  "venue": "Location",
  "description": "Description of your involvement",
  "link": "https://event-link.com"
}
```

#### Ventures (`content/portfolio/startup/`)
```json
{
  "title": "Project Name",
  "date": "2023-2024",
  "description": "Description of your project",
  "link": "https://project-link.com"
}
```

All work items are displayed together, sorted by date, with subtle type tags to differentiate them.

### Photo Albums
1. Create a folder in `content/albums/album-name/`
2. Add an `info.json` file:
```json
{
  "title": "Album Title",
  "description": "Album description",
  "date": "2024",
  "preview": "cover-photo.jpg"
}
```
3. Add your photos to the same folder

### Side Projects (Casual Interactive Games)
These appear in a de-emphasized section for fun projects:

1. Create a folder in `content/projects/project-name/`
2. Add an `info.json` file:
```json
{
  "title": "Project Title",
  "description": "Project description",
  "preview": "screenshot.png"
}
```
3. Add your `index.html` file and any assets

## File Structure
```
/
├── index.html (main template)
├── style.css (elegant grayscale design)
├── script.js (dynamic content loader)
└── content/
    ├── about.md
    ├── portfolio/
    │   ├── papers/*.json
    │   ├── events/*.json
    │   └── startup/*.json
    ├── albums/
    │   └── album-name/
    │       ├── info.json
    │       └── *.jpg/png
    └── projects/
        └── project-name/
            ├── info.json
            ├── index.html
            └── assets/
```

The website automatically scans these folders and displays your content. No HTML editing required!