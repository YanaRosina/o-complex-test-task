import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCard } from "@/store/cardSlice";
import type { RootState } from "@/store";

export function useCardPersistence() {
  const dispatch = useDispatch();
  const card = useSelector((state: RootState) => state.card);

  // Загружаем из localStorage при монтировании
  useEffect(() => {
    const saved = localStorage.getItem("card");
    if (saved) {
      dispatch(setCard(JSON.parse(saved)));
    }
  }, [dispatch]);

  // Сохраняем в localStorage при изменении корзины
  useEffect(() => {
    localStorage.setItem("card", JSON.stringify(card));
  }, [card]);
}
