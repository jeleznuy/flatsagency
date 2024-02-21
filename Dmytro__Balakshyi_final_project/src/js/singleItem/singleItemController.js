import SingleItem from "./singleItemModel";
import * as view from "./singleItemView";

export default async function (state) {
    //Создаем новый объект singleItem
    state.singleItem = new SingleItem(state.routeParams);

    //Получаем данные с сервера
    await state.singleItem.getItem();

    //Отрисовка разметки для отдельного объекта
    view.render(
        state.singleItem.result,
        state.favorites.isFav(state.singleItem.id)
    );

    /******************************
     * Запустить прослушку событий
     ******************************/

    // Открытие модального окна
    document.querySelector(".button-order").addEventListener("click", () => {
        view.showModal();
    });

    //Закрытие модального окна -  клик по кнопке
    document.querySelector(".modal__close").addEventListener("click", () => {
        view.hideModal();
    });

    //Закрытие модального окна - клик по оверлею
    document.querySelector(".modal-wrapper").addEventListener("click", (e) => {
        if (e.target.closest(".modal")) {
            return null;
        } else {
            view.hideModal();
        }
    });

    //Отправка формы
    document
        .querySelector(".modal__form")
        .addEventListener("submit", async function (e) {
            e.preventDefault();
            const formData = view.getInput();
            await state.singleItem.submitForm(formData);
        });

    //Клик по кнопке добавить в избранное
    document
        .querySelector("#addToFavoriteBtn")
        .addEventListener("click", () => {
            state.favorites.toggleFav(state.singleItem.id);
            view.toggleFavoriteButton(
                state.favorites.isFav(state.singleItem.id)
            );
        });
}
