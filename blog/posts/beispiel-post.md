---
title: "Beispiel-Post: So sieht hier später ein Text aus"
date: 2026-08-09
description: "Platzhalter für den ersten echten Beitrag. Zeigt gleichzeitig, wie Überschriften, Listen, Zitate, Code und Links im Blog-Layout rendern."
tags: ["Platzhalter", "Setup"]
---

Dieser Post ist ein Platzhalter. Er steht hier, damit die Übersicht, der Feed und
das Layout etwas zu tun haben, und wird durch den ersten echten Beitrag ersetzt.
Bis dahin dient er als Testfall: jedes Element, das Markdown erzeugen kann, kommt
einmal vor.

## Eine Überschrift zweiter Ebene

Fließtext läuft auf maximal 70 Zeichen Breite, damit die Zeilen nicht quer über
den Monitor laufen. **Fett** und *kursiv* funktionieren wie erwartet, kursiv
nimmt dabei den roten Akzent auf. Ein Link führt zum Beispiel
[zurück auf die Startseite](/) oder nach außen zur
[Eleventy-Dokumentation](https://www.11ty.dev/docs/). Externe Links bekommen
`target="_blank"` und `rel="noopener noreferrer"` automatisch angehängt, darum
muss sich beim Schreiben niemand kümmern.

### Und eine dritte Ebene

Darunter wird es selten noch tiefer. Wenn doch, ist die Gliederung wahrscheinlich
das eigentliche Problem.

## Listen

Ungeordnet, für Aufzählungen ohne Reihenfolge:

- Lokale Sprachmodelle auf eigener Hardware
- Datenhaltung, die das Haus nicht verlässt
- Infrastruktur, die man auch in zwei Jahren noch versteht

Und geordnet, wenn die Reihenfolge zählt:

1. Erst schauen, ob das Problem überhaupt eins für KI ist
2. Dann klären, welche Daten dabei wohin fließen
3. Erst danach über Modelle reden

## Zitate

> Die Frage ist nicht, ob wir einen KI-Agenten bauen können, sondern ob Sie
> einen brauchen.

## Code

Inline sieht Code so aus: `docker compose up -d`, mitten im Satz und ohne dass
die Zeile aus dem Takt gerät.

Längere Blöcke bekommen einen eigenen Kasten und scrollen horizontal, statt das
Layout zu sprengen:

```yaml
# Helm-Werte mit doppelten geschweiften Klammern. Genau daran scheitern
# viele Blog-Setups, weil der Generator sie als eigene Variablen liest.
resources:
  limits:
    memory: {{ .Values.llm.memoryLimit | default "48Gi" }}
  requests:
    nvidia.com/gpu: "1"
```

```bash
# Ein zweiter Block, diesmal ohne Highlighting-Zauber.
rocm-smi --showmeminfo vram | grep -i used
```

---

Nach dem Trenner ist Schluss. Der nächste Beitrag hat dann tatsächlich etwas
zu erzählen.
