/* eslint-disable @typescript-eslint/no-explicit-any */
import Input from "../../Atoms/Form/Input";
import Label from "../../Atoms/Form/Label";
import TextArea from "../../Atoms/Form/TextArea";
import Paragraph from "../../Atoms/Paragraph";

type FormGroupType = {
    labelName: string;
    inputName: string;
    register: any;
    errorField?: any;
    inputType?: string;
    placeholder?: string;
    required?: string;
    isReadOnly?: boolean;
    isDefaultValue?: boolean;
    defaultValue?: string | number;
    isRequirePattern?: boolean;
    requirePattern?: any;
    isTextArea?: boolean;
};

const FormGroup = ({
    labelName,
    inputName,
    register,
    errorField,
    inputType,
    placeholder,
    required,
    isReadOnly = false,
    isDefaultValue = false,
    defaultValue,
    isRequirePattern = false,
    requirePattern,
    isTextArea = false,
}: FormGroupType) => {
    return (
        <div className="mb-3">
            <Label name={labelName} {...{ htmlFor: inputName }} />

            {isReadOnly ? (
                isDefaultValue ? (
                    <Input
                        {...{
                            ...register(
                                inputName,
                                !isRequirePattern
                                    ? {
                                          required: `${required}`,
                                      }
                                    : requirePattern
                            ),
                        }}
                        {...{ readOnly: true, defaultValue: defaultValue }}
                        type={inputType}
                        placeholder={placeholder}
                        className="input input-bordered input-success w-full text-gray-700"
                    />
                ) : (
                    // <input
                    //     {...register(
                    //         inputName,
                    //         !isRequirePattern
                    //             ? {
                    //                   required: `${required}`,
                    //               }
                    //             : requirePattern
                    //     )}
                    //     type={inputType}
                    //     readOnly
                    //     defaultValue={defaultValue}
                    //     placeholder={placeholder}
                    //     className="input input-bordered input-success w-full text-gray-700"
                    // />
                    // <input
                    //     {...register(
                    //         inputName,
                    //         !isRequirePattern
                    //             ? {
                    //                   required: `${required}`,
                    //               }
                    //             : requirePattern
                    //     )}
                    //     type={inputType}
                    //     readOnly
                    //     placeholder={placeholder}
                    //     className="input input-bordered input-success w-full text-gray-700"
                    // />
                    <Input
                        {...{
                            ...register(
                                inputName,
                                !isRequirePattern
                                    ? {
                                          required: `${required}`,
                                      }
                                    : requirePattern
                            ),
                        }}
                        {...{ readOnly: true }}
                        type={inputType}
                        placeholder={placeholder}
                        className="input input-bordered input-success w-full text-gray-700"
                    />
                )
            ) : isDefaultValue ? (
                <Input
                    {...{
                        ...register(
                            inputName,
                            !isRequirePattern
                                ? {
                                      required: `${required}`,
                                  }
                                : requirePattern
                        ),
                    }}
                    {...{ defaultValue: defaultValue }}
                    type={inputType}
                    placeholder={placeholder}
                    className="input input-bordered input-success w-full text-gray-700"
                />
            ) : (
                <Input
                    {...{
                        ...register(
                            inputName,
                            !isRequirePattern
                                ? {
                                      required: `${required}`,
                                  }
                                : requirePattern
                        ),
                    }}
                    type={inputType}
                    placeholder={placeholder}
                    className="input input-bordered input-success w-full text-gray-700"
                />
            )}
            {isTextArea && (
                <TextArea
                    {...{
                        ...register(inputName, {
                            required: `${required}`,
                        }),
                    }}
                    placeholder={placeholder}
                    className="input input-bordered input-success w-full text-gray-700"
                />
            )}
            {errorField && (
                <Paragraph
                    className="text-red-600 text-sm"
                    text={errorField?.message}
                />
            )}
        </div>
    );
};

export default FormGroup;
