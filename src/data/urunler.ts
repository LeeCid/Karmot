/* Ürün taksonomisi — mal sahibinin belirlediği 5 ana grup.
   Kaynaklar: dgmr.com.tr (redüktör, motor, fren), emsepompa.com (pompa),
   uvents.com.tr (fan — görsellerdeki UVENTS ibareleri temizlendi).
   img yolu: src/assets/urunler/ altına göre görelidir. */

export interface UrunItem {
  name: string;
  slug: string;
  desc: string;
  img: string;
}

export interface UrunKategori {
  slug: string;
  name: string;
  icon: 'gearbox' | 'motor' | 'pump' | 'fan' | 'brake';
  blurb: string;
  items: UrunItem[];
  features?: string[];
}

export const kategoriler: UrunKategori[] = [
  {
    slug: 'reduktorler',
    name: 'Redüktörler',
    icon: 'gearbox',
    blurb: 'Sonsuz vidalıdan endüstriyel serilere on ayrı tip',
    items: [
      {
        name: 'Sonsuz Vidalı Redüktörler',
        slug: 'sonsuz-vidali-reduktorler',
        desc: 'Alüminyum gövdede sonsuz vida ile bronz çarkın birlikte çalıştığı sessiz redüktörler; düzenli yüklü uygulamalar için ekonomik tahrik çözümü.',
        img: 'reduktorler/sonsuz-vidali-reduktorler.jpg',
      },
      {
        name: 'Endüstriyel Redüktörler',
        slug: 'endustriyel-reduktorler',
        desc: 'GGG40 sfero döküm gövdeli, ağır hizmet için tasarlanmış büyük güç redüktörleri; soğutma ve IEC motor flanşı seçenekleriyle yapılandırılır.',
        img: 'reduktorler/endustriyel-reduktorler.png',
      },
      {
        name: 'Kaldırma Redüktörleri',
        slug: 'kaldirma-reduktorleri',
        desc: 'Vinç ve kaldırma sistemleri için paralel eksenli helisel redüktörler; DIN 5480 çıkış mili, fren ve enkoder seçenekleri.',
        img: 'reduktorler/kaldirma-reduktorleri.jpg',
      },
      {
        name: 'Helisel Dişli Paralel Şaft Redüktörler',
        slug: 'helisel-disli-paralel-saft-reduktorler',
        desc: 'Monoblok gövdeli, paralel giriş-çıkış milli redüktörler; delik veya dolu mil çıkışıyla dar alanlı konveyör tahriklerine uygun.',
        img: 'reduktorler/helisel-disli-paralel-saft-reduktorler.png',
      },
      {
        name: 'Helisel Dişli Redüktörler',
        slug: 'helisel-disli-reduktorler',
        desc: 'Rijit ve sızdırmaz monoblok gövde, düşük gürültü; ayak veya flanş bağlantılı, kademelendirilebilir çevrim oranları.',
        img: 'reduktorler/helisel-disli-reduktorler.png',
      },
      {
        name: 'Modüler Helisel Dişli Redüktörler',
        slug: 'moduler-helisel-disli-reduktorler',
        desc: 'Modüler yapısıyla farklı motor ve bağlantı kombinasyonlarına hızla uyarlanan seri; geniş çevrim oranı yelpazesi.',
        img: 'reduktorler/moduler-helisel-disli-reduktorler.png',
      },
      {
        name: 'Helisel Konik Dişli Redüktörler',
        slug: 'helisel-konik-disli-reduktorler',
        desc: '90° güç aktarımı için helisel-konik dişli monoblok redüktörler; yön değiştiren konveyör ve ağır yük tahriklerinde verimli.',
        img: 'reduktorler/helisel-konik-disli-reduktorler.png',
      },
      {
        name: 'Kümes Hayvanları Yemleme Redüktörü',
        slug: 'kumes-hayvanlari-yemleme-reduktoru',
        desc: 'Yemleme hatlarının sürekli çalışma koşulları için geliştirilen kompakt, düşük bakımlı özel redüktör.',
        img: 'reduktorler/kumes-hayvanlari-yemleme-reduktoru.png',
      },
      {
        name: 'Modüler Konik Dişli Redüktörler',
        slug: 'moduler-konik-disli-reduktorler',
        desc: 'Dik açılı aktarım için modüler konik seriler; delik mil, dolu mil veya sıkma bileziği çıkışıyla esnek montaj.',
        img: 'reduktorler/moduler-konik-disli-reduktorler.png',
      },
      {
        name: 'Şaft Montajlı Redüktörler',
        slug: 'saft-montajli-reduktorler',
        desc: 'Tahrik miline doğrudan takılarak kaide ve kaplin ihtiyacını kaldıran pratik çözüm; bant konveyörlerde yerden tasarruf.',
        img: 'reduktorler/saft-montajli-reduktorler.png',
      },
    ],
  },
  {
    slug: 'motorlar',
    name: 'AC Elektrik Motorları',
    icon: 'motor',
    blurb: 'Alçak gerilimden 11 kV ağır hizmete',
    items: [
      {
        name: 'Alçak Gerilim Motorları',
        slug: 'alcak-gerilim-motorlari',
        desc: '56–630 gövde aralığında, IE2–IE4 verimlilikte tek ve üç fazlı asenkron motorlar; duman tahliye gibi özel seriler dahil.',
        img: 'motorlar/alcak-gerilim-motorlari.png',
      },
      {
        name: 'Pro-Ex Exproof Motor',
        slug: 'pro-ex-exproof-motor',
        desc: 'ATEX sertifikalı, pik döküm gövdeli exproof seri; tehlikeli bölge sınıfındaki tesislerde emniyetli tahrik.',
        img: 'motorlar/pro-ex-exproof-motor.jpg',
      },
      {
        name: 'Orta ve Yüksek Voltajlı Elektrik Motorları',
        slug: 'orta-ve-yuksek-voltajli-elektrik-motorlari',
        desc: '1–11 kV, 150–3.000 kW ağır hizmet motorları; petrol-gaz, maden, çimento ve enerji tesislerinde direkt veya sürücülü kalkış.',
        img: 'motorlar/orta-ve-yuksek-voltajli-elektrik-motorlari.jpg',
      },
    ],
  },
  {
    slug: 'pompalar',
    name: 'Pompalar',
    icon: 'pump',
    blurb: 'Santrifüjden pozitif deplasmana on bir aile',
    items: [
      {
        name: 'Uçtan Emişli Pompalar',
        slug: 'uctan-emisli-pompalar',
        desc: 'Eksenel emiş, radyal basma; santrifüj, kızgın yağ ve paslanmaz monoblok modellerle geniş proses yelpazesi.',
        img: 'pompalar/uctan-emisli-pompalar.png',
      },
      {
        name: 'Kademeli Pompalar',
        slug: 'kademeli-pompalar',
        desc: 'Seri çalışan çarklarla yüksek basma yüksekliği; basınçlı su temini ve kazan besleme uygulamaları.',
        img: 'pompalar/kademeli-pompalar.png',
      },
      {
        name: 'Dişli Pompalar',
        slug: 'disli-pompalar',
        desc: 'Sabit debili pozitif deplasman; kızgın yağ, bitüm ve yüksek viskoziteli akışkan transferi.',
        img: 'pompalar/disli-pompalar.png',
      },
      {
        name: 'Vakum Pompalar',
        slug: 'vakum-pompalar',
        desc: 'Sıvı halkalı vakum üretimi; proses, kurutma ve filtrasyon hatları için tek/çift kademeli modeller.',
        img: 'pompalar/vakum-pompalar.png',
      },
      {
        name: 'Dik Milli Pompalar',
        slug: 'dik-milli-pompalar',
        desc: 'Dar alanlar için dikey yapı; in-line sirkülasyon, kolonlu pompalar ve hidrofor setleri.',
        img: 'pompalar/dik-milli-pompalar.png',
      },
      {
        name: 'Diyaframlı Pompalar',
        slug: 'diyaframli-pompalar',
        desc: 'Salmastrasız, sızdırmaz yapı; kimyasal, aşındırıcı ve partiküllü sıvıların güvenli aktarımı.',
        img: 'pompalar/diyaframli-pompalar.jpg',
      },
      {
        name: 'Monopomp Pompalar',
        slug: 'monopomp-pompalar',
        desc: 'Helisel rotor-stator ile titreşimsiz akış; çamur ve macun kıvamlı ürünlerin hassas transferi.',
        img: 'pompalar/monopomp-pompalar.png',
      },
      {
        name: 'Loblu Pompalar',
        slug: 'loblu-pompalar',
        desc: 'Ürünü ezmeden taşıyan lob prensibi; gıda, kozmetik ve hijyen gerektiren viskoz akışkanlar.',
        img: 'pompalar/loblu-pompalar.png',
      },
      {
        name: 'Yangın Pompaları',
        slug: 'yangin-pompalari',
        desc: 'Şartnamelere uygun yangın pompa setleri ve hidroforlar; elektrikli ve dizel konfigürasyonlar.',
        img: 'pompalar/yangin-pompalari.png',
      },
      {
        name: 'Çift Emişli Bölünebilir Pompalar',
        slug: 'cift-emisli-bolunebilir-pompalar',
        desc: 'Split-case gövde, dengelenmiş eksenel yük; yüksek debili su temini ve soğutma hatlarında kolay bakım.',
        img: 'pompalar/cift-emisli-bolunebilir-pompalar.png',
      },
      {
        name: 'Pompa Sistemleri ve Özel Uygulamalar',
        slug: 'pompa-sistemleri-ve-ozel-endustriyel-uygulamalar',
        desc: 'Dizel pompa grupları, vakum booster setleri ve API standardında projeye özel mühendislik çözümleri.',
        img: 'pompalar/pompa-sistemleri-ve-ozel-endustriyel-uygulamalar.png',
      },
    ],
  },
  {
    slug: 'fanlar',
    name: 'Fanlar',
    icon: 'fan',
    blurb: 'Genel havalandırmadan duman egzozuna',
    items: [
      {
        name: 'Radyal Fanlar',
        slug: 'radyal-fanlar',
        desc: 'Santrifüj etkiyle yüksek sistem dirençlerini aşan fanlar; düşük, orta ve yüksek basınç kademeleri.',
        img: '', // UVENTS markalı render — temiz görsel tedarikçiden istenecek
      },
      {
        name: 'Aksiyel Fanlar',
        slug: 'aksiyel-fanlar',
        desc: 'Eksenel akışla büyük debiler; kare kasalı ve silindirik gövdeli, duvar/kanal montajlı tipler.',
        img: '',
      },
      {
        name: 'Kanal Fanları',
        slug: 'kanal-fanlari',
        desc: 'Dikdörtgen veya yuvarlak kanal içine gömülen kompakt fanlar; yerden tasarruflu montaj.',
        img: 'fanlar/kanal-fanlari.png',
      },
      {
        name: 'Çatı Fanları',
        slug: 'cati-fanlari',
        desc: 'Çatı üstü dikey/yatay atışlı egzoz; düz çatılı yapılarda merkezi havalandırma.',
        img: '',
      },
      {
        name: 'Duman Egzoz Fanları',
        slug: 'duman-egzoz-fanlari',
        desc: 'F300/F400 sınıfı motorlarla yangında sıcak duman tahliyesi için sertifikalı aksiyel fanlar.',
        img: 'fanlar/duman-egzoz-fanlari.png',
      },
      {
        name: 'Jet Fanlar',
        slug: 'jet-fanlar',
        desc: 'Otopark ve tünellerde kanalsız duman kontrolü; itki prensipli aksiyel/radyal seriler.',
        img: '',
      },
      {
        name: 'Mutfak Egzoz Fanları',
        slug: 'mutfak-egzoz-fanlari',
        desc: 'Davlumbaz hattındaki yağlı ve sıcak buhar için kolay temizlenir gövdeli egzoz fanları.',
        img: 'fanlar/mutfak-egzoz-fanlari.png',
      },
      {
        name: 'Salyangoz Fanlar',
        slug: 'salyangoz-fanlar',
        desc: 'Spiral gövdeli radyal fanlar; alüminyum veya sac gövde, esnek montaj ve kolay bakım.',
        img: 'fanlar/salyangoz-fanlar.png',
      },
      {
        name: 'Toz Toplama ve Taşıma Fanları',
        slug: 'toz-toplama-ve-tasima-fanlari',
        desc: 'Talaş, toz ve granül taşıyan dayanıklı radyal fanlar; filtre ve pnömatik taşıma hatları.',
        img: '',
      },
      {
        name: 'Sığınak Havalandırma Fanları',
        slug: 'siginak-havalandirma-fanlari',
        desc: 'Korunaklı alanların hava değişimi için düşük gürültülü kanal tipi radyal fanlar.',
        img: 'fanlar/siginak-havalandirma-fanlari.png',
      },
      {
        name: 'Isı Geri Kazanımlı Plug Fanlar',
        slug: 'plug-fanlar',
        desc: 'Santral hücresine gömülen kompakt plug rotor; kısıtlı alanlarda verimli havalandırma.',
        img: 'fanlar/plug-fanlar.png',
      },
    ],
  },
  {
    slug: 'fren',
    name: 'Elektromanyetik Fren',
    icon: 'brake',
    blurb: 'Asansörden sahne sistemlerine güvenli duruş',
    items: [
      {
        name: 'Elektromanyetik Frenler',
        slug: 'elektromanyetik-frenler',
        desc: 'Dövme çelik statorlu, 24V DC / 98V DC / 180V DC / 380V AC seçenekli frenler; IP65 koruma ve H sınıfı sıcaklık dayanımıyla asansör, kapı ve sahne uygulamaları.',
        img: 'fren/elektromanyetik-frenler.png',
      },
    ],
    features: [
      'Dövme özel çelik stator: yüksek verim ve ekstra güç',
      '24V DC · 98V DC · 180V DC · 380V AC voltaj seçenekleri',
      'Uygun motor uç kalkanıyla hızlı ve kolay uygulama',
      'H sınıfı sıcaklık dayanımı (+180°C) ve IP65 muhafaza',
      'Ayar vidasıyla kolay moment ayarı',
      'Asbestsiz, ayarlanmış pabuç',
      'Enkoder montajına uygun özel tasarım',
      'Düşük desibel: tiyatro ve sahne uygulamalarına uygun',
      'El ile serbest bırakma aksesuarı (kapı ve yük asansörleri)',
    ],
  },
];

export const toplamAltKategori = kategoriler.reduce((n, k) => n + k.items.length, 0);
