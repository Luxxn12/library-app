import { Link, useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";

import Layout from "@/components/layout";

import { IBook } from "@/utils/types/books";
import { getDetailBook } from "@/utils/apis/books";
import useCartStore from "@/utils/states/borrows";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useToken } from "@/utils/contexts/token";
export default function DetailBook() {
  const { addItem, cart } = useCartStore((state) => state);
  const { user } = useToken();
  const [data, setData] = useState<IBook>();
  const params = useParams();

  const isInCart = useMemo(() => {
    const checkCart = cart.find((item) => item.id === +params.id_book!);

    if (checkCart) return true;

    return false;
  }, [cart]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const response = await getDetailBook(params.id_book!);

      setData(response.payload);
    } catch (error) {
      alert(error);
    }
  }

  function handleBorrowBook() {
    addItem(data!);
    toast.success("Book has been added to cart");
  }

  return (
    <Layout>
      <div className="flex flex-col md:flex-row w-full h-full py-6 px-3 gap-5 items-center container">
        <figure className="overflow-hidden shadow-md rounded-xl shadow-neutral-300  w-52 md:w-72 lg:w-96">
          <img
            className="  rounded-xl object-cover aspect-[3/4] w-52 md:w-72 lg:w-96"
            src={data?.cover_image}
            alt={data?.title}
          />
        </figure>
        <div className="flex flex-col gap-3 w-full container">
          <div className="flex flex-col gap-2">
            <p className="font-bold text-2xl tracking-wide text-black dark:text-white">
              {data?.title.toUpperCase()}
            </p>
            <p className="font-light text-sm text-muted-foreground text-gray-600">
              by {data?.author}
            </p>
            <Link
              className="text-gray-600"
              to={"/"}
              data-testid={data?.category}
            >
              {data?.category}
            </Link>

          </div>
          <div className="flex-grow text-black dark:text-white">
            <text className="font-bold">Description:</text>
            <p>{data?.description}</p>
          </div>

          {user?.role === "user" ? (
            <div className="mt-4">
              <Button
                size="lg"
                className="w-full"
                onClick={() => handleBorrowBook()}
                disabled={isInCart}
              >
                {isInCart ? "In Cart" : "Borrow"}
              </Button>
            </div>
          ) : null}
        </div>
      </div>
    </Layout>
  );
}
