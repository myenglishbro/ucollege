import { roadB2CF } from "../../utils/ROADS/roadB2CF";
import RoadMapGeneric2 from "../../components/Roadmaps/RoadMapGeneric2";

const RoadMapB2C = (props) => <RoadMapGeneric2 {...props} roadData={roadB2CF} />;
export default RoadMapB2C;