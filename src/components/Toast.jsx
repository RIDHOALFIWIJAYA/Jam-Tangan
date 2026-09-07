import { useShop } from "../context/ShopContext";

export default function Toast() {
  const { toast } = useShop();

  return (
    <div
      className={`fixed top-24 right-6 bg-blue-600 text-white px-6 py-3 rounded-2xl shadow-2xl transition-transform duration-500 z-[300] font-bold text-sm max-w-[280px] ${
        toast.visible ? "translate-x-0" : "translate-x-[150%]"
      }`}
    >
      {toast.message}
    </div>
  );
}
