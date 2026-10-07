import React, { useState, useRef } from 'react';
import { UploadCloud, File, CheckCircle2, Trash2, RefreshCw, AlertCircle, FileText, Image as ImageIcon } from 'lucide-react';

export function FileUploadZone({ onFileSelect, selectedFile, onRemoveFile, label = 'Envio da Arte Gráfica' }) {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(selectedFile ? 100 : 0);
  const [isSimulatingUpload, setIsSimulatingUpload] = useState(false);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleInputChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const processFile = (file) => {
    setIsSimulatingUpload(true);
    setUploadProgress(20);

    const isImage = file.type.startsWith('image/');
    let preview = null;
    if (isImage) {
      preview = URL.createObjectURL(file);
    }

    // Simulate progress
    const timer = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setIsSimulatingUpload(false);
          const fileObj = {
            name: file.name,
            size: file.size,
            type: file.type || 'application/pdf',
            preview: preview,
            raw: file
          };
          onFileSelect(fileObj);
          return 100;
        }
        return prev + 35;
      });
    }, 200);
  };

  const handleClear = () => {
    setUploadProgress(0);
    setIsSimulatingUpload(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
    onRemoveFile();
  };

  return (
    <div className="w-full space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold uppercase tracking-wider text-gray-700 flex items-center gap-1.5">
          <UploadCloud className="w-4 h-4 text-brand-cyan" />
          <span>{label}</span>
        </label>
        <span className="text-[11px] text-gray-500">
          Formatos: PDF/X-1a, CDR, AI, PSD, PNG ou JPG (até 100MB)
        </span>
      </div>

      {!selectedFile ? (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all ${
            isDragging
              ? 'border-brand-cyan bg-brand-cyan/5 scale-[1.01]'
              : 'border-gray-300 hover:border-brand-navy hover:bg-gray-50/70 bg-white'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            onChange={handleInputChange}
            className="hidden"
            accept=".pdf,.cdr,.ai,.psd,.png,.jpg,.jpeg,.tiff"
          />

          <div className="w-12 h-12 rounded-full bg-brand-navy/5 text-brand-navy flex items-center justify-center mx-auto mb-3">
            <UploadCloud className="w-6 h-6 text-brand-cyan" />
          </div>

          <p className="text-sm font-bold text-gray-800">
            Arraste seu arquivo para cá ou <span className="text-brand-navy underline">clique para selecionar</span>
          </p>

          <p className="text-xs text-gray-400 mt-1">
            Recomendamos envio em PDF/X-1a com fontes convertidas em curvas e cores em CMYK.
          </p>
        </div>
      ) : (
        /* Selected File Card */
        <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm space-y-3">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-navy/10 text-brand-navy flex items-center justify-center flex-shrink-0">
                {selectedFile.type?.includes('image') ? (
                  <ImageIcon className="w-5 h-5 text-brand-magenta" />
                ) : (
                  <FileText className="w-5 h-5 text-brand-navy" />
                )}
              </div>

              <div className="min-w-0">
                <p className="text-sm font-bold text-gray-900 truncate max-w-xs sm:max-w-md">
                  {selectedFile.name}
                </p>
                <div className="flex items-center gap-2 text-xs text-gray-500 mt-0.5">
                  <span>{(selectedFile.size / (1024 * 1024)).toFixed(2)} MB</span>
                  <span>•</span>
                  <span className="uppercase">{selectedFile.type || 'DOCUMENTO'}</span>
                  <span>•</span>
                  <span className="text-emerald-600 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Carregado
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="p-1.5 rounded-lg text-gray-500 hover:text-brand-navy hover:bg-gray-100 transition"
                title="Substituir arquivo"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleClear}
                className="p-1.5 rounded-lg text-gray-500 hover:text-rose-600 hover:bg-rose-50 transition"
                title="Remover arquivo"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Progress bar */}
          {isSimulatingUpload && (
            <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-brand-cyan h-1.5 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
          )}

          {/* Image Preview if available */}
          {selectedFile.preview && (
            <div className="mt-2 pt-2 border-t border-gray-100 flex items-center gap-3">
              <img
                src={selectedFile.preview}
                alt="Prévia da arte"
                className="w-16 h-16 rounded-lg object-cover border border-gray-200"
              />
              <span className="text-xs text-gray-500 italic">
                Prévia visual da arte carregada
              </span>
            </div>
          )}

          <input
            ref={fileInputRef}
            type="file"
            onChange={handleInputChange}
            className="hidden"
            accept=".pdf,.cdr,.ai,.psd,.png,.jpg,.jpeg,.tiff"
          />
        </div>
      )}
    </div>
  );
}
