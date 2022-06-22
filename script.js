/*
1.Выбрать поле для игры +
2.Запонить игровое поле карточками (тегами li) +
3.Сделать клик по карточкам +
4.Сделать переворачивание карточек+
    4.1.Размещаем картинки для каждой карточки+
    4.2.Показываем картинку+
5.Если выбрано две картинки, проверяем на совпадение+
    5.1.Если картинки сопадают, то удаляем карточки+
    5.2.Перевернуть все выбранные карточки+
6.Если все карточки удалены, вывести окно с перезапуском игры
7.При клике на кнопку "рестарт", перезагрузить страницу
*/

//Выбрать поле для игры
var cardField = document.querySelector("#cards");

//Выбери блок перезапуска игры div с атрибутом id=»reset» и помести его в переменную resetBlock
var resetBlock = document.querySelector("#reset");

console.dir(resetBlock);
var resetBtn = document.querySelector("#reset-btn");
var countCards = 16;

//Размещаем картинки для каждой карточки
var images = [
    1, 2, 3, 4,
    5, 6, 7, 8,
    1, 2, 3, 4,
    5, 6, 7, 8
]

//Перемешиваем картинки
images.sort(() => Math.random() - 0.5);

function random(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

var deletedCards = 0

var selected = [];
var pause = false;
//Заполнить игровое поле карточками
for (var i = 0; i < countCards; i = i + 1) {
    var li = document.createElement("li");
    li.id = i;
    cardField.appendChild(li);
    
}

//Сделать клик по карточкам
cardField.onclick = function (event) {
    if (pause == false) 
    { var element = event.target;

//Показываем картинку
    if (element.tagName == "LI" && element.className != "active") {
        selected.push(element);
        element.className = "active";
        var img = images[element.id];
        element.style.backgroundImage = "url(images/" + img + ".png)";
        //Если картинки сопадают, то удаляем карточки
        if (selected.length == 2) {
            pause = true;
            if (images[selected[0].id] == images[selected[1].id]) {
                selected[0].style.visibility = "hidden";
                selected[1].style.visibility = "hidden";
                deletedCards = deletedCards + 2;
            }
            setTimeout(refreshCards, 600);
           
        }
    }

    }
   
}
//Перевернуть все выбранные карточки
function refreshCards () {
    for (var i = 0; i < countCards; i = i + 1) {
        cardField.children[i].className = "";
        
        cardField.children[i].style.backgroundImage = 'url("images/back.png")'
    }
    //Если все карточки удалены, вывести окно с перезапуском игры
    if (deletedCards == countCards) {
        resetBlock.style.display = "block"
    }
    selected = [];
    pause = false;
}
//При клике на кнопку "рестарт", перезагрузить страницу
resetBtn.onclick = function () {
    location.reload()
}