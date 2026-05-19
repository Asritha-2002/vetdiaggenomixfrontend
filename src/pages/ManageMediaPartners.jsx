import React, { useEffect, useRef, useState } from "react";
import {
  ImagePlus,
  Handshake,
  Eye,
  Pencil,
  Trash2,
  X,
  Upload,
} from "lucide-react";

const BASE_URL = import.meta.env.VITE_BASE_URL_ADMIN;
import toast from "react-hot-toast"

const MediaManagerSection = ({
  title,
  subtitle,
  icon: Icon,
  items,
  setItems,
  accent = "emerald",
  endpoint, 
}) => {
  const [maxBatchCount, setMaxBatchCount] = useState(10);
  const [viewer, setViewer] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const replaceInputRefs = useRef({});

  // 1. Fetch existing records from backend on mount
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(`${BASE_URL}${endpoint}`);
        const result = await response.json();
        if (response.ok && result.data) {
          // Map database items so they fit your UI items shape
          const initializedItems = result.data.map((img) => ({
            id: img._id,       // DB Mongo ID
            name: img.name || "Untitled Asset",
            preview: img.url,  // Cloudinary URL
            file: null,        // No local file object because it's already on the cloud
            isSaved: true,     // Flag to differentiate saved images from fresh staging uploads
          }));
          setItems(initializedItems);
        }
      } catch (err) {
        console.error(`Failed to load images for ${title}:`, err);
      }
    };

    fetchImages();
  }, [endpoint, setItems]);

  const handleAddImages = (e) => {
    const files = Array.from(e.target.files || []).filter((file) =>
      file.type.startsWith("image/")
    );

    if (!files.length) return;

    const limitedFiles = files.slice(0, maxBatchCount);
    const mappedFiles = limitedFiles.map((file) => ({
      id: `${file.name}-${Date.now()}-${Math.random()}`,
      file,
      name: file.name,
      preview: URL.createObjectURL(file),
      isSaved: false, // Staged locally, not yet synced to the cloud
    }));

    setItems((prev) => [...prev, ...mappedFiles]);
    e.target.value = "";
  };

  const handleReplaceImage = (id, file) => {
    if (!file || !file.type.startsWith("image/")) return;

    setItems((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;

        if (item.preview && !item.isSaved) URL.revokeObjectURL(item.preview);

        return {
          ...item,
          id: `${file.name}-${Date.now()}-${Math.random()}`,
          file,
          name: file.name,
          preview: URL.createObjectURL(file),
          isSaved: false, // Reset saved flag since it's a new local replacement
        };
      })
    );
  };

  // 2. Updated dynamic Delete operation
  const handleDeleteImage = async (item) => {
    // Case A: Image is only staging locally on client UI
    if (!item.isSaved) {
      if (item.preview) URL.revokeObjectURL(item.preview);
      setItems((prev) => prev.filter((i) => i.id !== item.id));
      return;
    }

    // Case B: Image is live in the database -> Request server-side wipe
    if (!window.confirm("Are you sure you want to permanently delete this image?")) return;

    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await fetch(`${BASE_URL}${endpoint}/${item.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to delete image.");

      // Success -> Update UI state immediately
      setItems((prev) => prev.filter((i) => i.id !== item.id));
      setMessage("Image deleted successfully!");
      setTimeout(() => setMessage(""), 4000);
    } catch (err) {
      setError(err.message);
      setTimeout(() => setError(""), 4000);
    } finally {
      setLoading(false);
    }
  };

  const handleSectionUpload = async () => {
  setLoading(true);
  setMessage("");
  setError("");

  try {
    const formData = new FormData();
    let hasNewFiles = false;

    // Only pack genuinely new unsaved local files into the payload
    items.forEach((item) => {
      if (item.file && !item.isSaved) {
        formData.append("images", item.file);
        hasNewFiles = true;
      }
    });

    if (!hasNewFiles) {
      throw new Error("No new images found to upload. Select new images first.");
    }

    const token = localStorage.getItem("token");
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data?.message || "Upload failed");

    // Clean up local blob preview URLs to clear browser memory
    items.forEach((item) => {
      if (item.preview && !item.isSaved) URL.revokeObjectURL(item.preview);
    });

    if (data.data) {
      // Map newly returned DB documents into our UI format
      const newlySavedItems = data.data.map((img) => ({
        id: img._id,
        name: img.name || "Untitled Asset",
        preview: img.url,
        file: null,
        isSaved: true,
      }));

      // ✅ FIX: Keep ALL items that were already safely saved, drop local staging copies,
      // and append the newly saved items from the server response.
      setItems((prev) => {
        const alreadySavedItems = prev.filter((item) => item.isSaved === true);
        return [...alreadySavedItems, ...newlySavedItems];
      });
    }

    setMessage(data?.message || "Section images uploaded successfully!");
    setTimeout(() => setMessage(""), 4000);
  } catch (err) {
    setError(err.message || "Something went wrong while uploading");
  } finally {
    setLoading(false);
  }
};

  const accentStyles = {
    emerald: {
      softBg: "bg-emerald-50",
      softBorder: "border-emerald-200",
      text: "text-emerald-700",
      button: "bg-emerald-600 hover:bg-emerald-700",
    },
    blue: {
      softBg: "bg-sky-50",
      softBorder: "border-sky-200",
      text: "text-sky-700",
      button: "bg-sky-600 hover:bg-sky-700",
    },
  };

  const currentAccent = accentStyles[accent] || accentStyles.emerald;

  return (
    <>
      <div className="rounded-3xl border border-[#e4ddd2] bg-[#fcfbf8] p-4 shadow-sm sm:p-6">
        <div className="flex flex-col gap-4 border-b border-[#ece5db] pb-5 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-start gap-4">
            <div
              className={`flex h-12 w-12 items-center justify-center rounded-2xl border ${currentAccent.softBorder} ${currentAccent.softBg}`}
            >
              <Icon className={`h-5 w-5 ${currentAccent.text}`} />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-[#1f352a] sm:text-xl">
                {title}
              </h2>
              <p className="mt-1 text-sm text-[#6c746d]">{subtitle}</p>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:items-end">
            <label className="text-xs font-medium uppercase tracking-[0.16em] text-[#6b746d]">
              Max Batch Upload Limit
            </label>
            <input
              type="number"
              min="1"
              value={maxBatchCount}
              onChange={(e) =>
                setMaxBatchCount(Math.max(1, Number(e.target.value) || 1))
              }
              className="h-11 w-28 rounded-xl border border-[#dcd4c8] bg-white px-3 text-sm text-[#1f352a] outline-none ring-0 transition focus:border-[#457358]"
            />
          </div>
        </div>

        <div className="mt-6">
          <label className="flex min-h-[130px] cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-[#cfc6b8] bg-[#f7f4ee] px-4 py-8 text-center transition hover:bg-[#f3efe7]">
            <div
              className={`mb-3 flex h-12 w-12 items-center justify-center rounded-2xl ${currentAccent.softBg} ${currentAccent.text}`}
            >
              <Upload className="h-5 w-5" />
            </div>

            <p className="text-sm font-semibold text-[#1f352a]">
              Click to upload multiple images
            </p>
            <p className="mt-1 text-xs text-[#737970]">
              Up to {maxBatchCount} file{maxBatchCount > 1 ? "s" : ""} per batch
              {" "}• PNG, JPG, WEBP
            </p>

            <input
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleAddImages}
            />
          </label>
        </div>

        {items.length === 0 ? (
          <div className="mt-6 rounded-2xl border border-[#eee7dc] bg-[#f9f6f1] px-4 py-10 text-center">
            <p className="text-sm font-medium text-[#1f352a]">
              No images added yet
            </p>
            <p className="mt-1 text-sm text-[#72776f]">
              Upload images to manage this section.
            </p>
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {items.map((item) => (
              <div
                key={item.id}
                className={`overflow-hidden rounded-2xl border bg-white shadow-sm transition ${
                  !item.isSaved ? "border-amber-300 ring-2 ring-amber-100" : "border-[#e7e0d5]"
                }`}
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-[#f3efe7]">
                  <img
                    src={item.preview}
                    alt={item.name}
                    className="h-full w-full object-cover"
                  />

                  {/* Staging badge indicator */}
                  {!item.isSaved && (
                    <span className="absolute left-2 top-2 rounded bg-amber-500 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white shadow">
                      Unsaved Staging
                    </span>
                  )}

                  <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 bg-gradient-to-t from-black/60 via-black/20 to-transparent p-3">
                    <span className="line-clamp-1 text-xs font-medium text-white">
                      {item.name}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 p-3">
                  <button
                    type="button"
                    onClick={() => setViewer(item.preview)}
                    className="inline-flex items-center gap-2 rounded-xl border border-[#ddd5c9] bg-white px-3 py-2 text-xs font-medium text-[#25372e] transition hover:bg-[#f7f3ed]"
                  >
                    <Eye className="h-4 w-4" />
                    View
                  </button>

                  <button
                    type="button"
                    onClick={() => replaceInputRefs.current[item.id]?.click()}
                    className={`inline-flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium text-white transition ${currentAccent.button}`}
                  >
                    <Pencil className="h-4 w-4" />
                    Update
                  </button>

                  <button
                    type="button"
                    disabled={loading}
                    onClick={() => handleDeleteImage(item)}
                    className="inline-flex items-center gap-2 rounded-xl bg-red-50 px-3 py-2 text-xs font-medium text-red-600 transition hover:bg-red-100 disabled:opacity-50"
                  >
                    <Trash2 className="h-4 w-4" />
                    Delete
                  </button>

                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    ref={(el) => (replaceInputRefs.current[item.id] = el)}
                    onChange={(e) =>
                      handleReplaceImage(item.id, e.target.files?.[0])
                    }
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {message && (
          <div className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
            {message}
          </div>
        )}

        {error && (
          <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
            {error}
          </div>
        )}

        <div className="mt-6 flex justify-end border-t border-[#ece5db] pt-4">
          <button
            type="button"
            disabled={loading || !items.some((i) => !i.isSaved)}
            onClick={handleSectionUpload}
            className={`inline-flex items-center rounded-2xl px-5 py-2.5 text-xs font-semibold text-white transition ${
              loading || !items.some((i) => !i.isSaved)
                ? "cursor-not-allowed bg-gray-400"
                : "bg-[#1f352a] hover:bg-[#2a4738]"
            }`}
          >
            {loading ? "Processing Changes..." : `Save ${title} Changes`}
          </button>
        </div>
      </div>

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
    </>
  );
};

const ManageMediaPartners = () => {
  const [partners, setPartners] = useState([]);
  const [media, setMedia] = useState([]);

  const itemsRef = useRef({ partners, media });

  useEffect(() => {
    itemsRef.current = { partners, media };
  }, [partners, media]);

  useEffect(() => {
    return () => {
      const { partners: p, media: m } = itemsRef.current;
      [...p, ...m].forEach((item) => {
        if (item.preview && !item.isSaved) URL.revokeObjectURL(item.preview);
      });
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#f8f6f1] p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 rounded-3xl border border-[#e6dfd4] bg-white px-5 py-6 shadow-sm sm:px-7">
          <span className="text-xs font-semibold uppercase tracking-[0.24em] text-[#5f7c69]">
            Admin Panel
          </span>
          <h1 className="mt-3 text-2xl font-semibold tracking-tight text-[#1f352a] sm:text-3xl">
            Manage Media & Partners
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-[#69716a] sm:text-base">
            Upload, fetch, and delete gallery collections independently. Unsaved files highlight in yellow until saved.
          </p>
        </div>

        <div className="space-y-8">
          <MediaManagerSection
            title="Manage Partners"
            subtitle="Add and maintain collaborative partner logos or partner images."
            icon={Handshake}
            items={partners}
            setItems={setPartners}
            accent="emerald"
            endpoint="/upload/partners"
          />

          <MediaManagerSection
            title="Manage Media"
            subtitle="Upload and manage gallery images used across the platform."
            icon={ImagePlus}
            items={media}
            setItems={setMedia}
            accent="blue"
            endpoint="/upload/media"
          />
        </div>
      </div>
    </div>
  );
};

export default ManageMediaPartners;