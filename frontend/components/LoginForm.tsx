"use client";
import { Input, Button, Card, CardBody } from "@nextui-org/react";
import { useRouter } from "next/router";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";

import { signinScheme } from "@/schemes";

// const LoginForm = () => {
//   const [formdata, setFormdata] = useState({ email: "", password: "" });
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     resolver: zodResolver(signinScheme),
//   });

//   const router = useRouter();
//   const handleLogin = async () => {
//     const { email, password } = await signinScheme.parseAsync(formdata);

//     console.log(email, password);
//     // const response = await signIn("credentials", {
//     //   email: formdata.email,
//     //   password: formdata.password,
//     //   redirect: false,
//     // });

//     // if (response?.ok) {
//     //   router.push("/");
//     // }
//     // if (response?.error) {
//     //   toast.error(response.error);
//     // }
//     setFormdata({ email: "", password: "" });
//   };

//   return (
//     <Card>
//       <CardBody>
//         <div className="flex w-full flex-col gap-5">
//           <h3>Login</h3>
//           <Input
//             fullWidth
//             placeholder="Email"
//             value={formdata.email}
//             onChange={(e) =>
//               setFormdata({ ...formdata, email: e.target.value })
//             }
//           />
//           <Input
//             fullWidth
//             placeholder="Password"
//             type="password"
//             value={formdata.password}
//             onChange={(e) =>
//               setFormdata({ ...formdata, password: e.target.value })
//             }
//           />
//           <Button color="primary" variant="ghost" onClick={handleLogin}>
//             Login
//           </Button>
//         </div>
//       </CardBody>
//     </Card>
//   );
// };
type Schema = z.infer<typeof signinScheme>;

const LoginForm = () => {
  const router = useRouter();

  // useForm hook with Zod schema validation
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset, // Resets form after submission
  } = useForm<Schema>({
    resolver: zodResolver(signinScheme),
  });

  // Form submit handler
  const handleLogin = async (data: Schema) => {
    const { email, password } = data;

    const response = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (response?.ok) {
      router.push("/");
    }
    if (response?.error) {
      toast.error(response.error);
    }

    reset();
  };

  return (
    <Card>
      <CardBody>
        <form
          className="flex flex-col gap-5 w-full"
          onSubmit={handleSubmit(handleLogin)}
        >
          <h3>Login</h3>

          <Input
            {...register("email")}
            fullWidth
            errorMessage={errors.email?.message}
            isInvalid={errors.email ? true : false}
            placeholder="Email"
          />

          <Input
            placeholder="Password"
            type="password"
            {...register("password")}
            errorMessage={errors.password?.message}
            isInvalid={errors.password ? true : false}
          />

          <Button color="primary" type="submit">
            Login
          </Button>
        </form>
      </CardBody>
    </Card>
  );
};

export default LoginForm;
