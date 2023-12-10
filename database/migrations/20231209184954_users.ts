import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  const USER_TYPES = [
    'ADMINISTRATOR',
    'ARTISAN',
    'CLIENT',
  ];
  await knex.schema.createTable('users', table => {
    table.bigIncrements('id')
      .primary();

    table.string('name', 200)
      .notNullable();
    table.string('email', 256)
      .unique();
    table.string('password', 100)
      .notNullable();

    table.enum('user_type', USER_TYPES)
      .notNullable();

    table.boolean('status')
      .defaultTo(true);

    table.timestamps(true, true);
    table.dateTime('deleted_at')
      .index();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('users');
}