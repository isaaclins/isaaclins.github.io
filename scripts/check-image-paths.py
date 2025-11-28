#!/usr/bin/env python3
"""
Check that image paths referenced in markdown files actually exist.
Validates both markdown image syntax and Hugo shortcodes.
"""

import sys
import re
from pathlib import Path

# Root directory of the project (assumes script is in scripts/)
PROJECT_ROOT = Path(__file__).parent.parent


def find_image_references(content: str) -> list[tuple[str, int]]:
    """Find all image references in markdown content.

    Returns list of (image_path, line_number) tuples.
    """
    references = []

    lines = content.split('\n')
    for line_num, line in enumerate(lines, 1):
        # Standard markdown images: ![alt](/images/foo.png)
        md_pattern = r'!\[.*?\]\((/[^)]+)\)'
        for match in re.finditer(md_pattern, line):
            path = match.group(1)
            # Remove query strings like ?raw=true
            path = path.split('?')[0]
            references.append((path, line_num))

        # Hugo image shortcode: {{< image src="/images/foo.png" >}}
        shortcode_pattern = r'\{\{<\s*image\s+[^>]*src="([^"]+)"'
        for match in re.finditer(shortcode_pattern, line):
            references.append((match.group(1), line_num))

        # HTML img tags: <img src="/images/foo.png">
        html_pattern = r'<img[^>]+src="(/[^"]+)"'
        for match in re.finditer(html_pattern, line):
            path = match.group(1)
            path = path.split('?')[0]
            references.append((path, line_num))

    return references


def resolve_image_path(image_path: str) -> Path | None:
    """Resolve an image path to an actual file path."""
    # Remove leading slash
    clean_path = image_path.lstrip('/')

    # Check in images/ directory (Hugo mounts this to static/images)
    if clean_path.startswith('images/'):
        relative_path = clean_path  # images/foo.png
        full_path = PROJECT_ROOT / relative_path
        if full_path.exists():
            return full_path

    # Check in static/ directory
    static_path = PROJECT_ROOT / 'static' / clean_path
    if static_path.exists():
        return static_path

    # Check if it's already an absolute path within static
    if clean_path.startswith('static/'):
        full_path = PROJECT_ROOT / clean_path
        if full_path.exists():
            return full_path

    return None


def check_file(filepath: str) -> list[str]:
    """Check a single markdown file for broken image references."""
    errors = []
    path = Path(filepath)

    if not path.exists():
        return [f"File not found: {filepath}"]

    content = path.read_text(encoding='utf-8')
    references = find_image_references(content)

    for image_path, line_num in references:
        # Skip external URLs
        if image_path.startswith(('http://', 'https://', '//')):
            continue

        resolved = resolve_image_path(image_path)
        if resolved is None:
            errors.append(f"Line {line_num}: Image not found: {image_path}")

    return errors


def main():
    exit_code = 0

    for filepath in sys.argv[1:]:
        errors = check_file(filepath)

        if errors:
            print(f"❌ {filepath}:")
            for error in errors:
                print(f"   - {error}")
            exit_code = 1
        else:
            print(f"✅ {filepath}: All image paths valid")

    sys.exit(exit_code)


if __name__ == '__main__':
    main()
