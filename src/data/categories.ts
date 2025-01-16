import Food from '@/components/icons/food';
import Health from '@/components/icons/health';
import Hobbie from '@/components/icons/hobbie';
import { CreditCard, Wallet, House, TicketPlus } from 'lucide-react';

export const categories = [
  { id: 'food', label: 'food', icon: Food },
  { id: 'debt', label: 'debt', icon: CreditCard },
  { id: 'hobby', label: 'hobby', icon: Hobbie },
  { id: 'rent', label: 'rent', icon: House },
  { id: 'savings', label: 'savings', icon: Wallet },
  { id: 'health', label: 'health', icon: Health },
  { id: 'others', label: 'others', icon: TicketPlus },
];
