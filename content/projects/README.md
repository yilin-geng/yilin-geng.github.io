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

### 6. Update JavaScript (Optional)

For automatic discovery, add your project directory name to the `projectNames` array in `projects.html`:

```javascript
const projectNames = ['sample-game', 'your-new-project'];
```

### 7. Example Structure

```
content/projects/
├── sample-game/
│   ├── info.json
│   ├── index.html
│   ├── style.css
│   ├── script.js
│   └── screenshot.png
├── algorithm-visualizer/
│   ├── info.json
│   ├── index.html
│   └── assets/
└── your-new-project/
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

Projects automatically appear on the Fun Stuff page once the directory, `info.json`, and `index.html` are created!