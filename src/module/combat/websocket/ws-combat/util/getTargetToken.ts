import { ABFDialogs } from '../../../../dialogs/ABFDialogs';

export const getTargetToken = (attackerToken: TokenDocument, targetTokens: UserTargets) => {
  const tgame = game as Game;

  let message: string | undefined;

  if (targetTokens.ids.length > 1) {
    message = tgame.i18n.localize('macros.combat.dialog.error.multipleTargets.title');
  }

  if (targetTokens.ids.length === 0) {
    message = tgame.i18n.localize('macros.combat.dialog.error.oneTarget.title');
  }

  if (message) {
    ABFDialogs.prompt(message);
    throw new Error(message);
  }

  const resultTargets = new Array<TokenDocument>();
  targetTokens.forEach(target => {
      if (!target.actor?.id) {
          message = tgame.i18n.localize('macros.combat.dialog.error.withoutActor.title');
      }

      if (target.id === attackerToken.id) {
          message = tgame.i18n.localize('macros.combat.dialog.error.cannotAttackYourself.title');
      }
      resultTargets.push(target.document);
  });

  if (message) {
    ABFDialogs.prompt(message);
    throw new Error(message);
  }

  return resultTargets;
};
