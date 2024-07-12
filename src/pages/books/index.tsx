import { useEffect, useState } from "react";
import { toast } from "sonner";
import { IBook } from "@/utils/types/books";
import { getBooks } from "@/utils/apis/books";
import Layout from "@/components/layout";
import { BookCard, BookCardLoading } from "@/components/book-card";

export default function AllBooksPage() {
  const [isLoading, setLoading] = useState(true);
  const [books, setBooks] = useState<IBook[]>([]);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const response = await getBooks();
      setBooks(response.payload.datas);
    } catch (error) {
      showErrorToast((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const showErrorToast = (message: string) => {
    toast.error(message);
  };

  const renderBookCard = (book: IBook) => (
    <BookCard
      key={book.id}
      data={book}
      navigate={`/books/${book.id}`}
      data-testid="detail-book"
    />
  );

  const renderLoadingBookCard = () => <BookCardLoading />;

  return (
    <Layout>
      <div className=" md:px-0 px-2 md:container">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 justify-items-center">
        {isLoading
          ? [...Array(10).keys()].map(renderLoadingBookCard)
          : books.map(renderBookCard)}
      </div>
      </div>
    </Layout>
  );
}
