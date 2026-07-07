"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Pencil, Trash2, X } from "lucide-react";
import type { AdminServiceCategory } from "@/lib/content";

type ServerAction = (formData: FormData) => void | Promise<void>;

const inputClass =
  "mt-2 w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-800 outline-none focus:border-brandBlue";
const labelClass = "block text-sm font-bold text-navy";

function Modal({ title, children, onClose }: { title: string; children: React.ReactNode; onClose: () => void }) {
  return createPortal(
    <div className="fixed inset-0 z-[90] grid place-items-center bg-navy/70 p-4" role="dialog" aria-modal="true">
      <div className="max-h-[90vh] w-full max-w-xl overflow-auto rounded-lg bg-white shadow-premium">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-5 py-4">
          <h2 className="text-xl font-black text-navy">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-slate-200 text-navy transition hover:border-brandBlue"
            aria-label="Close popup"
            title="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>,
    document.body
  );
}

export function CategorySelectField({
  categories,
  defaultValue,
  name = "category",
  label = "Category",
  createCategoryAction,
  updateCategoryAction,
  deleteCategoryAction
}: {
  categories: AdminServiceCategory[];
  defaultValue?: string;
  name?: string;
  label?: string;
  createCategoryAction: ServerAction;
  updateCategoryAction?: ServerAction;
  deleteCategoryAction?: ServerAction;
}) {
  const [selectedValue, setSelectedValue] = useState(defaultValue ?? "");
  const hasDefaultCategory =
    Boolean(defaultValue) && !categories.some((category) => category.name === defaultValue);
  const [showModal, setShowModal] = useState(false);
  const [editingCategoryId, setEditingCategoryId] = useState<number | null>(null);
  const [deletingCategoryId, setDeletingCategoryId] = useState<number | null>(null);
  const [draftName, setDraftName] = useState("");
  const [draftDescription, setDraftDescription] = useState("");
  const [draftSortOrder, setDraftSortOrder] = useState("0");
  const [draftActive, setDraftActive] = useState(true);

  useEffect(() => {
    setSelectedValue(defaultValue ?? "");
  }, [defaultValue]);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;

    if (value === "__add_new__") {
      setSelectedValue("");
      setShowModal(true);
      return;
    }

    setSelectedValue(value);
  };

  const resetModal = () => {
    setDraftName("");
    setDraftDescription("");
    setDraftSortOrder("0");
    setDraftActive(true);
    setShowModal(false);
  };

  return (
    <>
      <label className={labelClass}>
        {label}
        <div className="flex items-center gap-2">
          <select
            name={name}
            required
            value={selectedValue}
            onChange={handleSelectChange}
            className={`${inputClass} flex-1`}
          >
            <option value="" disabled>
              Select a category
            </option>
            {categories.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
            {hasDefaultCategory ? <option value={defaultValue}>{defaultValue}</option> : null}
            <option value="__add_new__">+ Add category</option>
          </select>
          {selectedValue && selectedValue !== "__add_new__" ? (
            <>
              <button
                type="button"
                onClick={() => setEditingCategoryId(categories.find((c) => c.name === selectedValue)?.id ?? null)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-slate-200 text-brandBlue transition hover:border-brandBlue hover:bg-blue-50"
                title="Edit category"
              >
                <Pencil className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setDeletingCategoryId(categories.find((c) => c.name === selectedValue)?.id ?? null)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-red-200 text-red-700 transition hover:bg-red-50"
                title="Delete category"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </>
          ) : null}
        </div>
      </label>

      {deletingCategoryId ? (
        <Modal title="Delete category" onClose={() => setDeletingCategoryId(null)}>
          <p className="text-sm font-semibold text-slate-700">
            Are you sure you want to delete <span className="font-black text-navy">{categories.find((c) => c.id === deletingCategoryId)?.name}</span>? This action cannot be undone.
          </p>
          <form action={deleteCategoryAction ?? (async () => {})} className="mt-5 flex gap-3">
            <input type="hidden" name="id" value={deletingCategoryId} />
            <button type="submit" className="rounded-md bg-red-600 px-5 py-3 font-bold text-white transition hover:bg-red-700">
              Delete
            </button>
            <button
              type="button"
              onClick={() => setDeletingCategoryId(null)}
              className="rounded-md border border-slate-300 px-5 py-3 font-bold text-navy transition hover:border-brandBlue"
            >
              Cancel
            </button>
          </form>
        </Modal>
      ) : null}

      {editingCategoryId ? (
        <Modal title="Edit category" onClose={() => setEditingCategoryId(null)}>
          <form action={updateCategoryAction ?? (async () => {})} className="grid gap-4">
            {(() => {
              const category = categories.find((c) => c.id === editingCategoryId);
              if (!category) return null;
              return (
                <>
                  <input type="hidden" name="id" value={category.id} />
                  <label className={labelClass}>
                    Category Name
                    <input
                      name="name"
                      required
                      defaultValue={category.name}
                      className={inputClass}
                    />
                  </label>
                  <label className={labelClass}>
                    Description
                    <input
                      name="description"
                      defaultValue={category.description ?? ""}
                      className={inputClass}
                    />
                  </label>
                  <label className={labelClass}>
                    Sort Order
                    <input
                      name="sortOrder"
                      type="number"
                      defaultValue={category.sortOrder ?? 0}
                      className={inputClass}
                    />
                  </label>
                  <label className="flex items-center gap-2 text-sm font-bold text-navy">
                    <input
                      name="isActive"
                      type="checkbox"
                      defaultChecked={category.isActive}
                    />
                    Active
                  </label>
                  <div className="flex gap-3">
                    <button type="submit" className="rounded-md bg-brandBlue px-5 py-3 font-bold text-white transition hover:bg-navy">
                      Save Changes
                    </button>
                    <button type="button" onClick={() => setEditingCategoryId(null)} className="rounded-md border border-slate-300 px-5 py-3 font-bold text-navy transition hover:border-brandBlue">
                      Cancel
                    </button>
                  </div>
                </>
              );
            })()}
          </form>
        </Modal>
      ) : null}

      {showModal ? (
        <Modal title="Add category" onClose={resetModal}>
          <form action={createCategoryAction} className="grid gap-4">
            <label className={labelClass}>
              Category Name
              <input
                name="name"
                required
                value={draftName}
                onChange={(event) => setDraftName(event.target.value)}
                className={inputClass}
                placeholder="Plumbing"
              />
            </label>
            <label className={labelClass}>
              Description
              <input
                name="description"
                value={draftDescription}
                onChange={(event) => setDraftDescription(event.target.value)}
                className={inputClass}
                placeholder="Optional"
              />
            </label>
            <label className={labelClass}>
              Sort Order
              <input
                name="sortOrder"
                type="number"
                value={draftSortOrder}
                onChange={(event) => setDraftSortOrder(event.target.value)}
                className={inputClass}
              />
            </label>
            <label className="flex items-center gap-2 text-sm font-bold text-navy">
              <input
                name="isActive"
                type="checkbox"
                checked={draftActive}
                onChange={(event) => setDraftActive(event.target.checked)}
              />
              Active
            </label>
            <div className="flex gap-3">
              <button type="submit" className="rounded-md bg-brandBlue px-5 py-3 font-bold text-white transition hover:bg-navy">
                Save Category
              </button>
              <button type="button" onClick={resetModal} className="rounded-md border border-slate-300 px-5 py-3 font-bold text-navy transition hover:border-brandBlue">
                Cancel
              </button>
            </div>
          </form>
        </Modal>
      ) : null}
    </>
  );
}
