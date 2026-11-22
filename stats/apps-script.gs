/* Google Apps Script: принимает статистику сессий и пишет строку в таблицу.

   Установка (один раз):
   1. Откройте таблицу «Palabras — статистика сессий» → Расширения → Apps Script.
   2. Вставьте этот код вместо содержимого Code.gs и сохраните.
   3. Settings (шестерёнка слева) → Script Properties → Add property:
        имя: KEY    значение: ключ из CONFIG.STATS_KEY в src/index.src.html
   4. Deploy → New deployment → Web app. Execute as: Me. Who has access: Anyone.
   5. Скопируйте URL вида https://script.google.com/macros/s/.../exec
      и пришлите его в чат.

   Ключ защищает от записей со случайных адресов, но не является настоящим паролем:
   он виден в исходном коде сайта. Для надёжной защиты нужна авторизация.
*/
const SHEET = 'Сессии';
const HEADERS = ['дата','время','тема','режим','секунд','слов','с_первой_попытки','ошибок','точность_%','слова_с_ошибками','устройство'];

function doPost(e) {
  const d = JSON.parse(e.postData.contents);
  const key = PropertiesService.getScriptProperties().getProperty('KEY');
  if (!key || d.key !== key) return ContentService.createTextOutput('forbidden');
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(SHEET);
  if (!sh) { sh = ss.insertSheet(SHEET); sh.appendRow(HEADERS); sh.setFrozenRows(1); }
  sh.appendRow([d.date, d.time, d.topic, d.mode, d.seconds, d.words, d.first_try, d.errors, d.accuracy, d.error_words, d.device]);
  return ContentService.createTextOutput('ok');
}
