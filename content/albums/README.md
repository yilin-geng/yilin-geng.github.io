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

### 5. Update JavaScript (Optional)

For automatic discovery, add your album directory name to the `albumNames` array in `projects.html`:

```javascript
const albumNames = ['sample-album', 'urban-explorations', 'your-new-album'];
```

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

## Existing Albums

- **sample-album**: Template example album
- **urban-explorations**: Street photography from various cities
- **travel-moments**: Travel and landscape photography  
- **camera-collection**: Vintage camera restoration documentation

Albums automatically appear on the Fun Stuff page once the directory and `info.json` are created!