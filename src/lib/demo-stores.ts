export type DemoStore = {
  slug: string;
  name: string;
  descriptionEn: string;
  descriptionHi: string;
  color: string;
  type: "kirana" | "supermarket" | "pharmacy";
};

export const DEMO_STORES: DemoStore[] = [
  {
    slug: "demo",
    name: "Demo Kirana",
    descriptionEn: "Full grocery catalog with 65+ items — teal branding.",
    descriptionHi: "65+ उत्पादों के साथ पूरा किराना कैटलॉग — टील ब्रांडिंग।",
    color: "#0f766e",
    type: "kirana",
  },
  {
    slug: "purti",
    name: "Purti Supermarket",
    descriptionEn: "Second demo store with 30 products — violet branding.",
    descriptionHi: "30 उत्पादों के साथ दूसरा डेमो स्टोर — बैंगनी ब्रांडिंग।",
    color: "#7c3aed",
    type: "supermarket",
  },
  {
    slug: "healthplus",
    name: "HealthPlus Medical",
    descriptionEn: "Pharmacy demo with 30 OTC items — order on WhatsApp.",
    descriptionHi: "30 OTC उत्पादों के साथ फार्मेसी डेमो — व्हाट्सऐप पर ऑर्डर करें।",
    color: "#0284c7",
    type: "pharmacy",
  },
];
