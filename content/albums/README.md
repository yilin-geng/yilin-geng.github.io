# Photography Albums Guidelines

This directory contains photography album data that automatically appears on the Fun Stuff page.

## Adding New Albums

### 1. Create Album Directory
Create a new directory with a descriptive kebab-case name:
```
content/albums/your-album-name/
```

### 2. Create info.json
Each album directory must contain an `info.json` file with this structure:

```json
{
  "title": "Album Title",
  "description": "Brief description of the album and its content", 
  "date": "2024",
  "preview": "preview-image.jpg",
  "stats": "X Photos"
}
```

### 3. Field Descriptions

- **title**: The display name of the album
- **description**: A brief description that explains what the album contains
- **date**: Year or date range for the photos
- **preview**: (Optional) Filename of preview image in the same directory
- **stats**: Display text for photo count or other statistics

### 4. Adding Photos

Place your photo files in the same directory as `info.json`. Supported formats:
- JPG/JPEG
- PNG
- WebP

### 5. Update Album List (Required)

**IMPORTANT**: Albums use a curated discovery system. After creating your album, you must add the directory name to the `folderNames` array in `projects.html`:

```javascript
// In projects.html - Find the contentTypes.albums section
albums: {
    title: '📷 Photography',
    description: '...',
    folderNames: ['urban-explorations', 'travel-moments', 'your-new-album'], // Add here
    // ...
}
```

This curated approach ensures:
- Only completed albums with proper metadata appear
- No broken links or missing images
- Professional presentation of polished collections
- Better performance (no unnecessary HTTP requests)

### 6. Example Structure

```
content/albums/
├── urban-explorations/
│   ├── info.json
│   ├── street1.jpg
│   ├── street2.jpg
│   └── ...
├── travel-moments/
│   ├── info.json
│   ├── travel1.jpg
│   └── ...
└── your-new-album/
    ├── info.json
    └── photo1.jpg
```

## Current Albums

- **urban-explorations**: Street photography from various cities
- **travel-moments**: Travel and landscape photography  
- *(Add your new albums here)*

## Deployment Checklist

1. ✅ Create album directory with descriptive name
2. ✅ Add `info.json` with title, description, date, and metadata
3. ✅ Add photos to the directory
4. ✅ Test preview image displays correctly
5. ✅ **Add directory name to `folderNames` array in `projects.html`**
6. ✅ Verify album appears on Fun Stuff page

Albums appear on the Fun Stuff page only after completing ALL steps above!