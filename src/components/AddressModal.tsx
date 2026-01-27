import { useForm } from "react-hook-form";
import { saveUserAddress } from "../utils/addressStorage";
import { v4 as uuid } from "uuid";

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
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<AddressFormValues>();

    const onSubmit = (data: AddressFormValues) => {
        saveUserAddress({
            id: uuid(),
            ...data,
        });
        onSuccess();
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
                        {...register("phone", {
                            required: "Phone is required",
                            pattern: {
                                value: /^[0-9]{10}$/,
                                message: "Enter valid 10-digit phone",
                            },
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
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                    <div className="w-full">
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

                    <div className="w-full">
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
                        {...register("pincode", {
                            required: "Pincode is required",
                            pattern: {
                                value: /^[0-9]{6}$/,
                                message: "Enter valid pincode",
                            },
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
