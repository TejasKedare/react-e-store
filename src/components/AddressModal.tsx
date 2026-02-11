import { useForm } from "react-hook-form";
import { useAppDispatch } from "../store/hooks";
import { v4 as uuid } from "uuid";
import { addAddress } from "../store/slices/addressSlice";
import { numericField } from "../utils/numericField";

interface AddressFormProps {
  onSuccess: () => void;
}

interface AddressFormValues {
  fullName: string;
  phone: string;
  addressLine: string;
  city: string;
  state: string;
  pincode: string;
}

const AddressForm = ({ onSuccess }: AddressFormProps) => {
  const dispatch = useAppDispatch();
  const phone = numericField(10);
  const pincode = numericField(6);

  const { register, handleSubmit, formState: { errors } } = useForm<AddressFormValues>();

  const onSubmit = (data: AddressFormValues) => {
    dispatch(
      addAddress({
        id: uuid(),
        ...data,
      })
    );

    onSuccess(); // close modal / refresh UI
  };

  return (
    <>
      <h2 className="mb-1">Add Address</h2>
      <p className="text-textMuted mb-6 text-sm">
        This address will be used for delivery
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Full Name */}
        <div>
          <input
            className="input w-full"
            placeholder="Full Name"
            {...register("fullName", { required: "Name is required" })}
          />
          {errors.fullName && (
            <p className="text-danger text-sm">
              {errors.fullName.message}
            </p>
          )}
        </div>

        {/* Phone */}
        <div>

          <input
            className="input w-full"
            placeholder="Phone Number"
            {...phone.inputProps}
            {...register("phone", {
              required: "Phone is required",
              pattern: {
                value: /^[0-9]{10}$/,
                message: "Enter valid 10-digit phone",
              },
              ...phone.registerProps,
            })}
          />



          {errors.phone && (
            <p className="text-danger text-sm">
              {errors.phone.message}
            </p>
          )}
        </div>

        {/* Address */}
        <div>
          <textarea
            className="input w-full"
            placeholder="Address"
            {...register("addressLine", {
              required: "Address is required",
            })}
          />
          {errors.addressLine && (
            <p className="text-danger text-sm">
              {errors.addressLine.message}
            </p>
          )}
        </div>

        {/* City & State */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <input
              className="input w-full"
              placeholder="City"
              {...register("city", { required: "City is required" })}
            />
            {errors.city && (
              <p className="text-danger text-sm">
                {errors.city.message}
              </p>
            )}
          </div>

          <div>
            <input
              className="input w-full"
              placeholder="State"
              {...register("state", { required: "State is required" })}
            />
            {errors.state && (
              <p className="text-danger text-sm">
                {errors.state.message}
              </p>
            )}
          </div>
        </div>

        {/* Pincode */}
        <div>

          <input
            className="input w-full"
            placeholder="Pincode"
            {...pincode.inputProps}
            {...register("pincode", {
              required: "Pincode is required",
              pattern: {
                value: /^[0-9]{6}$/,
                message: "Enter valid pincode",
              },
              ...pincode.registerProps,
            })}
          />


          {errors.pincode && (
            <p className="text-danger text-sm">
              {errors.pincode.message}
            </p>
          )}
        </div>

        <button className="btn-primary w-full mt-4">
          Save Address
        </button>
      </form>
    </>
  );
};

export default AddressForm;
