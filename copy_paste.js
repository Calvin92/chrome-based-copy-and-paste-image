var ele = document.querySelector('#container');
ele.onpaste = function(e) {

	var IMAGE_MIME_REG = /^image\/(jpg|jpeg|png|gif)$/;
	var items = e.clipboardData.items; // get the clipboard items

	for(var i = 0, l = items.length; i < l; i++) {
		if(IMAGE_MIME_REG.test(items[i].type)) {
			var imageFile = items[i].getAsFile(); //return a Blob object
			handleLoadImage(imageFile);
			return;
		}
	}
}

function handleLoadImage(imageFile) {
	var oFileReader = new FileReader();

	oFileReader.onload = function(fileReaderEvent) { // only if the file is readed can we create oImage 
		var oImage = new Image();
		oImage.src = fileReaderEvent.target.result;

		var range = window.getSelection().getRangeAt(0); //create a range obj
		range.deleteContents();
		range.insertNode(oImage);
	}

	oFileReader.readAsDataURL(imageFile); 
}

// if you want to compress the image before post to servers
function compressImage(imageSource, pngOrJpeg, quality) {
	var MIME_TYPE = 'image/jpeg'; //default type

	if(pngOrJpeg !== 'undefined' && pngOrJpeg === 'png') {
		MIME_TYPE = 'image/png';
	}

	var oCanavs = document.createElement('canvas');

	oCanavs.width = imageSource.naturalWidth;
	oCanavs.height = imageSource.naturalHeight;

	var ctx = canvas.getContext('2d');
	ctx.drawImage(imageSource, 0, 0);

	var compressedImageData = oCanvas.toDataURL(MIME_TYPE, quality / 100);

	var newImage = new Image();
	newImage.src = compressedImageData;

	return newImage;
}

// if you want to get the the bytes of the image
// caution: Pseudocode,you need to place the path
// tips: you can use promise to return the bytes of the image
function getImageBytes(imageSource) {
	var xhr = new XMLHttpRequest();
	
	xhr.open('HEAD', 'your image path', true);
	
	xhr.onreadystatechange = function(){
	  if ( this.readyState == 4 ) {
	    if ( this.status == 200 ) {
	      console.log('bytes: ' + this.getResponseHeader('Content-Length'));
	    } else {
	      console.log('ERROR');
	    }
	  }
	};

	xhr.send(null);
}