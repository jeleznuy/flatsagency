import homePage from "./pages/homePage";
import singleItemPage from "./pages/singleItemPage";
import favoritePage from "./pages/favoritePage";
import bidsPage from "./pages/bidsPage";
import errorPage from "./pages/errorPage";
import EventEmitter from "./utils/EventEmitter";
import Favorites from "./favorites/favoritesModel";

const state = {
    results: [],
    emitter: new EventEmitter(),
    favorites: new Favorites(),
};

//Тестирование . После - удалить!
window.state = state;

// Маршруты
const routes = [
    { path: "/", component: homePage },
    { path: "item", component: singleItemPage },
    { path: "favorites", component: favoritePage },
    { path: "bids", component: bidsPage },
];

function findComponentByPath(path, routes) {
    return routes.find(function (route) {
        return route.path === path;
    });
}

function router() {
    const pathArray = location.hash.split("/");
    let currentPath = pathArray[0] === "" ? "/" : pathArray[1];
    currentPath = currentPath === "" ? "/" : currentPath;

    //Save route params
    state.routeParams = pathArray[2] ? pathArray[2] : "";

    const { component = errorPage } =
        findComponentByPath(currentPath, routes) || {};

    component(state);
}

window.addEventListener("hashchange", router);
window.addEventListener("load", router);
