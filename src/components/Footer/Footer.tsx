import Image from "next/image";

export default function Footer() {
  return (
    <footer className="flex justify-center items-center py-16 bg-gray-900 text-white bg-footer">
      <Image
        src="/logos/apply-digital-logo.png"
        alt="Logo Apply Digital"
        className="h-10"
        width={170}
        height={44}
      />
    </footer>
  );
}
