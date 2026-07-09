import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`pieces\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_order\` text,
  	\`name\` text NOT NULL,
  	\`slug\` text NOT NULL,
  	\`category\` text NOT NULL,
  	\`image_id\` integer NOT NULL,
  	\`material\` text NOT NULL,
  	\`dimensions\` text,
  	\`stone\` text,
  	\`carat\` text,
  	\`surface\` text,
  	\`price\` text DEFAULT 'Preis auf Anfrage' NOT NULL,
  	\`provenance\` text DEFAULT 'illustrative' NOT NULL,
  	\`in_hero\` integer DEFAULT false,
  	\`hero_image_id\` integer,
  	\`hero_short_name\` text,
  	\`hero_spec\` text,
  	\`hero_object_position\` text DEFAULT 'center',
  	\`hero_tint\` text DEFAULT 'bg-ink/55 sm:bg-ink/30',
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`hero_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`pieces__order_idx\` ON \`pieces\` (\`_order\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`pieces_slug_idx\` ON \`pieces\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`pieces_image_idx\` ON \`pieces\` (\`image_id\`);`)
  await db.run(sql`CREATE INDEX \`pieces_hero_image_idx\` ON \`pieces\` (\`hero_image_id\`);`)
  await db.run(sql`CREATE INDEX \`pieces_updated_at_idx\` ON \`pieces\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`pieces_created_at_idx\` ON \`pieces\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`media\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`alt\` text NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`url\` text,
  	\`thumbnail_u_r_l\` text,
  	\`filename\` text,
  	\`mime_type\` text,
  	\`filesize\` numeric,
  	\`width\` numeric,
  	\`height\` numeric,
  	\`focal_x\` numeric,
  	\`focal_y\` numeric
  );
  `)
  await db.run(sql`CREATE INDEX \`media_updated_at_idx\` ON \`media\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`media_created_at_idx\` ON \`media\` (\`created_at\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`media_filename_idx\` ON \`media\` (\`filename\`);`)
  await db.run(sql`CREATE TABLE \`users_sessions\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`created_at\` text,
  	\`expires_at\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`users_sessions_order_idx\` ON \`users_sessions\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`users_sessions_parent_id_idx\` ON \`users_sessions\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`users\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`email\` text NOT NULL,
  	\`reset_password_token\` text,
  	\`reset_password_expiration\` text,
  	\`salt\` text,
  	\`hash\` text,
  	\`login_attempts\` numeric DEFAULT 0,
  	\`lock_until\` text
  );
  `)
  await db.run(sql`CREATE INDEX \`users_updated_at_idx\` ON \`users\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`users_created_at_idx\` ON \`users\` (\`created_at\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`users_email_idx\` ON \`users\` (\`email\`);`)
  await db.run(sql`CREATE TABLE \`payload_kv\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`key\` text NOT NULL,
  	\`data\` text NOT NULL
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`payload_kv_key_idx\` ON \`payload_kv\` (\`key\`);`)
  await db.run(sql`CREATE TABLE \`payload_locked_documents\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`global_slug\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_global_slug_idx\` ON \`payload_locked_documents\` (\`global_slug\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_updated_at_idx\` ON \`payload_locked_documents\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_created_at_idx\` ON \`payload_locked_documents\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`payload_locked_documents_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`pieces_id\` integer,
  	\`media_id\` integer,
  	\`users_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_locked_documents\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`pieces_id\`) REFERENCES \`pieces\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_order_idx\` ON \`payload_locked_documents_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_parent_idx\` ON \`payload_locked_documents_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_path_idx\` ON \`payload_locked_documents_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_pieces_id_idx\` ON \`payload_locked_documents_rels\` (\`pieces_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_media_id_idx\` ON \`payload_locked_documents_rels\` (\`media_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_users_id_idx\` ON \`payload_locked_documents_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`payload_preferences\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`key\` text,
  	\`value\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_preferences_key_idx\` ON \`payload_preferences\` (\`key\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_updated_at_idx\` ON \`payload_preferences\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_created_at_idx\` ON \`payload_preferences\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`payload_preferences_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_preferences\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_order_idx\` ON \`payload_preferences_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_parent_idx\` ON \`payload_preferences_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_path_idx\` ON \`payload_preferences_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_users_id_idx\` ON \`payload_preferences_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`payload_migrations\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`batch\` numeric,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_migrations_updated_at_idx\` ON \`payload_migrations\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_migrations_created_at_idx\` ON \`payload_migrations\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`homepage_zweifarbigkeit_paragraphs\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`homepage\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`homepage_zweifarbigkeit_paragraphs_order_idx\` ON \`homepage_zweifarbigkeit_paragraphs\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`homepage_zweifarbigkeit_paragraphs_parent_id_idx\` ON \`homepage_zweifarbigkeit_paragraphs\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`homepage_zweifarbigkeit_techniques\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`text\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`homepage\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`homepage_zweifarbigkeit_techniques_order_idx\` ON \`homepage_zweifarbigkeit_techniques\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`homepage_zweifarbigkeit_techniques_parent_id_idx\` ON \`homepage_zweifarbigkeit_techniques\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`homepage_werkstatt_steps\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`text\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`homepage\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`homepage_werkstatt_steps_order_idx\` ON \`homepage_werkstatt_steps\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`homepage_werkstatt_steps_parent_id_idx\` ON \`homepage_werkstatt_steps\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`homepage_meisterin_paragraphs\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`homepage\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`homepage_meisterin_paragraphs_order_idx\` ON \`homepage_meisterin_paragraphs\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`homepage_meisterin_paragraphs_parent_id_idx\` ON \`homepage_meisterin_paragraphs\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`homepage_meisterin_stats\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`value\` text NOT NULL,
  	\`label\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`homepage\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`homepage_meisterin_stats_order_idx\` ON \`homepage_meisterin_stats\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`homepage_meisterin_stats_parent_id_idx\` ON \`homepage_meisterin_stats\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`homepage_eheringe_steps\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`text\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`homepage\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`homepage_eheringe_steps_order_idx\` ON \`homepage_eheringe_steps\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`homepage_eheringe_steps_parent_id_idx\` ON \`homepage_eheringe_steps\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`homepage\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`hero_eyebrow\` text,
  	\`hero_headline\` text,
  	\`hero_cta_primary\` text,
  	\`hero_cta_secondary\` text,
  	\`hero_hours_short\` text,
  	\`hero_footnote\` text,
  	\`zweifarbigkeit_eyebrow\` text,
  	\`zweifarbigkeit_heading\` text,
  	\`zweifarbigkeit_image_gold_id\` integer,
  	\`zweifarbigkeit_image_kupfer_id\` integer,
  	\`zweifarbigkeit_image_band_id\` integer,
  	\`zweifarbigkeit_band_caption_left\` text,
  	\`zweifarbigkeit_band_caption_right\` text,
  	\`unikate_eyebrow\` text,
  	\`unikate_heading\` text,
  	\`unikate_intro\` text,
  	\`unikate_enquiry\` text,
  	\`werkstatt_eyebrow\` text,
  	\`werkstatt_heading\` text,
  	\`werkstatt_intro\` text,
  	\`werkstatt_quote\` text,
  	\`werkstatt_quote_attribution\` text,
  	\`werkstatt_image_werkbank_id\` integer,
  	\`werkstatt_image_haende_id\` integer,
  	\`meisterin_eyebrow\` text,
  	\`meisterin_heading\` text,
  	\`meisterin_image_id\` integer,
  	\`meisterin_image_caption_left\` text,
  	\`meisterin_image_caption_right\` text,
  	\`eheringe_eyebrow\` text,
  	\`eheringe_heading\` text,
  	\`eheringe_intro\` text,
  	\`eheringe_cta_label\` text,
  	\`eheringe_image_pair_id\` integer,
  	\`eheringe_image_detail_id\` integer,
  	\`besuch_eyebrow\` text,
  	\`besuch_heading\` text,
  	\`besuch_phone_eyebrow\` text,
  	\`besuch_hours_heading\` text,
  	\`besuch_image_id\` integer,
  	\`besuch_image_caption_left\` text,
  	\`besuch_image_caption_right\` text,
  	\`updated_at\` text,
  	\`created_at\` text,
  	FOREIGN KEY (\`zweifarbigkeit_image_gold_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`zweifarbigkeit_image_kupfer_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`zweifarbigkeit_image_band_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`werkstatt_image_werkbank_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`werkstatt_image_haende_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`meisterin_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`eheringe_image_pair_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`eheringe_image_detail_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`besuch_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`homepage_zweifarbigkeit_zweifarbigkeit_image_gold_idx\` ON \`homepage\` (\`zweifarbigkeit_image_gold_id\`);`)
  await db.run(sql`CREATE INDEX \`homepage_zweifarbigkeit_zweifarbigkeit_image_kupfer_idx\` ON \`homepage\` (\`zweifarbigkeit_image_kupfer_id\`);`)
  await db.run(sql`CREATE INDEX \`homepage_zweifarbigkeit_zweifarbigkeit_image_band_idx\` ON \`homepage\` (\`zweifarbigkeit_image_band_id\`);`)
  await db.run(sql`CREATE INDEX \`homepage_werkstatt_werkstatt_image_werkbank_idx\` ON \`homepage\` (\`werkstatt_image_werkbank_id\`);`)
  await db.run(sql`CREATE INDEX \`homepage_werkstatt_werkstatt_image_haende_idx\` ON \`homepage\` (\`werkstatt_image_haende_id\`);`)
  await db.run(sql`CREATE INDEX \`homepage_meisterin_meisterin_image_idx\` ON \`homepage\` (\`meisterin_image_id\`);`)
  await db.run(sql`CREATE INDEX \`homepage_eheringe_eheringe_image_pair_idx\` ON \`homepage\` (\`eheringe_image_pair_id\`);`)
  await db.run(sql`CREATE INDEX \`homepage_eheringe_eheringe_image_detail_idx\` ON \`homepage\` (\`eheringe_image_detail_id\`);`)
  await db.run(sql`CREATE INDEX \`homepage_besuch_besuch_image_idx\` ON \`homepage\` (\`besuch_image_id\`);`)
  await db.run(sql`CREATE TABLE \`site_settings_nav_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text NOT NULL,
  	\`href\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_settings\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`site_settings_nav_links_order_idx\` ON \`site_settings_nav_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_nav_links_parent_id_idx\` ON \`site_settings_nav_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`site_settings_timeline\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`year\` text NOT NULL,
  	\`event\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_settings\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`site_settings_timeline_order_idx\` ON \`site_settings_timeline\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_timeline_parent_id_idx\` ON \`site_settings_timeline\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`site_settings_hours\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`weekday\` numeric NOT NULL,
  	\`day\` text NOT NULL,
  	\`time\` text NOT NULL,
  	\`open_start\` numeric,
  	\`open_end\` numeric,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_settings\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`site_settings_hours_order_idx\` ON \`site_settings_hours\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_hours_parent_id_idx\` ON \`site_settings_hours\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`site_settings_footer_hours_summary\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`days\` text NOT NULL,
  	\`time\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_settings\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`site_settings_footer_hours_summary_order_idx\` ON \`site_settings_footer_hours_summary\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_footer_hours_summary_parent_id_idx\` ON \`site_settings_footer_hours_summary\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`site_settings\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`meta_title\` text,
  	\`meta_description\` text,
  	\`atelier_name\` text,
  	\`atelier_short_name\` text,
  	\`atelier_legal_name\` text,
  	\`atelier_owner\` text,
  	\`atelier_owner_title\` text,
  	\`atelier_street\` text,
  	\`atelier_zip\` text,
  	\`atelier_city\` text,
  	\`atelier_district\` text,
  	\`atelier_phone_display\` text,
  	\`atelier_phone_href\` text,
  	\`atelier_email\` text,
  	\`atelier_maps_url\` text,
  	\`atelier_maps_embed_url\` text,
  	\`hours_note\` text,
  	\`footer_strapline\` text,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`CREATE TABLE \`legal\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`impressum_title\` text DEFAULT 'Impressum',
  	\`impressum\` text,
  	\`datenschutz_title\` text DEFAULT 'Datenschutzerklärung',
  	\`datenschutz\` text,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`pieces\`;`)
  await db.run(sql`DROP TABLE \`media\`;`)
  await db.run(sql`DROP TABLE \`users_sessions\`;`)
  await db.run(sql`DROP TABLE \`users\`;`)
  await db.run(sql`DROP TABLE \`payload_kv\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_preferences\`;`)
  await db.run(sql`DROP TABLE \`payload_preferences_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_migrations\`;`)
  await db.run(sql`DROP TABLE \`homepage_zweifarbigkeit_paragraphs\`;`)
  await db.run(sql`DROP TABLE \`homepage_zweifarbigkeit_techniques\`;`)
  await db.run(sql`DROP TABLE \`homepage_werkstatt_steps\`;`)
  await db.run(sql`DROP TABLE \`homepage_meisterin_paragraphs\`;`)
  await db.run(sql`DROP TABLE \`homepage_meisterin_stats\`;`)
  await db.run(sql`DROP TABLE \`homepage_eheringe_steps\`;`)
  await db.run(sql`DROP TABLE \`homepage\`;`)
  await db.run(sql`DROP TABLE \`site_settings_nav_links\`;`)
  await db.run(sql`DROP TABLE \`site_settings_timeline\`;`)
  await db.run(sql`DROP TABLE \`site_settings_hours\`;`)
  await db.run(sql`DROP TABLE \`site_settings_footer_hours_summary\`;`)
  await db.run(sql`DROP TABLE \`site_settings\`;`)
  await db.run(sql`DROP TABLE \`legal\`;`)
}
