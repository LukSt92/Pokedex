import { Title } from "../../shared/Title";
import { Button } from "../../shared/Button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../../services/schema";
import { InputGroup } from "../../shared/InputGroup";
import { useGetAllUsersData } from "../../hooks/useGetAllUsersData";
import { useContext } from "react";
import { LoginContext } from "../../context/LoginContext";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const { setLoggedIn } = useContext(LoginContext);
  const { allUsersData } = useGetAllUsersData("users");
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(loginSchema), defaultValues: {} });

  const onSubmit = (data) => {
    const validate = allUsersData.find(
      (user) =>
        user.userName === data.username && user.password === data.password
    );
    if (validate) {
      setLoggedIn(true);
      navigate("/");
    } else {
      console.log("fail");
      //TODO NOTISTACK
    }
  };

  return (
    <>
      <Title>Log in</Title>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputGroup
          register={register}
          type={"text"}
          name={"username"}
          errors={errors.username}
        />
        <InputGroup
          register={register}
          type={"password"}
          name={"password"}
          errors={errors.password}
        />
        <div className="justify-self-center">
          <Button type="submit">Log in</Button>
        </div>
      </form>
    </>
  );
};
