import { ArmorDataSource } from '../../../../../../../types/combat/ArmorItemConfig';

export const calculateArmorIntegrity = (armor: ArmorDataSource) => {
  return Math.max(armor.system.integrity.base.value + armor.system.quality.value, 0);
};
