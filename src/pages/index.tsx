import { BookCard, BookCardLoading } from "@/components/book-card";
import Layout from "@/components/layout";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getBooks } from "@/utils/apis/books";
import { IBook } from "@/utils/types/books";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const dataUser = [
  {
    id: 1,
    name: "John Doe",
    avatar: "https://i.pravatar.cc/1000?img=3",
    time: "21 Read this week",
    nilai: "9.90",
  },
  {
    id: 2,
    name: "Doni Setiawan",
    avatar: "https://i.pravatar.cc/1000?img=6",
    time: "41 Read this week",
    nilai: "8.50",
  },
  {
    id: 3,
    name: "Iqbal Ramadan",
    avatar: "https://i.pravatar.cc/1000?img=11",
    time: "11 Read this week",
    nilai: "8.00",
  },
  {
    id: 4,
    name: "Joni Iskandar",
    avatar: "https://i.pravatar.cc/1000?img=15",
    time: "11 Read this week",
    nilai: "7.90",
  },
];

export default function Index() {
  const [data, setData] = useState<IBook[]>([]);
  const [isLoading, setLoading] = useState(true);
  async function fetchData() {
    setLoading(true);
    try {
      const response = await getBooks();
      setData(response.payload.datas);
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Layout>
      <div className="grid grid-cols-1 md:grid-cols-2 container px-6 gap-10 xl:gap-20 pt-5">
        <div className=" bg-gray-800 p-8 rounded-md ">
          <div className="text-2xl text-white grid grid-flow-row">
            <text>Discover libraries full of content</text>
            <text>with our annual subscription</text>
          </div>
          <div className="pt-4">
            <text className="text-gray-400 text-sm">
              Monthly subscription allows you to instantly get access to library
              of over thousand e-books and audio premium library also unlock the
              audiobook content which contains a lot of world known bestsellers.
            </text>
          </div>
          <div className="pt-7">
            <Link to={'/login'}>
              <Button>Go Premium</Button>
            </Link>
          </div>
        </div>
        <div>
          <div className="mb-5">
            <text className="text-black text-xl">Populer Authors</text>
          </div>
          {dataUser.map((v, i) => {
            return (
              <div key={i}>
                <div className="flex justify-between mb-2 items-center">
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarImage src={v.avatar} />
                    </Avatar>
                    <div className=" grid grid-flow-row ">
                      <text className="text-black dark:text-white text-sm font-semibold">
                        {v.name}
                      </text>
                      <text className=" text-xs text-gray-400">{v.time}</text>
                    </div>
                  </div>
                  <text className="text-red-500">{v.nilai} </text>
                </div>
                <Separator className="my-2 bg-gray-300 dark:bg-gray-600" />
              </div>
            );
          })}
        </div>
      </div>
      <div className="pt-10">
        <div className="px-6 container flex justify-center">
          <text className="text-black font-light text-3xl">
            Browse huge library filled
          </text>
        </div>
        <div className="px-6 container flex justify-center">
          <text className="text-black font-light text-3xl">
            with world best sellers
          </text>
        </div>
        <div className="flex container justify-center mt-4">
          <Link to={"/books"}>
            <Button>Show All</Button>
          </Link>
        </div>
        <div className="flex container justify-center mt-4">
          <div>
            <div className="flex space-x-4 pb-4" data-testid="books-new">
              {isLoading ? (
                [...Array(5).keys()].map((key) => <BookCardLoading key={key} />)
              ) : (
                <>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 justify-items-center ">
                    {data.slice(0, 5).map((book) => (
                      <BookCard
                        key={book.id}
                        data={book}
                        navigate={`/books/${book.id}`}
                        data-testid={`book-${book.id}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
