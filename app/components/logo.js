import Image from "next/image";
import openchat_logo from "../assets/icons/OpenChat-Logo.png";

export default function Logo({ size }) {
  switch (size) {
    case "small":
      return (
        <div className="flex items-center justify-center gap-1">
          <Image src={openchat_logo} width={36} height={36} unoptimized />
          <p className="text-sm">OpenChat</p>
        </div>
      );
    default:
      return (
        <div className="flex items-center justify-center gap-1">
          <Image src={openchat_logo} width={36} height={36} unoptimized />
          <p className="text-sm">OpenChat</p>
        </div>
      );
  }
}
