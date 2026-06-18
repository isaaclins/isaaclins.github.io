{{- /* Per-page Markdown for AI agents. Bound to the `markdown` output format
       (suffix .md) for every regular page. isPlainText is set on the format so
       content is emitted raw, not HTML-escaped. */ -}}
# {{ .Title }}

{{ with .Description }}{{ . }}

{{ end }}*Source: {{ .Permalink }}*

{{ .RawContent }}
