import {
    UseFormRegister,
    FieldValues,
    FieldError,
    RegisterOptions,
    Path
} from "react-hook-form";
import Input from "../../Atoms/Form/Input";
import Label from "../../Atoms/Form/Label";
import Paragraph from "../../Atoms/Paragraph";

type FormGroupType<T extends FieldValues> = {
    labelName: string;
    inputName: Path<T>;
    register: UseFormRegister<T>;
    errors?: FieldError | undefined;
    inputType: string;
    placeholder: string;
    errorMessage?: string;
    isRequirePattern?: boolean;
    requirePattern?: RegisterOptions;
};

const FormInputGroup = <T extends FieldValues>({
    labelName,
    inputName,
    register,
    errors,
    inputType,
    placeholder,
    errorMessage,
    isRequirePattern = false,
    requirePattern,
    ...rest
}: FormGroupType<T>) => {
   console.log(register, "register");
    return (
        <div className="mb-3">
            <Label name={labelName} {...{ htmlFor: inputName }} />

            <Input
                // {...{
                //     ...{...register(
                //         inputName,
                //         !isRequirePattern
                //             ? {
                //                   required: `${errorMessage}`,
                //               }
                //             : requirePattern
                //     )},
                // }}
                {...{...register(
                        inputName,
                        !isRequirePattern
                            ? {
                                  required: `${errorMessage}`,
                              }
                            : requirePattern
                    ),
                }}
                {...{ ...rest }}
                type={inputType}
                placeholder={placeholder}
                className="input input-bordered input-success w-full text-gray-700"
            />

            {errors?.message && (
                <Paragraph
                    className="text-red-600 text-sm"
                    text={errors?.message}
                />
            )}
        </div>
    );
};

export default FormInputGroup;
