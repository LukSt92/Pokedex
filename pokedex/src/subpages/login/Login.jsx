import { Title } from "../../shared/Title";
import { Button } from "../../shared/Button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../../services/schema";
import { InputGroup } from "../../shared/InputGroup";
import { useGetData } from "../../hooks/useGetData";
import { useContext } from "react";
import { LoginContext } from "../../context/LoginContext";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../../hooks/useNotification";

const url = "http://localhost:3000/users/";

export const Login = () => {
  const { toggleNotification } = useNotification();
  const { setLoggedIn } = useContext(LoginContext);
  const { data } = useGetData(url);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(loginSchema), defaultValues: {} });

  const onSubmit = (dataOnSubmit) => {
    const validate = data.find(
      (user) =>
        user.userName === dataOnSubmit.username &&
        user.password === dataOnSubmit.password
    );
    if (validate) {
      localStorage.setItem("userName", dataOnSubmit.username);
      toggleNotification(`Welcome ${dataOnSubmit.username}`, "success");
      setLoggedIn(true);
      navigate("/");
    } else
      toggleNotification("Invalid login details, please try again.", "error");
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
