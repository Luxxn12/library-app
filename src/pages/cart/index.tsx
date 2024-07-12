import Layout from "@/components/layout";
import { Button } from "@/components/ui/button";
import { postBorrow } from "@/utils/apis/borrows";
import useCartStore from "@/utils/states/borrows";
import { Trash } from "lucide-react";
import { toast } from "sonner";


export default function Cart() {
  const { cart, removeItem, clearCart } = useCartStore((state) => state);

  async function handleBorrow() {
    try {
      const body = {
        bookId: cart.map((item) => item.id),
        borrow_date: new Date().toISOString(),
      };

      await postBorrow(body);
      toast.success("success");
      clearCart();
    } catch (error) {
      toast.error((error as Error).message);
    }
  }

  return (
    <Layout>
      <div className="container mb-5">
        <div className="grid grid-cols-1 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="grid grid-cols-1 gap-4">
              {cart.map((book) => (
                <div
                  key={book.id}
                  className="flex items-center justify-between border-b pb-4"
                >
                  <div className="flex">
                    <img
                      className="h-auto object-cover rounded-md aspect-[3/4] w-16 md:w-16 lg:w-16"
                      src={book.cover_image}
                      alt={book.title}
                    />
                    <div className="px-5">
                      <h3 className="text-lg font-semibold text-black">{book.title}</h3>
                      <p className="text-gray-500">{book.author}</p>
                    </div>
                  </div>
                  <div>
                    <Trash onClick={() => removeItem(book)} className="text-red-700 size-7" />
                  </div>

                </div>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4 text-black">Summary</h2>
            <div className="grid grid-cols-2 gap-2">
              <p className="text-gray-500">Total Books:</p>
              <p className="text-right  text-black">{cart.length}</p>
            </div>
          </div>
        </div>
        <div className="mt-8 ">
          <Button size="lg" className="w-full" onClick={() => handleBorrow()}>
            Borrow
          </Button>
        </div>
      </div>
    </Layout>
  );
}

