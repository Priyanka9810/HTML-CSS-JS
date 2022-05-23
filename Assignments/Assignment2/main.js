var selectedRow = null;
var pass = 0;
var fail = 0;

function onFormSubmit() {

    event.preventDefault();
    var formData = readFormData();
    if (selectedRow == null) {
        insertData(formData);
    } else {
        updateRecord(formData);
        selectedRow = null;
    }
    resetForm();


}
//for retriving the data

function readFormData() {
    var formData = {}
    formData["roll_no"] = document.getElementById("roll_no").value;
    formData["name"] = document.getElementById("name").value;
    formData["physics"] = document.getElementById("physics").value;
    formData["chemistry"] = document.getElementById("chemistry").value;
    formData["math"] = document.getElementById("math").value;
    return formData;
}

//for inserting the data

function insertData(data) {


    var table = document.getElementById("storeList").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);


    $("#table_info").hide();


    var cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.roll_no;

    var cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.name;

    var cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.physics;

    var cell4 = newRow.insertCell(3);
    cell4.innerHTML = data.chemistry;

    var cell5 = newRow.insertCell(4);
    cell5.innerHTML = data.math;

    var cell6 = newRow.insertCell(5);
    var res = (parseInt(data.physics) + parseInt(data.chemistry) + parseInt(data.math));
    cell6.innerHTML = res;

    var cell7 = newRow.insertCell(6);
    if ((parseInt(data.physics) < 17) || (parseInt(data.chemistry) < 17) || (parseInt(data.math) < 17)) {
        cell7.innerHTML = 'Fail';
        // failCounter();

    } else {
        cell7.innerHTML = 'Pass';
        // passCounter();

    }

    var cell8 = newRow.insertCell(7);
    cell8.innerHTML = `<button onclick='onEdit(this)'> Edit </button><button onclick='onDelete(this,"storeList")' style="background:red;" >Del</button >`;

    updatePassFailRatio("storeList");

}

//Edit the data

function onEdit(td) {
    document.getElementById('add').value = "Update";
    selectedRow = td.parentElement.parentElement;
    document.getElementById('roll_no').value = selectedRow.cells[0].innerHTML;
    document.getElementById('name').value = selectedRow.cells[1].innerHTML;
    document.getElementById('physics').value = selectedRow.cells[2].innerHTML;
    document.getElementById('chemistry').value = selectedRow.cells[3].innerHTML;
    document.getElementById('math').value = selectedRow.cells[4].innerHTML;

}

function updateRecord(formData) {
    selectedRow.cells[0].innerHTML = formData.roll_no;
    selectedRow.cells[1].innerHTML = formData.name;
    selectedRow.cells[2].innerHTML = formData.physics;
    selectedRow.cells[3].innerHTML = formData.chemistry;
    selectedRow.cells[4].innerHTML = formData.math;
    var res1 = parseInt(formData.physics) + parseInt(formData.chemistry) + parseInt(formData.math);
    selectedRow.cells[5].innerHTML = res1;
    if ((parseInt(formData.physics) < 17) || (parseInt(formData.chemistry) < 17) || (parseInt(formData.math) < 17)) {
        selectedRow.cells[6].innerHTML = 'Fail'

    } else {
        selectedRow.cells[6].innerHTML = 'Pass'


    }
    document.getElementById('add').value = "Add";
    updatePassFailRatio("storeList");

}

//delete the data
function onDelete(td) {

    if (confirm('Do you want to delete this record?')) {
        row = td.parentElement.parentElement;
        document.getElementById('storeList').deleteRow(row.rowIndex);
        updatePassFailRatio('storeList');

    }

    resetForm();
}

//Reset the data
function resetForm() {
    document.getElementById('roll_no').value = '';
    document.getElementById('name').value = '';
    document.getElementById('physics').value = '';
    document.getElementById('chemistry').value = '';
    document.getElementById('math').value = '';
    selectedRow = null;
}

//pass fail Ratio
function updatePassFailRatio(table_id) {
    var tab = document.getElementById(table_id);
    var col = 6;

    var n = tab.rows.length;
    var i,
        tr, td;
    var failCounter = 0;
    var passCounter = 0;


    for (i = 0; i < n; i++) {
        // $("#table_info").show();
        tr = tab.rows[i];
        if (tr.cells.length > col) {
            td = tr.cells[col];
            if (td.innerText == 'Pass') {
                passCounter++;
            }
            if (td.innerText == 'Fail') {
                failCounter++;
            }
        }
    }

    document.getElementById("passStudent").value = passCounter;
    document.getElementById("failStudent").value = failCounter;
    document.getElementById("passPercent").value = parseFloat((passCounter / (failCounter + passCounter)) * 100);
    if (failCounter == 0 && passCounter == 0) {
        $("#table_info").show();
    }

}


//details of Pass 
function passCounter() {
    pass += 1;
    document.getElementById("passStudent").value = pass;

}

//details of Fail
function failCounter() {
    fail += 1;
    document.getElementById("failStudent").value = fail;

}