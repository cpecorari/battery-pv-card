# B2500D-Card

Eine Home Assistand Custom Card für den Marstek B2500d Speicher.

![Beispielcard](./examples/Screenshot.png)

## 🚀 Features
Angelehnt an die Marstek App, zeigt diese Custom Card die Werte deines B2500d Speichers an.

### 💡 Status Visualisierung

Die Karte visualisiert oben als erstes den aktuellen Lade/Entladestatus.
Status zeigt ebenfalls aktuellen Batterieladestand in %.

| Status     | Bedeutung                          |
|--------|------------------------------------|
| ![still](./examples/blue_still.gif)  | Batterie wird weder ge- noch entladen.              |
|  ![still](./examples/blue.gif)   | Batterie wird geladen (Solarenergie vorhanden und größer als Ausgangsleistung. Batterie nicht voll) |
|   ![still](./examples/orange.gif)   | Batterie wird entladen (Ausgangsleistung größer Eingangsleistung. Batterie größer 0%)      |


### Karten

Aktuell können folgende Werte angezeigt werden: 

1. Aktuelle Solarenergie gesamt und Eingang 1 & Eingang 2
   
![Solarenergie](./examples/Solarenergie.png)

2. Aktuelle Ausgangsleistung gesamt

![Ausgangsleistung](./examples/Ausgang.png)

3. Batterie Ladestand / Kapazität

![Batterie](./examples/Batterie.png)

4. Tages Stromerzeugung

![Stromerzeugung](./examples/Stromerzeugung.png)

Aktuell können folgende Modi eingestellt/umgestellt bzw. angezeigt werden

1. Lademodus (gleichzeitiges laden/entladen vs. vollständig laden und dann entladen)
2. Entlademodus (auto/manuell)
3. Überschusseinspeisung (an/aus)

![Modus](./examples/Modus.png)

Wobei jede dieser einzelnen Karten auch optional ausgeblendet werden können, siehe [Parameter](###Parameter)

## ⚙️ Installation

### Abhängigkeiten
Die b2500d-card verwendet man am einfachsten mit einem Gerät was von folgendem Addon stammt:

- [hm2mqtt by tomquist](https://github.com/tomquist/hm2mqtt)

So kann man einfach das ganze Device übergeben. Die Card nutzt die Standard Entities. Wurden die Entitäten umbenannt funktioniert dieser einfache Weg nicht mehr.


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
### 🛠️ Parameter

Hier sind die verfügbaren Parameter für diese Lovelace Card beschrieben.

### 🔒 Erforderliche Parameter

| Name         | Typ      | Beschreibung                              |
|--------------|----------|-------------------------------------------|
| `device`     | string   | Der Name deines Geräts. Heißt z.B. der Sensor für die aktuelle Batterie "sensor.speicher_1_links_battery_percentage" ist <speicher_1_links> der Name des Geräts. |


### 🧩 Optionale Parameter

| Name           | Typ      | Beschreibung                                               | Standardwert     |
|----------------|----------|------------------------------------------------------------|------------------|
| `name`        | string   | Wie heißt dein Speicher ? Der Name wird oben links in der Karte angezeigt        | Std. Gerätename (also z.B. "speicher_1_links"            |
| `output`    | boolean  | Legt fest, ob die Karte Ausgangsleistung angezeigt werden soll            | `true`           |
| `battery`         | boolean   | Legt fest, ob die Karte Batterie angezeigt werden soll                            | `true`|
| `production`         | boolean   | Legt fest, ob die Karte Stromerzeugung angezeigt werden soll            | `true`      |
| `settings`        | boolean   | Legt fest, ob die Karte Einstellungen angezeigt werden soll              | `true`|
| `solar`        | boolean   | Legt fest, ob die Karte Solarenergie angezeigt werden soll             | `true`|


### 📘 Beispielkonfiguration
Füge die komplette Karte ganz einfach in dein Dashboard ein
```yaml
type: custom:b2500d-card
device: speicher_1_links
name: Speicher 1 links
```

Karte Einstellungen ausblenden:
```yaml
type: custom:b2500d-card
device: speicher_1_links
name: Speicher 1 links
settings: false
```
![Modus off](./examples/Modus_off.png)

Zeigt nur die Karte Solarenergie an:
```yaml
type: custom:b2500d-card
device: speicher_1_links
name: Speicher 1 links
settings: false
output: false
production: false
battery: false
```
![Nur Solarenergie](./examples/Solarenergie_einzeln.png)

Zeigt nur die Status Karte an:
```yaml
type: custom:b2500d-card
device: speicher_1_links
name: Speicher 1 links
settings: false
output: false
production: false
battery: false
solar: false
```
![Nur Solarenergie](./examples/Status_einzeln.png)


