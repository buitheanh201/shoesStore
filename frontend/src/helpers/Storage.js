export const getStorage = (item) => {
    return JSON.parse(localStorage.getItem(item));
}

export const setStorage = (itemName,data) => {
    return localStorage.setItem(itemName,JSON.stringify(data));
}

export const clearItemStorage = (itemName) => localStorage.removeItem(itemName);