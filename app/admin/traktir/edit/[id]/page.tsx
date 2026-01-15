import { notFound } from "next/navigation";
import EditTraktir from "@/components/admin/traktir/edit-traktir";
import { Suspense } from "react";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

const UpdateTraktirPage = async ({ params }: PageProps) => {
  const { id: traktirId } = await params; // ✅ sekarang cocok

  if (!traktirId) return notFound();

  return (
    <div className="max-w-screen-xl px-4 py-16 mt-10 mx-auto">
      <Suspense fallback={<p>Loading...</p>}>
        <EditTraktir traktirId={traktirId} />
      </Suspense>
    </div>
  );
};

export default UpdateTraktirPage;
