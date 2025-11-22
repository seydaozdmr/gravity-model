# 🌌 3D Interactive Solar System

Güneş sisteminin etkileşimli 3D görselleştirmesi. Three.js kullanılarak geliştirilmiş, gezegenleri keşfedebileceğiniz ve detaylarını görebileceğiniz interaktif bir web uygulaması.

![Solar System](https://img.shields.io/badge/Three.js-000000?style=for-the-badge&logo=three.js&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

## ✨ Özellikler

- **🪐 Gerçekçi Gezegenler**: Güneş ve 8 gezegen için yüksek çözünürlüklü texture'lar
- **🎮 İnteraktif Kontroller**: Fare ile döndürme, yakınlaştırma ve kaydırma
- **ℹ️ Gezegen Bilgileri**: Gezegenlere tıklayarak detaylı bilgi görüntüleme
- **⏯️ Animasyon Kontrolü**: Pause/Resume butonu ile simülasyonu durdurma ve devam ettirme
- **🌟 Yıldız Arka Planı**: 10,000 rastgele yıldızdan oluşan gerçekçi uzay arka planı
- **🔄 Yörünge Animasyonları**: Gezegenlerin güneş etrafındaki gerçek zamanlı yörünge hareketi
- **📱 Responsive Tasarım**: Tüm ekran boyutlarına uyumlu

## 🚀 Kurulum

### Gereksinimler

- Node.js (v20.17.0 veya üzeri)
- npm

### Adımlar

1. Projeyi klonlayın:
```bash
git clone <repository-url>
cd gravity-model
```

2. Bağımlılıkları yükleyin:
```bash
npm install
```

3. Geliştirme sunucusunu başlatın:
```bash
npm run dev
```

4. Tarayıcınızda açın:
```
http://localhost:5173
```

## 🎯 Kullanım

### Kontroller

- **Sol Tık + Sürükle**: Sahneyi döndürme
- **Sağ Tık + Sürükle**: Sahneyi kaydırma
- **Scroll**: Yakınlaştırma/Uzaklaştırma
- **Gezegene Tık**: Gezegen bilgilerini görüntüleme
- **Pause/Resume Butonu**: Animasyonu durdurma/devam ettirme

### Gezegenler

Proje aşağıdaki gök cisimlerini içerir:
- ☀️ Güneş
- ☿️ Merkür
- ♀️ Venüs
- 🌍 Dünya
- ♂️ Mars
- ♃️ Jüpiter
- ♄ Satürn (halkaları ile)
- ♅ Uranüs
- ♆ Neptün

## 🛠️ Teknolojiler

- **Three.js**: 3D grafik render motoru
- **Vite**: Hızlı geliştirme ortamı ve build aracı
- **JavaScript (ES6+)**: Modern JavaScript özellikleri
- **CSS3**: Gelişmiş stil ve animasyonlar

## 📁 Proje Yapısı

```
gravity-model/
├── index.html          # Ana HTML dosyası
├── main.js            # Three.js sahne kurulumu ve animasyon
├── planetData.js      # Gezegen verileri ve özellikleri
├── style.css          # Stil dosyası
├── public/
│   └── textures/      # Gezegen texture'ları
│       ├── sun.png
│       ├── mercury.png
│       ├── venus.png
│       ├── earth.png
│       ├── mars.png
│       ├── jupiter.png
│       └── saturn.png
└── package.json       # Proje bağımlılıkları
```

## 🎨 Özelleştirme

### Gezegen Ekleme/Düzenleme

`planetData.js` dosyasını düzenleyerek yeni gezegenler ekleyebilir veya mevcut gezegenleri özelleştirebilirsiniz:

```javascript
{
  name: "Gezegen Adı",
  radius: 2,              // Gezegen yarıçapı
  distance: 45,           // Güneşe uzaklık
  color: 0x2233ff,        // Renk (texture yoksa)
  texture: "/textures/planet.png", // Texture yolu
  description: "Açıklama",
  speed: 0.01            // Yörünge hızı
}
```

### Işıklandırma Ayarları

`main.js` dosyasında ışıklandırma ayarlarını değiştirebilirsiniz:

```javascript
const ambientLight = new THREE.AmbientLight(0xaaaaaa, 1.5);
const pointLight = new THREE.PointLight(0xffffff, 3, 400);
```

## 🐛 Bilinen Sorunlar

- Uranüs ve Neptün için texture'lar henüz eklenmemiştir (renk kullanılıyor)
- Çok eski tarayıcılarda performans sorunları yaşanabilir

## 📝 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## 🤝 Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'Add some amazing feature'`)
4. Branch'inizi push edin (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## 📧 İletişim

Sorularınız veya önerileriniz için issue açabilirsiniz.

---

⭐ Projeyi beğendiyseniz yıldız vermeyi unutmayın!
