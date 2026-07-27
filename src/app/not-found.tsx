import Link from "next/link";
import { Container } from "@/components/common/container";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="py-32">
      <Container className="flex flex-col items-center text-center">
        <span className="font-serif text-6xl text-gold-400 font-bold">404</span>
        <h2 className="mt-4 font-serif text-2xl text-obsidian uppercase tracking-wider">
          Page Not Found
        </h2>
        <p className="mt-2 text-xs text-obsidian/60 max-w-md">
          The couture piece or page you are looking for does not exist or has been moved.
        </p>
        <Link href="/" className="mt-8">
          <Button variant="gold">Return to Atelier</Button>
        </Link>
      </Container>
    </div>
  );
}
