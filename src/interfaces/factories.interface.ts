export interface Factory {
  id: string;
  display_number: string;
  lat: number;
  lng: number;
  name: string;
  landcode: string;
  townname: string;
  sectname: string;
  sectcode: string;
  source: string;
  type: FactoryType;
  images: FactoryImage[];
  // TODO: can be one of https://docs.djangoproject.com/en/2.2/ref/settings/#datetime-input-formats
  // eslint-disable-next-line
  reported_at?: null | string,
  data_complete?: boolean;
  before_release?: boolean;
  document_display_status?: DocumentDisplayStatus | null;
  // feature?: Feature;
  follow_ups_for_user?: {
    note: string;
    created_at: string;
  }[];
}

export const FACTORY_TYPE = [
  { value: '2-1', text: '金屬: 沖床、銑床、車床、鏜孔' },
  { value: '2-2', text: '金屬: 焊接、鑄造、熱處理' },
  { value: '2-3', text: '金屬: 金屬表面處理、噴漆' },
  { value: '3', text: '塑膠加工、射出' },
  { value: '4', text: '橡膠加工' },
  { value: '5', text: '非金屬礦物（石材）' },
  { value: '6', text: '食品' },
  { value: '7', text: '皮革' },
  { value: '8', text: '紡織' },
  { value: '9', text: '其他' },
] as const;

export type FactoryType = typeof FACTORY_TYPE[number]['value'];

export type FactoryImage = {
  id: string;
  image_path: string;
  url: string;
};

type DocumentDisplayStatus = '已檢舉' | '已排程稽查' | '陳述意見期' | '已勒令停工' | '已發函斷電' | '已排程拆除' | '已拆除' | '等待新事證';
