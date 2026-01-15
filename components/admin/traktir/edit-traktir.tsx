import EditForm from "./edit-form";
import { getTraktirById } from "@/lib/data";
import { notFound } from "next/navigation";

const EditTraktir = async ({
  traktirId,
}: {
  traktirId: string;
}) => {
  const traktir = await getTraktirById(traktirId);

  if (!traktir) return notFound();

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-4">
        Edit Traktir
      </h1>
      <EditForm traktir={traktir} />
    </div>
  );
};

export default EditTraktir;
