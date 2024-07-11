import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { CustomFormField } from "@/components/custom-formfield";
import { Input } from "@/components/ui/input";
import { Form } from "@/components/ui/form";
import Layout from "@/components/layout";

import { RegisterSchema, registerSchema } from "@/utils/types/auth";
import { userRegister } from "@/utils/apis/auth";
import { Button } from "@/components/ui/button";

export default function Register() {
  const navigate = useNavigate();
  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      full_name: "",
      email: "",
      password: "",
      repassword: "",
      address: "",
      phone_number: "",
    },
  });

  async function onSubmit(data: RegisterSchema) {
    try {
      const response = await userRegister(data);

      toast.success(response.message);
      navigate("/login");
    } catch (error) {
      toast.error((error as Error).message);
    }
  }

  return (
    <Layout>
      <div className="mt-5">
        <div className="m-auto w-full max-w-md space-y-6">
          <div>
            <h1 className="text-2xl text-gray-900 dark:text-white font-bold tracking-tight text-foreground sm:text-3xl">
              Sign up to your account
            </h1>
          </div>
          <Form {...form}>
            <form
              data-testid="form-login"
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4"
            >
              <CustomFormField
                control={form.control}
                name="full_name"
                label="Full Name"
              >
                {(field) => (
                  <Input
                    data-testid="input-full-name"
                    placeholder="John Doe"
                    disabled={form.formState.isSubmitting}
                    aria-disabled={form.formState.isSubmitting}
                    {...field}
                  />
                )}
              </CustomFormField>
              <CustomFormField
                control={form.control}
                name="email"
                label="Email"
              >
                {(field) => (
                  <Input
                    data-testid="input-email"
                    placeholder="johndoe@mail.com"
                    type="email"
                    disabled={form.formState.isSubmitting}
                    aria-disabled={form.formState.isSubmitting}
                    {...field}
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
                    data-testid="input-password"
                    placeholder="Password"
                    type="password"
                    disabled={form.formState.isSubmitting}
                    aria-disabled={form.formState.isSubmitting}
                    {...field}
                  />
                )}
              </CustomFormField>
              <CustomFormField
                control={form.control}
                name="repassword"
                label="Retype Password"
              >
                {(field) => (
                  <Input
                    data-testid="input-repassword"
                    placeholder="Retype Password"
                    type="password"
                    disabled={form.formState.isSubmitting}
                    aria-disabled={form.formState.isSubmitting}
                    {...field}
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
                    data-testid="input-address"
                    placeholder="Lorem Ipsum Street"
                    disabled={form.formState.isSubmitting}
                    aria-disabled={form.formState.isSubmitting}
                    {...field}
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
                    data-testid="input-phone-number"
                    placeholder="+628xxxxxxxx"
                    disabled={form.formState.isSubmitting}
                    aria-disabled={form.formState.isSubmitting}
                    {...field}
                  />
                )}
              </CustomFormField>
              <div className="pt-5">
                <Button
                  data-testid="btn-submit"
                  type="submit"
                  className="w-full"
                  disabled={form.formState.isSubmitting}
                  aria-disabled={form.formState.isSubmitting}
                >
                  Sign up
                </Button>
              </div>
              <div className="text-center">
                <text className="mt-2 text-muted-foreground">
                  Don't have an account?{" "}
                  <Link
                    to="/login"
                    className="font-medium text-black dark:text-gray-400 hover:underline"
                  >
                    Sign in
                  </Link>
                </text>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Layout>
  );
}
