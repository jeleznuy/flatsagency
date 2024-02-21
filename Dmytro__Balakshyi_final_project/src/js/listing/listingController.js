import * as view from "./listingView";

export default function (state) {
    //Рендер контейнера для карточек
    view.render();
    //Рендер карточек
    state.results.forEach(function (item) {
        view.renderCard(item, state.favorites.isFav(item.id));
    });

    //Запуск прослушка клика для иконок 'Избранное'
    addToFavsListener();
    
    state.emitter.subscribe("event:render-listing", () => {
        //Очистить контейнер с карточками
        view.clearListingContainer();
        //Отрендерить карточки
        state.results.forEach(function (item) {
            view.renderCard(item, state.favorites.isFav(item.id));
        });

        addToFavsListener();
    });

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
