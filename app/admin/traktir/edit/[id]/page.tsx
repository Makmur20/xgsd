import { notFound } from "next/navigation";
import EditTraktir from "@/components/admin/traktir/edit-traktir";
import { Suspense } from "react";

const UpdateTraktirPage = async ({
  params,
}: {
  params: { id: string };
}) => {
  const { id: traktirId } = await params; // ⬅️ WAJIB await

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
