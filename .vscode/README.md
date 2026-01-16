# הגדרות VS Code/Cursor לפרויקט

הקבצים כאן מגדירים את ההתנהגות של העורך עבור קבצי ChavaScript (`.chava`).

## מה מוגדר כאן:

1. **`.vscode/settings.json`** - הגדרות עורך:
   - קבצי `.chava` מזוהים כשפה נפרדת `chava`
   - כיוון טקסט מוגדר ל-RTL (מימין לשמאל) עבור קבצי `.chava`
   - סגירה אוטומטית של סוגריים ומרכאות

2. **`.editorconfig`** - הגדרות עריכה כלליות:
   - הגדרות עבור קבצי `.chava` ו-`.chjs`

3. **`chava-extension/`** - Extension מותאם אישית:
   - Extension מותאם אישית עבור תמיכה ב-ChavaScript
   - מגדיר שפה חדשה `chava` עם תמיכה ב-RTL
   - ניתן להתקין על ידי פתיחת התיקייה `chava-extension` ב-VS Code/Cursor

## התקנת ה-Extension:

### אופציה 1: שימוש בהגדרות הקיימות (מומלץ)
ההגדרות ב-`.vscode/settings.json` אמורות לעבוד אוטומטית. אם לא, נסה:
1. לסגור ולפתוח מחדש את הקובץ
2. לעדכן את העורך (Reload Window: Cmd+Shift+P → "Developer: Reload Window")
3. לוודא שההגדרות נטענו

### אופציה 2: התקנת Extension מותאם אישית
1. פתח את התיקייה `chava-extension` ב-VS Code/Cursor
2. לחץ F5 כדי להריץ את ה-extension במצב debug
3. או השתמש ב-`vsce package` כדי לארוז את ה-extension

אם העורך עדיין לא מציג את הקבצים ב-LTR, נסה:
1. לסגור ולפתוח מחדש את הקובץ
2. לעדכן את העורך (Reload Window)
3. לוודא שההגדרות נטענו (פתח Command Palette: Cmd+Shift+P, חפש "Preferences: Open Settings")
