const ButtonLoader = () => {
  return (
    <div className="relative h-4 w-4">
      <div className="absolute inset-0 rounded-full border-2 border-white/20" />
      <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-white animate-spin" />
    </div>
  );
};

export default ButtonLoader