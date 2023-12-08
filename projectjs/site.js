function degreeStatusHide() {
  var degreeLevel = document.getElementById("degreeStatus");
  if (degreeLevel.value === "underGrad") {
    document.getElementById('usDegree').style.display = 'none';
  } else {
    document.getElementById('usDegree').style.display = 'block';
  }
}

function uploadCertHide() {
  if (document.getElementById('eligbCertYes').checked) {
    document.getElementById('uploadEligbCert').style.display = 'block';
  }
  else document.getElementById('uploadEligbCert').style.display = 'none';
}

function usDegree() {
  if (document.getElementById('degreeFromUSYes').checked) {
    document.getElementById('needEligbCert').style.display = 'none';
    document.getElementById('uploadEligbCert').style.display = 'none';
  } else {
    document.getElementById('needEligbCert').style.display = 'block';
    document.getElementById('uploadEligbCert').style.display = 'block';
  }
}

//Functions to access data storage and capture
const fs = require('fs');
const studentListPath = "projectData/studentlist.csv";
const applicationListPath = "projectData/applicationlist.csv";
const submissionListPath = "projectData/submissionlist.csv";


//Function for reading the data from csv
function getCSV(filePath) {
  const csvData = fs.readFileSync(filePath, 'utf8');
  const rows = csvData.split('\n');

  const result = [];
  for (const row of rows) {
    const values = row.split(',');
    result.push(values);
  }

  return result;
}

function parseStudentData() {
  const studentData = getCSV(studentListPath);
  const headers = csvArray[0];

  const data = [];

  for (let i = 1; i < csvArray.length; i++) {
    const values = csvArray[i];

    const entry = {};
    for (let j = 0; j < headers.length; j++) {
      entry[headers[j]] = values[j];
    }

    data.push(entry);
  }

  return data;
}

function getStudentData(email) {
  const studentData = parseStudentData();
  const student = studentData.find(student => student.email === email);
  return student;
}

//Function to add a row to the bottom of the job list csv
function addToJobList(index, owner, className, classNumber, classLevel, datePosted, applicationDeadline, position, status) {

  let prevCSV = getCSV(applicationListPath);
  const newRow = [index, owner, className, classNumber, classLevel, datePosted, applicationDeadline, position, status];
  prevCSV.push(newRow);

  const csvContent = prevCSV.map(row => row.join(',')).join('\n');
  fs.writeFileSync(applicationListPath, csvContent, 'utf8');
}

//Function to add a row to job submission csv
function addToJobSubmission(index, owner, submitter, firstName, lastName, studentNumber, classNumber, degreeLevel, USDegree, eligibilityCertificate, submissionDate, status) {

  let prevCSV = getCSV(submissionListPath);
  const newRow = [index, owner, submitter, firstName, lastName, studentNumber, classNumber, degreeLevel, USDegree, eligibilityCertificate, submissionDate, status];
  prevCSV.push(newRow);

  const csvContent = prevCSV.map(row => row.join(',')).join('\n');
  fs.writeFileSync(submissionListPath, csvContent, 'utf8');
}

//Function to update a row in a csv
//When updating for the column, here is the index of each row for both files:
//Job List:
//index[0], owner[1], className[2], classNumber[3], classLevel[4], datePosted[5], applicationDeadline[6], position[7], status[8]
//
//Job Submission:
//index[0], owner[1], submitter[2], firstName[3], lastName[4], studentNumber[5], classNumber[6], degreeLevel[7], USDegree[8], eligibilityCertificate[9], submissionDate[10], status[11]

function updateValueCSV(row, column, updatedValue, filePath) {
  let csvArray = getCSV(filePath);

  if (csvArray[row] && csvArray[row][column]) {
    csvArray[row][column] = updatedValue;
  } else {
    console.log('Row or column index is out of range.');
  }

  const csvContent = csvArray.map(row => row.join(',')).join('\n');
  fs.writeFileSync(filePath, csvContent, 'utf8');
}

var table = document.getElementsByTagName("table")[0];
var tbody = table.getElementsByTagName("tbody")[0];
tbody.onclick = function(e) {
  e = e || window.event;
  var data = [];
  var target = e.srcElement || e.target;
  while (target && target.nodeName !== "TR") {
    target = target.parentNode;
  }

  if (target) {
    var cells = target.getElementsByTagName("td");
    for (var i = 0; i < cells.length; i++) {
      data.push(cells[i].innerHTML);
    }
  }
  alert(data);
};
