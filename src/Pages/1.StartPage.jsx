import { useState } from "react";
import LoginForm from "../components/LoginForm";
import RegistrationForm from "../components/RegistrationForm";

export default function StartPage() {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      {showLogin ? (
        <LoginForm setShowLogin={setShowLogin} />
      ) : (
        <RegistrationForm setShowLogin={setShowLogin} />
      )}
    </>
  );
}
