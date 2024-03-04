const form = document.getElementById('generate-form');
const qr = document.getElementById('qrcode');

function onGenerateSubmit(e) {
    e.preventDefault();
    clearUI();

    const url = document.getElementById('url').value;
    const size =document.getElementById('size').value;
    const color = document.getElementById('color').value;

    if (url === '') {
        alert('Please enter a URL');
    } else {
        
        /* Show form submission in console
        console.log(url,size,color); */

        setTimeout(generateQRCode(url, size, color),2000);
        setTimeout(function canvasImg(){
            const img = qr.querySelector('img').src;
            addLogo(img);
        },50);
        setTimeout(function linkURL() {
            const saveUrl = qr.querySelector('img').src;
            createSaveBtn(saveUrl);
        },50);
    }   
};

function clearUI() {
    document.getElementById('qrcode').innerHTML = "";
    const savelink = document.getElementById('save-link');
    if (savelink) savelink.remove();

};

function generateQRCode(url, size, color) {
    var qrcode = new QRCode('qrcode', {
        text: url,
        width: size,
        height: size,
        colorDark: color,
    });
   setTimeout(showClear(),4000);
};

function addLogo(saveURL) {
    const canvas = document.getElementById('qrcodecanvas');
    const ctx = canvas.getContext("2d");

    const image = new Image();
    image.onload = drawImageActualSize;

    image.src = saveURL;

    function drawImageActualSize() {
        canvas.width = this.naturalWidth;
        canvas.width = this.naturalHeight;
    }

    ctx.drawImage(this, 0,0);
}
    
function createSaveBtn (saveURL) {
    const link = document.createElement('a');
    link.id = "save-link";
    link.classList = 'bg-red-500 hover:bg-red-700 text-white font-bold py-2 rounded w-1/3 m-auto my-5';
    link.href = saveURL;
    link.download = 'qrcode'
    link.innerHTML = 'Save Image'
    document.getElementById('generated').appendChild(link);
};

function hideClear() {
    document.getElementById('clear').style.display = 'none';
}

function showClear() {
    document.getElementById('clear').style.display = 'block';
}

hideClear();

form.addEventListener('submit', onGenerateSubmit);
form.addEventListener('clear',clearUI);