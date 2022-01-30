var input = [];
var data = [];

var canvas = document.getElementById("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var ctx = canvas.getContext("2d");
ctx.fillStyle = "#2d2d2d";
ctx.fillRect(30, 50, 750, 175);

async function dropHandler(ev) 
{
	log('File(s) dropped');
	ev.preventDefault();

	
	var count = 0;

    	for (const file of ev.dataTransfer.files)	
	{
		const fileName = file.name;
		if(fileName.endsWith('.txt'))
		{
			file.text().then(function(text){input.push(text);})
			count++;
			log('file [' + (count) + '] "' + fileName + '" uploaded successfully');
		} else {
			log('file [' + (count) + '] "' + fileName + '" is NOT a text file');
			}
    	}
	log(count + ' file(s) successfully uploaded');
}

function parse()
{
	log('data parsing started');
	var count = 0;

	for(i = 0; i < input.length; i++)
	{
		var temp = input[i].split('\r\n');
		var size = 0;
		var sizea = [];
		var min = 0;
		var mina = [];
		var avg = 0;
		var avga = [];
		var max = 0;
		var maxa = [];
		var split = 0;

		for(j = 0; j < temp.length; j++)
		{
			

			if(temp[j].startsWith('Trials completed:'))
			{
				mina.push(temp[j - split].substring(39, 47));
				avga.push(temp[j - split].substring(53, 61));
				maxa.push(temp[j - split].substring(67));
				sizea.push(size);
			}

			if(temp[j].startsWith('Problem size:'))
			{
				size = temp[j].substring(13);
				if(split > 0){
				data[count] = new Array();
				data[count].push(sizea);
				data[count].push(mina);
				data[count].push(avga);
				data[count].push(maxa);
				count++;
				}
				split = j;
				sizea = [];
				maxa = [];
				avga = [];
				mina = [];
				j += 11;
			}
			
			
		}
		data[count] = new Array();
		data[count].push(sizea);
		data[count].push(mina);
		data[count].push(avga);
		data[count].push(maxa);	
		count++;
	}

	log('data parsing complete');
}



function dragOverHandler(ev) {ev.preventDefault();}
function log(text) {console.log(text); document.getElementById("text_output").innerHTML = '~ ' + text + '<br>' + document.getElementById("text_output").innerHTML;}

function export_image() 
{
	var canvas = document.getElementById("canvas");
	var img = new Image();
	link = document.createElement('a')
	uri = canvas.toDataURL();
	link.href = uri
        link.download = 'export.png'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
}

function export_text() 
{
	var element = document.createElement('a');
    	element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(data));
    	element.setAttribute('download', "export");
    	element.style.display = 'none';
    	document.body.appendChild(element);
    	element.click();
    	document.body.removeChild(element);

	log('text exported');
}
