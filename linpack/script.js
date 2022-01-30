var input = [];

var data = [[],[],[],[],[]];

function checkfile(fileName) {
	
}


function dropHandler(ev) 
{
	log('File(s) dropped');
	ev.preventDefault();

	
    	for (const file of ev.dataTransfer.files) 
	{
		const fileName = file.name;
		if(fileName.endsWith('.txt') & fileName.startsWith('linpack_output'))
		{
			file.text().then(function(text){input.push(text);})

			log(JSON.stringify(input));
			
			log('file [' + (input.unshift()) + '] "' + fileName + '" uploaded successfully');
		} else {	
			log('file [' + (input.length) + '] "' + fileName + '" is NOT a linpack export');
			}	
		
    	}

	log(input.length + ' file(s) successfully uploaded');
}



function dragOverHandler(ev) {ev.preventDefault();}
function refresh() {window.location.reload();}
function log(text) {console.log(text); document.getElementById("text_output").innerHTML = '~ ' + text + '<br>' + document.getElementById("text_output").innerHTML;}
function export_image() {log('text exported'); log(input.length); log(JSON.stringify(input)); log(input.unshift());}
function export_text() {log('text exported');}
