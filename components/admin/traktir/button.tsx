import { IoPencil } from "react-icons/io5";
import Link from "next/link";

export const EditButton = ({id}: {id: string}) => {
    return(
        <Link href={`/admin/traktir/edit/${id}`} className="rounded-sm p-1 hover:bg-gray-200">
            <IoPencil className="size-5"/>
        </Link>
    )
}
