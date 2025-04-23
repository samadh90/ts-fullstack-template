export interface Trade {
  id: number;
  userId: number;
  asset: string;
  type: 'buy' | 'sell';
  amount: number;
  price: number;
  timestamp: string;
}

export interface NewTrade {
  userId: number;
  asset: string;
  type: 'buy' | 'sell';
  amount: number;
  price: number;
}