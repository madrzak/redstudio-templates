# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
- `npm run dev` - Start Vite development server with hot module reloading
- `npm run build` - Build production bundle using Vite
- `npm run preview` - Preview production build locally

## Architecture

This is a **Bootstrap 4 template showcase application** built with Vite as the build tool. The application displays a collection of HTML/CSS templates in a gallery format.

### Key Components

**Template Configuration System**
- `src/templates.config.js` - Central configuration defining all available templates with metadata (name, description, thumbnail, path)
- Each template is self-contained in its own folder under `src/templates/`

**Main Application Structure**
- `index.html` - Main entry point that displays template gallery using Bootstrap 4 components
- `src/main.js` - Renders template cards dynamically from the configuration
- `src/styles.css` - Global styles for the template gallery

**Template Structure**
Each template folder contains:
- `index.html` - Main template file with Bootstrap 4 integration
- `style.css` - Template-specific styles
- `assets/` - Template-specific images and resources
- Some templates include `script.js` for interactive features (e.g., grace-1 template)

### Adding New Templates

1. Create a new folder under `src/templates/` with your template name
2. Add template files (index.html, style.css, assets)
3. Update `src/templates.config.js` to register the new template with appropriate metadata
4. Templates should be self-contained and use Bootstrap 4 for consistency

### Current Templates
- **landing-page**: Simple hero section with features grid
- **grace-1**: Interactive template with animated grass effects
- **classic-blog**: Traditional blog layout with sidebar

All templates use Bootstrap 4 (v4.5.2) loaded via CDN for consistent styling and responsive behavior.