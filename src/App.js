import './index.css';
import styles from './App.module.css';
import { useState, useEffect } from 'react';
import { Information, Field } from './components';
import { store } from './store/store';
import { ACTION_TYPES } from './store/action-types';

export const App = () => {
	const [refresh, setRefresh] = useState(Date.now());
	const { isGameEnded, isDraw } = store.getState();

	useEffect(() => {
		const unsubscribe = store.subscribe(() => {
			setRefresh(Date.now());
		});
		return () => unsubscribe();
	}, []);

	const retry = () => {
		store.dispatch({ type: ACTION_TYPES.RESET });
	};

	return (
		<div className={styles.App}>
			<Information />
			<Field />
			{isGameEnded || isDraw ? (
				<div className={styles.retryArea}>
					<button className={styles.retryBtn} onClick={() => retry()}>
						Попробовать снова
					</button>
				</div>
			) : (
				''
			)}
		</div>
	);
};
