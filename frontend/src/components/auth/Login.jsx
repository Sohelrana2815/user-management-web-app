import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { axiosPublic } from "../../hooks/axiosPublic";

const Login = () => {
  const navigate = useNavigate();
  // const location = useLocation();
  // const from = location.state?.from?.pathname || "/adminPanel"; // Default redirect path

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const existingToken = localStorage.getItem("token");
    if (existingToken) {
      Swal.fire("Already Logged In", "Please log out first.", "info");
      return;
    }
    try {
      // 1. Send a POST request to /login
      const response = await axiosPublic.post("/api/users/login", data);
      console.log(data, response);

      if (response.status === 200) {
        const { token, user } = response.data;

        // Store JWT + user in localStorage
        localStorage.setItem("token", token);
        localStorage.setItem("currentUser", JSON.stringify(user));
        reset();
        Swal.fire("Success", "Login successful", "success");
        navigate("/adminPanel");
      } else if (response.status === 401) {
        Swal.fire("Error", "Invalid email or password", "error");
      } else if (response.status === 403) {
        Swal.fire("Blocked", "Account is blocked", "error");
      } else {
        Swal.fire("Error", "Login failed", "error");
      }
    } catch (error) {
      console.error("Login error:", error);
      if (error.response) {
        const { status } = error.response;
        if (status === 401) {
          Swal.fire("Error", "Invalid email or password", "error");
        } else if (status === 403) {
          Swal.fire("Blocked", "Account is blocked", "error");
        } else {
          Swal.fire("Error", "Login failed", "error");
        }
      } else {
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
              <h2 className="card-title text-3xl font-bold mb-4">Login</h2>

              {/* Form starts here */}
              <form onSubmit={handleSubmit(onSubmit)}>
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
                      required: "*Email address is required",
                    })}
                    placeholder="Enter your email"
                    className="input w-full"
                  />
                  {errors.email && (
                    <span className="text-red-700">{errors.email.message}</span>
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
                    placeholder="Enter your password"
                    className="input w-full"
                  />
                  {errors.password && (
                    <span className="text-red-700">
                      {errors.password.message}
                    </span>
                  )}
                </div>

                {/* Actions: Login button & Forgot Password link */}
                <div className="flex items-center justify-between mb-2">
                  <button type="submit" className="btn btn-primary">
                    Sign In
                  </button>
                </div>
              </form>
              {/* End of Form */}

              {/* Sign Up link if user doesn't have an account */}
              <p className="text-sm text-center">
                Don’t have an account?{" "}
                <Link
                  to="/registration"
                  className="text-blue-500 hover:text-blue-700"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>

        <div
          className="w-1/2 bg-no-repeat bg-cover"
          style={{
            backgroundImage: "url('../src/assets/login-wallpaper.webp')",
          }}
        ></div>
      </div>
    </>
  );
};

export default Login;
