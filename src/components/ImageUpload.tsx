import { useRef, useState } from 'react';
import { UploadCloud, ImageIcon, X } from 'lucide-react';

interface Props {
  onImageSelected: (file: File | null) => void;
  previewUrl: string | null;
  onClear: () => void;
}

const ACCEPTED = ['image/jpeg', 'image/jpg', 'image/png'];

export function ImageUpload({ onImageSelected, previewUrl, onClear }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleFile(file: File | undefined) {
    if (!file) return;
    if (!ACCEPTED.includes(file.type)) {
      setError('Please upload a JPG or PNG image.');
      return;
    }
    setError(null);
    onImageSelected(file);
  }

  return (
    <div>
      <label className="field-label">Photograph</label>
      <input
        ref={inputRef}
        type="file"
        accept=".jpg,.jpeg,.png"
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0])}
      />
      {previewUrl ? (
        <div className="relative overflow-hidden rounded-2xl border border-neutral-200">
          <img src={previewUrl} alt="Observation preview" className="h-64 w-full object-cover" />
          <button
            onClick={onClear}
            className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-lg bg-white/90 px-2.5 py-1.5 text-xs font-medium text-gwin-800 shadow-sm backdrop-blur transition-colors hover:bg-white"
          >
            <X className="h-3.5 w-3.5" /> Remove
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragOver(false);
            handleFile(e.dataTransfer.files?.[0]);
          }}
          className={`flex h-64 w-full flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed transition-colors ${
            dragOver
              ? 'border-gwin-500 bg-gwin-50'
              : 'border-neutral-300 bg-neutral-50 hover:border-gwin-400 hover:bg-gwin-50/50'
          }`}
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gwin-100 text-gwin-700">
            <UploadCloud className="h-6 w-6" />
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-gwin-900">Drag and drop a photo here</p>
            <p className="mt-0.5 text-xs text-neutral-500">or click to browse — JPG or PNG</p>
          </div>
        </button>
      )}
      {error && (
        <p className="mt-2 flex items-center gap-1.5 text-xs text-red-600">
          <ImageIcon className="h-3.5 w-3.5" /> {error}
        </p>
      )}
    </div>
  );
}
