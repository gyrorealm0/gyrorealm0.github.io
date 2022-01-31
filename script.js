var input = [];
var data = [];
var results = [];


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
		log('parsing file ' + (i + 1));
		
		var temp = input[i].split('\r\n');
		var size = 0;
		var sizea = [];
		var min = 0;
		var mina = [];
		var avg = 0;
		var avga = [];
		var max = 0;
		var maxa = [];
		var time = 0;
		var timea = [];
		var split = 0;

		for(j = 0; j < temp.length; j++)
		{
			

			if(temp[j].startsWith('Trials completed:'))
			{
				mina.push(temp[j].substring(39, 47));
				avga.push(temp[j].substring(53, 61));
				maxa.push(temp[j].substring(67));
				sizea.push(size);
				timea.push(time);
			}
	

			if(temp[j].startsWith('Time to run:'))
			{
				time = temp[j].substring(13, temp[j].indexOf[" "]);
			}

			if(temp[j].startsWith('Problem size:'))
			{
				size = temp[j].substring(14);
				if(split > 0){
				data[count] = new Array();
				data[count].push(sizea);
				data[count].push(mina);
				data[count].push(avga);
				data[count].push(maxa);
				data[count].push(timea);
				count++;
			}
				split = j;
				sizea = [];
				maxa = [];
				avga = [];
				mina = [];
				timea = [];
				j += 11;
		}
			
			
	}
		data[count] = new Array();
		data[count].push(sizea);
		data[count].push(mina);
		data[count].push(avga);
		data[count].push(maxa);	
		data[count].push(timea);
		count++;
	}

	log('data parsing complete');
}

function graph(){
	var canvas = document.getElementById("canvas");
	log('graphing started');
	document.getElementById("image").hidden = true;
	log('analysis started');
	for(i = 0; i < data.length; i++)
	{
		analyze(i);
	}

	canvas.width = window.innerWidth - 270;
	canvas.height = window.innerHeight;
	var ctx = canvas.getContext("2d");

	var image = document.getElementById("image");
	ctx.drawImage(image, 0, 0);

	var b = 974;
	ctx.fillStyle = 'white';
	ctx.font = '2.5vh Typewriter'
	ctx.fillText("File", 32, 50);
	ctx.fillText("Problem Size", 146, 50);
	ctx.fillText("Time to Run", 362, 50);
	ctx.fillText("Variation", 562, 50);
	ctx.fillText("Deviation", 738, 50);
	ctx.fillText("Loss", 942, 50);
	ctx.fillText("Score", 1146, 50);

	ctx.fillText("File", 32, b);
	ctx.fillText("Problem Size", 146, b);
	ctx.fillText("Time to Run", 362, b);
	ctx.fillText("Variation", 562, b);
	ctx.fillText("Deviation", 738, b);
	ctx.fillText("Loss", 942, b);
	ctx.fillText("Score", 1146, b);
	
	
	
	
	
		
	ctx.font = '2vh Typewriter'

	for(i = 0; i < results.length & i < 22; i++)
	{
		for(j = 0; j < 7; j++)
		{
			ctx.fillText(results[i][j], 32 + 175 * j, 90 + 40 * i);
		}
	}

	
	

	log('graphing complete');
}

function analyze(i)
{
	log('analyzing run ' + (1 + i));

		var maxi = 0;	
		var mini = 1000;
		var avg = 0;
		var range = 0;
		var variation = 0;
		var loss = 0;
		var score = 0;
		var temp = 0;
		var tempa = [];
		var length = data[i][0].unshift();

		var time = data[i][4][0].substring(0, data[i][4][0].indexOf(" "));
		for(j = 0; j < length; j++)
		{
			if(data[i][1][j] < mini){ mini = data[i][1][j]; } 
			if(data[i][3][j] > maxi){ maxi = data[i][3][j]; } 

			temp = temp + Number.parseFloat(data[i][2][j]);
		}
		avg = temp / data[i].length;
		range = maxi - mini;

		variation = 100 * (range / avg) * range;
		loss = data[i][2][0] - data[i][2][length - 1];
		score = 0.1 * (((time) / (variation)) - ((time) * (loss)));
		
				

		tempa.push(i + 1);
		tempa.push(data[i][0][0]);
		tempa.push(data[i][4][0]);
		tempa.push(parseFloat(100 * ((maxi / mini) - 1)).toFixed(4) + " %");
		tempa.push(parseFloat(variation).toFixed(4) + " Gflops");
		tempa.push(parseFloat(loss).toFixed(4) + " Gflops");
		tempa.push(parseFloat(score).toFixed(2) + " Stability");
		results.push(tempa);

		log('analysis complete');
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
	
	log('image exported');
}

function export_text() 
{
	var text = document.getElementById("text_output").innerHTML.split("<br>");

	for(i = 0; i < text.length; i++)
	{ 
		text[i] += "\r\n";
	}
	
	text.join("");
	var element = document.createElement('a');
    	element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    	element.setAttribute('download', "export");
    	element.style.display = 'none';
    	document.body.appendChild(element);
    	element.click();
    	document.body.removeChild(element);

	log('text exported');
}
