import * as view from "./favoritesCardsView";
import FavoritesCards from "./favoritesCardsModel";

export default async function (state) {
    //Получить список объектов которые находятся в избранном
    const favsList = state.favorites.favs;

    //Получение данных сервера
    const favoritesCards = new FavoritesCards(favsList);
    await favoritesCards.getFavs();

    //Отображаем контейнер и карточки
    view.renderPage(favoritesCards.cards);

    //Запуск прослушка клика для иконок 'Избранное'
    addToFavsListener();

    //Функция для работы иконок "Избранное"
    function addToFavsListener() {
        Array.from(document.getElementsByClassName("card__like")).forEach(
            (item) => {
                item.addEventListener("click", (e) => {
                    e.preventDefault();

                    //Находим ID объекта по которому был клик
                    const currentId = e.target.closest(".card").dataset.id;

                    //ДОбавляем/Убираем элемент из избранного
                    state.favorites.toggleFav(currentId);

                    //Вкл/выкл иконку
                    view.toggleFavoriteIcon(
                        e.target.closest(".card__like"),
                        state.favorites.isFav(currentId)
                    );
                });
            }
        );
    }
}
