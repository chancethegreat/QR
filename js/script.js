const form = document.getElementById('generate-form');
const qr = document.getElementById('qrcode');

function onGenerateSubmit(e) {
    e.preventDefault();
    clearUI();

    const url = document.getElementById('url').value;
    const size =document.getElementById('size').value;

    if (url === '') {
        alert('Please enter a URL');
    } else {
        
        setTimeout(generateQRCode(url, size),10000);

        setTimeout(function saveURL() {
            const saveUrl = qr.querySelector('img').src;
            createSaveBtn(saveUrl);
        },50);
    }   
};

function clearUI() {
    document.getElementById('qrcode').innerHTML = "";
    const savelink = document.getElementById('save-link');
    if (savelink)
        savelink.remove();

};

function generateQRCode(url, size) {
    var qrcode = new QRCode('qrcode', {
        text: url,
        width: size,
        height: size,
    });
   
};

    
function createSaveBtn (saveURL) {
    const link = document.createElement('a');
    link.id = "save-link";
    link.classList = 'bg-red-500 hover:bg-red-700 text-white font-bold py-2 rounded w-1/3 m-auto my-5';
    link.href = saveURL;
    link.download = 'qrcode'
    link.innerHTML = 'Save Image'
    document.getElementById('generated').appendChild(link);
};

form.addEventListener('submit', onGenerateSubmit);