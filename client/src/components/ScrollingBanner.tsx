interface ScrollingBannerProps {
  text: string;
  enabled: boolean;
}

export default function ScrollingBanner({ text, enabled }: ScrollingBannerProps) {
  if (!enabled || !text) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-sm border-t border-card-border overflow-hidden" data-testid="scrolling-banner">
      <div className="py-3 px-4">
        <div className="animate-marquee whitespace-nowrap inline-block">
          <span className="text-lg font-medium text-foreground mr-20" data-testid="text-scrolling">
            {text}
          </span>
          <span className="text-lg font-medium text-foreground mr-20">
            {text}
          </span>
          <span className="text-lg font-medium text-foreground mr-20">
            {text}
          </span>
        </div>
      </div>
    </div>
  );
}
