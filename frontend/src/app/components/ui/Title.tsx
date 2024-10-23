interface Props {
  title: string
}

const Title = ({ title }: Props) => {
  return <h3 className="mx-auto mb-8 text-center text-[28px] font-light text-[#4F4B4B]">{title}</h3>
}
export default Title
