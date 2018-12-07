export function savePiece(img, name, date) {
    return {
        type: 'save-piece',
        img: img,
        name: name,
        date: date,
        ciq: -1
    };
}

export function deleteItem(img) {
    return {
        type: 'delete-piece',
        img: img
    };
}

export function addCiq(img, ciq) {
    return {
        type: 'add-ciq',
        img: img,
        ciq: ciq
    };
}
