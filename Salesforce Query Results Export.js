/* --------------------------------------------------------- */
/* 1. Copy this script to your clipboard [Ctrl-A], [Ctrl-C]  */
/* 2. Open the Salesforce Developer Console                  */
/* 3. Run your query                                         */
/* 4. Press the F12 key                                      */
/* 5. Paste this script in the browser console [Ctrl-V]      */
/* 6. Press [Enter]                                          */
/* 7. Click the "Download.CSV" link in the popup window      */
/* --------------------------------------------------------- */
var o = document.evaluate("//div[@id='editors-body']/div[not(contains(@style,'display:none') or contains(@style,'display: none'))]//table/tbody/tr",document,null,0,null);
var r = [];
while(row = o.iterateNext()) {
    var cols = row.getElementsByTagName('td');
    var a = [];
    for(var i=0; i<cols.length; i++) {
        a.push(formatData( cols[i].textContent ));
    }
    r.push(a);
}
// generating csv file
var csv = "data:text/csv;charset=utf-8,filename=download.csv,";
var rows = [];
for(var i=0; i<r.length; i++) {
    rows.push(r[i].join(","));
}
csv += rows.join('\r\n');
popup(csv);
function formatData(input) {
    // replace â€œ with ''
    var regexp = new RegExp(/["]/g);
    var output = input.replace(regexp, "Ââ€œ");
    //HTML
    var regexp = new RegExp(/\<[^\<]+\>/g);
    var output = output.replace(regexp, "");
    if (output == "") return '';
    return '"' + output + '"';
}

// showing data in window for copy/ paste
function popup(data) {
    var generator = window.open('', 'csv', 'height=400,width=600');
    generator.document.write('<html><head><title>CSV</title>');
    generator.document.write('</head><body style="overflow: hidden;">');
    generator.document.write('<a href="'+encodeURI(csv)+'" download="Sf_export.csv">Download CSV</a><br>');
    generator.document.write('<textArea style="width: 100%; height: 97%;" wrap="off" >');
    generator.document.write(data);
    generator.document.write('</textArea>');
    generator.document.write('</body></html>');
    generator.document.close();
    return true;
}
