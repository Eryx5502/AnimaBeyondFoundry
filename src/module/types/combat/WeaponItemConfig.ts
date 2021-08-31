import { ABFItemBaseDataSource } from '../../../animabf.types';
import { ABFItems } from '../../actor/utils/prepareSheet/prepareItems/ABFItems';
import { openDialog } from '../../utils/openDialog';
import { ABFItemConfig, ItemChanges } from '../Items';

export type WeaponItemData = {
  special: { value: string };
  integrity: { value: number };
  breaking: { value: number };
  attack: { value: number };
  block: { value: number };
  damage: { value: number };
  initiative: { value: number };
  initiativeBase: { value: number };
  presence: { value: number };
  size: { value: number };
  fueRequired: { value: string };
  quality: { value: number };
  oneOrTwoHanded: { value: string };
  isRanged: { value: boolean };
  range: { value: number };
  cadence: { value: string };
  knowledgeType: { value: string };
  critic: {
    primary: { value: string };
    secondary: { value: string };
  };
};

export type WeaponDataSource = ABFItemBaseDataSource<ABFItems.WEAPON, WeaponItemData>;

export type WeaponChanges = ItemChanges<WeaponItemData>;

export const WeaponItemConfig: ABFItemConfig<WeaponDataSource, WeaponChanges> = {
  type: ABFItems.WEAPON,
  isInternal: false,
  hasSheet: true,
  fieldPath: ['combat', 'weapons'],
  getFromDynamicChanges: changes => {
    return changes.data.dynamic.weapons as WeaponChanges;
  },
  selectors: {
    addItemButtonSelector: 'add-weapon',
    containerSelector: '#weapons-context-menu-container',
    rowSelector: '.weapon-row'
  },
  onCreate: async (actor): Promise<void> => {
    const { i18n } = game as Game;

    const name = await openDialog<string>({
      content: i18n.localize('dialogs.items.weapons.content')
    });

    const itemData: Omit<WeaponDataSource, '_id'> = {
      name,
      type: ABFItems.WEAPON,
      data: {
        special: { value: '' },
        integrity: { value: 0 },
        breaking: { value: 0 },
        attack: { value: 0 },
        block: { value: 0 },
        damage: { value: 0 },
        initiative: { value: 0 },
        initiativeBase: { value: 0 },
        presence: { value: 0 },
        size: { value: 0 },
        fueRequired: { value: '' },
        quality: { value: 0 },
        oneOrTwoHanded: { value: '' },
        isRanged: { value: false },
        cadence: { value: '' },
        range: { value: 0 },
        knowledgeType: { value: '' },
        critic: {
          primary: { value: '' },
          secondary: { value: '' }
        }
      }
    };

    await actor.createItem(itemData);
  },
  onUpdate: async (actor, changes): Promise<void> => {
    for (const id of Object.keys(changes)) {
      const { name, data } = changes[id];

      actor.updateItem({
        id,
        name,
        data
      });
    }
  },
  onAttach: (data, item) => {
    const items = data.combat.weapons as WeaponDataSource[];

    if (items) {
      const itemIndex = items.findIndex(i => i._id === item._id);
      if (itemIndex !== -1) {
        items[itemIndex] = item;
      } else {
        items.push(item);
      }
    } else {
      (data.combat.weapons as WeaponDataSource[]) = [item];
    }
  }
};