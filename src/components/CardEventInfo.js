import styles from "../styles/CardEventInfo.module.css";
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose, faCheck } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';
import { useSelector } from "react-redux";

function CardEventInfo({ isOpen, onClose, event }) {
    const isVenue = useSelector((state) => state.user.value.isVenue)

    if (!isOpen) return null; // Ne rien rendre si le modal n'est pas ouvert

    const handleEventClose = () => onClose();

    const handleEventWrapper = (event) => event.stopPropagation();

    return (
        <div onClick={handleEventClose} className={`${styles.container} ${isOpen ? styles.open : ''}`}>
            <div onClick={handleEventWrapper} className={styles.wrapper}>
                <Image
                    className={styles.pictureEvent}
                    src={event?.picture != "" ? event.picture : '/assets/noevent2.jpg'}
                    alt={event.title}
                    width={350}
                    height={350}
                />
                <div className={styles.cardModalInfo}>
                    <div className={styles.title}>
                        <h4>Titre :</h4>
                        <h3>{event.title}</h3>
                    </div>
                    <div className={styles.description}>
                        <h4>Description :</h4>
                        <p>{event.description}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardEventInfo;
