import BackButton from "@/components/common/BackButton";
import FavoritesGrid from "@/components/favorites/FavoritesGrid";

export default function FavoritesPage() {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)] pb-12 pt-8">
      <div className="absolute md:block hidden top-6 md:left-24 z-50">
        <BackButton />
      </div>

      {/* ─── AMBIENT BACKGROUND GLOW ─── */}
      <div className="absolute top-20 left-6 w-96 h-96 bg-purple-600/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-20 right-6 w-96 h-96 bg-fuchsia-600/5 rounded-full blur-[120px] pointer-events-none" />

      <FavoritesGrid />
    </div>
  );
}
