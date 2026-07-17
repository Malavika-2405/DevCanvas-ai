import { useRef, ChangeEvent } from 'react';
import { ImagePlus, X } from 'lucide-react';

interface Props {
  value: string;
  onChange: (dataUrl: string) => void;
  label?: string;
  className?: string;
}

export default function PhotoUpload({ value, onChange, label = 'Profile photo', className = '' }: Props) {
  const ref = useRef<HTMLInputElement>(null);

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 3 * 1024 * 1024) {
      alert('Please choose an image under 3MB.');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => onChange(reader.result as string);
    reader.readAsDataURL(file);
  };

  return (
    <div className={className}>
      <span className="label">{label}</span>
      <div className="flex items-center gap-4">
        <div className="relative h-20 w-20 overflow-hidden rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/[0.04]">
          {value ? (
            <img src={value} alt="preview" className="h-full w-full object-cover" />
          ) : (
            <div className="grid h-full w-full place-items-center text-slate-400">
              <ImagePlus size={20} />
            </div>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <button
            type="button"
            onClick={() => ref.current?.click()}
            className="btn-ghost !py-2 !px-3 text-xs"
          >
            {value ? 'Replace' : 'Upload'}
          </button>
          {value && (
            <button
              type="button"
              onClick={() => onChange('')}
              className="inline-flex items-center gap-1 text-xs text-rose-500 hover:text-rose-400"
            >
              <X size={12} /> Remove
            </button>
          )}
        </div>
        <input
          ref={ref}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFile}
        />
      </div>
    </div>
  );
}
