import styles from './output.css';

export const outputClear = () => {
	let e = document.getElementsByClassName(styles.outputBody2);
	e[0].innerHTML = "";
	e[0].style.display = "none";
	e = document.getElementsByClassName(styles.outputBody);
	e[0].innerHTML = "";
	e[0].style.width = "calc(100%)";
	outputLines = 0;
	outputLines2 = 0;
};

var outputLines = 0;
var outputLines2 = 0;
export const outputWrite = (line) => {
	let e = document.getElementsByClassName(styles.outputBody);
	let lines = editline(line);
	if(lines[0].length > 0) {
		if(lines[2]) {
			e[0].innerHTML = "";
		}
		outputLines = showline(e[0], lines[0], outputLines);
	}
	if(lines[1].length > 0) {
		let e2 = document.getElementsByClassName(styles.outputBody2);
		if(lines[3]) {
			e2[0].innerHTML = "";
		}
		outputLines2 = showline(e2[0], lines[1], outputLines2);
		e[0].style.width = "calc(50%)";
		e2[0].style.display = "inline-block";
	}
};

const showline = (e, line, curr) => {
	let i = line.indexOf("\n");
	while(i >= 0) {
		e[0].innerHTML += line[i].substr(0, i) + "<br>";
		line = line[i].substr(i + 1);
		i = line.indexOf("\n");
		curr++;
		if(curr > 100) {
			curr--;
			let html = e.innerHTML;
			let j = html.indexOf("<br>");
			e.innerHTML = html.substr(j+4);
		}
	}
	if(line.length > 0)
		e.innerHTML += line;
	e.scrollBy(0, 9999);
	return curr;
};
const editline = (line) => {
	let lines = ["", "", false, false];
	line = line.split("\x1b[0z");
	for(let i=0; i<line.length; i++) {
		let data = line[i].split("\x1b[1z");
		if(data[0].indexOf("\x1b[2J") >= 0) {
			lines[2] = true;
			data[0] = data[0].replace(/\x1b\[2J/g, "");
		}
		lines[0] += editpart(data[0]);
		for(let j=1; j<data.length; j++) {
			if(data[j].indexOf("\x1b[2J") >= 0) {
				lines[3] = true;
				data[j] = data[j].replace(/\x1b\[2J/g, "");
			}
			lines[1] += editpart(data[j]);
		}
	}
	return lines;
}
const editpart = (line) => {
	line = line.replace(/\r/g, "");
	line = line.split("\x1b");
	for(let i=1; i<line.length; i++) {
		if(line[i].startsWith("[1m")) {
			line[i] = "<span style='font-weigh:bold;'>" + line[i].substr(3);
			line.push("</span>");
			continue;
		}
		if(line[i].startsWith("[4m")) {
			line[i] = "<span style='text-decoration:underline;'>" + line[i].substr(3);
			line.push("</span>");
			continue;
		}
		if(line[i].startsWith("[30m")) {
			line[i] = "<span style='color:#000;'>" + line[i].substr(4);
			line.push("</span>");
			continue;
		}
		if(line[i].startsWith("[31m")) {
			line[i] = "<span style='color:#f00;'>" + line[i].substr(4);
			line.push("</span>");
			continue;
		}
		if(line[i].startsWith("[32m")) {
			line[i] = "<span style='color:#0f0;'>" + line[i].substr(4);
			line.push("</span>");
			continue;
		}
		if(line[i].startsWith("[33m")) {
			line[i] = "<span style='color:#ff0;'>" + line[i].substr(4);
			line.push("</span>");
			continue;
		}
		if(line[i].startsWith("[34m")) {
			line[i] = "<span style='color:#00f;'>" + line[i].substr(4);
			line.push("</span>");
			continue;
		}
		if(line[i].startsWith("[35m")) {
			line[i] = "<span style='color:#f0f;'>" + line[i].substr(4);
			line.push("</span>");
			continue;
		}
		if(line[i].startsWith("[36m")) {
			line[i] = "<span style='color:#0ff;'>" + line[i].substr(4);
			line.push("</span>");
			continue;
		}
		if(line[i].startsWith("[37m")) {
			line[i] = "<span style='color:#fff;'>" + line[i].substr(4);
			line.push("</span>");
			continue;
		}
		if(line[i].startsWith("[39m")) {
			line[i] = "<span style='color:inherit'>" + line[i].substr(4);
			line.push("</span>");
			continue;
		}
		if(line[i].startsWith("[40m")) {
			line[i] = "<span style='background:#000;'>" + line[i].substr(4);
			line.push("</span>");
			continue;
		}
		if(line[i].startsWith("[41m")) {
			line[i] = "<span style='background:#f00;'>" + line[i].substr(4);
			line.push("</span>");
			continue;
		}
		if(line[i].startsWith("[42m")) {
			line[i] = "<span style='background:#0f0;'>" + line[i].substr(4);
			line.push("</span>");
			continue;
		}
		if(line[i].startsWith("[43m")) {
			line[i] = "<span style='background:#ff0;'>" + line[i].substr(4);
			line.push("</span>");
			continue;
		}
		if(line[i].startsWith("[44m")) {
			line[i] = "<span style='background:#00f;'>" + line[i].substr(4);
			line.push("</span>");
			continue;
		}
		if(line[i].startsWith("[45m")) {
			line[i] = "<span style='background:#f0f;'>" + line[i].substr(4);
			line.push("</span>");
			continue;
		}
		if(line[i].startsWith("[46m")) {
			line[i] = "<span style='background:#0ff;'>" + line[i].substr(4);
			line.push("</span>");
			continue;
		}
		if(line[i].startsWith("[47m")) {
			line[i] = "<span style='background:#fff;'>" + line[i].substr(4);
			line.push("</span>");
			continue;
		}
		if(line[i].startsWith("[49m")) {
			line[i] = "<span style='background:inherit'>" + line[i].substr(4);
			line.push("</span>");
			continue;
		}
	}
	return line.join("");
};

