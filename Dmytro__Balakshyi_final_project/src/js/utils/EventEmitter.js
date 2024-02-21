export default class EventEmitter {
    constructor() {
        // Инициализируем объект событий
        this.events = {};
    }

    // Метод для генерации (эмитирования) события
    emit(eventName, data) {
        // Получаем массив функций, подписанных на данное событие
        const event = this.events[eventName];
        if (event) {
            // Вызываем каждую функцию из массива, передавая ей данные
            event.forEach((fn) => {
                fn.call(null, data);
            });
        }
    }

    // Метод для подписки на событие
    subscribe(eventName, fn) {
        // Если для данного события еще нет массива функций, создаем его
        if (!this.events[eventName]) {
            this.events[eventName] = [];
        }

        // Добавляем функцию в массив подписчиков
        this.events[eventName].push(fn);

        // Возвращаем функцию для отмены подписки
        return () => {
            // Фильтруем массив функций, оставляя только те, которые не равны отписываемой
            this.events[eventName] = this.events[eventName].filter(
                (eventFn) => fn !== eventFn
            );
        };
    }
}
