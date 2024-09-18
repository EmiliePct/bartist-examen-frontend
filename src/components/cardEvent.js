import styles from "../styles/CardEvent.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWindowClose, faCheck } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { getBookingByEventId } from "../api/bookings";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import CardEventInfo from "./CardEventInfo";
import formatDate from "../utils/dateFormater";

function CardEvent({ event }) {
  const isVenue = useSelector((state) => state.user.value.isVenue);
  const router = useRouter();
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [refused, setRefused] = useState(false)
  useEffect(() => {
    console.log("eventcard: ", event);
    getBookingByEventId(event?._id)
      .then((data) => {
        if (data) {
          data.bookings.map(booking => {
            booking.status === "Refusée" && setRefused(true)
          })
          setBookings(data.bookings);
        }
      })
      .catch((error) => {
        console.error(
          "Erreur lors de la récupération des données de réservation:",
          error
        );
      });
  }, [event?._id]);
  
  if (refused) return null;
  const openEventModal = () => setIsEventModalOpen(true);
  const closeEventModal = () => setIsEventModalOpen(false);
  const date = formatDate(event?.date);
  //const cardClass = booking.status === "Confirmée" ? ` ${styles.accepted}` : booking.status === "Refusée" ? ` ${styles.cancel}` : "";
  return (
    <>
      <div className={styles.card} onClick={openEventModal}>
        <Image
          alt="logo"
          className={styles.logo}
          src={event?.picture != "" ? event.picture : '/assets/noevent2.jpg'}
          width={225}
          height={225}
        />
        <div className={styles.cardInfo}>
          <h3 className={styles.title}>{event?.title}</h3>
          <div className={styles.dateContainer}>
            <span>{date.day}</span>
            <span>{date.month}</span>
            <span>{date.year}</span>
            <span>{event?.hour_start}</span>
          </div>
          <div className={styles.genres}>
            {event?.genres.map((genre, index) => (
              <div key={genre + index} className={styles.genre}>
                <p>{genre}</p>
              </div>
            ))}
          </div>
          {isVenue && (
            <span className={styles.spanStatus}>{event?.status}</span>
          )}
          <div className={styles.bookingsList}>
            {bookings?.map((booking) => ( booking.status == "Refusée" ? <></> : <div key={booking._id} className={styles.cardArtist}>
                <span>{isVenue ? booking.artistName + " | " : ""} </span>
                <span>{booking.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <CardEventInfo
        isOpen={isEventModalOpen}
        onClose={closeEventModal}
        event={event}
      />
    </>
  );
}

export default CardEvent;
