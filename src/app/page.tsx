import HomeView from "@/views/home";
import { getReviews } from "@/api/getReviews";
import { getProducts } from "@/api/getProducts";
import type { TReview } from "@/types/review";
import type { TProductsResponse } from "@/types/product";

export default async function Page() {
  let reviews: TReview[] = [];
  let reviewsError: string | null = null;

  let products: TProductsResponse = {
    page: 1,
    amount: 0,
    total: 0,
    items: [],
  };
  let productsError: string | null = null;

  try {
    reviews = await getReviews();
  } catch (e) {
    reviewsError = (e as Error).message;
  }

  try {
    products = await getProducts(1, 6); // первая страница товаров
  } catch (e) {
    productsError = (e as Error).message;
  }

  return (
    <HomeView
      reviews={reviews}
      reviewsError={reviewsError}
      initialProducts={products}
      productsError={productsError}
    />
  );
}
