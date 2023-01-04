import styles from './output.css';

export const outputClear = () => {
	let e = document.getElementsByClassName(styles.outputContainer);
	e[0].innerHTML = "";
	outputLines = 0;
};

var outputLines = 0;
export const outputWrite = (line) => {
	let e = document.getElementsByClassName(styles.outputContainer);
	line = line.replace(/\\n/g, "\n");
	let i = line.indexOf("\n");
	while(i >= 0) {
		e[0].innerHTML += line.substr(0, i) + "<br>";
		line = line.substr(i + 1);
		i = line.indexOf("\n");
		outputLines++;
		if(outputLines > 100) {
			outputLines--;
			let html = e[0].innerHTML;
			let j = html.indexOf("<br>");
			e[0].innerHTML = html.substr(j+4);
		}
	}
	if(line.length > 0)
		e[0].innerHTML += line;
	e[0].scrollBy(0, 9999);
};
