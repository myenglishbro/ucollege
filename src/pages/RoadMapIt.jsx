import { roadIt } from "../utils/roadIt";
import RoadMapGeneric from "../components/Roadmaps/RoadMapGeneric";

const RoadMapIt = (props) => <RoadMapGeneric {...props} roadData={roadIt} />;
export default RoadMapIt;