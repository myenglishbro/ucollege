import { roadB2CF } from "../../utils/ROADS/roadB2CF";
import RoadMapGeneric from "../../components/Roadmaps/RoadMapGeneric";

const RoadMapB2C = (props) => <RoadMapGeneric {...props} roadData={roadB2CF} />;
export default RoadMapB2C;