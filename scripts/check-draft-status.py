#!/usr/bin/env python3
"""
Check draft status of blog posts.
Warns (but doesn't fail) when committing draft posts to main.
This is informational - sometimes you want to commit drafts.
"""

import sys
import re
from pathlib import Path


def get_draft_status(content: str) -> bool | None:
    """Extract draft status from TOML frontmatter."""
    pattern = r'^\+\+\+\s*\n(.*?)\n\+\+\+\s*\n'
    match = re.match(pattern, content, re.DOTALL)

    if not match:
        return None

    frontmatter = match.group(1)

    # Look for draft = true/false
    draft_pattern = r'^draft\s*=\s*(true|false)\s*$'
    for line in frontmatter.split('\n'):
        draft_match = re.match(draft_pattern, line.strip(), re.IGNORECASE)
        if draft_match:
            return draft_match.group(1).lower() == 'true'

    # If draft field is not present, default to false (published)
    return False


def main():
    draft_files = []
    published_files = []

    for filepath in sys.argv[1:]:
        path = Path(filepath)

        if not path.exists():
            continue

        # Only check blog posts
        if '/blog/' not in str(path) and '/how/' not in str(path):
            continue

        content = path.read_text(encoding='utf-8')
        is_draft = get_draft_status(content)

        if is_draft is True:
            draft_files.append(filepath)
        elif is_draft is False:
            published_files.append(filepath)

    # Report findings (informational, not a failure)
    if draft_files:
        print("⚠️  Draft posts being committed:")
        for f in draft_files:
            print(f"   📝 {f}")
        print()
        print("   This is fine if intentional. Set 'draft = false' when ready to publish.")
        print()

    if published_files:
        print("✅ Published posts:")
        for f in published_files:
            print(f"   📄 {f}")

    # Always exit 0 - this is informational only
    # Change to sys.exit(1) if you want to block draft commits
    sys.exit(0)


if __name__ == '__main__':
    main()
