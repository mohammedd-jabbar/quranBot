import { TValidateSurah } from "./types";

// Function to generate the link for a surah based on the surah number
export async function generateSurahLink(id: string) {
  let link = `https://server8.mp3quran.net/lhdan/${id}.mp3`;
  const isSizeUnder50Mb = await CheckAudioSize(link);

  if (isSizeUnder50Mb) {
    return link;
  } else {
    return false;
  }
}

// Function to validate surah existence
export async function validateSurah(name: TValidateSurah) {
  const surah = quranSurahs.find((s) => s.name === name);

  if (surah) {
    return { isValid: true, surahId: surah.id };
  } else {
    return { isValid: false, surahId: null };
  }
}

async function CheckAudioSize(surahLink: string) {
  try {
    const response = await fetch(surahLink, { method: "HEAD" });
    const contentLength = response.headers.get("Content-Length");

    if (contentLength) {
      const fileSize = parseInt(contentLength);

      if (fileSize > 20 * 1024 * 1024) {
        return false;
      } else {
        return true;
      }
    }
  } catch (error) {
    console.error("Error estimating file size:", error);
  }
}

const quranSurahs = [
  { id: "001", name: "الفاتحة" },
  { id: "002", name: "البقرة" },
  { id: "003", name: "آل عمران" },
  { id: "004", name: "النساء" },
  { id: "005", name: "المائدة" },
  { id: "006", name: "الأنعام" },
  { id: "007", name: "الأعراف" },
  { id: "008", name: "الأنفال" },
  { id: "009", name: "التوبة" },
  { id: "010", name: "يونس" },
  { id: "011", name: "هود" },
  { id: "012", name: "يوسف" },
  { id: "013", name: "الرعد" },
  { id: "014", name: "إبراهيم" },
  { id: "015", name: "الحجر" },
  { id: "016", name: "النحل" },
  { id: "017", name: "الإسراء" },
  { id: "018", name: "الكهف" },
  { id: "019", name: "مريم" },
  { id: "020", name: "طه" },
  { id: "021", name: "الأنبياء" },
  { id: "022", name: "الحج" },
  { id: "023", name: "المؤمنون" },
  { id: "024", name: "النور" },
  { id: "025", name: "الفرقان" },
  { id: "026", name: "الشعراء" },
  { id: "027", name: "النمل" },
  { id: "028", name: "القصص" },
  { id: "029", name: "العنكبوت" },
  { id: "030", name: "الروم" },
  { id: "031", name: "لقمان" },
  { id: "032", name: "السجدة" },
  { id: "033", name: "الأحزاب" },
  { id: "034", name: "سبأ" },
  { id: "035", name: "فاطر" },
  { id: "036", name: "يس" },
  { id: "037", name: "الصافات" },
  { id: "038", name: "ص" },
  { id: "039", name: "الزمر" },
  { id: "040", name: "غافر" },
  { id: "041", name: "فصلت" },
  { id: "042", name: "الشورى" },
  { id: "043", name: "الزخرف" },
  { id: "044", name: "الدخان" },
  { id: "045", name: "الجاثية" },
  { id: "046", name: "الأحقاف" },
  { id: "047", name: "محمد" },
  { id: "048", name: "الفتح" },
  { id: "049", name: "الحجرات" },
  { id: "050", name: "ق" },
  { id: "051", name: "الذاريات" },
  { id: "052", name: "الطور" },
  { id: "053", name: "النجم" },
  { id: "054", name: "القمر" },
  { id: "055", name: "الرحمن" },
  { id: "056", name: "الواقعة" },
  { id: "057", name: "الحديد" },
  { id: "058", name: "المجادلة" },
  { id: "059", name: "الحشر" },
  { id: "060", name: "الممتحنة" },
  { id: "061", name: "الصف" },
  { id: "062", name: "الجمعة" },
  { id: "063", name: "المنافقون" },
  { id: "064", name: "التغابن" },
  { id: "065", name: "الطلاق" },
  { id: "066", name: "التحريم" },
  { id: "067", name: "الملك" },
  { id: "068", name: "القلم" },
  { id: "069", name: "الحاقة" },
  { id: "070", name: "المعارج" },
  { id: "071", name: "نوح" },
  { id: "072", name: "الجن" },
  { id: "073", name: "المزمل" },
  { id: "074", name: "المدثر" },
  { id: "075", name: "القيامة" },
  { id: "076", name: "الإنسان" },
  { id: "077", name: "المرسلات" },
  { id: "078", name: "النبأ" },
  { id: "079", name: "النازعات" },
  { id: "080", name: "عبس" },
  { id: "081", name: "التكوير" },
  { id: "082", name: "الإنفطار" },
  { id: "083", name: "المطففين" },
  { id: "084", name: "الإنشقاق" },
  { id: "085", name: "البروج" },
  { id: "086", name: "الطارق" },
  { id: "087", name: "الأعلى" },
  { id: "088", name: "الغاشية" },
  { id: "089", name: "الفجر" },
  { id: "090", name: "البلد" },
  { id: "091", name: "الشمس" },
  { id: "092", name: "الليل" },
  { id: "093", name: "الضحى" },
  { id: "094", name: "الشرح" },
  { id: "095", name: "التين" },
  { id: "096", name: "العلق" },
  { id: "097", name: "القدر" },
  { id: "098", name: "البينة" },
  { id: "099", name: "الزلزلة" },
  { id: "100", name: "العاديات" },
  { id: "101", name: "القارعة" },
  { id: "102", name: "التكاثر" },
  { id: "103", name: "العصر" },
  { id: "104", name: "الهمزة" },
  { id: "105", name: "الفيل" },
  { id: "106", name: "قريش" },
  { id: "107", name: "الماعون" },
  { id: "108", name: "الكوثر" },
  { id: "109", name: "الكافرون" },
  { id: "110", name: "النصر" },
  { id: "111", name: "المسد" },
  { id: "112", name: "الإخلاص" },
  { id: "113", name: "الفلق" },
  { id: "114", name: "الناس" },
];
