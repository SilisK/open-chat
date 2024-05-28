import Image from "next/image";
import loading_icon from "../assets/icons/loading.png";

export default function LoadingBlock() {
  return (
    <div className="grid place-items-center h-full w-full">
      <Image
        src={loading_icon}
        width={76}
        height={76}
        unoptimized
        alt="loading icon"
        className="loading"
      />
    </div>
  );
}
