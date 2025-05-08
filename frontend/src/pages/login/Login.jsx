import { Link } from "react-router-dom";
import FormInput from "../../components/form/FormInput";
import useLogin from "../../hooks/useLogin";
import { useState } from "react";

const Login = () => {
  const [inputs, setInputs] = useState({ username: "", password: "" });
  const { loading, login } = useLogin();

  async function handleSubmit(event) {
    event.preventDefault();
    await login(inputs.username, inputs.password);
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setInputs((prev) => {
      return { ...prev, [name]: value };
    });
  }

  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400/0 bg-clip-padding backdrop-filter backdrop-blur-lg">
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          Login
          <span className="text-blue-500"> ChatApp</span>
        </h1>

        <form onSubmit={handleSubmit}>
          <FormInput
            field={`Username`}
            name="username"
            placeholder={`johndoe`}
            value={inputs.username}
            onChange={handleChange}
          />

          <FormInput
            type="password"
            name="password"
            field={`Password`}
            placeholder={`Password`}
            value={inputs.password}
            onChange={handleChange}
          />

          <Link
            to="/signup"
            className="text-sm  hover:underline hover:text-blue-600 mt-2 inline-block"
          >
            {"Don't"} have an account?
          </Link>

          <div>
            <button disabled={loading} className="btn btn-block btn-sm mt-2">
              {loading ? (
                <span class="loading loading-dots loading-sm"></span>
              ) : (
                "Login"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Login;
