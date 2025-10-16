import ScrollingBanner from "../ScrollingBanner";

export default function ScrollingBannerExample() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-purple-900 via-slate-900 to-blue-900">
      <div className="flex items-center justify-center h-screen">
        <p className="text-white text-2xl">Scrolling banner appears at the bottom</p>
      </div>
      <ScrollingBanner
        text="Welcome to Genesis 10! Follow us on Twitter @GenesisSmash for updates and brackets"
        enabled={true}
      />
    </div>
  );
}
