import { WeaponEquippedHandType, WeaponManageabilityType, WeaponDataSource } from '../../../../../../../types/combat/WeaponItemConfig';

export const getCurrentEquippedHand = (weapon: WeaponDataSource): WeaponEquippedHandType => {
  switch (weapon.system.manageabilityType.value) {
    case WeaponManageabilityType.ONE_HAND:
      return WeaponEquippedHandType.ONE_HANDED;
    case WeaponManageabilityType.TWO_HAND:
      return WeaponEquippedHandType.TWO_HANDED;
    default:
      return weapon.system.oneOrTwoHanded.value;
  }
};
