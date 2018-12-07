const defaultState = [
    { img: 'test.jpg', name: 'Test', ciq: 20 }
];

export default function tasksReducer (state = defaultState, action) {
    switch (action.type) {
        case 'save-piece':
            return [...state, {img: action.img, name: action.name, ciq: action.ciq}];

        case 'delete-piece':
            return state.filter(p => p.img !== action.img);

        case 'add-ciq':
            return state.map(piece => {
                if (piece.img === action.img) {
                    piece.ciq = action.ciq;
                }
                return piece;
            });

        default:
            return state;
    }
}
