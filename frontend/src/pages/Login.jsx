import { useForm } from "react-hook-form";
import { Link } from "react-router";
import useAuth from "../hooks/useAuth";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { login, logout } = useAuth();

  const onSubmit = async (data) => {
    const { email, password } = data;
    try {
      const userCredential = await login(email, password);
      console.log(userCredential);
    } catch (error) {
      console.error("Login error:", error.message);
    }
  };

  const handleLogout = async () => {
    await logout();
  };

  return (
    <>
      <h2 className="absolute text-2xl font-bold p-4">User Management App</h2>
      <div className="flex min-h-screen">
        {/* 
        LEFT SECTION (1/2):
        Holds the Login card in the center
        w-1/2 -> half width
        flex-col -> column direction
        justify-center -> center vertically
        items-center -> center horizontally
        p-8 -> padding
        bg-base-100 -> DaisyUI background color (adjustable)
      */}
        <div className="w-1/2 border flex flex-col justify-center items-center p-8 bg-base-100">
          {/* 
          Card container:
          w-full max-w-sm -> limit the card width
          bg-base-100 -> DaisyUI base background
          shadow-xl -> adds a shadow effect
        */}
          <div className="card w-full max-w-sm bg-base-100 shadow-xl">
            {/* 
            Card body:
            p-6 -> padding inside the card
          */}
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
                  <a
                    href="#forgot-password"
                    className="text-sm text-blue-500 hover:text-blue-700"
                  >
                    Forgot Password?
                  </a>
                </div>
              </form>
              {/* End of Form */}

              {/* Sign Up link if user doesn't have an account */}
              <p className="text-sm text-center">
                Don’t have an account?{" "}
                <Link
                  to="registration"
                  className="text-blue-500 hover:text-blue-700"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* 
        RIGHT SECTION (1/2):
        w-1/2 -> half width
        bg-cover -> background image covers the container
        bg-center -> center the image
        style -> add your image path
      */}
        <div
          className="w-1/2 bg-no-repeat bg-cover"
          style={{
            backgroundImage: "url('../src/assets/login-wallpaper.jpg')",
          }}
        >
          {/* Empty or additional overlay if needed */}
        </div>
        {/* logout */}
        <button className="btn btn-primary" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </>
  );
};

export default Login;
