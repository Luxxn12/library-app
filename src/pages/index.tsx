import BookCard from "@/components/book-card";
import Layout from "@/components/layout";
import { getBooks } from "@/utils/apis/books";
import { IBook } from "@/utils/types/books";
import React, { useEffect, useState } from "react";

export default function Index() {
  const [data, setData] = useState<IBook[]>([]);
  async function fetchData() {
    try {
      const response = await getBooks();
      setData(response.payload.datas);
    } catch (error) {
      alert(error);
    }
  }

  useEffect(() => {
    fetchData()
  },[])

  return (
    <Layout>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {data.map((book) => (
          <BookCard
            key={book.id}
            data={book}
            navigate="#"
            data-testid={`book-${book.id}`}
          />
        ))}
      </div>
    </Layout>
  );
}
