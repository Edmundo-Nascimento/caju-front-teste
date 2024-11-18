import ReactInputMask from "react-input-mask";
import TextField from "../TextField";

const MaskedTextField = (props: any) => {
  return (
    <ReactInputMask {...props} mask="999.999.999-99" maskChar={null} onChange={props.handleChange}>
      {(inputProps) => <TextField {...inputProps} />}
    </ReactInputMask>
  )
};

export default MaskedTextField;