# Task aktif

Task aktif: sinkronisasi scale kartu/garis dan final slide reveal, 2026-10-29. Implementasi dan pemeriksaan lokal selesai; visual browser belum diperiksa.

Follow-up: kartu scale 0→0.25→1 dan keempat batas kotak memakai satu nilai opening dan easing yang sama. Offset garis berasal dari separuh lebar/tinggi rail, dihitung saat setup/refresh; tidak membaca layout per frame. Swiper di-update sekali sebelum pengukuran, padding rail dihapus agar kartu tidak melewati batas. Final items memakai slide dari bawah (yPercent 105→0), clip mask dan stagger, mengikuti scrub. Tes GSAP sampling progres dan perubahan lebar saat refresh membuktikan batas kartu/garis tetap sinkron; reverse juga lulus. Tidak menambah library atau pin DOM. Batas verifikasi freeze/browser sebelumnya tetap berlaku.

Figma `C2rhn7BP2nXA0LyByRDn09` / `3734:390` dibaca ulang. Mapping: Material stories existing; tujuh tahap pada satu sticky stage: title character fill → horizontal → cross → kartu kecil → kartu penuh → outer grid → side controls. CSS host 550svh/stage 100svh; ScrollTrigger start top/top, end bottom/bottom, scrub 1.2s; mundur saat scroll naik. Tidak ada GSAP pin/wrapper/pemindahan DOM atau callback refresh→Lenis.resize. Kategori, slider dan konten editable dipertahankan. Scene baru dimuat dekat viewport setelah intro selesai.

Loading hero: native grapheme spans yang sudah ada dipakai langsung; menghapus revert/pecah ulang lewat SplitText. Hero meminta core GSAP saja, plugin baru dimuat sekali untuk scene. Durasi visual intro sebelumnya dipertahankan. Penundaan visual bukan bukti jaringan lambat atau penyebab CPU freeze.

Validasi: real-GSAP timeline/VM tests (ordering, reveal overlap, reverse, no pin), lazy-loader concurrency (satu request per library), deferred startup, editor select/deselect/reconnect, intro caption replay/timing lulus. DOM lifecycle diuji dengan LinkeDOM dan adapter slider mock: satu init per koneksi, style updates tidak memindahkan host, cleanup/reconnect tanpa duplikasi. Tujuh fixture Liquid serta hero dirender; syntax/format/diff bersih, Theme Check tanpa temuan. Percobaan menjalankan seluruh vendor dengan DOM emulasi terbatas tidak menggantikan pengujian browser/CSS layout dan tidak dinyatakan lulus. Tidak ada dependency proyek baru; alat tes hanya /tmp.

Batas: belum ada profil main-thread, perbandingan visual desktop/mobile, Theme Editor live atau Lighthouse toko karena akses browser sebelumnya dibatasi. Freeze dari screenshot belum direproduksi/diukur langsung; perbaikan lifecycle/pin sebelumnya adalah defect yang ditemukan, bukan konfirmasi penyebab tunggal. Figma hanya memiliki frame statis, bukan motion keyframes. Mobile <750px title-only/reduced motion/static selected-editor merupakan adaptasi yang perlu QA. QA cart toko dari task sebelumnya tetap terbuka.

Sumber: [ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/), [custom-element lifecycle](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements), [Shopify editor events](https://shopify.dev/docs/storefronts/themes/best-practices/editor/integrate-sections-and-blocks).

## Isi untuk pekerjaan berikutnya

- Target: nama section, file, task ID, atau URL Figma.
- Tujuan:
- Batasan:
- Kriteria selesai:
- Status: belum dimulai.
- Hasil dan validasi: belum dikerjakan.
- Sisa pekerjaan/hambatan:

## Cara eksekusi

- Chat **eksekusi task** membaca target aktif di atas. Bila kosong/sudah selesai, jangan menjalankan backlog otomatis.
- Instruksi langsung atau link Figma dengan konteks implementasi mengalahkan target lama. Pengguna tidak wajib mengisi format ini.
- Analisis saja tidak mengizinkan implementasi. Ikuti AGENTS.md dan baca standar yang relevan.
- Setelah bekerja, perbarui hasil singkat, pemeriksaan yang benar-benar dilakukan dan sisa pekerjaan. Jangan menumpuk laporan lama, JSON hasil test, screenshot, atau salinan seluruh checklist.
- Pertahankan pekerjaan yang belum selesai. Git menyimpan riwayat perubahan; arsip dokumentasi tambahan hanya dibuat bila diminta pengguna.

## Prioritas yang belum selesai

- QA toko: Theme Editor, native forms/checkout/cart, accessibility dan Lighthouse dengan konten nyata.
- Audit fitur produk/koleksi/search/cart terhadap checklist; jangan menganggap styling sudah melengkapi seluruh fitur.
- Release: hak aset Figma, identitas/support tema, demo store dan pemeriksaan seluruh persyaratan resmi.

Prioritas ini bukan perintah untuk langsung dikerjakan. Target berikutnya tetap ditentukan pengguna.
