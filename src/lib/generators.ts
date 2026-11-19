/**
 * Random question generators for all calculation topics:
 * Entropy, MinMax, Z-Score, Decimal Scaling, Equal-width, Equal-frequency,
 * SMA, Combinations, Association Rules (Leverage, Support, Confidence, Lift),
 * PageRank, CPT.
 */

import { entropy } from './entropy';
import { minMax, zScore, decimalScaling } from './normalization';
import { equalWidthBins, equalFrequencyBins } from './binning';
import { sma } from './sma';
import { pairsFromFrequentItems, support, confidence, lift, leverage } from './rules';
import { getFrequentItems, filterAndSortTransactions } from './fpgrowth';
import { calculatePageRankStep } from './pagerank';
import { predictCPT } from './cpt';

export interface GeneratedQuestionVariant {
  prompt: string;
  answer: string;
  steps: string[];
  explanation: string;
  params: Record<string, any>;
}

function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Generator for Entropy (Question 16)
 */
export function generateEntropy(): GeneratedQuestionVariant {
  const good = randInt(3, 9);
  const bad = randInt(2, 8);
  const total = good + bad;
  const ent = entropy([good, bad]);
  const pGood = good / total;
  const pBad = bad / total;

  return {
    prompt: `Giả sử một tập dữ liệu D có 2 lớp với ${good} mẫu Good và ${bad} mẫu Bad. Entropy của tập D bằng bao nhiêu?`,
    answer: ent.toFixed(4),
    steps: [
      `Tổng số mẫu: |D| = ${good} + ${bad} = ${total}`,
      `Xác suất lớp Good: p₁ = ${good}/${total} = ${pGood.toFixed(4)}`,
      `Xác suất lớp Bad: p₂ = ${bad}/${total} = ${pBad.toFixed(4)}`,
      `Công thức: Info(D) = - (p₁ * log₂(p₁) + p₂ * log₂(p₂))`,
      `Thay số: Info(D) = - (${pGood.toFixed(4)} * log₂(${pGood.toFixed(4)}) + ${pBad.toFixed(4)} * log₂(${pBad.toFixed(4)})) ≈ ${ent.toFixed(4)}`,
    ],
    explanation: `Entropy đo mức độ hỗn loạn của dữ liệu. Khi tỉ lệ hai lớp cân bằng 50/50 thì entropy cực đại (= 1). Ở đây tỉ lệ là ${good}/${bad} nên entropy = ${ent.toFixed(4)}.`,
    params: { good, bad, total, entropy: ent },
  };
}

/**
 * Generator for Min-Max Normalization (Question 17)
 */
export function generateMinMax(): GeneratedQuestionVariant {
  const minVal = randInt(2, 6);
  const maxVal = randInt(minVal + 4, 15);
  const v = randInt(minVal + 1, maxVal - 1);
  const normalized = minMax(v, minVal, maxVal);

  return {
    prompt: `Nếu một khách hàng có thu nhập thấp nhất là ${minVal} triệu, cao nhất là ${maxVal} triệu thì thu nhập ${v} triệu của khách hàng đó sau khi chuẩn hóa về [0, 1] có giá trị là bao nhiêu theo Min-Max Normalization?`,
    answer: normalized.toFixed(4),
    steps: [
      `Xác định: min = ${minVal}, max = ${maxVal}, v = ${v}`,
      `Công thức Min-Max về [0, 1]: v' = (v - min) / (max - min)`,
      `Thay số: v' = (${v} - ${minVal}) / (${maxVal} - ${minVal}) = ${v - minVal} / ${maxVal - minVal} ≈ ${normalized.toFixed(4)}`,
    ],
    explanation: `Min-Max biến đổi khoảng giá trị [${minVal}, ${maxVal}] tuyến tính về khoảng [0, 1]. Giá trị ${v} nằm cách mốc tối thiểu ${(normalized * 100).toFixed(1)}% độ dài toàn dải.`,
    params: { minVal, maxVal, v, normalized },
  };
}

/**
 * Generator for Equal-width Binning (Question 18)
 */
export function generateEqualWidth(): GeneratedQuestionVariant {
  const minVal = randInt(50, 150) * 10;
  const k = randInt(3, 4);
  const width = randInt(100, 300);
  const maxVal = minVal + k * width;
  const bins = equalWidthBins(minVal, maxVal, k);

  return {
    prompt: `Ngân hàng muốn chia khách hàng thành ${k} nhóm theo phương pháp Equal-width Binning. Hạn mức thấp nhất là ${minVal} triệu đồng, cao nhất là ${maxVal} triệu đồng. Vậy nhóm có khoảng hạn mức thấp nhất là bao nhiêu?`,
    answer: `${bins[0][0]}–${bins[0][1]} triệu`,
    steps: [
      `Xác định khoảng biến thiên: Range = max - min = ${maxVal} - ${minVal} = ${maxVal - minVal} triệu`,
      `Độ rộng mỗi bin: Width = (${maxVal} - ${minVal}) / ${k} = ${width} triệu`,
      `Nhóm 1 (thấp nhất): [${minVal}, ${minVal} + ${width}] = [${bins[0][0]}, ${bins[0][1]}] triệu`,
      ...bins.slice(1).map((b, idx) => `Nhóm ${idx + 2}: [${b[0]}, ${b[1]}] triệu`),
    ],
    explanation: `Equal-width chia đều khoảng giá trị từ min đến max thành các phân đoạn bằng nhau về kích thước khoảng, không phụ thuộc vào số lượng khách hàng rơi vào mỗi đoạn.`,
    params: { minVal, maxVal, k, width, bins },
  };
}

/**
 * Generator for Z-Score (Question 21)
 */
export function generateZScore(): GeneratedQuestionVariant {
  const mean = randInt(40, 80);
  const std = randInt(5, 15);
  const v = randInt(mean - 20, mean + 30);
  const z = zScore(v, mean, std);

  return {
    prompt: `Cho tập dữ liệu có trung bình μ = ${mean} và độ lệch chuẩn σ = ${std}. Hãy chuẩn hóa giá trị v = ${v} theo phương pháp Z-Score.`,
    answer: z.toFixed(4),
    steps: [
      `Xác định: v = ${v}, μ = ${mean}, σ = ${std}`,
      `Công thức: v' = (v - μ) / σ`,
      `Thay số: v' = (${v} - ${mean}) / ${std} = ${(v - mean).toFixed(2)} / ${std} ≈ ${z.toFixed(4)}`,
    ],
    explanation: `Z-Score cho biết giá trị v cách giá trị trung bình bao nhiêu lần độ lệch chuẩn. Nếu v > μ thì Z > 0, ngược lại Z < 0.`,
    params: { v, mean, std, z },
  };
}

/**
 * Generator for Decimal Scaling (Question 22)
 */
export function generateDecimalScaling(): GeneratedQuestionVariant {
  const v1 = randInt(100, 999);
  const v2 = randInt(10, 99);
  const v3 = randInt(1, 9);
  const arr = [v1, v2, v3];
  const scaled = decimalScaling(arr);
  const maxAbs = Math.max(...arr);
  const j = Math.floor(Math.log10(maxAbs)) + 1;

  return {
    prompt: `Cho dãy giá trị [${arr.join(', ')}]. Hãy chuẩn hóa dãy trên theo phương pháp Decimal Scaling.`,
    answer: `[${scaled.join(', ')}]`,
    steps: [
      `Tìm giá trị tuyệt đối lớn nhất: max(|v|) = ${maxAbs}`,
      `Tìm lũy thừa j nhỏ nhất sao cho max(|v'|) < 1: 10^j > ${maxAbs} => j = ${j} (chia cho 10^${j} = ${Math.pow(10, j)})`,
      ...arr.map((val, idx) => `v'${idx + 1} = ${val} / ${Math.pow(10, j)} = ${scaled[idx]}`),
    ],
    explanation: `Decimal Scaling dịch chuyển dấu phẩy thập phân của các giá trị để tất cả đều nhỏ hơn 1.`,
    params: { arr, scaled, j },
  };
}

/**
 * Generator for Equal-Frequency Binning (Question 23)
 */
export function generateEqualFrequency(): GeneratedQuestionVariant {
  const k = 3;
  const itemsPerBin = randInt(3, 5);
  const total = k * itemsPerBin;
  const values: number[] = [];
  for (let i = 0; i < total; i++) {
    values.push(randInt(10, 90));
  }
  values.sort((a, b) => a - b);
  const bins = equalFrequencyBins(values, k);

  return {
    prompt: `Chia dãy số đã sắp xếp gồm ${total} phần tử sau vào ${k} nhóm theo Equal-frequency: [${values.join(', ')}].`,
    answer: bins.map(b => `[${b.join(', ')}]`).join('; '),
    steps: [
      `Tổng số phần tử N = ${total}, số nhóm k = ${k}`,
      `Số phần tử mỗi nhóm = N / k = ${itemsPerBin}`,
      ...bins.map((b, i) => `Nhóm ${i + 1} (${b.length} phần tử): [${b.join(', ')}]`),
    ],
    explanation: `Equal-frequency Binning chia các phần tử sao cho mỗi nhóm có đúng cùng số lượng phần tử.`,
    params: { values, k, bins },
  };
}

/**
 * Generator for SMA (Question 26)
 */
export function generateSMA(): GeneratedQuestionVariant {
  const basePrice = randInt(70, 90);
  const prices = [
    basePrice,
    basePrice + randInt(-3, 3),
    basePrice + randInt(-3, 3),
    basePrice + randInt(-3, 3),
    basePrice + randInt(-3, 3),
    basePrice + randInt(-3, 3),
  ];
  const k = 3;
  const smaValues = sma(prices, k);
  const day4Val = smaValues[3]!;

  return {
    prompt: `Giả sử theo dõi giá dầu trong 6 ngày liên tiếp với kích thước cửa sổ k = ${k}. Dữ liệu giá dầu: ${prices.map((p, i) => `Ngày ${i + 1}: ${p} USD`).join('; ')}. SMA Ngày 4 là bao nhiêu?`,
    answer: day4Val.toFixed(4).replace(/\.?0+$/, '') + ' USD',
    steps: [
      `Cửa sổ k = ${k}. Ngày 4 sẽ lấy trung bình cộng của ${k} ngày gần nhất (Ngày 2, Ngày 3, Ngày 4).`,
      `Giá Ngày 2 = ${prices[1]}, Ngày 3 = ${prices[2]}, Ngày 4 = ${prices[3]}`,
      `SMA Ngày 4 = (${prices[1]} + ${prices[2]} + ${prices[3]}) / 3 = ${prices[1] + prices[2] + prices[3]} / 3 ≈ ${day4Val.toFixed(4)} USD`,
    ],
    explanation: `SMA k=3 là trung bình trượt của 3 phiên gần nhất kết thúc tại ngày được tính.`,
    params: { prices, k, day4Val },
  };
}

/**
 * Generator for Pairs combination C(n, 2) (Question 27)
 */
export function generatePairs(): GeneratedQuestionVariant {
  const n = randInt(5, 10);
  const pairs = pairsFromFrequentItems(n);

  return {
    prompt: `Nếu có ${n} items đơn lẻ là phổ biến, thì số lượng itemset gồm 2 phần tử được sinh ra để kiểm tra xấp xỉ là bao nhiêu?`,
    answer: `${pairs}`,
    steps: [
      `Số tập mục 2 phần tử tạo từ ${n} phần tử là tổ hợp chập 2 của ${n}: C(${n}, 2)`,
      `Công thức: C(n, 2) = n * (n - 1) / 2`,
      `Thay số: C(${n}, 2) = ${n} * (${n} - 1) / 2 = ${n * (n - 1)} / 2 = ${pairs}`,
    ],
    explanation: `Mỗi cặp gồm 2 món đồ không phân biệt thứ tự, nên dùng công thức tổ hợp C(n, 2).`,
    params: { n, pairs },
  };
}

/**
 * Transaction database for Question 28
 */
export const DEFAULT_Q28_TRANSACTIONS: string[][] = [
  ['a', 'b', 'c'],
  ['a', 'b', 'c', 'd', 'e'],
  ['b'],
  ['c', 'd', 'e'],
  ['c'],
  ['b', 'c', 'd'],
  ['c', 'd', 'e'],
  ['c', 'e'],
];

/**
 * Generator for Association Rules: Sup, Conf, Lift, Leverage (Question 28a-d)
 */
export function generateRuleMetrics(): GeneratedQuestionVariant {
  const transactions = DEFAULT_Q28_TRANSACTIONS;
  const X = ['c'];
  const Y = ['d', 'e'];
  const supX = support(X, transactions);
  const supY = support(Y, transactions);
  const supXY = support(['c', 'd', 'e'], transactions);
  const conf = confidence(X, Y, transactions);
  const lft = lift(X, Y, transactions);
  const lev = leverage(X, Y, transactions);

  return {
    prompt: `Với cơ sở dữ liệu gồm 8 giao dịch và luật L: {c} → {d, e}, hãy tính Support, Confidence, Lift và Leverage.`,
    answer: `Sup=${supXY.toFixed(4)}, Conf=${conf.toFixed(4)}, Lift=${lft.toFixed(4)}, Leverage=${lev.toFixed(4)}`,
    steps: [
      `Tổng số giao dịch |D| = 8`,
      `Sup({c}) = 7/8 = ${supX.toFixed(4)} (xuất hiện ở T1, T2, T4, T5, T6, T7, T8)`,
      `Sup({d, e}) = 3/8 = ${supY.toFixed(4)} (xuất hiện ở T2, T4, T7)`,
      `Sup({c, d, e}) = 3/8 = 0.375 (xuất hiện ở T2, T4, T7)`,
      `Confidence({c} → {d, e}) = Sup({c, d, e}) / Sup({c}) = (3/8) / (7/8) = 3/7 ≈ ${conf.toFixed(4)}`,
      `Lift({c} → {d, e}) = Conf / Sup({d, e}) = (3/7) / (3/8) = 8/7 ≈ ${lft.toFixed(4)}`,
      `Leverage({c} → {d, e}) = Sup({c, d, e}) - Sup({c}) * Sup({d, e}) = 3/8 - (7/8 * 3/8) = 3/64 ≈ ${lev.toFixed(4)}`,
    ],
    explanation: `Lift > 1 chứng tỏ {c} và {d, e} xuất hiện cùng nhau nhiều hơn ngẫu nhiên (tác động thuận). Leverage > 0 cũng biểu thị mối liên kết đồng thời.`,
    params: { supX, supY, supXY, conf, lft, lev },
  };
}

/**
 * Generator for PageRank (Question 31a, 31b)
 */
export function generatePageRankVariant(): GeneratedQuestionVariant {
  const graph = {
    nodes: [1, 2, 3, 4, 5],
    edges: [
      [1, 2], [2, 5], [3, 1], [3, 2], [3, 4], [3, 5], [4, 3], [4, 5], [5, 4]
    ] as [number, number][],
  };
  const initialPR: Record<number, number> = { 1: 1, 2: 1, 3: 1, 4: 1, 5: 1 };
  const d = 0.85;
  const result = calculatePageRankStep(graph, initialPR, d);

  return {
    prompt: `Cho đồ thị 5 trang web với các liên kết. PageRank ban đầu của các trang đều là 1, damping factor d = 0.85. Hãy tính PageRank của Page 2 và Page 1 ở vòng lặp đầu tiên.`,
    answer: `PR(2) = ${result.ranks[2]}, PR(1) = ${result.ranks[1]}`,
    steps: [
      `Các trang trỏ đến Page 2 là Page 1 (bậc ra C(1) = 1) và Page 3 (bậc ra C(3) = 4).`,
      `PR(2) = (1 - 0.85) + 0.85 * (PR(1)/C(1) + PR(3)/C(3)) = 0.15 + 0.85 * (1/1 + 1/4) = 0.15 + 0.85 * 1.25 = 1.2125`,
      `Trang duy nhất trỏ đến Page 1 là Page 3 (bậc ra C(3) = 4).`,
      `PR(1) = (1 - 0.85) + 0.85 * (PR(3)/C(3)) = 0.15 + 0.85 * (1/4) = 0.15 + 0.2125 = 0.3625`,
    ],
    explanation: `PageRank phân phối độ quan trọng theo các liên kết đến. Page nhận càng nhiều liên kết từ trang có ít liên kết ra ngoài thì điểm càng cao.`,
    params: { ranks: result.ranks },
  };
}
