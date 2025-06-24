import { useMediaQuery } from "react-responsive";
import { TodosSmall } from "@components/todo/TodosSmall";
import { TodosLarge } from "@components/todo/TodosLarge";

export const Todos = () => {
  const isDesktop = useMediaQuery({ minWidth: 768 });

  return isDesktop ? <TodosLarge /> : <TodosSmall />;
};
