import { useForm } from "react-hook-form";
import { Link } from "react-router";
import useAuth from "../../hooks/useAuth";
import { updateProfile } from "firebase/auth";
const Registration = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signup } = useAuth();
  const onSubmit = async (data) => {
    const { name, email, password } = data;
    try {
      // Register the user with email and password
      const userCredential = await signup(email, password);
      // Update the user's display name
      await updateProfile(userCredential.user, {
        displayName: name,
      });
      console.log(
        "User registered with display name:",
        userCredential.user.name
      );
    } catch (error) {
      console.error("Registration error:", error.message);
    }
  };
  return (
    /*
    Parent container: flex -> display columns side by side min-h-screen ->
    full viewport height
    */
    <>
      <h2 className="absolute text-2xl font-bold p-4">User Management App</h2>
      <div className="flex min-h-screen">
        {/* 
        LEFT SECTION (1/2):
        Holds the Registration card in the center
        w-1/2 -> half width
        flex-col -> column direction
        justify-center -> center vertically
        items-center -> center horizontally
        p-8 -> padding
        bg-base-100 -> DaisyUI background color (adjustable)
      */}
        <div className="w-1/2 flex flex-col justify-center items-center p-8 bg-base-100">
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
                <Link to="/" className="text-blue-500 hover:text-blue-700">
                  Log in
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
          className="w-1/2 bg-cover bg-center"
          style={{
            backgroundImage: "url('../src/assets/register-wallpaper.jpg')",
          }}
        >
          {/* Empty or additional overlay if needed */}
        </div>
      </div>
    </>
  );
};

export default Registration;
