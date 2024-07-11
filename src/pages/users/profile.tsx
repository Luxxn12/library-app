import { BookCard, BookCardLoading } from "@/components/book-card";
import Layout from "@/components/layout";
import { Button } from "@/components/ui/button";
import { getBorrows } from "@/utils/apis/borrows";
import { useToken } from "@/utils/contexts/token";
import { IBorrow } from "@/utils/types/borrows";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

export default function Profile() {
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
  return (
    <Layout>
      <div className="w-full max-w-3xl mx-auto py-8 px-4 md:px-6 lg:px-8">
        <div className="flex flex-col gap-4 items-center">
          <div className="w-60 h-60">
            <img
              className="aspect-square rounded-full object-cover"
              src={user?.profile_picture}
              alt={`${user?.full_name}'s profile picture`}
            />
          </div>
          <h1 className="text-2xl font-bold text-black dark:text-white">{user?.full_name}</h1>
          <p className="text-muted-foreground">{user?.email}</p>
          <Button asChild>
            <Link to="/edit-profile">Edit Profile</Link>
          </Button>
        </div>
      </div>
      {user?.role == 'user' && (
        <>
          <div className="flex justify-between my-9 w-full items-center container">
            <p className="font-semibold text-black dark:text-white text-lg tracking-wider">
              Recently Borrowed Book
            </p>
            <Link className="text-sm tracking-wide" to="/history-borrow">
              <text className="text-black  dark:text-white ">See more</text>
            </Link>
          </div>
          <div className="flex justify-center mt-4">
            <div>
              <div className="flex space-x-4 pb-4" data-testid="books-new">
                {isLoading ? (
                  [...Array(5).keys()].map((key) => <BookCardLoading key={key} />)
                ) : (
                  <>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 justify-items-center ">
                      {borrows.slice(0, 5).map((borrow) => (
                        <BookCard
                          key={borrow.id}
                          data={borrow.book}
                          navigate="#"
                          data-testid={`book-${borrow.id}`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </Layout>
  );
}
