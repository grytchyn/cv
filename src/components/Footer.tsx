const Footer = () => {
  return (
    <footer className="px-8 pb-12 max-w-[42.5rem] mx-auto text-center">
      <div className="flex items-center gap-2 justify-center mb-4">
        <span className="h-px w-8 bg-green-dim"></span>
        <span className="font-['JetBrains_Mono',monospace] text-xs text-green-muted tracking-[2px]">EOF</span>
        <span className="h-px w-8 bg-green-dim"></span>
      </div>
      <p className="font-['JetBrains_Mono',monospace] text-[11px] text-green-muted/60 tracking-[0.5px]">
        built with React 19 · hosted on Render
      </p>
      <p className="font-['JetBrains_Mono',monospace] text-[11px] text-green-muted/60 tracking-[0.5px]">
        © 2026 Konstantin Gritsch
      </p>
    </footer>
  );
};

export default Footer;