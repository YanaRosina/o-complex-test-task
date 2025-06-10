"use client";
import Image from "next/image";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { TProduct, ProductListProps } from "@/types/product";
import { getProducts } from "@/api/getProducts";
import styles from "./productList.module.sass";
import { Button } from "../ui/button/button";
import { useCardPersistence } from "@/hooks/useCardPersistence";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store";
import { addItem, decrement, increment } from "@/store/cardSlice";

export const ProductList = ({ initialProducts }: ProductListProps) => {
  useCardPersistence();
  const dispatch = useDispatch<AppDispatch>();
  const card = useSelector((state: RootState) => state.card.items);

  const [products, setProducts] = useState<TProduct[]>(
    initialProducts?.items || []
  );
  const [page, setPage] = useState(initialProducts?.page || 1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const nextPage = page + 1;
      const newProducts = await getProducts(nextPage, 4);
      if (!newProducts.items || newProducts.items.length === 0) {
        setHasMore(false);
      } else {
        setProducts((prev) => {
          const existingIds = new Set(prev.map((p) => p.id));
          const uniqueNewProducts = newProducts.items.filter(
            (p: TProduct) => !existingIds.has(p.id)
          );
          return [...prev, ...uniqueNewProducts];
        });
        setPage(nextPage);
      }
    } catch (error) {
      console.error("Ошибка загрузки товаров:", error);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  }, [page, loading, hasMore]);

  useEffect(() => {
    const currentLoader = loaderRef.current;
    if (!currentLoader) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        loadMore();
      }
    });

    observer.observe(currentLoader);

    return () => {
      observer.unobserve(currentLoader);
    };
  }, [loadMore]);

  return (
    <div className={styles.productList}>
      {products.length > 0 ? (
        products.map((product) => {
          const inCard = card[product.id];
          const quantity = inCard?.quantity || 0;

          return (
            <div key={product.id} className={styles.productCard}>
              <Image
                src={
                  product.image_url.includes("placehold.co")
                    ? product.image_url.replace(/(\?|$)/, ".png$1")
                    : product.image_url
                }
                alt={product.title}
                width={250}
                height={200}
                priority={false}
                className={styles.image}
              />
              <h3>{product.title}</h3>
              <p className={styles.description}>{product.description}</p>
              <p className={styles.price}>Цена: {product.price} ₽</p>
              {!inCard ? (
                <Button
                  onClick={() =>
                    dispatch(
                      addItem({
                        id: product.id,
                        title: product.title,
                        price: product.price,
                      })
                    )
                  }
                >
                  Купить
                </Button>
              ) : (
                <div className={styles.counterButtons}>
                  <Button onClick={() => dispatch(decrement(product.id))}>
                    -
                  </Button>
                  <Button>{quantity}</Button>
                  <Button onClick={() => dispatch(increment(product.id))}>
                    +
                  </Button>
                </div>
              )}
            </div>
          );
        })
      ) : (
        <p>Товары не загружены или ошибка данных</p>
      )}
      <div ref={loaderRef} style={{ height: 1 }} />
      {loading && <p>Загрузка...</p>}
      {!hasMore && <p>Больше товаров нет</p>}
    </div>
  );
};
