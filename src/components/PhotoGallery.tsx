import React, { useState, useEffect } from 'react';
import {
  Image as ImageIcon,
  ChevronLeft,
  ChevronRight,
  X,
  ExternalLink,
  Maximize2,
  CheckCircle2,
  Loader2
} from 'lucide-react';
import { fetchWikimediaPhotos, WikiPhoto } from '../services/wikiImageService';

interface PhotoGalleryProps {
  eventId: string;
  title: string;
  location?: string;
}

export const PhotoGallery: React.FC<PhotoGalleryProps> = ({
  eventId,
  title,
  location
}) => {
  const [photos, setPhotos] = useState<WikiPhoto[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

    fetchWikimediaPhotos(eventId, title).then(result => {
      if (isMounted) {
        setPhotos(result);
        setIsLoading(false);
      }
    }).catch(() => {
      if (isMounted) {
        setIsLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [eventId, title]);

  const openLightbox = (index: number) => {
    setActivePhotoIndex(index);
  };

  const closeLightbox = () => {
    setActivePhotoIndex(null);
  };

  const nextPhoto = () => {
    if (activePhotoIndex !== null && photos.length > 0) {
      setActivePhotoIndex((activePhotoIndex + 1) % photos.length);
    }
  };

  const prevPhoto = () => {
    if (activePhotoIndex !== null && photos.length > 0) {
      setActivePhotoIndex((activePhotoIndex - 1 + photos.length) % photos.length);
    }
  };

  const googleImagesUrl = `https://www.google.com/search?tbm=isch&q=${encodeURIComponent(
    location ? `${title} ${location}` : `${title} Istanbul`
  )}`;

  return (
    <div className="space-y-3">
      {/* Gallery Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-700">
          <ImageIcon className="w-4 h-4 text-blue-600" />
          <span>Authentic Visuals ({photos.length} Verified Photos)</span>
          <span className="hidden sm:inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 font-semibold border border-blue-200">
            <CheckCircle2 className="w-3 h-3 text-blue-600" /> Wikimedia Verified
          </span>
        </div>
        <a
          href={googleImagesUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-bold text-slate-500 hover:text-blue-600 transition flex items-center gap-1"
        >
          <span>More on Google</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="h-28 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center gap-2.5 text-slate-500 text-xs font-medium animate-pulse">
          <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
          <span>Loading verified photos of {title}...</span>
        </div>
      )}

      {/* Horizontal Scrollable Strip with Verified Photos */}
      {!isLoading && photos.length > 0 && (
        <div className="flex gap-2.5 overflow-x-auto pb-2 pt-1 custom-scrollbar snap-x snap-mandatory">
          {photos.map((photo, idx) => (
            <div
              key={idx}
              onClick={() => openLightbox(idx)}
              className="group relative flex-shrink-0 w-36 h-28 sm:w-44 sm:h-32 rounded-2xl overflow-hidden cursor-pointer border border-slate-200 bg-slate-100 snap-start transition transform hover:scale-[1.03] active:scale-[0.98] shadow-sm"
            >
              <img
                src={photo.url}
                alt={photo.caption}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
              />
              {/* Overlay Gradient & Caption */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-90 group-hover:opacity-100 transition p-2 flex flex-col justify-between">
                <span className="self-end p-1 rounded-full bg-black/40 text-white/80 opacity-0 group-hover:opacity-100 transition">
                  <Maximize2 className="w-3 h-3" />
                </span>
                <p className="text-[11px] font-semibold text-white leading-tight line-clamp-2 drop-shadow-md">
                  {photo.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {!isLoading && photos.length === 0 && (
        <div className="p-4 rounded-2xl bg-slate-100 border border-slate-200 text-xs text-slate-500 text-center">
          <p>Tap below to view full photo galleries and street views on Google.</p>
        </div>
      )}

      {/* Fullscreen Lightbox Modal */}
      {activePhotoIndex !== null && photos[activePhotoIndex] && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md animate-fadeIn p-4 sm:p-8">
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 p-3 rounded-full bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 hover:text-white transition z-20"
            aria-label="Close photo"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Left Arrow */}
          <button
            onClick={prevPhoto}
            className="absolute left-3 sm:left-6 p-3 rounded-full bg-zinc-900/80 hover:bg-zinc-800 text-white transition z-20 hover:scale-110"
            aria-label="Previous photo"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Photo Container */}
          <div className="max-w-4xl max-h-[85vh] flex flex-col items-center justify-center">
            <img
              src={photos[activePhotoIndex].url}
              alt={photos[activePhotoIndex].caption}
              className="max-h-[72vh] max-w-full rounded-2xl object-contain shadow-2xl"
            />
            {/* Caption & Counter */}
            <div className="mt-4 text-center space-y-1.5 px-4">
              <p className="text-base sm:text-lg font-bold text-white max-w-2xl">
                {photos[activePhotoIndex].caption}
              </p>
              <div className="flex items-center justify-center gap-3 text-xs text-zinc-400 font-mono">
                <span>{activePhotoIndex + 1} / {photos.length}</span>
                <span>•</span>
                <span>{title}</span>
                {photos[activePhotoIndex].sourceUrl && (
                  <>
                    <span>•</span>
                    <a
                      href={photos[activePhotoIndex].sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sky-400 hover:underline flex items-center gap-1"
                    >
                      Wikimedia Source <ExternalLink className="w-3 h-3" />
                    </a>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Right Arrow */}
          <button
            onClick={nextPhoto}
            className="absolute right-3 sm:right-6 p-3 rounded-full bg-zinc-900/80 hover:bg-zinc-800 text-white transition z-20 hover:scale-110"
            aria-label="Next photo"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      )}
    </div>
  );
};
