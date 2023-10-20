import { ABFItems } from '../../items/ABFItems';
import { openComplexInputDialog } from '../../utils/dialogs/openComplexInputDialog';
import { ABFItemConfigFactory } from '../ABFItemConfig';

/** @type {import("../Items").PreparedSpellItemConfig} */
export const PreparedSpellItemConfig = ABFItemConfigFactory({
  type: ABFItems.PREPARED_SPELL,
  isInternal: false,
  fieldPath: ['mystic', 'preparedSpells'],
  selectors: {
    addItemButtonSelector: 'add-prepared-spell',
    containerSelector: '#prepared-spells-context-menu-container',
    rowSelector: '.prepared-spell-row'
  },
  onCreate: async (actor) => {

    const results = await openComplexInputDialog(actor, 'newPreparedSpell');
    const spellID = results['new.preparedSpell.id'];
    const spellGrade = results['new.preparedSpell.grade'];
    const spell = actor.system.mystic.spells.find(i => i._id == spellID);
    if (!spell) {return}
    const name = spell.name
    const zeonCost = spell.system.grades[spellGrade].zeon.value

    await actor.createItem({
      name,
      type: ABFItems.PREPARED_SPELL,
      system: { grade: { value: spellGrade }, zeonAcc: { value: 0, max: zeonCost }, prepared: { value: false} }
    });
  }
});