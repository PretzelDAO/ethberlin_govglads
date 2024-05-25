interface Props {
  msg: string;
}

const Loading = ({ msg }: Props) => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gray-800 bg-opacity-75 z-50">
      <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-20 w-20"></div>
      <p className="text-white text-lg">{msg}</p>
    </div>
  );
};

export default Loading;
