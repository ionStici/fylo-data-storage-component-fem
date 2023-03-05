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

    const handleIconClick = function (e) {
        e.preventDefault();
    };

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

            <section className={styles.fylo}>
                <img className={styles.logo} src={logo} alt="Logo" />
                <div className={styles.iconBox}>
                    <a
                        className={styles.link}
                        href="."
                        onClick={handleIconClick}
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
                        onClick={handleIconClick}
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
                        onClick={handleIconClick}
                    >
                        <img
                            className={styles.link__icon}
                            src={iconUpload}
                            alt=""
                        />
                    </a>
                </div>
            </section>

            <section className={styles.bar}>
                <p className={styles.message}>
                    You’ve used <strong>815 GB</strong> of your storage
                </p>
            </section>
        </main>
    );
}

root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
