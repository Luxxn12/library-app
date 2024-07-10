import {
  Control,
  ControllerRenderProps,
  FieldValues,
  FieldPath,
  Path,
} from "react-hook-form";
import { CalendarIcon } from "lucide-react";
import { ReactNode } from "react";
import { format } from "date-fns";

import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface Props<T extends FieldValues> {
  name: FieldPath<T>;
  label: string;
  placeholder?: string;
  options?: any[];
  description?: string;
  control: Control<T>;
}

interface ChildrenProps<T extends FieldValues> extends Props<T> {
  children: (field: ControllerRenderProps<T, Path<T>>) => ReactNode;
}

const CustomFormField = <T extends FieldValues>(props: ChildrenProps<T>) => {
  const { name, label, description, control, children } = props;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-black">{label}</FormLabel>
          <FormControl>{children(field)}</FormControl>
          {description ? (
            <FormDescription>{description}</FormDescription>
          ) : null}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

const CustomFormSelect = () => {
  return <div></div>;
};

const CustomFormDatePicker = () => {
  return <div></div>;
};

export { CustomFormField, CustomFormSelect, CustomFormDatePicker };
// Named export

