import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { axiosPublic } from "../../hooks/axiosPublic";
const Registration = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    // reset,
  } = useForm();

  // Onsubmit hook form
  const onSubmit = async (data) => {
    console.log("clint side Data:", data);
    try {
      const response = await axiosPublic.post("/api/users/register", data);
      if (response.status === 201) {
        Swal.fire("Registration successful!", "Please login now.", "success");
        navigate("/login");
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        // Handle 400 error separately for duplicate email
        Swal.fire("Error", "Email already exists!", "error");
        console.log(error);
      } else {
        console.error("Registration error:", error);
        Swal.fire("Error", error.message, "error");
      }
    }
  };
  return (
    <>
      <div className="flex min-h-screen">
        <div className="w-1/2 flex flex-col justify-center items-center p-8 bg-base-100">
          <div className="card w-full max-w-sm bg-base-100 shadow-xl">
            <div className="card-body p-6">
              {/* Card Title or Form Title */}
              <h2 className="card-title text-3xl font-bold mb-4">
                Create an Account
              </h2>

              {/* Form starts here */}
              <form onSubmit={handleSubmit(onSubmit)}>
                {/* Full Name Field */}
                <div className="mb-4">
                  <label
                    htmlFor="name"
                    className="block text-sm font-bold mb-1"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    {...register("name", {
                      required: "*Name is required",
                    })}
                    placeholder="Enter your full name"
                    className="input input-bordered w-full"
                  />
                  {errors.name && (
                    <p className="text-red-700">{errors.name.message}</p>
                  )}
                </div>

                {/* Email Field */}
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-bold mb-1"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    {...register("email", {
                      required: "*Email address required",
                    })}
                    placeholder="Enter your email"
                    className="input input-bordered w-full"
                  />
                  {errors.email && (
                    <p className="text-red-700">{errors.email.message}</p>
                  )}
                </div>

                {/* Password Field */}
                <div className="mb-4">
                  <label
                    htmlFor="password"
                    className="block text-sm font-bold mb-1"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    {...register("password", {
                      required: "*Password is required",
                    })}
                    placeholder="Create a password"
                    className="input input-bordered w-full"
                  />
                  {errors.password && (
                    <p className="text-red-700">{errors.password.message}</p>
                  )}
                </div>

                {/* Actions: Sign Up button */}
                <div className="flex items-center justify-between mb-2">
                  <button type="submit" className="btn btn-primary">
                    Sign Up
                  </button>
                </div>
              </form>
              {/* End of Form */}

              {/* Sign In link if user already has an account */}
              <p className="text-sm text-center">
                Already have an account?{" "}
                <Link to="/login" className="text-blue-500 hover:text-blue-700">
                  Log in
                </Link>
              </p>
            </div>
          </div>
        </div>
        <div
          className="w-1/2 bg-cover bg-center"
          style={{
            backgroundImage: "url('../src/assets/register-wallpaper.webp')",
          }}
        >
          {/* Empty or additional overlay if needed */}
        </div>
      </div>
    </>
  );
};

export default Registration;
