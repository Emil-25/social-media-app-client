type IProps = {
    no: string
}

export default function Empty(props:IProps) {
  return (
    <div className="h-[100vh] flex justify-center items-center">
        <h1 className="text-neutral text-[3rem]">No {props.no} Yet!</h1>
    </div>
  )
}
