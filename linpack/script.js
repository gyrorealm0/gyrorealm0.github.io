var input = [""];

var data = [[],[],[],[],[]];

function checkfile(fileName) {
	
}


function dropHandler(ev) 
{
	console.log('File(s) dropped');
	document.getElementById("text_output").innerHTML = '~ File(s) dropped' + document.getElementById("text_output").innerHTML;
	ev.preventDefault();

	
    	for (const file of ev.dataTransfer.files) 
	{
		const fileName = file.name;
		if(fileName.endsWith('.txt') & fileName.startsWith('linpack_output'))
		{
			file.text().then(function(text){input.push(text);})
			console.log('file [' + (input.unshift()) + '] ' + fileName + ' uploaded successfully');
			document.getElementById("text_output").innerHTML = '~ file [' + (input.unshift()) + '] "' + fileName + '" uploaded successfully<br>' + document.getElementById("text_output").innerHTML;
		} else {
			console.warn('file [' + (input.unshift()) + '] ' + fileName + ' is %cNOT a linpack export', "color:red");
			document.getElementById("text_output").innerHTML = '~ file [' + (input.unshift()) + '] "' + fileName + '" is NOT a linpack export<br>' + document.getElementById("text_output").innerHTML;
		}	
		
    	}

	console.log(input.unshift() + ' file(s) successfully uploaded');
	document.getElementById("text_output").innerHTML = '~ ' + input.unshift() + ' file(s) successfully uploaded<br>' + document.getElementById("text_output").innerHTML;
}



function dragOverHandler(ev) 
{
	ev.preventDefault();

}

function export_image()
{
	console.log('text exported');
}

function export_text()
{
	console.log('text exported');
}

function refresh()
{
	
	window.location.reload()
}
