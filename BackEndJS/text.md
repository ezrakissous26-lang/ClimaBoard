| #  | Problème                                             | État                                           |
| -- | ---------------------------------------------------- | ---------------------------------------------- |
| 1  | 🔴 Middleware : `finsih` → `finish` + logger         | ✅ **Réglé + testé + commit**                   |
| 2  | 🔴 Validation latitude/longitude : `0` + limites     | ✅ **Réglé + testé + commit**                   |
| 3  | 🔴 Favorites + `explorerName` + suppression correcte | ✅ **Réglé + testé + commit**                   |
| 4  | 🔴 Open-Meteo : gérer `response.ok` / erreurs HTTP   | ⏸️ **Mis de côté volontairement**              |
| 5  | 🟠 `GET /weather` avec un body                       | ✅ **En cours → passage aux query params**      |
| 6  | 🟠 `GET /favorites` : `JSON.parse` inutile           | ✅ **Réglé**                                    |
| 7  | 🟠 `POST /favorites` : `JSON.stringify` inutile      | ✅ **Réglé**                                    |
| 8  | 🟠 `DELETE /favorites` : mauvais status HTTP         | ✅ **Réglé en local** (`200` + JSON)            |
| 9  | 🟠 Messages d'erreur en anglais                      | 🟡 **À améliorer**                             |
| 10 | 🟡 `isExisting()` : revoir le nom/contrat            | 🟡 **À revoir**                                |
| 11 | 🟡 `forEach` dans `isExisting()`                     | 🟡 **À revoir**                                |
| 12 | 🟡 Chemin vers `data.json` fragile                   | 🟡 **À revoir**                                |
| 13 | 🟢 `package.json` → `main: server.js`                | ✅ **Réglé**                                    |
| 14 | 🟡 Noms génériques des fichiers/services             | ✅ **Réglé**                                    |
| 15 | ⚪ Python/FastAPI                                     | ⏳ **Après le JS**, comme convenu avec ton prof |
