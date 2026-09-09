import { useState, useEffect } from 'react';
import { Download, X, Smartphone } from 'lucide-react';

export default function PWAInstallBanner() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showBanner, setShowBanner] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
      return;
    }

    // Check if user dismissed before
    if (localStorage.getItem('pwa_dismissed')) return;

    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowBanner(true);
    };

    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) {
      // Show manual install instructions
      setShowManualGuide(true);
      return;
    }
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setIsInstalled(true);
    }
    setDeferredPrompt(null);
    setShowBanner(false);
  };

  const [showManualGuide, setShowManualGuide] = useState(false);

  if (isInstalled) return null;

  return (
    <>
      {showBanner && (
        <div className="fixed bottom-4 left-4 right-4 z-50 bg-gradient-to-l from-primary-600 to-accent-600 rounded-2xl p-4 shadow-2xl animate-fade-in md:max-w-md md:mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
              <Smartphone size={20} className="text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-white">نصب روی موبایل</p>
              <p className="text-xs text-white/80">FitAI را مانند اپلیکیشن نصب کنید</p>
            </div>
            <button onClick={handleInstall}
              className="px-3 py-1.5 rounded-lg bg-white text-primary-600 text-xs font-bold">
              نصب
            </button>
            <button onClick={() => { setShowBanner(false); localStorage.setItem('pwa_dismissed', 'true'); }}
              className="text-white/60 hover:text-white">
              <X size={16} />
            </button>
          </div>
        </div>
      )}

      {showManualGuide && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={() => setShowManualGuide(false)}>
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 max-w-sm w-full" onClick={e => e.stopPropagation()}>
            <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
              <Download size={20} className="text-primary-500" />
              نصب روی موبایل
            </h3>
            
            <div className="space-y-4 text-sm text-slate-600 dark:text-slate-300">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-700/50">
                <p className="font-medium text-slate-800 dark:text-white mb-1">📱 در اندروید (Chrome):</p>
                <ol className="list-decimal mr-4 space-y-1 text-xs">
                  <li>روی منوی سه‌نقطه (⋮) بالا بزنید</li>
                  <li>گزینه "Add to Home screen" یا "نصب اپلیکیشن" را انتخاب کنید</li>
                  <li>روی "Install" بزنید</li>
                </ol>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-700/50">
                <p className="font-medium text-slate-800 dark:text-white mb-1">🍎 در آیفون (Safari):</p>
                <ol className="list-decimal mr-4 space-y-1 text-xs">
                  <li>روی دکمه Share (مربع با فلش) پایین بزنید</li>
                  <li>"Add to Home Screen" را انتخاب کنید</li>
                  <li>روی "Add" بزنید</li>
                </ol>
              </div>

              <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                <p className="text-xs text-blue-700 dark:text-blue-300">
                  💡 بعد از نصب، FitAI مانند یک اپلیکیشن مستقل روی گوشی شما اجرا می‌شود و حتی بدون اینترنت هم کار می‌کند!
                </p>
              </div>
            </div>

            <button onClick={() => setShowManualGuide(false)}
              className="w-full mt-4 py-3 rounded-xl bg-primary-500 text-white font-medium">
              متوجه شدم
            </button>
          </div>
        </div>
      )}
    </>
  );
}
