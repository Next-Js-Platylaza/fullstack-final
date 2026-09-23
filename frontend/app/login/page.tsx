import LoginForm from "../ui/login";
import Navbar from "../ui/nav/navbar";

export default function Home() {
  return (
        <>
            <h1 className="text-2xl font-bold mb-10">Login</h1>
            <LoginForm/>
    </>
  );
}