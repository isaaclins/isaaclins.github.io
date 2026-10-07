+++
title = "Resume"
date = 2026-10-07
draft = false
type = "resume"
layout = "single"
description = "Resume of Isaac Lins: application developer and blue team security analyst at Swisscom, 1st place IT Skills Battle 2025 (cybersecurity), building AI tools and agents."
outputs = ["HTML", "RSS"]

# The whole resume lives in this front matter; layouts/resume/single.html
# renders it for the web and for print. After any change, regenerate the PDF:
#   scripts/resume-pdf.sh
# A date of "?" renders as a visible "date?" marker until it is filled in.

role = "Application developer & security analyst"
location = "Zürich, Switzerland"
summary = "Started as a developer, moved into security, kept both. I build applications and AI tools, and I build them with security in mind from the start."

[highlight]
  big = "1st"
  title = "IT Skills Battle 2025, Cybersecurity"
  text = "National competition"
  link = "https://isaaclins.com/blog/skills-battle-2025/"

[[contact]]
  label = "email"
  text = "contact@isaaclins.com"
  link = "mailto:contact@isaaclins.com"
[[contact]]
  label = "web"
  text = "isaaclins.com"
  link = "https://isaaclins.com"
[[contact]]
  label = "github"
  text = "github.com/isaaclins"
  link = "https://github.com/isaaclins"
[[contact]]
  label = "linkedin"
  text = "linkedin.com/in/isaaclinsdotcom"
  link = "https://linkedin.com/in/isaaclinsdotcom"

[[experience]]
  title = "Blue Team Security Analyst"
  team = "Internal Security"
  org = "Swisscom AG"
  start = "Aug 2026"
  end = "now"
  text = "In-house blue team: threat detection and incident response for Swisscom itself."
[[experience]]
  title = "Blue Team Security Analyst"
  team = "Threat Detection & Response"
  org = "Swisscom AG"
  start = "Oct 2025"
  end = "Aug 2026"
  text = "Triage and incident response for 50+ customer tenants: SIEM, EDR, NDR, XDR, SOAR."
[[experience]]
  title = "Application Developer"
  org = "Swisscom AG"
  start = "Jan 2024"
  end = "Oct 2025"
  text = "Enterprise apps. Migrated 40+ machines from RHEL 7 to 9 and 2M+ entry databases."
[[experience]]
  title = "Red Team Internal Hacking Presenter"
  org = "Swisscom AG"
  start = "Aug 2023"
  end = "Jan 2024"
  text = "Built live hacking demos (phishing, RATs, botnets) for government and enterprise."
[[experience]]
  title = "Automation Engineer"
  org = "Swisscom AG"
  start = "Jun 2023"
  end = "Aug 2023"
  text = "Automated IT workflows with UiPath Studio to cut manual work."
[[experience]]
  title = "Backend Developer"
  org = "Swisscom AG"
  start = "Nov 2022"
  end = "May 2023"
  text = "Backend for a music app: Java APIs, MySQL, PI planning."

# print = true: on the one-page PDF (projects, and one link each). The web shows all.
[[projects]]
  name = "Stewie"
  when = "since Sep 2026"
  print = true
  text = "An AI agent with its own Linux machine. It runs my servers, keeps its own notes and searches every past session; I send it outcomes from my phone."
  stack = "Claude, T3 Code, Ubuntu, systemd"
  [[projects.links]]
    text = "isaaclins.com/blog/hi-im-stewie-isaacs-ai-agent"
    print = true
    link = "https://isaaclins.com/blog/hi-im-stewie-isaacs-ai-agent/"
[[projects]]
  name = "Rental Law Navigator"
  note = "3rd place, Hack-Nation 7, Zurich hub"
  when = "Oct 2026"
  print = true
  text = "US rental law for any address. Every answer quotes its source word for word, with an as-of date and the changes ahead."
  stack = "Python, LLMs, US Census geocoder"
  [[projects.links]]
    text = "navigator.isaaclins.com"
    link = "https://navigator.isaaclins.com/"
  [[projects.links]]
    text = "github.com/isaaclins/rental-law-navigator"
    print = true
    link = "https://github.com/isaaclins/rental-law-navigator"
[[projects]]
  name = "FreeSnitch"
  when = "Aug 2026"
  print = true
  text = "Open-source macOS application firewall: per-app rules, connection alerts, a live traffic map, DNS over HTTPS. Signed and notarized 1.0 release."
  stack = "Swift, SwiftUI, Network Extension, XPC"
  [[projects.links]]
    text = "isaaclins.com/freesnitch"
    link = "https://isaaclins.com/freesnitch/"
  [[projects.links]]
    text = "github.com/isaaclins/freesnitch"
    print = true
    link = "https://github.com/isaaclins/freesnitch"
[[projects]]
  name = "pi-vault"
  when = "Aug 2026"
  print = true
  text = "Lets a coding agent use a secret it never sees: you approve, the key goes from the macOS keychain into the command and is redacted from the output."
  stack = "TypeScript, macOS Keychain"
  [[projects.links]]
    text = "github.com/isaaclins/pi-vault"
    print = true
    link = "https://github.com/isaaclins/pi-vault"
[[projects]]
  name = "demo-video-skill"
  when = "Oct 2026"
  text = "Claude Code skill: give it a URL, get a product demo video under 60 seconds, recorded in a real browser with zooms, captions and voice-over."
  stack = "Python, Playwright, ffmpeg, ElevenLabs"
  [[projects.links]]
    text = "github.com/isaaclins/demo-video-skill"
    link = "https://github.com/isaaclins/demo-video-skill"
[[projects]]
  name = "Spotiglass"
  when = "Apr 2026"
  text = "Native Spotify client for macOS: command palette, a system-wide 10-band equalizer, synced lyrics."
  stack = "Swift, SwiftUI, OAuth PKCE, Web Playback SDK"
  [[projects.links]]
    text = "isaaclins.com/spotiglass"
    link = "https://isaaclins.com/spotiglass/"
  [[projects.links]]
    text = "github.com/isaaclins/spotiglass"
    link = "https://github.com/isaaclins/spotiglass"

[[skills]]
  label = "Programming"
  items = "Python, TypeScript, Swift, Java, SQL, Bash"
[[skills]]
  label = "Frameworks"
  items = "SwiftUI, Next.js, React Native, Flutter, Spring Boot"
[[skills]]
  label = "AI & agents"
  items = "Claude Code, agent tooling, LLM apps with cited answers, Playwright"
[[skills]]
  label = "Security"
  items = "SIEM, EDR, NDR, XDR, SOAR, incident response, pentesting, CTF"
[[skills]]
  label = "Infrastructure"
  items = "Linux/RHEL, Docker, Git, CI/CD"
[[skills]]
  label = "Languages"
  items = "German and Spanish (native), English (C2), Portuguese (good)"

[[education]]
  title = "Informatiker EFZ (Application Developer)"
  org = "Swisscom AG, apprenticeship"
  start = "Aug 2022"
  end = "Jul 2026"
[[education]]
  title = "English C2 Proficiency"
  org = "Cambridge English"
  start = "Jan 2026"
  link = "https://isaaclins.com/resume/certificates/cambridge-C2.pdf"
  linktext = "certificate"
+++
