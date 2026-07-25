type InputProps = {
  id?:string;
  name?:string;
  type?: string;
  placeholder?: string;
  className?: string;
};

export default function Input({
  type = "text",
  placeholder,
}:InputProps){
  return(
    <input
     className="border p-2"
     type={type}
     placeholder={placeholder}
    />
  )
}