import { useForm } from "react-hook-form";
import Modal from "./Modal";
import { signup, login } from "../utils/localAuth";
import { useAppDispatch } from "../store/hooks";
import { loginSuccess } from "../store/slices/authSlice";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "../schemas/signupSchema";

interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenLogin: () => void;
}

interface SignupFormValues {
  username: string;
  email: string;
  password: string;
}

const SignupModal = ({ isOpen, onClose, onOpenLogin }: SignupModalProps) => {
  const dispatch = useAppDispatch();

  const { register, handleSubmit, formState: { errors, isSubmitting }} = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupFormValues) => {
    try {
      //  Create user (localStorage)
      signup(data);

      //  Auto-login user
      login(data.username, data.password);

      // Update Redux auth state
      dispatch(
        loginSuccess({
          username: data.username,
          email: data.email,
        })
      );

      //  Close modal
      onClose();
    } catch (err: unknown) {
      toast.error(
        err instanceof Error ? err.message : "Signup failed"
      );
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="mb-1">Create Account</h2>
      <p className="text-textMuted mb-6 text-sm">
        Join us and start shopping
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Username */}
        <div>
          <label className="text-sm font-medium">Username</label>
          <input className="input w-full mt-1" placeholder="Choose a username"
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

        {/* Email */}
        <div>
          <label className="text-sm font-medium">Email</label>
          <input
            className="input w-full mt-1"
            placeholder="Enter your email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email address",
              },
            })}
          />
          {errors.email && (
            <p className="text-danger text-sm mt-1">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="text-sm font-medium">Password</label>
          <input type="password" className="input w-full mt-1" placeholder="Create a password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Minimum 6 characters",
              },
            })}
          />
          {errors.password && (
            <p className="text-danger text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <button className="btn-primary w-full mt-4" disabled={isSubmitting} >
          Sign Up
        </button>

        <p className="text-sm text-center text-textMuted mt-6">
          Already have an account?{" "}
          <span className="text-primary cursor-pointer font-medium"
            onClick={() => {
              onClose();
              onOpenLogin();
            }}>
            Login
          </span>
        </p>
      </form>
    </Modal>
  );
};

export default SignupModal;
