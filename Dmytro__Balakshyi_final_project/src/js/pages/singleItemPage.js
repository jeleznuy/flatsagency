import singleItem from "./../singleItem/singleItemController";

export default function (state) {
    //Очищаем контейнер приложения
    document.querySelector("#app").innerHTML = "";

    //Запускаем компонент single item
    singleItem(state);
}
