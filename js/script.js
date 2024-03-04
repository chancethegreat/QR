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
        
        console.log(url,size,color);

        setTimeout(generateQRCode(url, size, color),10000);

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

function generateQRCode(url, size, color) {
    var qrcode = new QRCode('qrcode', {
        text: url,
        width: size,
        height: size,
        colorDark: color,
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