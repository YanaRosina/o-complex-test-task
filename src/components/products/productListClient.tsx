"use client";
import { ProductList } from "./productsList";
import type { ProductListProps } from "@/types/product";

export const ProductListClient = (props: ProductListProps) => {
  return <ProductList {...props} />;
};
