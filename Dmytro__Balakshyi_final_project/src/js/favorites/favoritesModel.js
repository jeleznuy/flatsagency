export default class Favorites {
    constructor() {
        this.favs = [];
        this.readStorage();
        //TODO: Работа с local storage
    }
    addFav(id) {
        this.favs.push(id);
        this.saveData();
    }

    removeFav(id) {
        const index = this.favs.indexOf(id);
        this.favs.splice(index, 1);
        this.saveData();
    }

    isFav(id) {
        return this.favs.includes(id);
    }

    toggleFav(id) {
        this.isFav(id) ? this.removeFav(id) : this.addFav(id);
    }
    readStorage() {
        const storage = JSON.parse(localStorage.getItem("favs"));
        if (storage) this.favs = storage;
    }

    saveData() {
        localStorage.setItem("favs", JSON.stringify(this.favs));
    }
}
