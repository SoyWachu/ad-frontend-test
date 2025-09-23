import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="flex justify-center items-center py-16 text-white bg-footer">
      <Link href="/">
        <Image
          src="/logos/apply-digital-logo.png"
          alt="Logo Apply Digital"
          className="h-10"
          width={170}
          height={44}
        />
      </Link>
    </footer>
  );
}
