"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ProtectedRoute from "@/components/ProtectedRoute";
import { initialItems } from "@/data/items";
import {
  FiPlusCircle,
  FiCheckCircle,
  FiAlertCircle,
  FiDollarSign,
  FiImage,
  FiTag,
  FiFileText,
} from "react-icons/fi";

function AddItemForm() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: "",
    category: "Electronics",
    price: "",
    image: "",
    shortDescription: "",
    fullDescription: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });

  const categories = [
    "Electronics",
    "Audio",
    "Accessories",
    "Wearables",
    "Gadgets",
  ];

  const validate = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Product title is required.";
    } else if (formData.title.trim().length < 3) {
      newErrors.title = "Title must be at least 3 characters long.";
    }

    if (!formData.price) {
      newErrors.price = "Price is required.";
    } else if (Number(formData.price) <= 0 || isNaN(Number(formData.price))) {
      newErrors.price = "Enter a valid positive price.";
    }

    if (!formData.shortDescription.trim()) {
      newErrors.shortDescription = "Short description is required.";
    } else if (formData.shortDescription.trim().length < 10) {
      newErrors.shortDescription =
        "Provide at least 10 characters for the summary.";
    }

    if (!formData.fullDescription.trim()) {
      newErrors.fullDescription = "Full description is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const triggerToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: "", type: "success" });
    }, 3000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) {
      triggerToast("Please review and resolve the form errors.", "error");
      return;
    }

    setIsSubmitting(true);

    try {
      // Fetch existing catalog from localStorage or initial dataset
      let existingItems = initialItems;
      const stored = localStorage.getItem("storeforge_items");
      if (stored) {
        try {
          existingItems = JSON.parse(stored);
        } catch {
          existingItems = initialItems;
        }
      }

      const newItem = {
        id: Date.now().toString(),
        title: formData.title.trim(),
        category: formData.category,
        price: parseFloat(formData.price),
        rating: 5.0,
        image:
          formData.image.trim() ||
          "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=700&auto=format&fit=crop&q=80",
        shortDescription: formData.shortDescription.trim(),
        fullDescription: formData.fullDescription.trim(),
        specifications: [
          `Category: ${formData.category}`,
          `Price: $${parseFloat(formData.price).toFixed(2)}`,
          "Condition: Brand New",
          "Warranty: 1 Year Manufacturer Warranty",
        ],
      };

      const updated = [newItem, ...existingItems];
      localStorage.setItem("storeforge_items", JSON.stringify(updated));

      triggerToast("Product published successfully!", "success");

      setTimeout(() => {
        router.push("/items");
      }, 1500);
    } catch {
      triggerToast("Failed to save product. Please try again.", "error");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      {/* Feedback Toast */}
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

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
          Add New Product
        </h1>
        <p className="mt-2 text-sm text-foreground/60">
          List a new item in the catalog. All verified additions persist across
          the catalog.
        </p>
      </div>

      {/* Form Container */}
      <form
        onSubmit={handleSubmit}
        className="rounded-3xl border border-border/60 bg-background p-6 sm:p-10 shadow-sm space-y-6"
      >
        {/* Title */}
        <div>
          <label className="block text-sm font-semibold text-foreground mb-1.5">
            Product Title <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <FiTag className="absolute left-3.5 top-1/2 -translate-y-1/2 text-foreground/40 h-4 w-4" />
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Ergonomic Wireless Mouse"
              className={`w-full rounded-xl border bg-background pl-10 pr-4 py-2.5 text-sm text-foreground outline-none transition ${
                errors.title
                  ? "border-red-500 focus:ring-1 focus:ring-red-500"
                  : "border-border/80 focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
              }`}
            />
          </div>
          {errors.title && (
            <p className="mt-1 text-xs text-red-500">{errors.title}</p>
          )}
        </div>

        {/* Category & Price */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-foreground mb-1.5">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full rounded-xl border border-border/80 bg-background px-3.5 py-2.5 text-sm text-foreground outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition cursor-pointer"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-foreground mb-1.5">
              Price (USD) <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <FiDollarSign className="absolute left-3.5 top-1/2 -translate-y-1/2 text-foreground/40 h-4 w-4" />
              <input
                type="number"
                step="0.01"
                min="0"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="49.99"
                className={`w-full rounded-xl border bg-background pl-10 pr-4 py-2.5 text-sm text-foreground outline-none transition ${
                  errors.price
                    ? "border-red-500 focus:ring-1 focus:ring-red-500"
                    : "border-border/80 focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                }`}
              />
            </div>
            {errors.price && (
              <p className="mt-1 text-xs text-red-500">{errors.price}</p>
            )}
          </div>
        </div>

        {/* Optional Image URL */}
        <div>
          <label className="block text-sm font-semibold text-foreground mb-1.5">
            Image URL{" "}
            <span className="text-foreground/40 font-normal">(Optional)</span>
          </label>
          <div className="relative">
            <FiImage className="absolute left-3.5 top-1/2 -translate-y-1/2 text-foreground/40 h-4 w-4" />
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="https://images.unsplash.com/..."
              className="w-full rounded-xl border border-border/80 bg-background pl-10 pr-4 py-2.5 text-sm text-foreground outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition"
            />
          </div>
          <p className="mt-1 text-xs text-foreground/40">
            Leave blank to apply a high-resolution placeholder image
            automatically.
          </p>
        </div>

        {/* Short Description */}
        <div>
          <label className="block text-sm font-semibold text-foreground mb-1.5">
            Short Description <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <FiFileText className="absolute left-3.5 top-3 text-foreground/40 h-4 w-4" />
            <textarea
              name="shortDescription"
              rows={2}
              value={formData.shortDescription}
              onChange={handleChange}
              placeholder="1-2 sentences summarizing the item for grid cards..."
              className={`w-full rounded-xl border bg-background pl-10 pr-4 py-2.5 text-sm text-foreground outline-none transition ${
                errors.shortDescription
                  ? "border-red-500 focus:ring-1 focus:ring-red-500"
                  : "border-border/80 focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
              }`}
            />
          </div>
          {errors.shortDescription && (
            <p className="mt-1 text-xs text-red-500">
              {errors.shortDescription}
            </p>
          )}
        </div>

        {/* Full Description */}
        <div>
          <label className="block text-sm font-semibold text-foreground mb-1.5">
            Full Description <span className="text-red-500">*</span>
          </label>
          <textarea
            name="fullDescription"
            rows={4}
            value={formData.fullDescription}
            onChange={handleChange}
            placeholder="Detailed features, materials, and comprehensive specifications..."
            className={`w-full rounded-xl border bg-background px-4 py-2.5 text-sm text-foreground outline-none transition ${
              errors.fullDescription
                ? "border-red-500 focus:ring-1 focus:ring-red-500"
                : "border-border/80 focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
            }`}
          />
          {errors.fullDescription && (
            <p className="mt-1 text-xs text-red-500">
              {errors.fullDescription}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 px-6 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600/40 disabled:opacity-50 transition-colors cursor-pointer"
          >
            <FiPlusCircle className="h-4 w-4" />
            <span>
              {isSubmitting ? "Publishing Item..." : "Publish Product"}
            </span>
          </button>
        </div>
      </form>
    </div>
  );
}

export default function AddItemPage() {
  return (
    <ProtectedRoute>
      <AddItemForm />
    </ProtectedRoute>
  );
}
