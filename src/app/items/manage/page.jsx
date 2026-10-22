"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import ProtectedRoute from "@/components/ProtectedRoute";
import { initialItems } from "@/data/items";
import {
  FiEye,
  FiTrash2,
  FiPlus,
  FiSearch,
  FiPackage,
  FiCheckCircle,
  FiAlertCircle,
  FiAlertTriangle,
} from "react-icons/fi";

function ManageItemsContent() {
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [itemToDelete, setItemToDelete] = useState(null);
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });

  // Load items from localStorage or fallback to initialItems
  useEffect(() => {
    const stored = localStorage.getItem("storeforge_items");
    if (stored) {
      try {
        setItems(JSON.parse(stored));
      } catch {
        setItems(initialItems);
      }
    } else {
      localStorage.setItem("storeforge_items", JSON.stringify(initialItems));
      setItems(initialItems);
    }
  }, []);

  const triggerToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: "", type: "success" });
    }, 3000);
  };

  const handleDeleteConfirm = () => {
    if (!itemToDelete) return;

    const updatedItems = items.filter(
      (item) => String(item.id) !== String(itemToDelete.id),
    );
    setItems(updatedItems);
    localStorage.setItem("storeforge_items", JSON.stringify(updatedItems));

    setItemToDelete(null);
    triggerToast(
      `"${itemToDelete.title}" was deleted successfully.`,
      "success",
    );
  };

  const filteredItems = items.filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      {/* Toast Notification */}
      {toast.show && (
        <div
          className={`fixed bottom-6 right-6 z-50 flex items-center gap-2.5 rounded-2xl px-5 py-3.5 shadow-xl transition-all duration-300 ${
            toast.type === "success"
              ? "bg-emerald-600 text-white"
              : "bg-red-600 text-white"
          }`}
        >
          {toast.type === "success" ? (
            <FiCheckCircle className="h-5 w-5 shrink-0" />
          ) : (
            <FiAlertCircle className="h-5 w-5 shrink-0" />
          )}
          <span className="text-sm font-medium">{toast.message}</span>
        </div>
      )}

      {/* Confirmation Modal */}
      {itemToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <div className="w-full max-w-md rounded-2xl border border-border/80 bg-background p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-red-600">
              <div className="p-2.5 rounded-xl bg-red-500/10">
                <FiAlertTriangle className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-foreground">
                Delete Product
              </h3>
            </div>
            <p className="text-sm text-foreground/70 leading-relaxed">
              Are you sure you want to remove{" "}
              <strong className="text-foreground">
                {itemToDelete.title}
              </strong>
              ? This action cannot be undone.
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setItemToDelete(null)}
                className="px-4 py-2 text-sm font-medium rounded-xl border border-border/80 hover:bg-default-100 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteConfirm}
                className="px-4 py-2 text-sm font-medium rounded-xl bg-red-600 text-white hover:bg-red-700 transition-colors cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header and Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
            Manage Products
          </h1>
          <p className="mt-1 text-sm text-foreground/60">
            View, inspect, and remove catalog items from your storage inventory.
          </p>
        </div>
        <Link
          href="/items/add"
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 text-white font-medium text-sm hover:bg-blue-700 shadow-sm transition-colors"
        >
          <FiPlus className="h-4 w-4" />
          <span>Add New Product</span>
        </Link>
      </div>

      {/* Search Toolbar */}
      <div className="mb-6 rounded-2xl border border-border/60 bg-background p-4 shadow-xs">
        <div className="relative max-w-md">
          <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-foreground/40 h-4 w-4" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search items by title or category..."
            className="w-full rounded-xl border border-border/80 bg-background pl-10 pr-4 py-2 text-sm text-foreground outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition"
          />
        </div>
      </div>

      {filteredItems.length > 0 ? (
        <div className="rounded-2xl border border-border/60 bg-background overflow-hidden shadow-xs">
          {/* Desktop Table View (Hidden on mobile) */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-default-50 border-b border-border/60 text-xs uppercase font-semibold text-foreground/60 tracking-wider">
                <tr>
                  <th className="py-4 px-6">Product</th>
                  <th className="py-4 px-6">Category</th>
                  <th className="py-4 px-6">Price</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40">
                {filteredItems.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-default-50/60 transition-colors"
                  >
                    {/* Item Info */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-4">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="h-12 w-12 rounded-xl object-cover border border-border/60 shrink-0"
                        />
                        <div className="max-w-xs">
                          <p className="font-semibold text-foreground truncate">
                            {item.title}
                          </p>
                          <p className="text-xs text-foreground/50 truncate">
                            {item.shortDescription}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-4 px-6">
                      <span className="inline-block px-2.5 py-1 text-xs font-medium rounded-md bg-default-100 text-foreground/80">
                        {item.category}
                      </span>
                    </td>

                    {/* Price */}
                    <td className="py-4 px-6 font-semibold text-foreground">
                      ${Number(item.price).toFixed(2)}
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-6 text-right">
                      <div className="inline-flex items-center gap-2">
                        <Link
                          href={`/items/${item.id}`}
                          className="p-2 rounded-lg text-foreground/70 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                          title="View Details"
                        >
                          <FiEye className="h-4 w-4" />
                        </Link>
                        <button
                          type="button"
                          onClick={() => setItemToDelete(item)}
                          className="p-2 rounded-lg text-foreground/70 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                          title="Delete Product"
                        >
                          <FiTrash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card Grid View (Visible only on mobile/tablet) */}
          <div className="md:hidden divide-y divide-border/40">
            {filteredItems.map((item) => (
              <div key={item.id} className="p-4 space-y-3">
                <div className="flex items-center gap-3">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-14 w-14 rounded-xl object-cover border border-border/60 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-foreground text-sm truncate">
                      {item.title}
                    </h4>
                    <p className="text-xs text-foreground/50 truncate mb-1">
                      {item.shortDescription}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 text-xs font-medium rounded bg-default-100 text-foreground/70">
                        {item.category}
                      </span>
                      <span className="text-xs font-bold text-foreground">
                        ${Number(item.price).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-border/30">
                  <Link
                    href={`/items/${item.id}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border/80 text-xs font-medium text-foreground hover:bg-default-100 transition-colors"
                  >
                    <FiEye className="h-3.5 w-3.5" />
                    <span>View</span>
                  </Link>
                  <button
                    type="button"
                    onClick={() => setItemToDelete(item)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-50 text-xs font-medium text-red-600 hover:bg-red-100 transition-colors cursor-pointer"
                  >
                    <FiTrash2 className="h-3.5 w-3.5" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-20 rounded-2xl border border-dashed border-border/80 bg-background/50">
          <FiPackage className="mx-auto h-12 w-12 text-foreground/30 mb-3" />
          <h3 className="text-lg font-semibold text-foreground">
            No Products Found
          </h3>
          <p className="text-sm text-foreground/50 max-w-sm mx-auto mt-1 mb-5">
            {searchQuery
              ? "No products match your search query."
              : "Your catalog inventory is currently empty."}
          </p>
          <Link
            href="/items/add"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition-colors"
          >
            <FiPlus className="h-4 w-4" />
            <span>Add First Product</span>
          </Link>
        </div>
      )}
    </div>
  );
}

export default function ManageItemsPage() {
  return (
    <ProtectedRoute>
      <ManageItemsContent />
    </ProtectedRoute>
  );
}
