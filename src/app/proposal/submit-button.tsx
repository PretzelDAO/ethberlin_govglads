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
      className={`w-full px-6 py-2 rounded-lg text-white font-bold focus:outline-none focus:ring-2 focus:ring-offset-2
        ${
          disabled
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600 focus:ring-blue-500"
        }`}
    >
      Test proposal now
    </button>
  );
};

export default SubmitButton;
