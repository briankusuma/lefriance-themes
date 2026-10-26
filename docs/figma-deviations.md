# Figma Deviations Log

Document every intentional or necessary deviation from the Figma designs, including reason and affected component/file.

| Date | Component / Section | Figma Frame / Node | Deviation | Reason (Shopify / A11y / Performance) |
| --- | --- | --- | --- | --- |
| 2026-10-26 | Global typography | 3374:242 | Work Sans dari font picker menjadi substitusi sementara Open Sauce One/SF Pro/Inter; bukan kecocokan final | Shopify font policy; review visual per section masih diperlukan |
| 2026-10-26 | Global geometry | 3374:242 | Margin 51.167 px dinormalisasi ke setting 51 px; ukuran rem dan tinggi konten responsif | Responsive dan preferensi ukuran font |
| 2026-10-26 | Foreground dan border UI | 3374:270, 3374:431 | Default foreground opak; garis UI lebih kuat daripada opacity teks/border dekoratif sumber | Keterbacaan; verifikasi kontras setiap state saat section dibuat |
| 2026-10-26 | Mobile, focus, contact, baseline templates | 3374:242 | Fondasi semantik dan susunan responsif turunan, not in Figma; belum homepage final | Fondasi Shopify dan aksesibilitas; tidak mengklaim visual match |
| 2026-10-26 | Header commerce/navigation | 3374:243 | Search/cart/account, nested disclosures dan form native localization + Apply ditambahkan; mobile/breakpoint 1100px adalah not in Figma | Shopify functionality, keyboard dan no-JS fallback |
| 2026-10-26 | Header logo/font/overlay | 3374:260, 3374:248 | Logo merchant/fallback nama toko; font dari T00; header solid default hingga hero tersedia | Asset rights, configurable branding, readability; exact visual match belum diverifikasi |

| 2026-10-26 | Header/hero follow-up | 3646:1124 | Menggantikan keputusan header solid sebelumnya: header overlay aktif saat hero pertama mengizinkannya; simbol/wordmark/foto asli dipakai sebagai opsi referensi, dapat diganti merchant | Instruksi implementasi terbaru; status hak distribusi dicatat terpisah |
| 2026-10-26 | Header utilities/mobile | 3646:1135 | Search/cart/account tetap tersedia; localization membuka form country/language native; posisi menyesuaikan jumlah kontrol/menu | Commerce, keyboard dan locale-aware behavior; mobile tidak disediakan Figma |
| 2026-10-26 | Hero readability | 3646:1124 | Scrim gelap atas/bawah default 60%; foreground body opak, bukan copy setengah transparan | Meningkatkan keterbacaan teks putih pada foto; perubahan foto/opacity perlu pemeriksaan kontras merchant |
| 2026-10-26 | Cards/cart/essentials | 3374:242 | Komponen commerce/state tambahan diturunkan dari token; belum merupakan implementasi visual tab T05 atau footer T08 | Permintaan global settings dan essentials terbaru; jangan menganggap state yang tak ada di Figma sebagai pixel match |
