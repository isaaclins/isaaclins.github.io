#!/usr/bin/env python3
"""Fail before a build when the installed Hugo is below the site's minimum."""

from __future__ import annotations

import argparse
import re
import subprocess
import sys
from pathlib import Path

MIN_VERSION_PATTERN = re.compile(r"^\s*min\s*=\s*['\"]([^'\"]+)['\"]\s*$", re.MULTILINE)


def parse_version(value: str) -> tuple[int, int, int] | None:
    """Parse a semantic Hugo version from text."""
    match = re.search(r"(\d+)\.(\d+)\.(\d+)", value)
    if not match:
        return None
    return tuple(int(part) for part in match.groups())


def read_minimum_version(config_path: Path) -> str:
    """Read module.hugoVersion.min from the site's TOML configuration."""
    config = config_path.read_text(encoding="utf-8")
    section_match = re.search(
        r"(?ms)^[ \t]*\[module\.hugoVersion\][ \t]*\n?(.*?)(?=^[ \t]*\[|\Z)",
        config,
    )
    if section_match is None:
        raise ValueError(f"Missing [module.hugoVersion] section in {config_path}")

    min_match = MIN_VERSION_PATTERN.search(section_match.group(1))
    if min_match is None:
        raise ValueError(f"Missing module.hugoVersion.min in {config_path}")

    minimum = min_match.group(1)
    if parse_version(minimum) is None:
        raise ValueError(f"Invalid Hugo minimum version in {config_path}: {minimum}")
    return minimum


def installed_version(hugo_command: str) -> tuple[str, tuple[int, int, int]]:
    """Return the version reported by the selected Hugo executable."""
    result = subprocess.run(
        [hugo_command, "version"],
        check=True,
        capture_output=True,
        text=True,
    )
    output = f"{result.stdout}\n{result.stderr}"
    version = parse_version(output)
    if version is None:
        raise ValueError(f"Could not parse Hugo version from: {output.strip()}")
    return ".".join(str(part) for part in version), version


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--config", type=Path, default=Path("config.toml"))
    parser.add_argument("--hugo", default="hugo", help="Hugo executable to check")
    args = parser.parse_args()

    try:
        minimum_text = read_minimum_version(args.config)
        minimum = parse_version(minimum_text)
        if minimum is None:
            raise ValueError(f"Invalid Hugo minimum version: {minimum_text}")
        current_text, current = installed_version(args.hugo)
    except (OSError, subprocess.CalledProcessError, ValueError) as error:
        print(f"Hugo version check failed: {error}", file=sys.stderr)
        return 1

    if current < minimum:
        print(
            f"Hugo {current_text} is too old for this site. "
            f"Hugo >= {minimum_text} is required by "
            f"[module.hugoVersion].min in {args.config}.",
            file=sys.stderr,
        )
        return 1

    print(f"Hugo {current_text} satisfies the minimum version {minimum_text}.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
