import Image from "next/image";
import openchat_logo from "../assets/icons/OpenChat-Logo.png";
import Link from "next/link";

export default function Logo({ size }) {
  switch (size) {
    case "small":
      return (
        <Link href={"/"} className="flex items-center justify-center gap-1">
          <Image src={openchat_logo} width={36} height={36} unoptimized />
          <p className="text-sm">OpenChat™</p>
        </Link>
      );
    default:
      return (
        <Link href={"/"} className="flex items-center justify-center gap-1">
          <Image src={openchat_logo} width={36} height={36} unoptimized />
          <p className="text-sm">OpenChat™</p>
        </Link>
      );
  }
}
