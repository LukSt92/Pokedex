import { Button } from "../../shared/Button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../../services/schema";
import { useGetAllUsersData } from "../../hooks/useGetAllUsersData";
import { createNewUser } from "./createNewUser";
import { InputGroup } from "../../shared/InputGroup";
import { Title } from "../../shared/Title";
import { useNotification } from "../../hooks/useNotification";

export const Register = () => {
  const { allUsersData } = useGetAllUsersData("users");
  const { toggleNotification } = useNotification();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(registerSchema), defaultValues: {} });

  const onSubmit = (data) => {
    console.log(allUsersData);
    if (allUsersData.some((user) => user.userName === data.username))
      toggleNotification(
        "This username is already taken, please enter another one.",
        "warning"
      );
    else {
      createNewUser(data);
      toggleNotification(
        "Your account has been created, now you can log in",
        "success"
      );
    }
  };

  return (
    <>
      <Title>Create new account</Title>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto">
        <InputGroup
          register={register}
          type={"text"}
          name={"username"}
          errors={errors.username}
        />
        <InputGroup
          register={register}
          type={"email"}
          name={"email"}
          errors={errors.email}
        />
        <InputGroup
          register={register}
          type={"password"}
          name={"password"}
          errors={errors.password}
        />
        <InputGroup
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
