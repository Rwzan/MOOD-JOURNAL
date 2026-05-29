"use client";

import { useState } from "react";
import { useEffect } from "react";
// ⭐️ إنشاء نجوم عشوائية
const stars = Array.from({ length: 40 }).map(() => ({
  left: Math.random() * 100, // مكان النجمة أفقيًا
  top: Math.random() * 100,  // مكانها عموديًا
  size: Math.random() * 3 + 1, // حجم النجمة
  duration: Math.random() * 5 + 3, // سرعة الحركة
}));
export default function Home() {

  // 🎯 نخزن المود الحالي
  const [mood, setMood] = useState("");
  // 💾 تحميل المود عند فتح الموقع
useEffect(() => {
  const savedMood = localStorage.getItem("mood");
  if (savedMood) {
    setMood(savedMood);
  }
}, []);

// 💾 حفظ المود كل ما يتغير
useEffect(() => {
  localStorage.setItem("mood", mood);
}, [mood]);

  // 🌈 نحدد الخلفية حسب المود
  const getBackground = () => {
    if (mood === "sad")
      return "bg-gradient-to-br from-purple-950 via-indigo-900 to-black";

    if (mood === "sleepy")
      return "bg-gradient-to-br from-blue-900 via-cyan-900 to-black";

    if (mood === "love")
      return "bg-gradient-to-br from-pink-500 via-purple-600 to-yellow-300";

    if (mood === "angry")
      return "bg-gradient-to-br from-red-600 via-orange-500 to-black";

    // default galaxy
    return "bg-gradient-to-br from-purple-900 via-pink-600 to-cyan-500";
  };

  // 💬 رسالة حسب المود
  const getMessage = () => {
    if (mood === "sad") return "It's okay to feel sad 💜";
    if (mood === "sleepy") return "Go rest 😴 you deserve it";
    if (mood === "love") return "You are glowing today ✨😍";
    if (mood === "angry") return "Breathe… you are safe 🌿";
    return "How are you feeling today?";
  };

  return (
    
    <main className={`min-h-screen relative flex items-center justify-center text-white overflow-hidden transition-all duration-700 ${getBackground()}`}>
      {/* ⭐️ النجوم المتحركة */}
{stars.map((star, i) => (
  <div
    key={i}
    className="absolute bg-white rounded-full opacity-70 animate-pulse"
    style={{
      left: `${star.left}%`,
      top: `${star.top}%`,
      width: `${star.size}px`,
      height: `${star.size}px`,
      animationDuration: `${star.duration}s`,
    }}
  />
))}
      {/* ✨ glow effects */}
      <div className="absolute w-96 h-96 bg-purple-500 rounded-full blur-3xl opacity-30 top-10 left-10" />
      <div className="absolute w-96 h-96 bg-pink-400 rounded-full blur-3xl opacity-30 bottom-10 right-10" />

      {/* 🧊 الكارد */}
      <section className="relative z-10 backdrop-blur-xl bg-white/10 border border-white/20 p-10 rounded-3xl shadow-2xl w-[320px] text-center">

        {/* 📝 العنوان */}
        <h1 className="text-3xl font-bold mb-2">
          Mood Journal ✨
        </h1>

        {/* 💬 الرسالة */}
        <p className="text-white/80 mb-6">
          {getMessage()}
        </p>

        {/* 😶 الأزرار */}
        <div className="flex justify-center gap-4 text-3xl">

          <button onClick={() => setMood("sad")} className="hover:scale-125 transition">😭</button>

          <button onClick={() => setMood("sleepy")} className="hover:scale-125 transition">😴</button>

          <button onClick={() => setMood("love")} className="hover:scale-125 transition">😍</button>

          <button onClick={() => setMood("angry")} className="hover:scale-125 transition">😡</button>

        </div>

        {/* 🔄 زر إعادة تعيين */}
        {mood && (
          <button
            onClick={() => setMood("")}
            className="mt-6 text-sm underline opacity-70 hover:opacity-100 transition"
          >
            Reset mood
          </button>
        )}

        {/* 🧠 عرض الحالة */}
        {mood && (
          <p className="mt-3 text-xs text-white/60">
            current mood: {mood}
          </p>
        )}

      </section>

    </main>
  );
}