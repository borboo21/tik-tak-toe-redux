import { store } from '../../store/store';
import styles from './information.module.css';

export const Information = () => {
	const { currentPlayer, isGameEnded, isDraw } = store.getState();

	return (
		<div>
			{isDraw ? (
				<p className={styles.player}>Ничья</p>
			) : isGameEnded ? (
				<p className={styles.player}>Победа:{currentPlayer} </p>
			) : (
				<p className={styles.player}>Ходит:{currentPlayer}</p>
			)}
		</div>
	);
};
