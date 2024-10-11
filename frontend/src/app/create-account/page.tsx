import UserForm from "@/components/authentication/UserForm"

export default function CreateAccount() {
  return (
    <>
      <UserForm
        title="Crear cuenta"
        buttonText="Crear"
        typeForm="createAccount"
        linkText="Ya tienes una cuenta? Inicia sesión aquí"
        linkHref="/login"
      />
    </>
  )
}
