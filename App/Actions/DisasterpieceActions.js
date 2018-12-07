export function savePiece(img, name) {
    return {
        type: 'save-piece',
        img: img,
        name: name,
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
