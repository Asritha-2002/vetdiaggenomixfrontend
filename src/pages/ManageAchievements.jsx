import React, { useEffect, useRef, useState } from "react";
import { Trophy, Eye, Pencil, Trash2, X, Plus, Save } from "lucide-react";
import toast from "react-hot-toast";

const BASE_URL = import.meta.env.VITE_BASE_URL_ADMIN;

// ─── Empty form shape ────────────────────────────────────────────────────────
const EMPTY_FORM = {
  title: "",
  description: "",
  metric: "",   // e.g. "500+" or "12 Years"
  file: null,
  preview: null,
};

// ─── Single Achievement Card ─────────────────────────────────────────────────
const AchievementCard = ({ item, loading, onView, onEdit, onDelete }) => (
  <div
    className={`overflow-hidden rounded-2xl border bg-white shadow-sm transition ${
      !item.isSaved
        ? "border-amber-300 ring-2 ring-amber-100"
        : "border-[#e7e0d5]"
    }`}
  >
    {/* Image */}
    <div className="relative aspect-[4/3] overflow-hidden bg-[#f3efe7]">
      {item.preview ? (
        <img
          src={item.preview}
          alt={item.title}
          className="h-full w-full object-cover"
        />
      ) : (
        <div className="flex h-full items-center justify-center">
          <Trophy className="h-12 w-12 text-[#cfc6b8]" />
        </div>
      )}

      {!item.isSaved && (
        <span className="absolute left-2 top-2 rounded bg-amber-500 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white shadow">
          Unsaved
        </span>
      )}

      {item.metric && (
        <div className="absolute right-2 top-2 rounded-lg bg-emerald-600 px-2 py-1 text-xs font-bold text-white shadow">
          {item.metric}
        </div>
      )}
    </div>

    {/* Text */}
    <div className="p-3">
      <p className="line-clamp-1 text-sm font-semibold text-[#1f352a]">
        {item.title || "Untitled Achievement"}
      </p>
      {item.description && (
        <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-[#6c746d]">
          {item.description}
        </p>
      )}
    </div>

    {/* Actions */}
    <div className="flex flex-wrap items-center gap-2 border-t border-[#f0ebe3] p-3">
      {item.preview && (
        <button
          type="button"
          onClick={() => onView(item.preview)}
          className="inline-flex items-center gap-1.5 rounded-xl border border-[#ddd5c9] bg-white px-3 py-2 text-xs font-medium text-[#25372e] transition hover:bg-[#f7f3ed]"
        >
          <Eye className="h-3.5 w-3.5" />
          View
        </button>
      )}

      <button
        type="button"
        onClick={() => onEdit(item)}
        className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-3 py-2 text-xs font-medium text-white transition hover:bg-emerald-700"
      >
        <Pencil className="h-3.5 w-3.5" />
        Edit
      </button>

      <button
        type="button"
        disabled={loading}
        onClick={() => onDelete(item)}
        className="inline-flex items-center gap-1.5 rounded-xl bg-red-50 px-3 py-2 text-xs font-medium text-red-600 transition hover:bg-red-100 disabled:opacity-50"
      >
        <Trash2 className="h-3.5 w-3.5" />
        Delete
      </button>
    </div>
  </div>
);

// ─── Add / Edit Modal ────────────────────────────────────────────────────────
const AchievementModal = ({ initial, onClose, onSave, loading }) => {
  const [form, setForm] = useState(initial || EMPTY_FORM);
  const fileRef = useRef();

  const isEdit = !!initial?.id;

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith("image/")) return;
    if (form.preview && !initial?.isSaved) URL.revokeObjectURL(form.preview);
    setForm((f) => ({ ...f, file, preview: URL.createObjectURL(file) }));
    e.target.value = "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim()) return toast.error("Title is required.");
    onSave(form);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      {/* ↓ Added max-h and flex-col so inner sections can scroll */}
      <div className="relative flex w-full max-w-lg flex-col overflow-hidden rounded-3xl bg-white shadow-2xl max-h-[90vh]">
        
        {/* Header — stays fixed at top */}
        <div className="flex shrink-0 items-center justify-between border-b border-[#ece5db] px-6 py-4">
          <h3 className="text-base font-semibold text-[#1f352a]">
            {isEdit ? "Edit Achievement" : "Add Achievement"}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f3efe7] text-[#6c746d] transition hover:bg-[#e8e2d8]"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Scrollable form body */}
        <div className="overflow-y-auto flex-1">
          <form onSubmit={handleSubmit} className="space-y-4 px-6 py-5">
            {/* Image picker */}
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.14em] text-[#6b746d]">
                Image
              </label>
              <div
                onClick={() => fileRef.current?.click()}
                className="flex min-h-[140px] cursor-pointer items-center justify-center overflow-hidden rounded-2xl border border-dashed border-[#cfc6b8] bg-[#f7f4ee] transition hover:bg-[#f3efe7]"
              >
                {form.preview ? (
                  <img
                    src={form.preview}
                    alt="Preview"
                    className="h-36 w-full object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center gap-2 py-6 text-center">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
                      <Plus className="h-5 w-5" />
                    </div>
                    <p className="text-xs font-medium text-[#1f352a]">
                      Click to upload image
                    </p>
                    <p className="text-[11px] text-[#8a9288]">PNG, JPG, WEBP</p>
                  </div>
                )}
              </div>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFile}
              />
            </div>

            {/* Title */}
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.14em] text-[#6b746d]">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                placeholder="e.g. Best Photography Studio 2024"
                className="h-11 w-full rounded-xl border border-[#dcd4c8] bg-white px-3 text-sm text-[#1f352a] outline-none transition focus:border-[#457358] focus:ring-2 focus:ring-emerald-100"
              />
            </div>

            {/* Metric */}
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.14em] text-[#6b746d]">
                Metric / Badge{" "}
                <span className="font-normal normal-case text-[#8a9288]">
                  (optional — e.g. "500+" or "12 Years")
                </span>
              </label>
              <input
                type="text"
                value={form.metric}
                onChange={(e) => setForm((f) => ({ ...f, metric: e.target.value }))}
                placeholder="500+"
                className="h-11 w-full rounded-xl border border-[#dcd4c8] bg-white px-3 text-sm text-[#1f352a] outline-none transition focus:border-[#457358] focus:ring-2 focus:ring-emerald-100"
              />
            </div>

            {/* Description */}
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.14em] text-[#6b746d]">
                Description{" "}
                <span className="font-normal normal-case text-[#8a9288]">
                  (optional)
                </span>
              </label>
              <textarea
                rows={3}
                value={form.description}
                onChange={(e) =>
                  setForm((f) => ({ ...f, description: e.target.value }))
                }
                placeholder="Describe this achievement in a few words…"
                className="w-full resize-none rounded-xl border border-[#dcd4c8] bg-white px-3 py-2.5 text-sm text-[#1f352a] outline-none transition focus:border-[#457358] focus:ring-2 focus:ring-emerald-100"
              />
            </div>

            {/* Footer — inside form so submit works, but visually pinned at bottom */}
            <div className="flex justify-end gap-3 border-t border-[#ece5db] pt-4 pb-1">
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl border border-[#dcd4c8] bg-white px-4 py-2 text-xs font-medium text-[#3a4a3e] transition hover:bg-[#f3efe7]"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center gap-2 rounded-xl bg-[#1f352a] px-5 py-2 text-xs font-semibold text-white transition hover:bg-[#2a4738] disabled:opacity-50"
              >
                <Save className="h-3.5 w-3.5" />
                {loading ? "Saving…" : isEdit ? "Save Changes" : "Add Achievement"}
              </button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
};

// ─── Main Component ──────────────────────────────────────────────────────────
const ManageAchievements = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [viewer, setViewer] = useState(null);
  const [modal, setModal] = useState(null); // null | { mode: "add" } | { mode: "edit", item }

  // Fetch existing achievements on mount
  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const res = await fetch(`${BASE_URL}/upload/achievements`);
        const result = await res.json();
        if (res.ok && result.data) {
          setItems(
            result.data.map((a) => ({
              id: a._id,
              title: a.title || "",
              description: a.description || "",
              metric: a.metric || "",
              preview: a.url || null,
              file: null,
              isSaved: true,
            }))
          );
        }
      } catch (err) {
        console.error("Failed to load achievements:", err);
      }
    };
    fetchAchievements();
  }, []);

  // Cleanup blob URLs on unmount
  useEffect(() => {
    return () => {
      items.forEach((item) => {
        if (item.preview && !item.isSaved) URL.revokeObjectURL(item.preview);
      });
    };
  }, []);

  const openAdd = () => setModal({ mode: "add" });
  const openEdit = (item) => setModal({ mode: "edit", item });
  const closeModal = () => setModal(null);

  // ── Save (add or edit) ─────────────────────────────────────────────────────
  const handleSave = async (form) => {
    setLoading(true);
    const token = localStorage.getItem("token");

    try {
      const isEdit = modal.mode === "edit";
      const formData = new FormData();

      formData.append("title", form.title.trim());
      formData.append("description", form.description.trim());
      formData.append("metric", form.metric.trim());
      if (form.file) formData.append("image", form.file);

      const url = isEdit
        ? `${BASE_URL}/upload/achievements/${modal.item.id}`
        : `${BASE_URL}/upload/achievements`;

      const res = await fetch(url, {
        method: isEdit ? "PUT" : "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Save failed");

      const saved = {
        id: data.data._id,
        title: data.data.title || "",
        description: data.data.description || "",
        metric: data.data.metric || "",
        preview: data.data.url || form.preview,
        file: null,
        isSaved: true,
      };

      if (isEdit) {
        // Revoke old local blob if it was a replacement
        if (form.file && modal.item.preview && !modal.item.isSaved) {
          URL.revokeObjectURL(modal.item.preview);
        }
        setItems((prev) =>
          prev.map((i) => (i.id === modal.item.id ? saved : i))
        );
        toast.success("Achievement updated.");
      } else {
        setItems((prev) => [...prev, saved]);
        toast.success("Achievement added.");
      }

      closeModal();
    } catch (err) {
      toast.error(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  // ── Delete ─────────────────────────────────────────────────────────────────
  const handleDelete = async (item) => {
    if (!item.isSaved) {
      if (item.preview) URL.revokeObjectURL(item.preview);
      setItems((prev) => prev.filter((i) => i.id !== item.id));
      return;
    }

    if (!window.confirm("Permanently delete this achievement?")) return;

    setLoading(true);
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`${BASE_URL}/upload/achievements/${item.id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Delete failed");

      setItems((prev) => prev.filter((i) => i.id !== item.id));
      toast.success("Achievement deleted.");
    } catch (err) {
      toast.error(err.message || "Delete failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f6f1] p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">

        {/* Page header */}
        <div className="mb-8 rounded-3xl border border-[#e6dfd4] bg-white px-5 py-6 shadow-sm sm:px-7">
          <span className="text-xs font-semibold uppercase tracking-[0.24em] text-[#5f7c69]">
            Admin Panel
          </span>
          <h1 className="mt-3 text-2xl font-semibold tracking-tight text-[#1f352a] sm:text-3xl">
            Manage Achievements
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-[#69716a] sm:text-base">
            Add, edit, and remove achievements shown on the public site. Each entry supports an image, a title, an optional metric badge, and a description.
          </p>
        </div>

        {/* Section card */}
        <div className="rounded-3xl border border-[#e4ddd2] bg-[#fcfbf8] p-4 shadow-sm sm:p-6">

          {/* Card header */}
          <div className="flex flex-col gap-4 border-b border-[#ece5db] pb-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-emerald-200 bg-emerald-50">
                <Trophy className="h-5 w-5 text-emerald-700" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-[#1f352a] sm:text-xl">
                  Achievements
                </h2>
                <p className="mt-1 text-sm text-[#6c746d]">
                  {items.length} achievement{items.length !== 1 ? "s" : ""} saved
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={openAdd}
              className="inline-flex items-center gap-2 rounded-2xl bg-[#1f352a] px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-[#2a4738]"
            >
              <Plus className="h-4 w-4" />
              Add Achievement
            </button>
          </div>

          {/* Grid */}
          {items.length === 0 ? (
            <div className="mt-6 rounded-2xl border border-[#eee7dc] bg-[#f9f6f1] px-4 py-12 text-center">
              <Trophy className="mx-auto mb-3 h-10 w-10 text-[#cfc6b8]" />
              <p className="text-sm font-medium text-[#1f352a]">
                No achievements yet
              </p>
              <p className="mt-1 text-sm text-[#72776f]">
                Click "Add Achievement" to create your first entry.
              </p>
            </div>
          ) : (
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {items.map((item) => (
                <AchievementCard
                  key={item.id}
                  item={item}
                  loading={loading}
                  onView={setViewer}
                  onEdit={openEdit}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Image viewer lightbox */}
      {viewer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-4xl overflow-hidden rounded-3xl bg-white shadow-2xl">
            <button
              type="button"
              onClick={() => setViewer(null)}
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-slate-700 shadow"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="max-h-[85vh] overflow-auto bg-[#f6f3ee] p-4 sm:p-6">
              <img
                src={viewer}
                alt="Preview"
                className="mx-auto max-h-[75vh] w-auto rounded-2xl object-contain"
              />
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit modal */}
      {modal && (
        <AchievementModal
          initial={modal.mode === "edit" ? modal.item : null}
          onClose={closeModal}
          onSave={handleSave}
          loading={loading}
        />
      )}
    </div>
  );
};

export default ManageAchievements;