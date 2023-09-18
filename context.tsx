import { createContext } from "react";

export const DataContext = createContext<
  { sender: { id: string; username: string; email: string } | null }[] | null
>(null);
