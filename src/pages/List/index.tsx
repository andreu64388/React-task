import { FC, useEffect, useState } from "react";
import styles from "./List.module.scss";
import { Error, Table } from "../../components";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import {
   ResetState,
   fetchCurrencyConversions,
   selectCurrencyConversions,
} from "../../redux/currencies/currenciesSlice";

export const List: FC = () => {
   const dispatch = useAppDispatch();

   const currencies = useAppSelector(selectCurrencyConversions);
   const loading = useAppSelector(state => state.currencies.status === "loading");
   const error = useAppSelector(state => state.currencies.error);

   const [sortField, setSortField] = useState<"NAME" | "VALUE">("NAME");
   const [sortOrder, setSortOrder] = useState<"ASC" | "DESC">("ASC");
   const [isFetching, setIsFetching] = useState(false); // Добавлено состояние для блокировки запроса

   useEffect(() => {
      const storedSortOrder = localStorage.getItem("sortOrder");

      if (storedSortOrder) {
         const { field, order } = JSON.parse(storedSortOrder);
         setSortField(field);
         setSortOrder(order);

         fetchConversions(field, order);
      } else {
         fetchConversions();
      }
      return () => {
         dispatch(ResetState());
      };
   }, [dispatch]);

   const fetchConversions = (field?: "NAME" | "VALUE", order?: "ASC" | "DESC") => {
      if (!isFetching) {
         setIsFetching(true);
         dispatch(fetchCurrencyConversions({ sort: field || sortField, order: order || sortOrder }))
            .then(() => {
               setIsFetching(false);
            });
      }
   };

   const handleSortClick = (field: "NAME" | "VALUE") => {
      const order = field === sortField ? (sortOrder === "ASC" ? "DESC" : "ASC") : "ASC";
      localStorage.setItem("sortOrder", JSON.stringify({ field, order }));
      setSortField(field);
      setSortOrder(order);
      fetchConversions(field, order);
   };

   const columns = [
      { title: "name", onClick: () => handleSortClick("NAME") },
      { title: "value", onClick: () => handleSortClick("VALUE") },
   ];

   if (error) return <Error error={error} />

   return (
      <div className={styles.list}>
         <h1 className={styles.title}>List</h1>
         <main className={styles.content}>
            {Array.isArray(currencies) && currencies.length > 0 && (
               <Table data={currencies} columns={columns} />
            )}
         </main>
         {loading && <div>Loading...</div>}
      </div>
   );
};
