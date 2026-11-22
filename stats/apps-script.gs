/* Google Apps Script: принимает статистику сессий и пишет строку в таблицу.
   Установка:
   1. Создайте Google-таблицу. Extensions → Apps Script (Расширения → Apps Script).
   2. Вставьте этот код вместо содержимого Code.gs и сохраните.
   3. Deploy → New deployment → Web app. Execute as: Me. Who has access: Anyone.
   4. Скопируйте URL вида https://script.google.com/macros/s/.../exec
   5. Вставьте его в src/index.src.html в CONFIG.STATS_URL и выполните build.py.
*/
const SHEET = 'Сессии';
const HEADERS = ['дата','время','тема','режим','секунд','слов','с_первой_попытки','ошибок','точность_%','слова_с_ошибками','устройство'];

function doPost(e) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(SHEET);
  if (!sh) { sh = ss.insertSheet(SHEET); sh.appendRow(HEADERS); sh.setFrozenRows(1); }
  const d = JSON.parse(e.postData.contents);
  sh.appendRow([d.date, d.time, d.topic, d.mode, d.seconds, d.words, d.first_try, d.errors, d.accuracy, d.error_words, d.device]);
  return ContentService.createTextOutput('ok');
}
