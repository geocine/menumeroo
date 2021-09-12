import { IcnOff, IcnOn } from "./Icon/Icon";

const Check = ({ status }: { status: string }) => {
let statusIcon = status === "On" ? <IcnOn/> : <IcnOff/>;
return (
  <>
    {statusIcon}
  </>
);
};

export default Check;