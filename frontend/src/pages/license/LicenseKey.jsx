import { useState } from "react";
import FormInput from "../../components/form/FormInput";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const LicenseKey = () => {
  const [inputs, setInputs] = useState({
    userId: "",
    maxDevices: "1",
    expiresInDays: "30",
  });

  const [loading, setLoading] = useState(false);
  const [generatedLicense, setGeneratedLicense] = useState(null);

  function handleChange(event) {
    const { name, value } = event.target;
    setInputs((prev) => {
      return { ...prev, [name]: value };
    });
  }
  
  function validateInputs() {
    const maxDevices = parseInt(inputs.maxDevices, 10);
    const expiresInDays = parseInt(inputs.expiresInDays, 10);

    if (isNaN(maxDevices) || maxDevices <= 0) {
      toast.error("Max Devices must be a positive integer.");
      return false;
    }

    if (isNaN(expiresInDays) || expiresInDays <= 0) {
      toast.error("Expires In Days must be a positive integer.");
      return false;
    }

    return true;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    
	if (!validateInputs()) {
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/license/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: null, //generate license for arbitrary user
          maxDevices: parseInt(inputs.maxDevices, 10),
          expiresInDays: parseInt(inputs.expiresInDays, 10),
        }),
      });

      const data = await res.json();

      if (data.success) {
        setGeneratedLicense(data.license);
        toast.success("License key generated successfully!");
		console.log(data.license);
      } else {
        throw new Error(data.message || "Failed to generate license key");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="h-screen w-screen flex flex-col">
      <div className="bg-[#9696ee] text-white flex items-center justify-center py-6">
        <div className="text-6xl font-bold brand-header">Mirth</div>
      </div>
      <div className="flex flex-1 items-center justify-center min-w-116 mx-auto">
        <div className="w-full p-6 rounded-lg shadow-md bg-gray-400/0 bg-clip-padding backdrop-filter backdrop-blur-lg">
          <h1 className="text-4xl font-semibold text-center text-gray-300 brand-header">
            Generate License Key
          </h1>

          <form onSubmit={handleSubmit}>
            <div className="flex items-center gap-8">
              <FormInput
                field="Max Devices"
                placeholder="1"
                optionalOrRequired="Required"
                name="maxDevices"
                type="number"
                value={inputs.maxDevices}
                onChange={handleChange}
              />
              <FormInput
                field="Expires In Days"
                placeholder="30"
                optionalOrRequired="Required"
                name="expiresInDays"
                type="number"
                value={inputs.expiresInDays}
                onChange={handleChange}
              />
            </div>

            <div className="flex items-center justify-center">
              <button
                disabled={loading}
                className="btn btn-block btn-sm mt-2 border border-slate-700 w-1/3 bg-[#7676ce] hover:bg-[#8686de] text-white"
              >
                {loading ? (
                  <span className="loading loading-dots loading-sm"></span>
                ) : (
                  "Generate License"
                )}
              </button>
            </div>
          </form>
		  <div className="flex justify-center mt-4">
            <Link
              to="/signup"
              className="text-sm text-gray-300 text-center justify-center items-center hover:underline hover:text-indigo-300 mt-2 inline-block"
            >
              Return to Signup
            </Link>
          </div>
          {/* Display generated license */}
          {generatedLicense && (
            <div className="mt-6 p-4 bg-gray-800/50 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-300 mb-4">
                Generated License
              </h2>
              <div className="space-y-2">
                <p className="text-gray-300">
                  <span className="font-semibold">License Key:</span>{" "}
                  <span className="font-mono bg-gray-700 px-2 py-1 rounded">
                    {generatedLicense.key}
                  </span>
                </p>
                <p className="text-gray-300">
                  <span className="font-semibold">Expires At:</span>{" "}
                  {(generatedLicense.expiresAt) ? new Date(generatedLicense.expiresAt).toLocaleDateString() : "Never"}
                </p>
                <p className="text-gray-300">
                  <span className="font-semibold">Max Devices:</span>{" "}
                  {generatedLicense.maxDevices}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LicenseKey; 