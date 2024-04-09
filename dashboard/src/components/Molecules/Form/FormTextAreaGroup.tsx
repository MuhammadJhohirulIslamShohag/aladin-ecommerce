
import { UseFormRegister, FieldValues, FieldError, Path } from "react-hook-form";
import Label from "../../Atoms/Form/Label";
import TextArea from "../../Atoms/Form/TextArea";
import Paragraph from "../../Atoms/Paragraph";

type FormGroupType<T extends FieldValues> = {
    labelName: string;
    inputName: Path<T>;
    register: UseFormRegister<T>;
    errors?: FieldError;
    inputType: string;
    placeholder: string;
    errorMessage?: string;
};

const FormTextAreaGroup = <T extends FieldValues>({
    labelName,
    inputName,
    register,
    errors,
    placeholder,
    errorMessage,
}: FormGroupType<T>) => {
    return (
        <div className="mb-3">
            <Label name={labelName} {...{ htmlFor: inputName }} />

            <TextArea
                {...{
                    ...register(inputName, {
                        required: `${errorMessage}`,
                    }),
                }}
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

export default FormTextAreaGroup;
