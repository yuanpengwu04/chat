import GenderCheckbox from "./GenderCheckbox";
import FormInput from "../../components/form/FormInput";
import { Link } from "react-router-dom";
import { useState } from "react";
import useSignup from "../../hooks/useSignup";

const SignUp = () => {
  const [inputs, setInputs] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });

  const { loading, signup } = useSignup();

  function handleChange(event) {
    const { name, value } = event.target;
    setInputs((prev) => {
      return { ...prev, [name]: value };
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    console.log(inputs);

    await signup(inputs);
  }

  function handleCheckboxChange(value) {
    setInputs((prev) => {
      return { ...prev, gender: value };
    });
  }

  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400/0 bg-clip-padding backdrop-filter backdrop-blur-lg">
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          Sign Up <span className="text-blue-500"> ChatApp</span>
        </h1>

        <form onSubmit={handleSubmit}>
          <FormInput
            field={`Full Name`}
            placeholder={`John Doe`}
            optionalOrRequired={`Required`}
            name="fullName"
            value={inputs.fullName}
            onChange={handleChange}
          />

          <FormInput
            field={`Username`}
            placeholder={`johndoe`}
            optionalOrRequired={`Required`}
            name="username"
            value={inputs.username}
            onChange={handleChange}
          />

          <FormInput
            type="password"
            field={`Password`}
            placeholder={`Password`}
            optionalOrRequired={`Required`}
            name="password"
            value={inputs.password}
            onChange={handleChange}
          />

          <FormInput
            type="password"
            field={`Confirm Password`}
            placeholder={`Confirm Password`}
            optionalOrRequired={`Required`}
            name="confirmPassword"
            value={inputs.confirmPassword}
            onChange={handleChange}
          />

          <GenderCheckbox
            value={inputs.gender}
            onChange={handleCheckboxChange}
          />

          <Link
            to="/login"
            className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block"
          >
            Already have an account?
          </Link>

          <div>
            <button
              disabled={loading}
              className="btn btn-block btn-sm mt-2 border border-slate-700"
            >
              {loading ? (
                <span class="loading loading-dots loading-sm"></span>
              ) : (
                "Sign Up"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default SignUp;
