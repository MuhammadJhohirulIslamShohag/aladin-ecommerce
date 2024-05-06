import cn from "@/lib/cn";

interface DivisionProps {
    children: React.ReactNode;
    className?: string;
    rest?: { [key: string]: unknown };
}

const Division: React.FC<DivisionProps> = ({
    children,
    className = "",
    ...rest
}) => {
    return (
        <div {...rest} className={cn("", className)}>
            {children}
        </div>
    );
};

export default Division;
