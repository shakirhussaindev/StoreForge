
import ItemDetailsClient from "@/components/ItemDetailsClient";
import { initialItems } from "@/data/items";


export async function generateStaticParams() {
  return initialItems.map((item) => ({
    id: String(item.id),
  }));
}

export default async function ItemDetailsPage({ params }) {
  const resolvedParams = await params;
  return <ItemDetailsClient id={resolvedParams.id} />;
}