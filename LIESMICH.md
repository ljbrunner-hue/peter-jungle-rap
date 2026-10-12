# Peters Jungle War – als App für iPhone und Android

Es gibt zwei Wege. Weg A geht sofort und ohne Entwicklerkonto. Weg B erzeugt echte Apps für die Stores.

## Weg A: Installierbare Web-App (PWA), kein Konto nötig

1. Den Ordner `www` auf eine beliebige HTTPS-Webseite hochladen (zum Beispiel GitHub Pages, Netlify oder Cloudflare Pages, alle kostenlos).
2. Die Adresse auf dem Handy öffnen.
   - **iPhone (Safari):** Teilen-Symbol, dann „Zum Home-Bildschirm“.
   - **Android (Chrome):** Menü (drei Punkte), dann „App installieren“ bzw. „Zum Startbildschirm hinzufügen“.
3. Die App startet im Vollbild und im Querformat und läuft danach auch offline.

Hinweis: Die Seite muss über HTTPS erreichbar sein, sonst funktioniert die Installation und der Offline-Modus nicht. Ein Doppelklick auf `index.html` am Computer genügt nur zum Spielen im Browser.

## Weg B: Echte Apps mit Capacitor (APK/AAB und IPA)

Voraussetzungen: Node.js 18 oder neuer.
- **Android:** Android Studio (enthält das Android SDK und Java).
- **iPhone:** Ein Mac mit Xcode. Ohne Mac lässt sich keine iPhone-App bauen.

Einrichtung (einmalig):

    cd app
    npm run setup

Das Skript installiert Capacitor, legt die Projekte an, erzeugt Icons, stellt Querformat und Vollbild ein.

**Android:**
1. `npm run android` öffnet Android Studio.
2. Zum Testen: Handy per USB anschließen (Entwickleroptionen und USB-Debugging an) und auf „Run“ drücken.
3. Zum Veröffentlichen: Build, dann „Generate Signed Bundle / APK“, Schlüssel anlegen und die `.aab`-Datei im Google Play Console hochladen (einmalig 25 US-Dollar Entwicklerkonto). Eine `.apk` lässt sich auch direkt zum Verteilen an Bekannte verwenden.

**iPhone:**
1. `npm run ios` öffnet Xcode.
2. Unter „Signing & Capabilities“ die Apple-ID als Team wählen, Handy anschließen und auf „Run“ drücken. Mit einer kostenlosen Apple-ID läuft die App 7 Tage auf dem eigenen Gerät.
3. Zum Veröffentlichen: Product, Archive, dann in App Store Connect hochladen (Apple Developer Program, 99 US-Dollar pro Jahr).

Die Bundle-ID `at.peter.junglerap` kannst du in `capacitor.config.json` ändern, bevor du `npm run setup` ausführst.

## Wichtige Hinweise für die Veröffentlichung

- **Rap-Text und Beat sind selbst geschrieben und werden live im Gerät erzeugt.** Es sind keine fremden Aufnahmen enthalten.
- **Gesang:** Die Singstimme kommt aus dem eingebauten Synthesizer und funktioniert auf jedem Gerät gleich. Die Option „Sprache“ nutzt die Stimmen des Telefons.
- **Charaktere und Icon:** Alle Figuren sind eigene Zeichnungen.
- **Spielstände** (Rekorde, Kostüm, Stimme) werden im Speicher der App gesichert.
