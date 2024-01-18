import ClipLoader from "react-spinners/ClipLoader";
import CalendarCp from "./CalendarCp";

export default function Widgets() {
  return (
    <div className="text-center">
      위젯 두는 곳
      <hr/>
      <ClipLoader color="d3d3d3" />
      <CalendarCp />
    </div>
  )
}
