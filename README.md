# B2500D-Card

Eine Lovelace Custom Card für den Marstek B2500d Speicher.

![Beispielcard](/examples/Screenshot.png)

## Features
Angelehnt an der Marstek App, zeigt diese Custom Card die Werte deines B2500d Speichers an.

Aktuelle werden folgende Werte angezeigt 

1. Aktuelle Solarenergie gesamt und Eingang 1 & Eingang 2
2. Aktuelle Ausgangsleistung gesamt
3. Batterie Ladestand / Kapazität
4. Tages Stromerzeugung

Aktuell könne folgende Modi eingestellt/umgestellt bzw. angezeigt werden

1. Lademodus (gleichzeitiges laden/entladen vs. vollständig laden und dann entladen)
2. Entlademodus (auto/manuell)

## Installation

### Abhängigkeiten
Damit die B2500d-Card korrekt funktioniert, müssen folgende Integrationen installiert sein:

- [hm2mqtt by tomquist](https://github.com/tomquist/hm2mqtt)

### HACS
1. HACS öffnen
2. Frontend → Custom Repositories → `https://github.com/Neisi/B2500D-Card`
3. Installieren

### Manuell
1. `b2500d-card.js` nach `/config/www/` kopieren
2. In Lovelace hinzufügen:
```yaml
resources:
  - url: /local/b2500d-card.js
    type: module
```
### Beispielkonfiguration
Füge die Karte ganz einfach in dein Dashboard ein
```yaml
type: custom:b2500d-card
device: NAME_DEINES_SPEICHERS
```

