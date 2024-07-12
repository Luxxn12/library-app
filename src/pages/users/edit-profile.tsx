import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { toast } from "sonner";

import { CustomFormField } from "@/components/custom-formfield";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form } from "@/components/ui/form";
import Layout from "@/components/layout";

import { ProfileSchema, profileSchema } from "@/utils/types/users";
import { deleteProfile, updateProfile } from "@/utils/apis/users";
import { useToken } from "@/utils/contexts/token";

export default function EditProfile() {
  const { user, changeToken } = useToken();
  const navigate = useNavigate();

  const form = useForm<ProfileSchema>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      full_name: "",
      email: "",
      password: "",
      address: "",
      phone_number: "",
      profile_picture: new File([], ""),
    },
  });

  useEffect(() => {
    form.setValue("address", user?.address ?? "");
    form.setValue("email", user?.email ?? "");
    form.setValue("full_name", user?.full_name ?? "");
    form.setValue("phone_number", user?.phone_number ?? "");
  }, [user]);

  async function handleUpdate(data: ProfileSchema) {
    try {
      const response = await updateProfile(data);

      toast.success(response.message);
    } catch (error) {
      toast.error((error as Error).message);
    }
  }

  async function handleDelete() {
    try {
      const response = await deleteProfile();

      toast.success(response.message);
      changeToken();
      navigate("/login");
    } catch (error) {
      toast.error((error as Error).message);
    }
  }
  return (
    <Layout>
      <div className="container">
        <div className="mb-5 mt-8">
          <text className="text-2xl text-black dark:text-white font-bold ">EDIT PROFILE</text>
        </div>
        <Form {...form}>
          <form
            id="form-update"
            data-testid="form-update"
            onSubmit={form.handleSubmit(handleUpdate)}
            className="space-y-4"
          >
            <CustomFormField
              control={form.control}
              name="email"
              label="Email"
            >
              {(field) => (
                <Input
                  {...field}
                  data-testid="input-email"
                  placeholder="johndoe@mail.com"
                  type="email"
                  disabled={form.formState.isSubmitting}
                  aria-disabled={form.formState.isSubmitting}
                  value={field.value as string}
                />
              )}
            </CustomFormField>
            <CustomFormField
              control={form.control}
              name="full_name"
              label="Full Name"
            >
              {(field) => (
                <Input
                  {...field}
                  data-testid="input-full-name"
                  placeholder="John Doe"
                  disabled={form.formState.isSubmitting}
                  aria-disabled={form.formState.isSubmitting}
                  value={field.value as string}
                />
              )}
            </CustomFormField>
            <CustomFormField
              control={form.control}
              name="password"
              label="Password"
            >
              {(field) => (
                <Input
                  {...field}
                  data-testid="input-password"
                  placeholder="Password"
                  type="password"
                  disabled={form.formState.isSubmitting}
                  aria-disabled={form.formState.isSubmitting}
                  value={field.value as string}
                />
              )}
            </CustomFormField>
            <CustomFormField
              control={form.control}
              name="address"
              label="Address"
            >
              {(field) => (
                <Input
                  {...field}
                  data-testid="input-address"
                  placeholder="Lorem Ipsum Street"
                  disabled={form.formState.isSubmitting}
                  aria-disabled={form.formState.isSubmitting}
                  value={field.value as string}
                />
              )}
            </CustomFormField>
            <CustomFormField
              control={form.control}
              name="phone_number"
              label="Phone Number"
            >
              {(field) => (
                <Input
                  {...field}
                  data-testid="input-phone-number"
                  placeholder="+628xxxxxxxx"
                  disabled={form.formState.isSubmitting}
                  aria-disabled={form.formState.isSubmitting}
                  value={field.value as string}
                />
              )}
            </CustomFormField>
            <CustomFormField
              control={form.control}
              name="profile_picture"
              label="Profile Picture"
            >
              {(field) => (
                <Input
                  data-testid="input-profile-picture"
                  type="file"
                  disabled={form.formState.isSubmitting}
                  aria-disabled={form.formState.isSubmitting}
                  onChange={(e) =>
                    field.onChange(e.target.files ? e.target.files[0] : null)
                  }
                />
              )}
            </CustomFormField>
          </form>
        </Form>
        <div className="pt-5 gap-3 pb-5">
          <div className="flex  gap-5">
            <Button variant="destructive" className="bg-gray-600" onClick={() => handleDelete()}>
              Delete
            </Button>
            <Button type="submit" form="form-update">
              Save
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  )
}
