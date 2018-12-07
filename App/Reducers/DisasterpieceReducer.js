const defaultState = [
    { img: 'Mandala.png', name: 'Mandala', date: '11.08.2018', ciq: 6 },
    { img: 'MuscleTree.png', name: 'Muscle Tree', date: '11.09.2018', ciq: 8.5 },
    { img: 'Reflection.png', name: 'Reflection', date: '11.13.2018', ciq: 9 },
    { img: 'Seaword.png', name: 'Seaward', date: '11.20.2018', ciq: -1 }
];

export default function tasksReducer (state = defaultState, action) {
    switch (action.type) {
        case 'save-piece':
            return [...state,
                {
                    img: action.img,
                    name: action.name,
                    date: action.date,
                    ciq: action.ciq
                }];

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
