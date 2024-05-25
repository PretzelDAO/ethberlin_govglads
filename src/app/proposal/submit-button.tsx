import composeClassName from "@/utils/compose-class-name";

interface Props {
  disabled: boolean;
  onClick?: () => void;
}

const SubmitButton = ({ disabled, onClick }: Props) => {
  return (
    <button
      type="submit"
      disabled={disabled}
      onClick={onClick}
      className={composeClassName(
        // reset
        "!m-0",
        // float in bottom-center
        "fixed",
        "bottom-6",
        "left-1/2",
        "-translate-x-1/2",
        // shape
        "px-10",
        "py-3",
        "rounded-full",
        // styling
        "shadow-lg",
        "text-white",
        "font-bold",
        "focus:outline-none",
        "focus:ring-2",
        "focus:ring-offset-2",
        disabled && "bg-gray-400 cursor-not-allowed",
        !disabled && "bg-blue-500 hover:bg-blue-600 focus:ring-blue-500"
      )}
    >
      Test proposal now
    </button>
  );
};

export default SubmitButton;
