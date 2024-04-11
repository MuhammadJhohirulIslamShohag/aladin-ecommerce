import { Control, FieldValues, FieldError, Path } from "react-hook-form";

import Label from "../../Atoms/Form/Label";
import AntdSelect from "../../Atoms/Form/AntdSelect";

interface OptionType<T> {
    label: string;
    value: T;
}

type FormSelectGroupType<T extends FieldValues> = {
    labelName: string;
    className?: string | undefined;
    selectName: Path<T>;
    control: Control<T>;
    errors?: FieldError | undefined;
    mode?: "multiple" | "tags" | undefined;
    placeholder: string;
    options: OptionType<string>[] | undefined;
    errorMessage?: string | undefined;
};

const FormSelectGroup = <T extends FieldValues>({
    labelName,
    selectName,
    errors,
    placeholder,
    control,
    className,
    errorMessage,
    options,
    mode,
}: FormSelectGroupType<T>) => {
    return (
        <div className="mb-3">
            <Label name={labelName} {...{ htmlFor: selectName }} />

            <AntdSelect
                errorMessage={errorMessage}
                selectName={selectName}
                control={control}
                placeholder={placeholder}
                className={className}
                errors={errors}
                options={options}
                mode={mode}
            />
        </div>
    );
};

export default FormSelectGroup;
