///////////////////////MID SLIDER?/////////////////////////////////////
// let midOffset = 0;
// let midSlider = document.getElementById("midSliderLine");
// document.getElementById("printOnly").addEventListener("click", function () {
//    midOffset = 0;
//    midSlider.style.left = `${midOffset}px`;
// });
// document.getElementById("printCut").addEventListener("click", function () {
//    midOffset = -1200;
//    midSlider.style.left = `${midOffset}px`;
// });
// document.getElementById("cutting").addEventListener("click", function () {
//    midOffset = -1200 * 2;
//    midSlider.style.left = `${midOffset}px`;
// });
// document.getElementById("coldLam").addEventListener("click", function () {
//    midOffset = -1200 * 3;
//    midSlider.style.left = `${midOffset}px`;
// });
///////////////////////////////////////////////////////////////////////////
// localStorage.setItem("token", "");
// token = "";
window.localStorage.removeItem("token");
const historyBlock = document.getElementById("outHistory");
historyBlock.insertAdjacentHTML("beforeend", "");

const orderList = [];

class OrderItem {
   ///////// Конструктор экземпляра в заказе.
   constructor(
      width,
      height,
      count,
      price,
      priceOfUnit,
      material,
      typeOfOrder,
      area,
      prodId
   ) {
      this.width = width;
      this.height = height;
      this.count = count;
      this.price = price;
      this.priceOfUnit = priceOfUnit;
      this.material = material;
      this.typeOfOrder = typeOfOrder;
      this.area = area;
      this.prodId = prodId;
   }
   stringRender() {
      return `<div class="orderString" data-id="${this.prodId}" id="${this.prodId}">
        <div class="orderStringBlock"><p class="orderSmallText">Вид работ:</p>${this.typeOfOrder}</div>
        <div class="orderStringBlock"><p class="orderSmallText">Материал:</p>${this.material}</div>
        <div class="orderStringBlock"><p class="orderSmallText">Размеры:</p><p>${this.width} x ${this.height} м.</p></div>
        <div class="orderStringBlock"><p class="orderSmallText">Количество:</p><p>${this.count} шт.</p></div>
        <div class="orderStringBlock"><p class="orderSmallText">Площадь:</p><p></p></div>
        <div class="orderStringBlock"><p class="orderSmallText">Стоимость:</p><p></p></div>
        <div class="orderStringBlock del"  id="del" ><p class="orderSmallText"></p><p>Удалить</p></div>
                </div>`;
   }

   _init() {
      let block = document.getElementById(`${this.prodId}`);
      block.addEventListener("click", (e) => {
         if (e.target.classList.contains("del")) {
            console.log("test");
            let data = +block.dataset["id"];
            console.log(data);
            let find = orderList.find((order) => order.prodId === data);
            console.log(find);
            orderList.splice(orderList.indexOf(find), 1);
            let a = document.querySelector(`.orderString[data-id="${data}"]`);
            console.log(a);
            document.querySelector(`.orderString[data-id="${data}"]`).remove();
            remove(find);
         }
      });
   }
}

const obj = {
   height: null,
   width: null,
   count: null,
   price: null,
   id: null,
   priceOfUnit: null,
   material: "Плёнка",
   typeOfOrder: null,
   area: null,

   getItem() {
      let height = Number(
         document.getElementById("height").value.replace(/,/, ".")
      );
      let width = Number(
         document.getElementById("width").value.replace(/,/, ".")
      );
      let count = Number(
         document.getElementById("count").value.replace(/,/, ".")
      );
      this.height = height;
      this.width = width;
      this.count = count;
      let typeOfOrder = "Интерьерная печать";
      this.typeOfOrder = typeOfOrder;
      let gen = Math.random() * 1000;
      gen = gen.toFixed();
      this.prodId = gen;
      let price = 1000;
      this.price = price;
      this.newItem();
   },
   newItem() {
      let orderItem = new OrderItem(
         this.width,
         this.height,
         this.count,
         this.price,
         this.priceOfUnit,
         this.material,
         this.typeOfOrder,
         this.area,
         this.prodId
      );
      orderList.push(orderItem);
      this.render();
   },
   render() {
      const block = document.getElementById("out");

      block.innerHTML = "";
      for (let outEl of orderList) {
         block.insertAdjacentHTML("beforeend", outEl.stringRender());
         outEl._init();
      }
   },
};

const program = {
   start() {
      obj.getItem();
   },
};

document.getElementById("add").addEventListener("click", program.start);

function getHistory() {
   return fetch("/api/item")
      .then((response) => {
         return response.json();
      })
      .then((data) => {
         console.log(data);
      });
}

const orderBlock = document.getElementById("out");

function postOrder() {
   fetch("api/item/newtest", {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
         Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(orderList),
   })
      .then((result) => {
         result.json();
      })
      .catch((error) => {
         console.log(error);
      });
   orderBlock.innerHTML = " ";
   setTimeout(() => {
      getHistory(), 2000;
   });
}

const returnedObj = {
   newItem(data) {
      data.forEach((el) => {
         let orderItem = new OrderItem(
            el.width,
            el.height,
            el.count,
            el.price,
            el.priceOfUnit,
            el.material,
            el.typeOfOrder,
            el.area,
            el.prodId
         );
         orderList.push(orderItem);
         obj.render();
      });
   },
};

document.getElementById("testP").addEventListener("click", postOrder);

// addEventListener("load", getHistory);

/////////////////////LOGIN//////////////////////////////////////////

const loginBlock = document.getElementById("logInBar");
const topLoginButton = document.getElementById("topLoginButton");
const topLogOutButton = document.getElementById("topLogOutButton");
const helloString = document.getElementById("hello");

let userName = null;
let userAuth = false;
topLogOutButton.style.display = "none";

topLoginButton.addEventListener("click", function () {
   loginBlock.style.display = "flex";
   topLoginButton.style.display = "none";
});
topLogOutButton.addEventListener("click", function () {
   topLogOutButton.style.display = "none";
   topLoginButton.style.display = "block";
   userAuth = false;
   localStorage.setItem("token", "");
   token = "";
   console.log(localStorage.getItem("token"));
   const block = document.getElementById("outHistory");
   block.innerHTML = "";
   helloString.innerHTML = "";
});

document.getElementById("loginButton").addEventListener("click", logIn);
function logIn() {
   const auth = {
      email: document.getElementById("login").value,
      password: document.getElementById("password").value,
   };
   fetch("api/user/login", {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
      },
      body: JSON.stringify(auth),
   })
      .then((res) => {
         return res.json();
      })
      .then((data) => {
         const jwt = data.jwt;
         console.log(jwt);
         console.log(data.userName);
         userName = data.userName;
         userAuth = true;
         topLoginButton.style.display = "none";
         topLogOutButton.style.display = "block";
         helloString.insertAdjacentHTML(
            "beforeend",
            `Здравствуйте, ${userName}`
         );
         localStorage.setItem("token", jwt);
         loginBlock.style.display = "none";
         getHistory();
      });

   console.log(localStorage.getItem("token"));
}

let token = localStorage.getItem("token");

////////////////////GET ORDER HISTORY///////////////////////////////

// document.getElementById("testF").addEventListener("click", getHistory);

function getHistory() {
   fetch("api/item/newtest", {
      method: "GET",
      headers: {
         "Content-Type": "application/json",
         Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
   })
      .then((res) => {
         return res.json();
      })
      .then((data) => {
         console.log(data);
         insertHistory(data);
      });
}

function insertHistory(data) {
   const orderHistory = [...data];
   for (let el of orderHistory) {
      const block = document.getElementById("outHistory");
      block.insertAdjacentHTML(
         "beforeend",
         `<div class="orderHistory"  >
          <div class="orderStringBlock"><p class="orderSmallText">Дата создания заказа:</p>${el.createdDate}</div>
          <div class="orderStringBlock"><p class="orderSmallText">Номер заказа:</p>${el.name}</div>
          <div class="orderStringBlock"><p class="orderSmallText">Заказ от:</p>Имя пользователя</div>
          <div class="orderStringBlock"><p class="orderSmallText"></p>Нажмите для подробностей</div>
         </div>`
      );
   }
}
