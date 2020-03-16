/* Форма */

var link = document.querySelector(".contacts-button");
var popup = document.querySelector(".modal-form");
var close = popup.querySelector(".modal-close");
var surname = popup.querySelector("[name=name]");
var email = popup.querySelector("[name=email]");
var message = popup.querySelector("[name=message]");
var sabmitButton = popup.querySelector(".write-us-button");

var isStorageSupport = true;
var storage = "";
var storageEmail = "";

/* Проверка доступности localStorage  */

try {
  storage = localStorage.getItem("name");
  storageEmail = localStorage.getItem("email");
} catch (err) {
  isStorageSupport = false;
}

/* Открытие и закрытие формы  */

link.addEventListener("click", function (evt) {
  evt.preventDefault();
  popup.classList.add("modal-open");

  if (storage) {
     surname.value = storage;
     email.focus();
     if (storageEmail) {
       email.value = storageEmail;
       message.focus();
     }
   } else {
     surname.focus();
   }
});

close.addEventListener("click", function (evt) {
  evt.preventDefault();
  popup.classList.remove("modal-open");
  popup.classList.remove("modal-error");
  surname.classList.remove("write-us-input-invalid");
  email.classList.remove("write-us-input-invalid");
  message.classList.remove("write-us-input-invalid");
});

/* Проверка формы перед отправкой  */

sabmitButton.addEventListener("click", function(evt) {
  if (!surname.value || !email.value || !message.value ) {
    evt.preventDefault();
    console.log("Заполнены не все поля");
    popup.classList.remove("modal-error");
    popup.offsetWidth = popup.offsetWidth;
    popup.classList.add("modal-error");

  } else {
    if (isStorageSupport) {
      localStorage.setItem("name", surname.value);
      localStorage.setItem("email", email.value);
    }
  }
});

/* Закрытие формы с клавиатуры  */

window.addEventListener("keydown", function (evt) {
  if (evt.keyCode === 27) {
    evt.preventDefault();
    if (popup.classList.contains("modal-open")) {
      popup.classList.remove("modal-open");
      popup.classList.remove("modal-error");
    }
  }
});


/* Карта */

var mapLink = document.querySelector(".map-link");
var mapPopup = document.querySelector(".modal-map");
var mapClose = mapPopup.querySelector(".modal-close");

mapLink.addEventListener("click", function (evt) {
  evt.preventDefault();
  mapPopup.classList.add("modal-open");
});

mapClose.addEventListener("click", function (evt) {
  evt.preventDefault();
  mapPopup.classList.remove("modal-open");
});

window.addEventListener("keydown", function (evt) {
  if (evt.keyCode === 27) {
    if (mapPopup.classList.contains("modal-open")) {
      evt.preventDefault();
      mapPopup.classList.remove("modal-open");
    }
  }
});


/* Функция ymaps.ready() будет вызвана, когда загрузятся все компоненты API, а также когда будет готово DOM-дерево. */
ymaps.ready(init);
function init(){
  /* Создание карты. */
  var myMap = new ymaps.Map("map", {
    /* Координаты центра карты. Порядок по умолчанию: «широта, долгота». */
    center: [55.686980, 37.529654],
    /* Уровень масштабирования. Допустимые значения: от 0 (весь мир) до 19. */
    zoom: 15,
    /* Тип покрытия карты: "Схема". */
    type: "yandex#map"
  });
  /* Создание геообъекта с типом точка (метка). */
  var myGeoObject = new ymaps.GeoObject({
    geometry: {
      type: "Point",
      coordinates: [55.686980, 37.529654]
    }
  }, {
    preset: "islands#redDotIcon"
  })
  /* Размещение геообъекта на карте. */
  myMap.geoObjects.add(myGeoObject);
}
