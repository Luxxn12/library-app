import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import Layout from "@/components/layout";

import { IBook } from "@/utils/types/books";
import { getDetailBook } from "@/utils/apis/books";
import { Separator } from "@/components/ui/separator";
export default function DetailBook() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<IBook>();
  const params = useParams();

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      setLoading(true);
      const response = await getDetailBook(+params.id_book!);

      setData(response.payload);
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
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
            <p className="font-bold text-2xl tracking-wide text-red-700">
              {data?.title}
            </p>
            <p className="font-light text-sm text-muted-foreground text-red-700">
              by {data?.author}
            </p>
            <Link
              className="text-red-700"
              to={"/"}
              data-testid={data?.category}
            >
              {data?.category}
            </Link>
          </div>
          <Separator className="my-4" />
          <div className="flex-grow text-red-700">
            <p>{data?.description}</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
