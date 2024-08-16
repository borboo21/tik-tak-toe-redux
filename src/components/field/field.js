import { ACTION_TYPES } from '../../store/action-types';
import { store } from '../../store/store';
import { checkDraw, checkWinner } from '../../utils/check';
import styles from './field.module.css';

export const Field = () => {
	const { field, isGameEnded, isDraw, currentPlayer } = store.getState();

	const setFieldValue = (i) => {
		if (field[i]) return;
		if (isGameEnded || isDraw) return;
		let newValue = field.slice();
		newValue[i] = currentPlayer;
		const result = checkWinner(newValue, currentPlayer);
		if (result) {
			store.dispatch({ type: ACTION_TYPES.SET_END });
		} else if (checkDraw(newValue)) {
			store.dispatch({ type: ACTION_TYPES.SET_DRAW });
		} else {
			store.dispatch({ type: ACTION_TYPES.TOGGLE_PLAYER });
		}
		store.dispatch({ type: ACTION_TYPES.SET_FIELD, payload: newValue });
	};

	// const isWinOrDraw = () => {
	// 	if (checkWinner()) {
	// 		return store.dispatch({ type: ACTION_TYPES.SET_END });
	// 	} else if (checkDraw()) {
	// 		return store.dispatch({ type: ACTION_TYPES.SET_DRAW });
	// 	}
	// };

	return (
		<div className={styles.field}>
			{field.map((btn, index) => {
				return (
					<span key={index}>
						<button
							key={index}
							className={styles.btn}
							style={{ color: btn ? 'black' : 'lightcyan' }}
							disabled={isDraw || isGameEnded}
							onClick={() => {
								setFieldValue(index);
							}}
						>
							{btn || '-'}
						</button>
						{(index === 2 || index === 5) && <br />}
					</span>
				);
			})}
		</div>
	);
};
