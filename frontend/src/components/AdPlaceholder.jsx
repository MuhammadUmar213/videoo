// Ad Placeholder Component - Replace with Google AdSense code when approved.
// Supports: Banner (728x90, 336x280), Skyscraper (120x600, 160x600), Responsive.

export function AdBanner() {
  return (
    <div className="w-full h-24 bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300 hover:border-blue-400 transition my-6">
      <div className="text-center">
        <p className="text-gray-500 text-sm font-semibold">Ad Zone (728x90)</p>
        <p className="text-gray-400 text-xs">Google AdSense will display here</p>
      </div>
    </div>
  );
}

export function AdSquare() {
  return (
    <div className="w-full max-w-xs h-80 bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300 hover:border-blue-400 transition">
      <div className="text-center">
        <p className="text-gray-500 text-sm font-semibold">Ad Zone (336x280)</p>
        <p className="text-gray-400 text-xs">Google AdSense will display here</p>
      </div>
    </div>
  );
}

export function AdResponsive() {
  return (
    <div className="w-full h-32 bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300 hover:border-blue-400 transition my-6">
      <div className="text-center">
        <p className="text-gray-500 text-sm font-semibold">Responsive Ad Zone</p>
        <p className="text-gray-400 text-xs">Google AdSense will display here</p>
      </div>
    </div>
  );
}

// To integrate Google AdSense, replace above with:
/*
export function AdBanner() {
  useEffect(() => {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }, []);

  return (
    <ins className="adsbygoogle"
         style={{ display: 'block' }}
         data-ad-client="ca-pub-xxxxxxxxxxxxxxxx"
         data-ad-slot="1234567890"
         data-ad-format="horizontal"
         data-full-width-responsive="true"></ins>
  )
}
*/
