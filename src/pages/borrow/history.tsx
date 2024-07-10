import { BookCard, BookCardLoading } from "@/components/book-card";
import Layout from "@/components/layout";
import { getBorrows } from "@/utils/apis/borrows";
import { useToken } from "@/utils/contexts/token";
import { IBorrow } from "@/utils/types/borrows";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function History() {
  const { user } = useToken();
  const [isLoading, setLoading] = useState(true);

  const [borrows, setBorrows] = useState<IBorrow[]>([]);

  useEffect(() => {
    fetchBorrows();
  }, []);

  async function fetchBorrows() {
    try {
      setLoading(true);
      const response = await getBorrows();

      setBorrows(response.payload.datas);
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setLoading(false);
    }
  }
  const renderBorrow = (borrow: IBorrow) => (
    <BookCard
      key={borrow.id}
      data={borrow.book}
      navigate="#"
      data-testid={`book-${borrow.id}`}
    />
  );

  const renderLoadingrenderBorrow = () => <BookCardLoading />;
  return (
    <Layout>
      <div className="grid grid-cols-2 md:grid-cols-3  m-0 lg:m-5 lg:grid-cols-4 xl:grid-cols-5 gap-4 justify-items-center">
        {isLoading
          ? [...Array(9).keys()].map(renderLoadingrenderBorrow)
          : borrows.map(renderBorrow)}
      </div>
    </Layout>
  );
}
