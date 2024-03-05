const form = document.getElementById('generate-form');
const qr = document.getElementById('qrcode');
const qrc = document.getElementsByName('qrcodecanvas');



function onGenerateSubmit(e) {
    e.preventDefault();
    clearUI();

    const url = createUrl();
    const size =document.getElementById('size').value;
    const color = document.getElementById('color').value;

    if (url === '') {
        alert('Please enter a URL');
    } else {
        
        /* Show form submission in console
        console.log(url,size,color); */

        setTimeout(generateQRCode(url, size, color),2000);

        setTimeout(function linkURL() {
            const saveUrl = qr.querySelector('img').src;
            const type = document.getElementById('linkType').selectedOptions[0].textContent;
            createSaveBtn(saveUrl,type);
        },50);
        
        addLogo();

    }   
};

/* change placeholder text based on option chosen for link */
function changeType(option) {
    
    var option = document.getElementById('linkType').value;
    switch (option) {
        case "01":
            document.getElementById('type').placeholder='Enter a URL';
            removeWifiFields();
            break;
        case "02":
            document.getElementById('type').placeholder='Enter an Email Address';
            removeWifiFields();
            break;
        case "03":
            document.getElementById('type').placeholder='Enter a text capable phone number';
            removeWifiFields();
            break;
        case "04":
            document.getElementById('type').placeholder='Enter Maps URL, eg. https://goo.gl/maps/yourlocation';
            removeWifiFields();
            break;
        case "05":
            document.getElementById('type').placeholder='Enter Network Name (SSID)';
            addWifiFields();
            break;
        default:
            document.getElementById('type').placholder='Enter a URL';
            removeWifiFields();
    }

}

function addWifiFields() {
    document.getElementById('wifiauth').classList.remove('hidden');
    document.getElementById('wifihidden').classList.remove('hidden');
    document.getElementById('wifipsw').classList.remove('hidden');
};

function removeWifiFields() {
    document.getElementById('wifiauth').classList.add('hidden');
    document.getElementById('wifihidden').classList.add('hidden');
    document.getElementById('wifipsw').classList.add('hidden');
};

function createUrl() {
    /*Create link used to make QR code.*/
    var a = document.getElementById('type').value;
    var wifiauth = document.getElementById('wifiauth').value;
    var wifipsw = document.getElementById('wifipsw').value;
    var option = document.getElementById('linkType').value;

    var url = "";

    /*corresponds to the select box on form and format needed for each link*/
    switch (option) {
        case "02":
            url = "mailto:" + a;
            break;
        case "03":
            url = "sms:" + a;
            break;
        case "04":
            url = a;
            break;
        case "05":
            url = "WIFI:T:" + wifiauth + ";S:\"" + a + "\";P:" + wifipsw + ";;";
            break;
        default:
            url = a;
    }
    return url;
}

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

function addLogo() {
    const canvas = document.getElementById("qrcodecanvas");
    const ctx = canvas.getContext("2d");
    const img = document.querySelector("img:not([class])");
    console.log(document.querySelector("img:not([class])"));
    ctx.drawImage(img, 0, 0,  300, 300);

};
    
function createSaveBtn (saveURL,type) {
    const link = document.createElement('a');
    link.id = "save-link";
    link.classList = 'bg-red-500 hover:bg-red-700 text-white font-bold py-2 rounded w-1/3 m-auto my-5';
    link.href = saveURL;
    link.download = type + ' qrcode';
    link.innerHTML = 'Save Image';
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