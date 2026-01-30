import { useForm } from "react-hook-form";
import Modal from "./Modal";
import { login } from "../utils/localAuth";
import { useAppDispatch } from "../store/hooks";
import { loginSuccess } from "../store/slices/authSlice";


interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface LoginFormValues {
  username: string;
  password: string;
}

const LoginModal = ({ isOpen, onClose }: LoginModalProps) => {
  const dispatch = useAppDispatch();
  const { register, handleSubmit, formState: { errors, isSubmitting }} = useForm<LoginFormValues>();

  const onSubmit = async (data: LoginFormValues) => {
    try {
      login(data.username, data.password); // localStorage
      dispatch(
        loginSuccess({
          username: data.username,
          email: "demo@email.com",
        })
      );
      onClose();
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "An error occurred");
    }
  };


  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="mb-1">Welcome Back</h2>
      <p className="text-textMuted mb-6 text-sm">
        Login to continue shopping
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Username */}
        <div>
          <label className="text-sm font-medium">Username</label>
          <input
            className="input w-full mt-1"
            placeholder="Enter your username"
            {...register("username", {
              required: "Username is required",
            })}
          />
          {errors.username && (
            <p className="text-danger text-sm mt-1">
              {errors.username.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="text-sm font-medium">Password</label>
          <input type="password" className="input w-full mt-1" placeholder="Enter your password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Minimum 6 characters",
              },
            })} />
          {errors.password && (
            <p className="text-danger text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <button className="btn-primary w-full mt-4" disabled={isSubmitting} >
          Login
        </button>
      </form>

      <p className="text-sm text-center text-textMuted mt-6">
        Don’t have an account?{" "}
        <span className="text-primary cursor-pointer font-medium">
          Sign up
        </span>
      </p>
    </Modal>
  );
};

export default LoginModal;
