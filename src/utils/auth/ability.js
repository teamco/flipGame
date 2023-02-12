import { createMongoAbility, AbilityBuilder, createAliasResolver } from '@casl/ability';

/**
 * @export
 * @param user
 * @return {AbilityBuilder}
 */
export async function defineAbilityFor({ user }) {
  const { can, cannot, build } = new AbilityBuilder(createMongoAbility);

  if (user) {

    // Read-write access to everything
    can(['manage'], 'all');

  } else {

    // cannot(['read'], 'all');
    can(['manage'], 'all');

  }

  can(['read'], 'page404');
  can(['read'], 'page403');
  can(['read'], 'page500');

  return build();
}
