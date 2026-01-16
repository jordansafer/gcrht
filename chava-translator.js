const chavascript = require('chavascript');
const fs = require('fs');
const path = require('path');

// תיקיות
const chavaDir = path.join(__dirname, 'chava');
const outputDir = path.join(__dirname);

// פונקציה לתרגום קובץ
function translateFile(inputPath, outputPath) {
    try {
        const chavaCode = fs.readFileSync(inputPath, 'utf8');
        // אם הקובץ הוא server.chava, לא מתרגמים אותו (כי הוא מכיל Node.js API שלא נתמך)
        if (path.basename(inputPath) === 'server.chava') {
            // פשוט מעתיקים את הקובץ כמו שהוא
            fs.writeFileSync(outputPath, chavaCode, 'utf8');
            console.log(`✓ הועתק: ${path.basename(inputPath)} -> ${path.basename(outputPath)}`);
        } else {
            // מתרגמים קבצים אחרים
            let jsCode = chavaCode;
            // ננסה לתרגם את הקוד
            try {
                jsCode = chavascript.transpile(chavaCode);
                // אם יש שורה שמסתיימת במשתנה בלבד (ללא return), נוסיף return
                // זה מתקן את הבעיה של ChavaScript שלא תומך ב-return בעברית
                jsCode = jsCode.replace(/(\s+)([a-zA-Z_$][a-zA-Z0-9_$]*);(\s*})/g, '$1return $2;$3');
            } catch (e) {
                // אם התרגום נכשל, נשתמש בקוד המקורי
                console.warn(`⚠ אזהרה: לא ניתן לתרגם ${path.basename(inputPath)}, משתמש בקוד המקורי`);
                jsCode = chavaCode;
            }
            fs.writeFileSync(outputPath, jsCode, 'utf8');
            console.log(`✓ תורגם: ${path.basename(inputPath)} -> ${path.basename(outputPath)}`);
        }
    } catch (error) {
        console.error(`✗ שגיאה בתרגום ${inputPath}:`, error.message);
        process.exit(1);
    }
}

// תרגום כל הקבצים בתיקיית chava
if (fs.existsSync(chavaDir)) {
    const files = fs.readdirSync(chavaDir);
    files.forEach(file => {
        if (file.endsWith('.chava') || file.endsWith('.chjs')) {
            const inputPath = path.join(chavaDir, file);
            const outputName = file.replace(/\.(chava|chjs)$/, '.js');
            // קבצים בתיקיית chava הולכים לתיקיות המתאימות
            let outputPath;
            if (file === 'script.chava') {
                outputPath = path.join(outputDir, 'public', outputName);
            } else {
                outputPath = path.join(outputDir, outputName);
            }
            translateFile(inputPath, outputPath);
        }
    });
} else {
    console.log('תיקיית chava לא נמצאה, מדלג על תרגום');
}
