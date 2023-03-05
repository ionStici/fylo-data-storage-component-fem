import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import styles from './styles.module.scss';

import bgMobile from './images/bg-mobile.png';
import bgDesktop from './images/bg-desktop.png';
import logo from './images/logo.svg';

import iconDoc from './images/icon-document.svg';
import iconFolder from './images/icon-folder.svg';
import iconUpload from './images/icon-upload.svg';

import { createStore } from 'redux';

const addSt = add => ({ type: 'storage/addStorage', payload: add });
const removeSt = remove => ({ type: 'storage/removeStorage', payload: remove });

const initialState = { unit: '%', usedStorage: 81.5 };
const storageReducer = function (state = initialState, action) {
    switch (action.type) {
        case 'storage/addStorage':
            if (state.usedStorage < 99) {
                return {
                    ...state,
                    usedStorage:
                        state.usedStorage + (action.payload * 100) / 1000,
                };
            } else {
                return {
                    ...state,
                    usedStorage: 100,
                };
            }

        case 'storage/removeStorage':
            if (state.usedStorage > 5) {
                return {
                    ...state,
                    usedStorage:
                        state.usedStorage - (action.payload * 100) / 1000,
                };
            } else {
                return {
                    ...state,
                };
            }

        default:
            return state;
    }
};

const store = createStore(storageReducer);

const imagesArray = [
    bgMobile,
    bgDesktop,
    logo,
    iconDoc,
    iconFolder,
    iconUpload,
];

imagesArray.forEach(src => {
    const img = new Image();
    img.src = src;
});

const root = ReactDOM.createRoot(document.getElementById('root'));

function App() {
    const mediaMatch = window.matchMedia('(min-width: 768px)');
    const [matches, setMatches] = useState(mediaMatch.matches);

    useEffect(() => {
        const handler = e => setMatches(e.matches);
        mediaMatch.addEventListener('change', handler);
        return () => mediaMatch.removeEventListener('change', handler);
    });

    // // // // // // // // // //

    const bar = React.useRef(null);

    const [usedStorage, setUsedStorage] = useState('81.5%');

    useEffect(() => {
        setTimeout(() => (bar.current.style.width = usedStorage), 200);
    });

    const toggleAnimation = function (e) {
        e.preventDefault();
        setUsedStorage('14px');
        setTimeout(() => setUsedStorage('81.5%'), 500);
    };

    const addStorage = e => {
        e.preventDefault();
        store.dispatch(addSt(25));
        setUsedStorage(`${store.getState().usedStorage}%`);

        console.log(store.getState().usedStorage);
    };

    const removeStorage = e => {
        e.preventDefault();
        store.dispatch(removeSt(25));
        if (store.getState().usedStorage > 5) {
            setUsedStorage(`${store.getState().usedStorage}%`);
        } else {
            setUsedStorage(`14px`);
        }

        console.log(store.getState().usedStorage);
    };

    // // // // // // // // // //

    return (
        <main className={styles.main}>
            <div
                className={styles.bg}
                style={
                    matches
                        ? { backgroundImage: `url(${bgDesktop})` }
                        : { backgroundImage: `url(${bgMobile})` }
                }
            ></div>
            <div className={styles.bg__color}></div>

            <div className={styles.wrapper}>
                <div className={styles.fylo}>
                    <img className={styles.logo} src={logo} alt="Logo" />
                    <div className={styles.iconBox}>
                        <a
                            className={styles.link}
                            href="."
                            onClick={toggleAnimation}
                        >
                            <img
                                className={styles.link__icon}
                                src={iconDoc}
                                alt=""
                            />
                        </a>
                        <a
                            className={styles.link}
                            href="."
                            onClick={addStorage}
                        >
                            <img
                                className={styles.link__icon}
                                src={iconFolder}
                                alt=""
                            />
                        </a>
                        <a
                            className={styles.link}
                            href="."
                            onClick={removeStorage}
                        >
                            <img
                                className={styles.link__icon}
                                src={iconUpload}
                                alt=""
                            />
                        </a>
                    </div>
                </div>

                <div className={styles.barWrapper}>
                    <p className={styles.text}>
                        You’ve used <strong>815 GB</strong> of your storage
                    </p>

                    <div className={styles.barBox}>
                        <div className={styles.bar} ref={bar}>
                            <div className={styles.bar__circle}></div>
                        </div>
                    </div>

                    <div className={styles.minmax}>
                        <p className={styles.min}>0 gb</p>
                        <p className={styles.max}>1000 gb</p>
                    </div>

                    <div className={styles.message}>
                        <p className={styles.message__num}>185</p>
                        <p className={styles.message__left}>gb left</p>
                    </div>
                </div>
            </div>
        </main>
    );
}

root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
