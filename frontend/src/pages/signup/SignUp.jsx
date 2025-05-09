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
	licenseKey: "",
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
  <div className="h-screen w-screen flex flex-col">
      <div className="bg-[#9696ee] text-white flex items-center justify-center py-6">
        <div className="text-6xl font-bold brand-header">Mirth</div>
      </div>
    <div className="flex flex-1 items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400/0 bg-clip-padding backdrop-filter backdrop-blur-lg">
        <h1 className="text-4xl font-semibold text-center text-gray-300 brand-header">
          Register
        </h1>

        <form onSubmit={handleSubmit}>
		  <div className="flex items-center gap-8">
          <FormInput
            field={`Username`}
            placeholder={`johndoe`}
            optionalOrRequired={`Required`}
            name="username"
            value={inputs.username}
            onChange={handleChange}
          />
		  
		  <FormInput
            field={`Full Name`}
            placeholder={`John Doe`}
            optionalOrRequired={`Required`}
            name="fullName"
            value={inputs.fullName}
            onChange={handleChange}
          />  
          </div>
		  <div className="flex items-center gap-8">
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
          </div>
		  <div className="flex items-center gap-8">
		  <FormInput
            field={`License Key`}
            placeholder={`XXXXX-XXXXX`}
            optionalOrRequired={`Required`}
            name="licenseKey"
            value={inputs.licenseKey}
            onChange={handleChange}
          />
		  <div>
		   <p className="fieldset fieldset-legend">Gender</p>
		   <GenderCheckbox
             value={inputs.gender}
             onChange={handleCheckboxChange}
           />
		   <p className="fieldset fieldset-label">Required</p>
	      </div>
          </div>
          <div className="flex items-center justify-center">
            <button
              disabled={loading}
              className="btn btn-block btn-sm mt-2 border border-slate-700 w-1/4 bg-[#7676ce] hover:bg-[#8686de] text-white"
            >
              {loading ? (
                <span class="loading loading-dots loading-sm"></span>
              ) : (
                "Sign Up"
              )}
            </button>
          </div>
		  <div className="flex items-center justify-center">
          <Link
            to="/login"
            className="text-sm text-gray-300 text-center justify-center items-center hover:underline hover:text-indigo-300 mt-2 inline-block"
          >
            Already have an account?
          </Link>
		  </div>
        </form>
      </div>
    </div>
	</div>
  );
};
export default SignUp;
