import { Button } from "../../shared/Button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../../services/registerSchema";
import { useGetAllUsersData } from "../../hooks/useGetAllUsersData";
import { createNewUser } from "./createNewUser";
import { RegisterInput } from "./RegisterInput";

const usersUrl = "users";

export const Register = () => {
  const { allUsersData } = useGetAllUsersData(usersUrl);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(registerSchema), defaultValues: {} });

  const onSubmit = (data) => {
    console.log(allUsersData);
    if (allUsersData.some((user) => user.userName === data.username))
      console.log("test");
    //TODO ADD NOTISTACK!!
    else createNewUser(data);
  };

  return (
    <>
      <p className="text-4xl font-bold">Create new account</p>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto">
        <RegisterInput
          register={register}
          type={"text"}
          name={"username"}
          errors={errors.username}
        />
        <RegisterInput
          register={register}
          type={"email"}
          name={"email"}
          errors={errors.email}
        />
        <RegisterInput
          register={register}
          type={"password"}
          name={"password"}
          errors={errors.password}
        />
        <RegisterInput
          register={register}
          type={"password"}
          name={"confirm"}
          errors={errors.confirm}
        />
        <div className="justify-self-center">
          <Button type="submit">Create</Button>
        </div>
      </form>
    </>
  );
};
