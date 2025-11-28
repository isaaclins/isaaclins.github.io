#!/usr/bin/env python3
"""
Validate Hugo TOML frontmatter in markdown files.
Checks for required fields and valid structure.
"""

import sys
import re
from pathlib import Path
from datetime import datetime

REQUIRED_FIELDS = ['title', 'date']
OPTIONAL_FIELDS = ['draft', 'tags', 'complexity', 'description', 'image']


def parse_toml_frontmatter(content: str) -> tuple[dict | None, str | None]:
    """Extract and parse TOML frontmatter from content."""
    pattern = r'^\+\+\+\s*\n(.*?)\n\+\+\+\s*\n'
    match = re.match(pattern, content, re.DOTALL)

    if not match:
        return None, "No TOML frontmatter found (expected +++ delimiters)"

    frontmatter_text = match.group(1)
    frontmatter = {}

    for line in frontmatter_text.strip().split('\n'):
        line = line.strip()
        if not line or line.startswith('#'):
            continue

        if '=' not in line:
            continue

        key, _, value = line.partition('=')
        key = key.strip()
        value = value.strip()

        # Remove quotes from string values
        if value.startswith('"') and value.endswith('"'):
            value = value[1:-1]
        elif value.startswith('[') and value.endswith(']'):
            # Parse array
            value = [v.strip().strip('"') for v in value[1:-1].split(',') if v.strip()]

        frontmatter[key] = value

    return frontmatter, None


def validate_frontmatter(frontmatter: dict, filepath: str) -> list[str]:
    """Validate frontmatter fields."""
    errors = []

    # Check required fields
    for field in REQUIRED_FIELDS:
        if field not in frontmatter:
            errors.append(f"Missing required field: {field}")

    # Validate date format (YYYY-MM-DD)
    if 'date' in frontmatter:
        date_str = frontmatter['date']
        try:
            datetime.strptime(date_str, '%Y-%m-%d')
        except ValueError:
            errors.append(f"Invalid date format: '{date_str}' (expected YYYY-MM-DD)")

    # Validate complexity if present
    if 'complexity' in frontmatter:
        valid_complexities = ['easy', 'medium', 'hard', 'expert']
        if frontmatter['complexity'].lower() not in valid_complexities:
            errors.append(
                f"Invalid complexity: '{frontmatter['complexity']}' "
                f"(expected one of: {', '.join(valid_complexities)})"
            )

    # Validate draft is boolean-ish
    if 'draft' in frontmatter:
        draft_val = str(frontmatter['draft']).lower()
        if draft_val not in ['true', 'false']:
            errors.append(f"Invalid draft value: '{frontmatter['draft']}' (expected true/false)")

    # Validate tags is a list
    if 'tags' in frontmatter and not isinstance(frontmatter['tags'], list):
        errors.append("Tags should be an array (e.g., [\"tag1\", \"tag2\"])")

    # Check description length for SEO
    if 'description' in frontmatter:
        desc_len = len(frontmatter['description'])
        if desc_len > 160:
            errors.append(
                f"Description too long for SEO: {desc_len} chars (recommended: under 160)"
            )

    return errors


def main():
    exit_code = 0

    for filepath in sys.argv[1:]:
        path = Path(filepath)

        if not path.exists():
            print(f"❌ {filepath}: File not found")
            exit_code = 1
            continue

        content = path.read_text(encoding='utf-8')
        frontmatter, parse_error = parse_toml_frontmatter(content)

        if parse_error:
            print(f"❌ {filepath}: {parse_error}")
            exit_code = 1
            continue

        errors = validate_frontmatter(frontmatter, filepath)

        if errors:
            print(f"❌ {filepath}:")
            for error in errors:
                print(f"   - {error}")
            exit_code = 1
        else:
            print(f"✅ {filepath}: Valid frontmatter")

    sys.exit(exit_code)


if __name__ == '__main__':
    main()
