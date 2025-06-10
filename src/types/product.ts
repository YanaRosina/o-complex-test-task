export type TProduct = {
  id: number;
  title: string;
  description: string;
  price: number;
  image_url: string;
};
export type ProductListProps = {
  initialProducts: TProductsResponse;
};

export type TProductsResponse = {
  page: number;
  amount: number;
  total: number;
  items: TProduct[];
};
