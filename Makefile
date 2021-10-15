ifneq (,$(findstring src/,$(MAKECMDGOALS)))
	MAKECMDGOALS := $(subst src/,,$(MAKECMDGOALS))
endif

MAKEFLAGS += -s

up:
	docker-compose -f docker-compose.dev.yml up --build poc-back

lint:
	docker-compose -f docker-compose.dev.yml exec poc-back npx eslint "{src,apps,libs,test}/**/*.ts"

exec:
	docker-compose -f docker-compose.dev.yml exec poc-back $(filter-out $@, $(MAKECMDGOALS))
