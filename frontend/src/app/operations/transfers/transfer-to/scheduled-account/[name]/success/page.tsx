import Title from "@/components/ui/Title"

const SuccessTransfer = () => {
  return (
    <div className="mx-auto flex w-[250px] flex-col items-center justify-center">
      <Title title="Tu transferencia fue realizada con exito" />
      <button className="mb-8 flex h-[60px] w-[240px] items-center justify-center rounded-[80px] bg-[#6630AC] text-center text-base font-bold text-white">
        Descargar Comprobante
      </button>
      <button className="mb-40 flex h-[60px] w-[240px] items-center justify-center rounded-[80px] bg-[#6630AC] text-center text-base font-bold text-white">
        Compartir
      </button>
    </div>
  )
}

export default SuccessTransfer
