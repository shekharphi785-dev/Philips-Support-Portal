/* ================================================
   Philips Support Portal — Google Apps Script
   CONFIG SHEET (PIN + Authorized Employee IDs)
   
   Sheet layout:
     B1 = Admin PIN
     B2 = Comma-separated Employee IDs
   ================================================ */

function doGet(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var pin  = sheet.getRange('B1').getValue();
  var emps = sheet.getRange('B2').getValue();
  var data = JSON.stringify({ pin: String(pin), emps: String(emps) });

  // Support JSONP for cross-origin requests from the portal
  var cb = (e && e.parameter && e.parameter.callback) ? e.parameter.callback : null;
  if (cb) {
    return ContentService.createTextOutput(cb + '(' + data + ')')
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
  }
  return ContentService.createTextOutput(data)
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data  = JSON.parse(e.postData.contents);
  if (data.pin  !== undefined) sheet.getRange('B1').setValue(data.pin);
  if (data.emps !== undefined) sheet.getRange('B2').setValue(data.emps);
  return ContentService.createTextOutput(JSON.stringify({ status: 'ok' }))
    .setMimeType(ContentService.MimeType.JSON);
}

/* ------------------------------------------------
   Run this from the editor to test doGet locally
   Expected output: test({"pin":"...","emps":"..."})
------------------------------------------------ */
function testGet() {
  var result = doGet({ parameter: { callback: 'test' } });
  Logger.log(result.getContent());
}
