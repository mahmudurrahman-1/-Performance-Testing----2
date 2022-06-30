/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
var showControllersOnly = false;
var seriesFilter = "";
var filtersOnlySampleSeries = true;

/*
 * Add header in statistics table to group metrics by category
 * format
 *
 */
function summaryTableHeader(header) {
    var newRow = header.insertRow(-1);
    newRow.className = "tablesorter-no-sort";
    var cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Requests";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 3;
    cell.innerHTML = "Executions";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 7;
    cell.innerHTML = "Response Times (ms)";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Throughput";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 2;
    cell.innerHTML = "Network (KB/sec)";
    newRow.appendChild(cell);
}

/*
 * Populates the table identified by id parameter with the specified data and
 * format
 *
 */
function createTable(table, info, formatter, defaultSorts, seriesIndex, headerCreator) {
    var tableRef = table[0];

    // Create header and populate it with data.titles array
    var header = tableRef.createTHead();

    // Call callback is available
    if(headerCreator) {
        headerCreator(header);
    }

    var newRow = header.insertRow(-1);
    for (var index = 0; index < info.titles.length; index++) {
        var cell = document.createElement('th');
        cell.innerHTML = info.titles[index];
        newRow.appendChild(cell);
    }

    var tBody;

    // Create overall body if defined
    if(info.overall){
        tBody = document.createElement('tbody');
        tBody.className = "tablesorter-no-sort";
        tableRef.appendChild(tBody);
        var newRow = tBody.insertRow(-1);
        var data = info.overall.data;
        for(var index=0;index < data.length; index++){
            var cell = newRow.insertCell(-1);
            cell.innerHTML = formatter ? formatter(index, data[index]): data[index];
        }
    }

    // Create regular body
    tBody = document.createElement('tbody');
    tableRef.appendChild(tBody);

    var regexp;
    if(seriesFilter) {
        regexp = new RegExp(seriesFilter, 'i');
    }
    // Populate body with data.items array
    for(var index=0; index < info.items.length; index++){
        var item = info.items[index];
        if((!regexp || filtersOnlySampleSeries && !info.supportsControllersDiscrimination || regexp.test(item.data[seriesIndex]))
                &&
                (!showControllersOnly || !info.supportsControllersDiscrimination || item.isController)){
            if(item.data.length > 0) {
                var newRow = tBody.insertRow(-1);
                for(var col=0; col < item.data.length; col++){
                    var cell = newRow.insertCell(-1);
                    cell.innerHTML = formatter ? formatter(col, item.data[col]) : item.data[col];
                }
            }
        }
    }

    // Add support of columns sort
    table.tablesorter({sortList : defaultSorts});
}

$(document).ready(function() {

    // Customize table sorter default options
    $.extend( $.tablesorter.defaults, {
        theme: 'blue',
        cssInfoBlock: "tablesorter-no-sort",
        widthFixed: true,
        widgets: ['zebra']
    });

    var data = {"OkPercent": 73.88762585254953, "KoPercent": 26.11237414745047};
    var dataset = [
        {
            "label" : "FAIL",
            "data" : data.KoPercent,
            "color" : "#FF6347"
        },
        {
            "label" : "PASS",
            "data" : data.OkPercent,
            "color" : "#9ACD32"
        }];
    $.plot($("#flot-requests-summary"), dataset, {
        series : {
            pie : {
                show : true,
                radius : 1,
                label : {
                    show : true,
                    radius : 3 / 4,
                    formatter : function(label, series) {
                        return '<div style="font-size:8pt;text-align:center;padding:2px;color:white;">'
                            + label
                            + '<br/>'
                            + Math.round10(series.percent, -2)
                            + '%</div>';
                    },
                    background : {
                        opacity : 0.5,
                        color : '#000'
                    }
                }
            }
        },
        legend : {
            show : true
        }
    });

    // Creates APDEX table
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.4319584280610588, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.6026315789473684, 500, 1500, "GetAll 2min rule-1"], "isController": false}, {"data": [0.20789473684210527, 500, 1500, "GetAll Archives"], "isController": false}, {"data": [0.5688775510204082, 500, 1500, "GetAll Archives-1"], "isController": false}, {"data": [0.9631578947368421, 500, 1500, "GetAll 2min rule-0"], "isController": false}, {"data": [0.9413265306122449, 500, 1500, "GetAll Archives-0"], "isController": false}, {"data": [0.9108910891089109, 500, 1500, "GetAll About-0"], "isController": false}, {"data": [0.5198019801980198, 500, 1500, "GetAll About-1"], "isController": false}, {"data": [0.2507987220447284, 500, 1500, "GetAll 2min rule"], "isController": false}, {"data": [0.1986842105263158, 500, 1500, "GetAll About"], "isController": false}, {"data": [0.0, 500, 1500, "Home"], "isController": false}, {"data": [0.47555555555555556, 500, 1500, "Home-0"], "isController": false}, {"data": [0.4777777777777778, 500, 1500, "Home-1"], "isController": false}]}, function(index, item){
        switch(index){
            case 0:
                item = item.toFixed(3);
                break;
            case 1:
            case 2:
                item = formatDuration(item);
                break;
        }
        return item;
    }, [[0, 0]], 3);

    // Create statistics table
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 3079, 804, 26.11237414745047, 4806.798960701537, 1, 21072, 1001.0, 21042.0, 21048.0, 21057.0, 15.733908386648405, 23.548040215938823, 2.083431808658504], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["GetAll 2min rule-1", 190, 13, 6.842105263157895, 693.2368421052631, 21, 1611, 608.5, 1178.5, 1241.45, 1448.1100000000006, 1.7761159149333958, 2.098073440056088, 0.23561652839448471], "isController": false}, {"data": ["GetAll Archives", 380, 191, 50.26315789473684, 10118.747368421058, 43, 21062, 1623.0, 21054.0, 21056.95, 21061.19, 2.2126727922766074, 4.842149405999255, 0.2984936083598272], "isController": false}, {"data": ["GetAll Archives-1", 196, 7, 3.5714285714285716, 760.1377551020404, 15, 1524, 659.5, 1195.5, 1356.6999999999991, 1516.24, 1.8349139181965417, 2.0988638132272954, 0.25054715365999797], "isController": false}, {"data": ["GetAll 2min rule-0", 190, 0, 0.0, 352.2210526315789, 284, 913, 308.0, 344.9, 882.9, 907.54, 1.7685441158675639, 0.9102148257518639, 0.22970348379920508], "isController": false}, {"data": ["GetAll Archives-0", 196, 0, 0.0, 380.4081632653063, 284, 947, 312.0, 850.1000000000001, 903.7499999999999, 947.0, 1.835927986661421, 0.9449672389891156, 0.22949099833267766], "isController": false}, {"data": ["GetAll About-0", 202, 0, 0.0, 413.41584158415844, 282, 939, 312.5, 878.7, 893.85, 936.79, 1.8913149320250178, 0.973398848591813, 0.23087340478821017], "isController": false}, {"data": ["GetAll About-1", 202, 17, 8.415841584158416, 739.7178217821782, 9, 1517, 635.5, 1225.5000000000005, 1292.8, 1494.97, 1.8877446124516382, 2.2890892946423564, 0.24481140368297105], "isController": false}, {"data": ["GetAll 2min rule", 313, 136, 43.45047923322684, 8036.795527156547, 37, 21072, 1302.0, 21047.0, 21054.0, 21057.86, 1.62475018816995, 3.4104130573723688, 0.2589364504658828], "isController": false}, {"data": ["GetAll About", 380, 195, 51.31578947368421, 9700.492105263163, 6, 21063, 1549.5, 21047.0, 21049.0, 21050.38, 2.508598551614415, 5.525937433984248, 0.33571975117012914], "isController": false}, {"data": ["Home", 380, 200, 52.63157894736842, 9683.715789473683, 1152, 21069, 2368.0, 21048.0, 21051.95, 21059.76, 2.867015738407448, 6.491257547136002, 0.39123801323354107], "isController": false}, {"data": ["Home-0", 225, 0, 0.0, 1211.928888888888, 1098, 2291, 1180.0, 1299.8000000000002, 1496.2999999999995, 1636.96, 2.0832947538008555, 1.0723813997657452, 0.24413610396103777], "isController": false}, {"data": ["Home-1", 225, 45, 20.0, 647.5244444444447, 1, 1506, 567.0, 1218.0, 1337.5999999999995, 1469.0200000000002, 2.1032951624211265, 2.899005316662772, 0.23826390511801823], "isController": false}]}, function(index, item){
        switch(index){
            // Errors pct
            case 3:
                item = item.toFixed(2) + '%';
                break;
            // Mean
            case 4:
            // Mean
            case 7:
            // Median
            case 8:
            // Percentile 1
            case 9:
            // Percentile 2
            case 10:
            // Percentile 3
            case 11:
            // Throughput
            case 12:
            // Kbytes/s
            case 13:
            // Sent Kbytes/s
                item = item.toFixed(2);
                break;
        }
        return item;
    }, [[0, 0]], 0, summaryTableHeader);

    // Create error table
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to lifecharger.org:443 [lifecharger.org/162.241.225.105] failed: Connection timed out: connect", 601, 74.75124378109453, 19.519324455992205], "isController": false}, {"data": ["500/Internal Server Error", 2, 0.24875621890547264, 0.06495615459564794], "isController": false}, {"data": ["Non HTTP response code: org.apache.http.NoHttpResponseException/Non HTTP response message: lifecharger.org:443 failed to respond", 201, 25.0, 6.528093536862618], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 3079, 804, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to lifecharger.org:443 [lifecharger.org/162.241.225.105] failed: Connection timed out: connect", 601, "Non HTTP response code: org.apache.http.NoHttpResponseException/Non HTTP response message: lifecharger.org:443 failed to respond", 201, "500/Internal Server Error", 2, "", "", "", ""], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": ["GetAll 2min rule-1", 190, 13, "Non HTTP response code: org.apache.http.NoHttpResponseException/Non HTTP response message: lifecharger.org:443 failed to respond", 12, "500/Internal Server Error", 1, "", "", "", "", "", ""], "isController": false}, {"data": ["GetAll Archives", 380, 191, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to lifecharger.org:443 [lifecharger.org/162.241.225.105] failed: Connection timed out: connect", 172, "Non HTTP response code: org.apache.http.NoHttpResponseException/Non HTTP response message: lifecharger.org:443 failed to respond", 19, "", "", "", "", "", ""], "isController": false}, {"data": ["GetAll Archives-1", 196, 7, "Non HTTP response code: org.apache.http.NoHttpResponseException/Non HTTP response message: lifecharger.org:443 failed to respond", 7, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["GetAll About-1", 202, 17, "Non HTTP response code: org.apache.http.NoHttpResponseException/Non HTTP response message: lifecharger.org:443 failed to respond", 17, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["GetAll 2min rule", 313, 136, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to lifecharger.org:443 [lifecharger.org/162.241.225.105] failed: Connection timed out: connect", 110, "Non HTTP response code: org.apache.http.NoHttpResponseException/Non HTTP response message: lifecharger.org:443 failed to respond", 25, "500/Internal Server Error", 1, "", "", "", ""], "isController": false}, {"data": ["GetAll About", 380, 195, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to lifecharger.org:443 [lifecharger.org/162.241.225.105] failed: Connection timed out: connect", 164, "Non HTTP response code: org.apache.http.NoHttpResponseException/Non HTTP response message: lifecharger.org:443 failed to respond", 31, "", "", "", "", "", ""], "isController": false}, {"data": ["Home", 380, 200, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to lifecharger.org:443 [lifecharger.org/162.241.225.105] failed: Connection timed out: connect", 155, "Non HTTP response code: org.apache.http.NoHttpResponseException/Non HTTP response message: lifecharger.org:443 failed to respond", 45, "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": ["Home-1", 225, 45, "Non HTTP response code: org.apache.http.NoHttpResponseException/Non HTTP response message: lifecharger.org:443 failed to respond", 45, "", "", "", "", "", "", "", ""], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
