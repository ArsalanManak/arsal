export function BrandLogo({ name, color, size = 64 }: { name: string; color: string; size?: number }) {
  return (
    <div 
      className="flex items-center justify-center rounded-2xl font-black text-white"
      style={{ 
        backgroundColor: color,
        width: size,
        height: size,
        fontSize: size * 0.4
      }}
    >
      {name}
    </div>
  );
}
