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