"use client";

import { useEffect } from "react";
import { Container } from "@/components/common/container";
import { Button } from "@/components/ui/button";
import { logger } from "@/lib/logger";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    logger.error("Unhandled Global App Error", error);
  }, [error]);

  return (
    <div className="py-32">
      <Container className="flex flex-col items-center text-center">
        <h2 className="font-serif text-3xl text-obsidian">An unexpected error occurred.</h2>
        <p className="mt-2 text-xs text-obsidian/60">
          Our engineering team has been notified.
        </p>
        <Button variant="gold" className="mt-6" onClick={() => reset()}>
          Try Again
        </Button>
      </Container>
    </div>
  );
}
