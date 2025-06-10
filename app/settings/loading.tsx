import Mascot from '@/app/components/ui/Mascot';
import Spinner from '@/app/components/ui/Spinner';

export default function Loading() {
  return (
    <main className="w-full min-h-screen flex flex-col items-center justify-center">
      <div
        className="relative flex items-center justify-center"
        style={{ width: 64, height: 64 }}
      >
        <Spinner size={128} />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <Mascot />
        </div>
      </div>
    </main>
  );
}
