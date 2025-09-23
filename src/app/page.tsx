import Catalog from "@/components/Catalog/Catalog";
import { Suspense } from "react";

export default function Home() {
  return (
    <main>
      <Suspense fallback={<div>Loading...</div>}>
        <Catalog />
      </Suspense>
    </main>
  );
}
