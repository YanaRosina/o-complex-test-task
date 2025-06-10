"use client";

import { Provider } from "react-redux";
import { store } from "@/store";
import React from "react";

type Props = { children: React.ReactNode };

export const StoreProvider = ({ children }: Props) => {
  return <Provider store={store}>{children}</Provider>;
};
