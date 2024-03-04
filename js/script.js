const form = document.getElementById('generate-form');
const qr = document.getElementById('qrcode');

function onGenerateSubmit(e) {
    e.preventDefault();
    document.getElementById('qrcode').innerHTML = "";

    const url = document.getElementById('url').value;
    const size =document.getElementById('size').value;

    if (url === '') {
        alert('Please enter a URL');
    } else {
        console.log(url, size);
        generateQRCode(url, size);
    }   

};

function generateQRCode(url, size) {
    var qrcode = new QRCode('qrcode', {
        text: url,
        width: size,
        height: size,
    });
   
};

form.addEventListener('submit', onGenerateSubmit);