// src/components/Card.jsx
import React from "react";
import styles from "./Card.module.scss";

function Card({ title, description }) {
  return (
    <div className={styles.card}>
      <h3 className={styles.title}>{title}</h3>
      <p>{description}</p>
      <button className={styles.button}>확인</button>
    </div>
  );
}

export default Card;
