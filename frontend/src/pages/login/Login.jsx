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
    <div className="h-screen w-screen flex flex-col">
      <div className="bg-[#9696ee] text-white flex items-center justify-center py-6">
        <div className="text-6xl font-bold brand-header">Mirth</div>
      </div>
    <div className="flex-1 flex items-center justify-center min-w-96 mx-auto">
      <div className="flex-1 max-w-md p-6 w-full items-center justify-center rounded-lg shadow-md bg-gray-400/10 bg-clip-padding backdrop-filter backdrop-blur-lg">
        <h1 className="text-4xl font-semibold text-center text-gray-300 mb-4 brand-header">
          Login
        </h1>

        <form onSubmit={handleSubmit} className="items-center justify-center">
		
		  
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
		  
		  <div className="flex items-center justify-center">
            <button disabled={loading} className="btn btn-block btn-sm mt-2 w-1/6 bg-[#7676ce] hover:bg-[#8686de] text-white">
              {loading ? (
                <span className="loading loading-dots loading-sm"></span>
              ) : (
                "Login"
              )}
            </button>
          </div>
          <div className="flex items-center justify-center">
          <Link
            to="/signup"
            className="text-sm text-gray-300 text-center justify-center items-center hover:underline hover:text-indigo-300 mt-2 inline-block"
          >
            {"Don't"} have an account?
          </Link>
          </div>
        </form>
      </div>
    </div>
	</div>
  );
};
export default Login;
