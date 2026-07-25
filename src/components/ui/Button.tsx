type ButtonProps = {
  children: React.ReactNode;
  type?: "button" | "submit" ;
  onClick?: () => void;
};

export default function Button({
  children,
  type = "button",
  onClick,
}: ButtonProps){
  return(
    <button
      className="border p-2"
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  )
}