import React, { useEffect, useState } from "react";
import styles from "./index.module.scss";
import LoginForm from "../LoginForm";
import { useTranslations } from "next-intl";
import classNames from "classnames";
import SignupForm from "../Signup";
import ResetForm from "../ResetForm";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Link from "next/link";
import { Mail, Telegram, WhatsApp } from "@mui/icons-material";

type Props = {
  isOpen: boolean,
  onClose: () => void;
  isAuth: boolean,
  handleLogout: () => void;
  handleLogin: () => void;
}

export default function NavBarPortal({ isOpen, onClose, isAuth, handleLogout, handleLogin}: Props) {
  const f = useTranslations('Footer');
  const h = useTranslations('Header');

  const handleClose = () => {
    onClose();
  }


  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("body-lock");
    } else {
      document.body.classList.remove("body-lock");
    }
    return () => {
      document.body.classList.remove("body-lock");
    };
  }, [isOpen]);


  return (
    <div className={`${styles.overlay} ${isOpen ? styles.open : ""}`}>
      <div className={styles.panel}>
        <button className={styles.closeButton} onClick={handleClose}>
          &times;
        </button>
        <div className={styles.content}>
        <div>
        <nav className={styles.nav}>
          <ul className={styles.navList}>
            {
              isAuth ? (
              <li className={styles.link} onClick={handleClose}>
                <Link href={"/profile"}>{h("profile")}</Link>
              </li>
              ) : (
              <li className={styles.link} onClick={() => {handleLogin(); handleClose()}}>
                {h("login")}
              </li>
              )
            }
            <li className={styles.link} onClick={handleClose}>
              <Link href={"/"}>{h("exchange")}</Link>
            </li>
            <li className={styles.link} onClick={handleClose}>
              <Link href={"/about"}>{h("about")}</Link>
            </li>
            <li className={styles.link} onClick={handleClose}>
              <Link href={"/news"}>{h("news")}</Link>
            </li>
            <li className={styles.link} onClick={handleClose}>
              <Link href={"/faq"}>{h("faq")}</Link>
            </li>
            {
              isAuth && (
              <li className={styles.link} onClick={() => {handleLogout(); handleClose()}}>
                {h("logout")}
              </li>
              )
            }
          </ul>
        </nav>
        <ul className={styles.links}>
          <li onClick={handleClose}><Link href={'/'}>{f("terms")}</Link></li>
          <li onClick={handleClose}><Link href={'/'}>{f("policy")}</Link></li>
          <li onClick={handleClose}><Link href={'/'}>{f("AML")}</Link></li>
          <li onClick={handleClose}><Link href={'/'}>{f("support")}</Link></li>
          <li onClick={handleClose}><Link href={'/map'}>{f("map")}</Link></li>
        </ul>
        </div>
        <ul className={styles.social}>
          <li><Link href={'/'}><Telegram/></Link></li>
          <li><Link href={'/'}><WhatsApp/></Link></li>
          <li><Link href={'/'}><Mail/></Link></li>
        </ul>
        </div>
      </div>
      <div className={styles.backdrop} onClick={handleClose}></div>
    </div>
  );
}