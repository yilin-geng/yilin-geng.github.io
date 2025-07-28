# Creative Projects Guidelines

This directory contains interactive projects and creative experiments that automatically appear on the Fun Stuff page.

## Adding New Projects

### 1. Create Project Directory
Create a new directory with a descriptive kebab-case name:
```
content/projects/your-project-name/
```

### 2. Create info.json
Each project directory must contain an `info.json` file with this structure:

```json
{
  "title": "Project Title",
  "description": "Brief description of what this project does and why it's interesting",
  "preview": "screenshot.png"
}
```

### 3. Create index.html
Each project must have an `index.html` file that serves as the main entry point:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Project Title</title>
    <style>
        /* Your project styles */
    </style>
</head>
<body>
    <!-- Your project content -->
    <script>
        // Your project JavaScript
    </script>
</body>
</html>
```

### 4. Field Descriptions

- **title**: The display name of the project
- **description**: A brief description explaining what the project does
- **preview**: (Optional) Filename of screenshot/preview image

### 5. Project Structure

Your project can include any web technologies:
- HTML/CSS/JavaScript
- Canvas/WebGL for graphics
- CSS animations
- Interactive games
- Data visualizations
- Creative coding experiments

### 6. Update Project List (Required)

**IMPORTANT**: Projects use a curated discovery system. After creating your project, you must add the directory name to the `folderNames` array in `projects.html`:

```javascript
// In projects.html - Find the contentTypes.projects section
projects: {
    title: '🎨 Creative Experiments',
    description: '...',
    folderNames: ['learning_arabic', 'your-new-project'], // Add here
    // ...
}
```

This curated approach ensures:
- Only completed, tested projects appear on the site
- No broken links or 404 errors
- Professional presentation of working features
- Better performance (no unnecessary HTTP requests)

### 7. Example Structure

```
content/projects/
├── learning_arabic/           # Arabic learning platform
│   ├── info.json
│   ├── index.html
│   ├── style.css
│   ├── script.js
│   └── step*-design.md       # Design documentation
├── algorithm-visualizer/      # Example future project
│   ├── info.json
│   ├── index.html
│   └── assets/
└── your-new-project/          # Your new project
    ├── info.json
    ├── index.html
    └── ...
```

## Guidelines for Creative Projects

### Good Project Ideas
- Interactive games and puzzles
- Algorithm or data structure visualizations  
- Creative coding art pieces
- Educational interactive demos
- Fun web experiments
- Mini tools or utilities

### Technical Considerations
- Keep projects self-contained (no external dependencies if possible)
- Ensure projects work on mobile devices
- Add clear instructions or help text within the project
- Use modern web standards (ES6+, CSS3)

### Styling Tips
- Make projects visually appealing with good design
- Use consistent color schemes and typography
- Add smooth animations and transitions
- Ensure good contrast and accessibility

## Current Projects

- **learning_arabic**: Interactive Arabic language learning platform with progressive levels
- *(Add your new projects here)*

## Deployment Checklist

1. ✅ Create project directory with descriptive name
2. ✅ Add `info.json` with title, description, and metadata  
3. ✅ Create `index.html` as main entry point
4. ✅ Test project works independently 
5. ✅ **Add directory name to `folderNames` array in `projects.html`**
6. ✅ Verify project appears on Fun Stuff page

Projects appear on the Fun Stuff page only after completing ALL steps above!