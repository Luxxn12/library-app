import Layout from '@/components/layout';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import BooksAdmin from './books-admin';
import BorrowsAdmin from './borrows-admin';

export default function Admin() {
  return (
    <Layout>
      <div className='mt-5 mb-5'>
      <div className="flex flex-col gap-4 dark:text-black container">
        <Tabs defaultValue="books" className="border-b">
          <TabsList className="flex">
            <TabsTrigger value="books">Books</TabsTrigger>
            <TabsTrigger value="borrows">Borrows</TabsTrigger>
          </TabsList>
            <TabsContent value="books">
              <BooksAdmin/>
          </TabsContent>
            <TabsContent value="borrows">
              <BorrowsAdmin/>
          </TabsContent>
        </Tabs>
        </div>
      </div>
    </Layout>
  );
}

