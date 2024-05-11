include .env

.PHONY: migrate
migrate:
	atlas migrate diff --env gorm --var devUrl=${POSTGRESQL_URL}