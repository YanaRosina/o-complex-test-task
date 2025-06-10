import styles from "@/views/home.module.sass";
import { Reviews } from "@/components/reviews/reviews";
import type { TReview } from "@/types/review";
import type { TProductsResponse } from "@/types/product";
import { ProductListClient } from "@/components/products/productListClient";
import { StoreProvider } from "@/components/StoreProvider";
import { OrderForm } from "@/components/orderForm/orderForm";

type Props = {
  reviews: TReview[];
  reviewsError: string | null;
  initialProducts: TProductsResponse;
  productsError: string | null;
};

export default function HomeView({
  reviews,
  reviewsError,
  initialProducts,
  productsError,
}: Props) {
  return (
    <StoreProvider>
      <header className={styles.header}>Тестовое задание</header>
      <main className={styles.main}>
        <section>
          {reviewsError ? (
            <p>Ошибка загрузки отзывов: {reviewsError}</p>
          ) : (
            <Reviews reviews={reviews} />
          )}
        </section>
        <section className={styles.orderBlock}>{<OrderForm />}</section>
        <section>
          {productsError ? (
            <p>Ошибка загрузки товаров: {productsError}</p>
          ) : (
            <ProductListClient initialProducts={initialProducts} />
          )}
        </section>
      </main>
    </StoreProvider>
  );
}
