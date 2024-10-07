import UserForm from "@/components/UserForm"

export default function Login() {
  return (
    <>
      <UserForm
        title="Inicio de sesión"
        buttonText="Ingresar"
        typeForm="login"
        linkText="¿No tienes cuenta? Crea una aquí"
        linkHref="/create-account"
      />
    </>
  )
}