

db.collection('products').get().then(snapshot => { getItems(snapshot.docs);});






function getItems(data) {

let itemEl = "";
const itemsList = document.getElementById('items-list');

data.forEach(doc => {
const product = doc.data();

const itemListHTML = `
<ons-list-item onclick="myNavigator.pushPage('item${product.uid}.html')">
<div class="left">
<img src="book.jpg" class="list-item__thumbnail" alt="book">
</div>

<div class="center">
<span class="list-item__title">
${product.title}</span>
<span class="list-item__subtitle">
${product.subtitle}</span>
</div>
</ons-list-item> `;

itemEl += itemListHTML;


let itemPageId = "item" + product.uid + ".html";

var itemPage = document.createElement("template");
itemPage.id = itemPageId;


let itemPageHTML = `


<ons-page>
<ons-toolbar>
<div class="left">
<ons-back-button>Back</ons-back-button>
</div>
<div class="center">Go Back</div>
</ons-toolbar>


<ons-card>
<img src="https://lh3.googleusercontent.com/_WOFheU5mG5wae2yjeR4o-hPXbis64JyXXFYD-89UZD_Io_pxJXXfqnSzM7VoE1_vYMIDi6wJ9lJ9stt0cSSIbrJJmi9XlU_7fg0dQB2LR-bmYe01SpmS7HeP5v74tdXbX7mAEFPHhlvNr2Iwr3_R3GnysQRHRseTZ5UsFfiV7CGkVJhMTpRoNBfrNdCyfBaR63_-M249fIYMXNFF9WUXsa0fYplyZSxOfwgEtO3Xw0kOssS08X-VVkFmQHHo2kB-h_2I_K0k1_E8mHC9CU8BYfAhSbUfw0aeIaAcnieM8FKEfcYAqcDtJpZFbHBf9WpVdgdkIr_1Q-Fz7kfxZS05Nh0uNDCX1SoVRL7Gj1jBmfvvgrXoXVLHiXxMXxN-HfWcgQyPABTt8-yKFmU7H2R7PYPA2_UTdECZuBD6M6JaBZQ8NN-D18gjYIcTatQ1My78L4FsVCHX6oxq9zP3NtfVBf1Kl5ipVXPzfCyOoiuPwCBptdzPh0ra3DDCXba-mA6R_fbqxd3OyM73qt8n4klq-q0IFpDbuiCXN-TlV5PDjlfWDk1vNggsIQvOYr-fUEld-0uBtUB8yfF-tLmxc5xNugxya_dEfT7E3n4D13ud_jPUwCgw-jIVup_2-FJ3NUuRDsQ5lLgcSKQ1oh_PLgvkedIscLItWlnYehq6W5KJvuqC6hf5ri3KWtCQCU=w1080-h750-no?authuser=0">
<br><br>
<b>Rs. ${product.price}</b><br>
${product.title}
<hr>

<ons-button>Contact Seller</ons-button>
</ons-card>


<ons-card>
<b>Description:</b> ${product.description}
</ons-card>

</ons-page>
`;



itemPage.innerHTML = itemPageHTML;

document.body.appendChild(itemPage)

})

itemsList.innerHTML = itemEl;



};












window.fn = {}
window.fn.open = function (){
var menu = document.getElementById('menu');
menu.open()}

window.fn.load = function (page) {
var menu = document.getElementById('menu');
var myNavigator = document.getElementById('myNavigator');
menu.close();
myNavigator.resetToPage(page, {animation: 'fade'})
    }

function rexPush(file) {
myNavigator.pushPage(file);
document.getElementById('myNavigator');
menu.close();
}





function rexRegisterForm(){
document.getElementById('myNavigator');
menu.close();
document.getElementById('form-register').show();
}

function rexRegisterBtn(){
document.getElementById('form-register').hide();
}




function rexLoginForm(){
document.getElementById('myNavigator');
menu.close();
document.getElementById('form-login').show();
}

function rexLoginBtn(){
document.getElementById('form-login').hide();
}



















function HandleBackFunctionality()   {       if(window.event)      {            if(window.event.clientX < 40 && window.event.clientY < 0)           {               alert("Browser back button is clicked...");           }           else           {               alert("Browser refresh button is clicked...");           }       }       else       {            if(event.currentTarget.performance.navigation.type == 1)           {                alert("Browser refresh button is clicked...");           }           if(event.currentTarget.performance.navigation.type == 2)          {                alert("Browser back button is clicked...");          }       }   } 

