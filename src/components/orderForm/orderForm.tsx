"use client";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import styles from "./orderForm.module.sass";
import { Button } from "../ui/button/button";

import {
  processPhoneInput,
  validatePhoneNumber,
  isPhoneKeyValid,
  getPhoneDigits,
} from "@/utils/phoneValidation";
import { createOrder } from "@/api/orders";
import { clearCard } from "@/store/cardSlice";
import { useModal } from "../ui/modal/modalContext";
//import { useRouter } from "next/navigation";
export const OrderForm = () => {
  const cart = useSelector((state: RootState) => state.card.items);
  const dispatch = useDispatch();
  // const router = useRouter();
  const cartItems = Object.values(cart);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [phone, setPhone] = useState("");
  const [error, setError] = useState(false);
  const { showModal } = useModal();

  if (cartItems.length === 0) {
    return null; //  Ничего не рендерим, если корзина пуста
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!validatePhoneNumber(phone)) {
      setError(true);
      setIsSubmitting(false);
      return;
    }

    try {
      const phoneDigits = getPhoneDigits(phone);
      const cartData = cartItems.map((item) => ({
        id: item.id,
        quantity: item.quantity,
      }));

      const response = await createOrder({
        phone: phoneDigits,
        cart: cartData,
      });

      if (response.success === 1) {
        console.log("Успех! Модалка должна открыться");
        showModal("order", "Заказ успешно оформлен!");
        setPhone("");
        setTimeout(() => dispatch(clearCard()), 2000);
        // setIsModalOpen(false);
        // Перезагружаем страницу для полного сброса
        //router.refresh();
      } else {
        alert("Произошла ошибка при оформлении заказа");
      }
    } catch (err) {
      alert(err instanceof Error ? err.message : "Неизвестная ошибка");
    } finally {
      setIsSubmitting(false);
    }
  };
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone((prev) => processPhoneInput(e.target.value, prev));
  };

  return (
    <>
      <form className={styles.orderForm} onSubmit={handleSubmit}>
        <h2 className={styles.title}>Добавленные товары</h2>
        <ul className={styles.itemList}>
          {cartItems.map((item) => (
            <li key={item.id} className={styles.item}>
              {item.title.length > 23
                ? `${item.title.substring(0, 20)}...` //Пример обрезки длинных заголовков
                : item.title}{" "}
              — x{item.quantity} — {item.price * item.quantity}₽
            </li>
          ))}
        </ul>
        <div className={styles.buttonInputContainer}>
          <label className={styles.phoneLabel}>
            <input
              type="tel"
              placeholder="+7 (___) ___-__-__"
              value={phone}
              onChange={handlePhoneChange}
              onKeyDown={(e) => !isPhoneKeyValid(e) && e.preventDefault()}
              onFocus={() => setError(false)}
              className={`${styles.phoneInput} ${error ? styles.error : ""}`}
              maxLength={18}
            />
            {error && (
              <div className={styles.errorText}>
                Введите корректный номер телефона
              </div>
            )}
          </label>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Отправка..." : "Заказать"}
          </Button>
        </div>
      </form>
    </>
  );
};
