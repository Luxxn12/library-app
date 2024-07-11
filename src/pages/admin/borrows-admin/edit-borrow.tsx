import { borrowPayload, BorrowPayload, IBorrow } from '@/utils/types/borrows';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { ReactNode, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CustomFormDatePicker } from "@/components/custom-formfield";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Loader2 } from 'lucide-react';

interface Props {
  children: ReactNode;
  editData: IBorrow;
  onSubmit: (data: BorrowPayload) => void;
}

export default function EditBorrow(props: Props) {
  const { children, editData, onSubmit } = props;

  const [open, setOpen] = useState(false);

  const form = useForm<BorrowPayload>({
    resolver: zodResolver(borrowPayload),
  });

  useEffect(() => {
    setEditData();
  }, [editData, form.formState.isSubmitSuccessful]);

  useEffect(() => {
    if (form.formState.isSubmitSuccessful) {
      setOpen(false);
      form.reset();
    }
  }, [form.formState]);

  function setEditData() {
    form.setValue("borrow_date", new Date(editData.borrow_date));
    form.setValue("due_date", new Date(editData.due_date));
  }
  return (
    <Dialog open={open} onOpenChange={setOpen} key={editData?.id}>
    <DialogTrigger asChild>{children}</DialogTrigger>
    <DialogContent className="w-full md:w-1/2 lg:w-2/3">
      <DialogHeader>
        <DialogTitle>Edit Borrow</DialogTitle>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <CustomFormDatePicker
            control={form.control}
            name="borrow_date"
            label="Borrow Date"
            placeholder="Borrow Date"
          />
          <CustomFormDatePicker
            control={form.control}
            name="due_date"
            label="Due Date"
            placeholder="Due Date"
          />
          <CustomFormDatePicker
            control={form.control}
            name="return_date"
            label="Return Date"
            placeholder="Return Date"
          />
          <DialogFooter>
            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
              aria-disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </>
              ) : (
                "Save changes"
              )}
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  </Dialog>
  );
}

