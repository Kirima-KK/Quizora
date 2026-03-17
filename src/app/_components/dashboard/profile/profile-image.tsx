import Image from "next/image";

export default function ProfileImage({ imageSource }: { imageSource: string }) {
  return (
    <>
      <Image
        src={imageSource}
        alt="profile picture"
        width={245}
        height={235}
        className="w-42 h-42 md:w-64 md:h-64"
      />
    </>
  );
}